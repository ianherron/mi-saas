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

  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) {
    throw new Error("Correo inválido.");
  }

  if (name.length > 100 || message.length > 2000) {
    throw new Error("Contenido demasiado largo.");
  }

  await resend.emails.send({
    from: "NailFlow Soporte <onboarding@resend.dev>",
    to: "hola@nailflow.app",
    subject: `Mensaje de soporte de ${name}`,
    text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
  });
}
