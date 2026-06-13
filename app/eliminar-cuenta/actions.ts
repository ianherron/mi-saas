"use server";

import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  prefix: "nailflow:delete-account",
});

export async function sendDeletionRequest(formData: FormData) {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { success } = await ratelimit.limit(ip);
  if (!success) throw new Error("Demasiados intentos. Intentá más tarde.");

  const email = (formData.get("email") as string)?.trim();

  if (!email || email.length > 254 || !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) {
    throw new Error("Correo inválido.");
  }

  await resend.emails.send({
    from: "NailFlow <hola@nailflow.app>",
    to: "hola@nailflow.app",
    subject: `Solicitud de eliminación de cuenta: ${email}`,
    text: `El usuario con correo ${email} solicita que se elimine su cuenta y todos los datos asociados.`,
  });
}
