import type { Metadata } from "next";
import { Users, Calendar, BarChart3, Shield, Clock, Layers } from "lucide-react";
import LandingNav from "@/app/components/LandingNav";

export const metadata: Metadata = {
  title: "NailFlow Studio — Para estudios y equipos",
  description:
    "La versión de NailFlow diseñada para estudios con múltiples manicuristas. Gestión de equipo, agenda compartida y reportes por empleada.",
};

const FEATURES = [
  {
    icon: Users,
    title: "Gestión de equipo",
    body: "Agregá hasta 4 manicuristas, cada una con su propio horario, servicios y agenda.",
  },
  {
    icon: Calendar,
    title: "Agenda compartida",
    body: "Vista unificada del estudio. Mirá todas las citas del día por manicurista en un solo lugar.",
  },
  {
    icon: BarChart3,
    title: "Reportes por empleada",
    body: "Ingresos, citas completadas y servicios más solicitados desglosados por cada integrante del equipo.",
  },
  {
    icon: Layers,
    title: "Reservas inteligentes",
    body: "Las clientas eligen a su manicurista preferida o la primera disponible. Sin double-booking.",
  },
  {
    icon: Clock,
    title: "Horarios independientes",
    body: "Cada manicurista puede tener días y horarios distintos. La agenda se ajusta automáticamente.",
  },
  {
    icon: Shield,
    title: "Permisos por rol",
    body: "La dueña del estudio ve todo. Las empleadas solo ven sus propias citas.",
  },
];

const COMPARE = [
  { feature: "Página de reservas personalizada", individual: true, studio: true },
  { feature: "Servicios con imagen y descripción", individual: true, studio: true },
  { feature: "Galería de trabajos", individual: true, studio: true },
  { feature: "Correos automáticos", individual: true, studio: true },
  { feature: "Pagos anticipados con SINPE", individual: true, studio: true },
  { feature: "Dashboard con estadísticas", individual: true, studio: true },
  { feature: "Múltiples manicuristas (hasta 4)", individual: false, studio: true },
  { feature: "Agenda compartida del estudio", individual: false, studio: true },
  { feature: "Reportes por empleada", individual: false, studio: true },
  { feature: "Reservas con selección de manicurista", individual: false, studio: true },
  { feature: "Permisos por rol (dueña / empleada)", individual: false, studio: true },
];

