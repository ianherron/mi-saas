import { Mail, Instagram, Video, ArrowLeft } from "lucide-react";
import ContactForm from "./ContactForm";

const channels = [
  {
    Icon: Mail,
    title: "Escribinos",
    description: "nailflowapp@gmail.com",
    href: "mailto:nailflowapp@gmail.com",
  },
  {
    Icon: Instagram,
    title: "Instagram",
    description: "@nailflowapp",
    href: "https://instagram.com/nailflowapp",
  },
  {
    Icon: Video,
    title: "TikTok",
    description: "@nailflowapp",
    href: "https://tiktok.com/@nailflowapp",
  },
];

export default function SoportePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fbf9f9] font-sans text-[#2d2424]">
      <header
        className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 sm:px-10 sm:py-8"
        style={{
          paddingTop: "max(1.5rem, calc(env(safe-area-inset-top) + 1rem))",
        }}
      >
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base leading-none text-[#e9cece]">
            ✦
          </div>
          <span className="serif-heading text-lg font-medium tracking-tight">
            NailFlow
          </span>
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#846262] underline decoration-[#e9cece] underline-offset-4 hover:text-[#2d2424]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver
        </a>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-20 sm:px-10">
        {/* Editorial top */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Soporte · NailFlow
          </p>
          <h1 className="serif-heading mt-3 text-[36px] font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-5xl">
            ¿En qué te{" "}
            <em className="font-normal italic text-[#846262]">ayudamos</em>?
          </h1>
          <p className="mx-auto mt-3.5 max-w-md text-[15px] leading-relaxed text-[#846262]">
            Elegí el canal que prefieras o escribinos directo. Te respondemos rápido.
          </p>
        </div>

        {/* Channels */}
        <div className="mb-10 grid gap-3 sm:grid-cols-3 sm:gap-3.5">
          {channels.map(({ Icon, title, description, href }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex flex-col gap-2.5 rounded-[18px] border border-[#2d2424]/[0.08] bg-white p-5 transition-colors hover:border-[#e9cece]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9cece] text-[#2d2424]">
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <p className="serif-heading text-lg font-medium tracking-tight text-[#2d2424]">
                {title}
              </p>
              <p className="text-[13px] text-[#846262]">{description}</p>
            </a>
          ))}
        </div>

        {/* Form card */}
        <section className="rounded-3xl border border-[#2d2424]/[0.08] bg-white p-6 sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Mensaje directo
          </p>
          <h2 className="serif-heading mt-2.5 text-2xl font-medium leading-tight tracking-tight text-[#2d2424] sm:text-[28px]">
            Contános qué{" "}
            <em className="font-normal italic text-[#846262]">necesitás</em>.
          </h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2d2424]/[0.08] px-5 py-6 text-center sm:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
          © 2026 NailFlow
        </p>
      </footer>
    </div>
  );
}
