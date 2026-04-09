import { Sparkles, Mail, Instagram, Video } from "lucide-react";
import ContactForm from "./ContactForm";

const contactCards = [
  {
    icon: Mail,
    title: "Escríbenos",
    description: "hola@nailflow.app",
    href: "mailto:hola@nailflow.app",
  },
  {
    icon: Instagram,
    title: "Instagram",
    description: "@nailflowapp",
    href: "https://instagram.com/nailflowapp",
  },
  {
    icon: Video,
    title: "TikTok",
    description: "@nailflowapp",
    href: "https://tiktok.com/@nailflowapp",
  },
];

export default function SoportePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fbf9f9] text-[#2d2424]">
      {/* Header */}
      <header
        className="mx-auto flex w-full max-w-7xl items-center px-6 py-8"
        style={{
          paddingTop: "max(2rem, calc(env(safe-area-inset-top) + 1rem))",
        }}
      >
        <a href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="serif-heading text-xl font-bold tracking-tight">
            NailFlow
          </h2>
        </a>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-20">
        {/* Título */}
        <div className="mb-14 mt-10 text-center">
          <h1 className="serif-heading text-4xl font-bold text-[#2d2424] md:text-5xl">
            ¿En qué podemos ayudarte?
          </h1>
          <p className="mt-4 text-[#846262]">
            Estamos aquí para ayudarte. Elegí el canal que prefieras o envianos
            un mensaje directo.
          </p>
        </div>

        {/* Cards de contacto */}
        <div className="mb-14 grid gap-4 sm:grid-cols-3">
          {contactCards.map(({ icon: Icon, title, description, href }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center gap-3 rounded-2xl border border-[#e9cece]/30 bg-white px-6 py-8 text-center shadow-sm transition-all hover:border-[#e9cece] hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9cece]/20 text-[#2d2424]">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-semibold text-[#2d2424]">{title}</span>
              <span className="text-sm text-[#846262]">{description}</span>
            </a>
          ))}
        </div>

        {/* Formulario */}
        <div className="rounded-2xl border border-[#e9cece]/30 bg-white p-8 shadow-sm md:p-10">
          <h2 className="serif-heading mb-8 text-2xl font-bold text-[#2d2424]">
            Envíanos un mensaje
          </h2>
          <ContactForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#e9cece]/20 py-8 text-center text-xs text-[#846262]">
        © 2026 NailFlow
      </footer>
    </div>
  );
}
