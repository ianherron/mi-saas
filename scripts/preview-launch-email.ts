import { writeFileSync } from "fs";
import { renderEmail } from "../lib/email-template";

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

writeFileSync("/tmp/nailflow-launch-preview.html", html);
console.log("Abre este archivo en tu navegador:");
console.log("file:///tmp/nailflow-launch-preview.html");
