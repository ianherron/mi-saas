import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { renderEmail } from "../lib/email-template";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const AUDIENCE_ID = "2ef75ed4-5e19-4348-8b02-b3aa010ccd07";
const FROM = "NailFlow <hola@nailflow.app>";
const APP_STORE_URL = "https://apps.apple.com/app/nailflow-gestion-de-salon/id6773913027";

const html = renderEmail({
  preheader: "NailFlow ya está disponible en el App Store — descárgala ahora.",
  eyebrow: "Ya está disponible",
  heading: "NailFlow ya está en el <em>App Store</em>",
  intro:
    "Gracias por registrarte desde el principio. Hoy por fin puedes descargar NailFlow y empezar a gestionar tu negocio: agenda, clientes, recordatorios y mucho más — todo desde tu iPhone.",
  cta: {
    label: "Descargar NailFlow gratis",
    href: APP_STORE_URL,
  },
  footer: "NailFlow · Para manicuristas",
});

async function main() {
  // 1. Create broadcast
  const createRes = await fetch("https://api.resend.com/broadcasts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      audience_id: AUDIENCE_ID,
      from: FROM,
      subject: "NailFlow ya está en el App Store 🎉",
      html,
      name: "Launch announcement — Jun 2026",
    }),
  });

  const broadcast = await createRes.json();
  if (!createRes.ok) {
    console.error("Error creando broadcast:", broadcast);
    process.exit(1);
  }

  console.log("Broadcast creado:", broadcast.id);

  // 2. Send broadcast
  const sendRes = await fetch(
    `https://api.resend.com/broadcasts/${broadcast.id}/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const sendData = await sendRes.json();
  if (!sendRes.ok) {
    console.error("Error enviando broadcast:", sendData);
    process.exit(1);
  }

  console.log("Enviado correctamente:", sendData);
}

main();