export default function StudioPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fbf9f9] text-[#2d2424]">
      <LandingNav />

      <main className="flex-1 pt-20 sm:pt-24">
        {/* Hero */}
        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
              {/* Left */}
              <div>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2d2424]/10 bg-[#e9cece]/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Próximamente
                </span>
                <h1
                  className="mb-5 mt-4 text-[44px] font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-6xl"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  NailFlow{" "}
                  <em className="font-normal italic text-[#846262]">Studio</em>.
                </h1>
                <p className="max-w-md text-base leading-relaxed text-[#846262] sm:text-lg">
                  Todo lo que ya conocés de NailFlow, ahora pensado para estudios con equipo. Gestioná hasta 4 manicuristas desde una sola cuenta.
                </p>
                <p className="mt-5 text-[13px] text-[#b89090]">
                  ✦ Avisanos si te interesa — las primeras en anotarse tienen acceso prioritario
                </p>
              </div>

              {/* Pricing card */}
              <div className="relative rounded-3xl border border-[#e9cece] bg-white p-7 shadow-[0_12px_30px_rgba(184,144,144,0.18)] sm:p-8">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[#e9cece]">✦</span>
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                    Plan Studio
                  </p>
                </div>
                <div className="mb-5 mt-4 flex items-baseline gap-1.5">
                  <p
                    className="text-5xl font-medium leading-none tracking-tight text-[#2d2424] sm:text-[56px]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    ₡12.000
                  </p>
                  <p className="text-sm text-[#846262]">/ mes</p>
                </div>
                <div className="mb-4 h-px bg-[#2d2424]/[0.08]" />
                <ul className="mb-6 flex flex-col gap-2.5">
                  {[
                    "Todo lo del plan individual",
                    "Hasta 4 manicuristas",
                    "Agenda compartida del estudio",
                    "Reportes por empleada",
                    "Reservas con selección de manicurista",
                    "Horarios independientes por empleada",
                    "Permisos por rol (dueña / empleada)",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-[13.5px] text-[#2d2424]">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e9cece] text-[10px] font-semibold text-[#2d2424]">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:nailflowapp@gmail.com"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#2d2424] px-7 py-4 text-base font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
                >
                  Quiero acceso anticipado
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Dark divider */}
        <section className="px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[28px] bg-[#2d2424] p-8 text-[#fbf9f9] sm:rounded-[32px] sm:p-12 lg:p-16">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-10 -top-16 text-[200px] leading-none text-[#e9cece]/[0.06] sm:text-[240px]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                ✦
              </span>
              <div className="relative z-10 max-w-2xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
                  Para estudios con visión
                </p>
                <h2
                  className="mb-5 mt-3 text-[32px] font-medium leading-tight tracking-tight text-[#fbf9f9] sm:text-5xl"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Un solo lugar para todo tu equipo.
                </h2>
                <p className="max-w-md text-[15px] leading-relaxed text-[#fbf9f9]/75 sm:text-base">
                  Dejá de coordinar por WhatsApp. Con NailFlow Studio, cada manicurista tiene su agenda y vos tenés el control de todo el estudio en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                Lo que viene
              </p>
              <h2
                className="mt-3 text-[32px] font-medium leading-tight tracking-tight text-[#2d2424] sm:text-4xl"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Funciones diseñadas para estudios.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#2d2424]/[0.07] bg-white p-6 shadow-[0_2px_12px_rgba(45,36,36,0.06)]"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#e9cece]/50">
                    <Icon size={18} className="text-[#2d2424]" />
                  </div>
                  <h3 className="mb-2 text-[15px] font-semibold text-[#2d2424]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#846262]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                Comparación
              </p>
              <h2
                className="mt-3 text-[28px] font-medium leading-tight tracking-tight text-[#2d2424] sm:text-4xl"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Individual vs Studio.
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#2d2424]/[0.07] bg-white shadow-[0_4px_20px_rgba(45,36,36,0.08)]">
              {/* Header */}
              <div className="grid grid-cols-[1fr_100px_100px] border-b border-[#2d2424]/[0.07] px-6 py-4">
                <div />
                <div className="text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#846262]">
                  Individual<br />
                  <span className="text-[10px] font-normal normal-case tracking-normal">₡3.500/mes</span>
                </div>
                <div className="text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2d2424]">
                  Studio<br />
                  <span className="text-[10px] font-normal normal-case tracking-normal">₡12.000/mes</span>
                </div>
              </div>

              {/* Rows */}
              {COMPARE.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1fr_100px_100px] items-center px-6 py-3.5 ${i < COMPARE.length - 1 ? "border-b border-[#2d2424]/[0.05]" : ""} ${!row.individual ? "bg-[#fbf9f9]" : ""}`}
                >
                  <span className="text-[13.5px] text-[#2d2424]">{row.feature}</span>
                  <div className="flex justify-center">
                    {row.individual
                      ? <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e9cece] text-[10px] font-bold text-[#2d2424]">✓</span>
                      : <span className="text-[#2d2424]/20 text-lg leading-none">—</span>
                    }
                  </div>
                  <div className="flex justify-center">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2d2424] text-[10px] font-bold text-[#fbf9f9]">✓</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="px-4 pb-24 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="mb-4 text-[28px] font-medium leading-tight tracking-tight text-[#2d2424] sm:text-4xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              ¿Tenés un estudio?{" "}
              <em className="font-normal italic text-[#846262]">Hablemos.</em>
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-[#846262] sm:text-base">
              Si querés ser de las primeras en probarlo, escribinos y te avisamos cuando esté listo.
            </p>
            <a
              href="mailto:nailflowapp@gmail.com"
              className="inline-flex items-center justify-center rounded-xl bg-[#2d2424] px-8 py-4 text-base font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
            >
              Contactar al equipo
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2d2424]/[0.07] bg-[#fbf9f9] px-4 py-8 sm:px-6 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-[#846262] sm:flex-row">
          <span>© {new Date().getFullYear()} NailFlow. Todos los derechos reservados.</span>
          <a href="/" className="hover:text-[#2d2424]">
            ← Volver a NailFlow
          </a>
        </div>
      </footer>
    </div>
  );
}
