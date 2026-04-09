"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSupportMessage(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    throw new Error("Todos los campos son requeridos.");
  }

  await resend.emails.send({
    from: "NailFlow Soporte <onboarding@resend.dev>",
    to: "hola@nailflow.app",
    subject: `Mensaje de soporte de ${name}`,
    text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
  });
}
