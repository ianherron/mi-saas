import LegalModals from "./LegalModals";
import FAQSection from "./components/FAQSection";
import AnimateOnScroll from "./AnimateOnScroll";
import LandingNav from "./components/LandingNav";
import WaitlistForm from "./components/WaitlistForm";
import {
  Calendar,
  Globe,
  BarChart3,
  Instagram,
  Lock,
  Shield,
  CreditCard,
} from "lucide-react";
import {
  PhoneDashboard,
  PhoneReservas,
  PhoneReportes,
} from "./components/landing/PhoneMocks";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fbf9f9] text-[#2d2424]">
      <LandingNav />

      <main className="flex-1 pt-20 sm:pt-24">
        {/* ============================================================
            HERO
            ============================================================ */}
        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
              {/* Left text */}
              <div className="flex flex-col gap-6 sm:gap-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Para manicuristas
                </p>
                <h1 className="serif-heading text-[44px] font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-6xl lg:text-7xl">
                  Tu agenda,
                  <br />
                  <em className="font-normal italic text-[#846262]">
                    en modo pro
                  </em>
                  .
                </h1>
                <p className="max-w-lg text-base leading-relaxed text-[#846262] sm:text-lg">
                  Reservas automáticas, pagos con SINPE Móvil y reportes claros. Todo en un solo lugar, hecho para vos.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
                  <a
                    href="/registrar"
                    className="inline-flex items-center justify-center rounded-xl bg-[#2d2424] px-7 py-4 text-base font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
                  >
                    Empezar gratis
                  </a>
                  <a
                    href="#como-funciona"
                    className="inline-flex items-center justify-center rounded-xl border-[1.5px] border-[#e9cece] bg-transparent px-7 py-4 text-base font-medium text-[#2d2424] transition-colors hover:bg-[#f4ecec]"
                  >
                    Ver demo
                  </a>
                </div>
                <p className="text-[13px] text-[#b89090]">
                  ✦ 30 días gratis
                </p>
              </div>

              {/* Right — editorial mock card with floating notification */}
              <div className="relative pt-8 lg:pt-0">
                <span
                  aria-hidden
                  className="serif-heading pointer-events-none absolute -right-5 -top-10 z-0 text-[140px] leading-none text-[#f4ecec] sm:text-[200px]"
                >
                  ✦
                </span>
                <div className="relative z-10 rounded-3xl border border-[#2d2424]/[0.08] bg-white p-6 shadow-[0_18px_40px_rgba(45,36,36,0.08),0_2px_6px_rgba(45,36,36,0.04)] sm:p-7">
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                    Tu día · mié 13 mayo
                  </p>
                  <h3 className="serif-heading mt-2.5 text-[22px] font-medium leading-tight tracking-tight text-[#2d2424] sm:text-2xl">
                    3 citas hoy —{" "}
                    <em className="font-normal italic text-[#846262]">
                      tarde llena
                    </em>
                    .
                  </h3>
                  {/* Day strip */}
                  <div className="relative mt-4 h-11 overflow-hidden rounded-lg bg-[#f4ecec]">
                    {[
                      { l: 14, w: 24, name: "Vale" },
                      { l: 42, w: 16, name: "Mari" },
                      { l: 64, w: 28, name: "Sofi" },
                    ].map((b, i) => (
                      <div
                        key={i}
                        style={{ left: `${b.l}%`, width: `${b.w}%` }}
                        className="absolute inset-y-[2px] flex items-center justify-center rounded-md bg-[#2d2424] text-[11px] font-medium text-[#fbf9f9]"
                      >
                        {b.name}
                      </div>
                    ))}
                  </div>
                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-4 border-t border-[#2d2424]/[0.08] pt-4">
                    {[
                      { l: "Citas hoy", v: "3" },
                      { l: "Ingresos esp.", v: "$108" },
                      { l: "Próxima", v: "10:00 AM" },
                    ].map((s, i) => (
                      <div key={i}>
                        <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                          {s.l}
                        </p>
                        <p className="serif-heading mt-1 text-lg font-medium leading-none tracking-tight text-[#2d2424] sm:text-[22px]">
                          {s.v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Notification card */}
                <div className="relative z-20 -mr-2 mt-4 max-w-[240px] rounded-[18px] bg-[#2d2424] p-4 text-[#fbf9f9] shadow-[0_18px_40px_rgba(45,36,36,0.18)] sm:absolute sm:-right-7 sm:-bottom-9 sm:ml-auto sm:mt-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
                    Nueva reserva
                  </p>
                  <p className="serif-heading mt-2 text-[15px] font-medium leading-snug text-[#fbf9f9]">
                    <em className="font-normal italic text-[#e9cece]">Mariana</em>{" "}
                    reservó Acrílicas.
                  </p>
                  <p className="mt-1 text-[11px] text-[#fbf9f9]/60">
                    Mañana, 11:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            BENEFICIOS
            ============================================================ */}
        <section
          className="bg-[#fbf9f9] px-4 py-20 sm:px-6 sm:py-24 lg:px-12 scroll-mt-16"
          id="beneficios"
        >
          <div className="mx-auto max-w-6xl">
            <AnimateOnScroll>
              <div className="mb-12 text-center sm:mb-14">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Hecho para tu negocio
                </p>
                <h2 className="serif-heading mt-3 text-[36px] font-medium leading-[1.05] tracking-tight sm:text-5xl">
                  Diseñado para la{" "}
                  <em className="font-normal italic text-[#846262]">
                    excelencia
                  </em>
                  .
                </h2>
                <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#846262]">
                  Herramientas que transforman la gestión de tu negocio en una experiencia premium.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  Icon: Calendar,
                  title: "Gestión inteligente",
                  body: "Agenda fluida, sin solapamientos. Tus pausas, también las gestiona NailFlow.",
                  delay: 0,
                },
                {
                  Icon: Globe,
                  title: "Reservas 24/7",
                  body: "Tus clientas reservan desde el móvil cuando quieran. Menos WhatsApps a las 11pm.",
                  delay: 150,
                },
                {
                  Icon: BarChart3,
                  title: "Control total",
                  body: "Definí precios por servicio, mirá tus ingresos y entendé tu mes en un solo gráfico.",
                  delay: 300,
                },
              ].map(({ Icon, title, body, delay }) => (
                <AnimateOnScroll key={title} delay={delay}>
                  <div className="flex h-full flex-col gap-3.5 rounded-3xl border border-[#2d2424]/[0.08] bg-white p-7 sm:p-8">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9cece]">
                      <Icon className="h-5 w-5 text-[#2d2424]" />
                    </div>
                    <h3 className="serif-heading text-xl font-medium tracking-tight text-[#2d2424]">
                      {title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#846262]">
                      {body}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            CÓMO FUNCIONA
            ============================================================ */}
        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-12 scroll-mt-16" id="como-funciona">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <AnimateOnScroll>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Cómo funciona
                </p>
                <h2 className="serif-heading mb-10 mt-3 text-[36px] font-medium leading-[1.05] tracking-tight sm:text-5xl">
                  Tu salón digital,
                  <br />
                  <em className="font-normal italic text-[#846262]">en 3 pasos</em>
                  .
                </h2>
              </AnimateOnScroll>

              <div className="flex flex-col gap-7">
                {[
                  {
                    n: "01",
                    title: "Configurás tus servicios",
                    body: "Añadí tus tratamientos, definí duración y precio, elegí los días que atendés.",
                    delay: 0,
                  },
                  {
                    n: "02",
                    title: "Compartís tu enlace",
                    body: "En tu bio de Instagram o por WhatsApp. Tu link, tu marca.",
                    delay: 150,
                  },
                  {
                    n: "03",
                    title: "Recibís citas automáticamente",
                    body: "Las citas caen en tu agenda. Ambas reciben confirmación al instante.",
                    delay: 300,
                  },
                ].map(({ n, title, body, delay }, i, arr) => (
                  <AnimateOnScroll key={n} delay={delay}>
                    <div
                      className={`flex gap-5 ${i < arr.length - 1 ? "border-b border-[#2d2424]/[0.08] pb-7" : ""}`}
                    >
                      <div className="serif-heading shrink-0 pt-1 text-[26px] font-medium leading-none tracking-tight text-[#b89090] sm:text-3xl">
                        {n}
                      </div>
                      <div>
                        <h4 className="mb-1.5 text-lg font-medium text-[#2d2424]">
                          {title}
                        </h4>
                        <p className="text-[14px] leading-relaxed text-[#846262]">
                          {body}
                        </p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>

            {/* Visual — clean phone mockup with rose halo + scattered ✦s */}
            <div className="relative py-6 sm:py-10">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 z-0 aspect-square w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,206,206,0.45)_0%,rgba(233,206,206,0)_65%)] blur-2xl"
              />
              {[
                { t: "8%", l: "12%", s: "44px" },
                { t: "12%", l: "88%", s: "32px" },
                { t: "82%", l: "90%", s: "50px" },
                { t: "88%", l: "8%", s: "36px" },
              ].map((p, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="serif-heading absolute z-0 leading-none text-[#b89090]/30"
                  style={{
                    top: p.t,
                    left: p.l,
                    fontSize: p.s,
                  }}
                >
                  ✦
                </span>
              ))}
              <div className="flex flex-col items-center gap-5 sm:block">
                <div className="relative z-10 flex justify-center drop-shadow-[0_28px_56px_rgba(45,36,36,0.18)]">
                  <PhoneReservas width={240} />
                </div>
                {/* Floating notification — stacks below on mobile, overlaps on desktop */}
                <div className="relative z-20 max-w-[260px] rounded-2xl border border-[#2d2424]/[0.08] bg-white p-4 shadow-[0_18px_40px_rgba(45,36,36,0.12)] sm:absolute sm:-bottom-2 sm:-left-2">
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                    Nueva reserva
                  </p>
                  <p className="serif-heading mt-2 text-[15px] font-medium leading-snug tracking-tight text-[#2d2424]">
                    <em className="font-normal italic text-[#846262]">
                      Marta García
                    </em>{" "}
                    reservó.
                  </p>
                  <p className="mt-1 text-[12px] text-[#846262]">
                    Mantenimiento Gel · Mañana, 11:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            TU NEGOCIO A TU RITMO  (dark editorial)
            ============================================================ */}
        <section className="overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-12 scroll-mt-16" id="precios">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[28px] bg-[#2d2424] p-8 text-[#fbf9f9] sm:rounded-[32px] sm:p-12 lg:p-16">
              <span
                aria-hidden
                className="serif-heading pointer-events-none absolute -left-10 -top-16 text-[200px] leading-none text-[#e9cece]/[0.06] sm:text-[240px]"
              >
                ✦
              </span>

              <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
                    Vos al timón
                  </p>
                  <h2 className="serif-heading mb-5 mt-3 text-[36px] font-medium leading-tight tracking-tight text-[#fbf9f9] sm:text-5xl">
                    Tu negocio,
                    <br />
                    <em className="font-normal italic text-[#e9cece]">
                      a tu ritmo
                    </em>
                    .
                  </h2>
                  <p className="max-w-md text-[15px] leading-relaxed text-[#fbf9f9]/75 sm:text-base">
                    Olvidate de interrumpir tus servicios para confirmar citas. Tu asistente digital se encarga mientras vos te enfocás en el arte.
                  </p>

                  <ul className="mb-8 mt-7 flex flex-col gap-3">
                    {[
                      "Historial detallado de clientas",
                      "Recordatorios por email",
                      "Galería de trabajos integrada",
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-[14px] text-[#fbf9f9]/90"
                      >
                        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#e9cece] text-[10px] font-semibold text-[#2d2424]">
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#beneficios"
                    className="inline-flex items-center justify-center rounded-xl bg-[#fbf9f9] px-7 py-4 text-base font-medium text-[#2d2424] transition-colors hover:bg-white"
                  >
                    Explorar funciones
                  </a>
                </div>

                {/* Phones — scrollable horizontal carousel on mobile, floating animations on desktop */}
                <div className="-mx-4 sm:mx-0">
                  {/* Mobile: horizontal scroll */}
                  <div className="flex gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory sm:hidden">
                    <div className="snap-center">
                      <PhoneReservas width={160} />
                    </div>
                    <div className="snap-center">
                      <PhoneDashboard width={200} />
                    </div>
                    <div className="snap-center">
                      <PhoneReportes width={160} />
                    </div>
                  </div>
                  {/* Desktop: 3 phones with float animation */}
                  <div className="hidden items-center justify-center gap-4 sm:flex">
                    <div className="animate-float-slow">
                      <PhoneReservas width={150} />
                    </div>
                    <div className="relative z-10 animate-float-medium">
                      <PhoneDashboard width={190} />
                    </div>
                    <div className="animate-float-fast">
                      <PhoneReportes width={150} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            FINAL CTA + PRICING
            ============================================================ */}
        <section className="bg-[#fbf9f9] px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <AnimateOnScroll>
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                    Listo cuando lo estés
                  </p>
                  <h2 className="serif-heading mb-4 mt-3 text-[36px] font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-5xl">
                    Elevá tu salón,
                    <br />
                    <em className="font-normal italic text-[#846262]">
                      sin esfuerzo
                    </em>
                    .
                  </h2>
                  <p className="max-w-md text-base leading-relaxed text-[#846262] sm:text-lg">
                    Sumate a las manicuristas que digitalizaron su pasión con elegancia.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="/registrar"
                      className="inline-flex items-center justify-center rounded-xl bg-[#2d2424] px-7 py-4 text-base font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
                    >
                      Empezar gratis hoy
                    </a>
                    <a
                      href="/login"
                      className="inline-flex items-center justify-center rounded-xl border border-[#2d2424]/[0.16] bg-transparent px-7 py-4 text-base font-medium text-[#2d2424] transition-colors hover:bg-[#f4ecec]"
                    >
                      Iniciar sesión
                    </a>
                  </div>
                  <p className="mt-4 text-[13px] text-[#b89090]">
                    ✦ 30 días gratis · cancelás cuando querás
                  </p>
                </div>

                {/* Pricing card */}
                <div className="relative rounded-3xl border border-[#e9cece] bg-white p-7 shadow-[0_12px_30px_rgba(184,144,144,0.18)] sm:p-8">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[#e9cece]">✦</span>
                    <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                      Plan único
                    </p>
                  </div>
                  <div className="mb-5 mt-4 flex items-baseline gap-1.5">
                    <p className="serif-heading text-5xl font-medium leading-none tracking-tight text-[#2d2424] sm:text-[56px]">
                      $6.99
                    </p>
                    <p className="text-sm text-[#846262]">/ mes</p>
                  </div>
                  <div className="mb-4 h-px bg-[#2d2424]/[0.08]" />
                  <ul className="mb-6 flex flex-col gap-2.5">
                    {[
                      "Página de reservas personalizada",
                      "Servicios con imagen y descripción",
                      "Galería de trabajos",
                      "Correos automáticos",
                      "Horarios y días configurables",
                      "Extras opcionales",
                      "Dashboard con estadísticas",
                      "Pagos anticipados con SINPE Móvil",
                    ].map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-[13.5px] text-[#2d2424]"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e9cece] text-[10px] font-semibold text-[#2d2424]">
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/registrar"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#2d2424] px-7 py-4 text-base font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
                  >
                    Empezar 30 días gratis
                  </a>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Trust strip */}
            <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-0 sm:divide-x sm:divide-[#2d2424]/[0.1]">
              {[
                { Icon: Lock, label: "Conexión SSL segura" },
                { Icon: Shield, label: "Datos encriptados" },
                { Icon: CreditCard, label: "Pagos con LemonSqueezy" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-7">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#b89090]" strokeWidth={1.75} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            APP CTA  (dark)
            ============================================================ */}
        <section className="relative overflow-hidden bg-[#2d2424] px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
          <span
            aria-hidden
            className="serif-heading pointer-events-none absolute -right-10 -top-16 text-[200px] leading-none text-[#e9cece]/[0.05] sm:text-[280px]"
          >
            ✦
          </span>
          <div className="relative mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left — title + app store buttons */}
              <div className="text-center lg:text-left">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
                  Disponible ahora
                </p>
                <h2 className="serif-heading mb-4 mt-3.5 text-[36px] font-medium leading-tight tracking-tight text-[#fbf9f9] sm:text-5xl">
                  NailFlow en{" "}
                  <em className="font-normal italic text-[#e9cece]">tu bolsillo</em>
                  .
                </h2>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                  <a
                    href="https://apps.apple.com/app/nailflow-gestion-de-salon/id6773913027"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#fbf9f9] px-7 py-4 transition-colors hover:bg-white sm:w-auto"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#2d2424]" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-[10px] font-medium text-[#2d2424]/60">Disponible en</p>
                      <p className="text-sm font-semibold text-[#2d2424]">App Store</p>
                    </div>
                  </a>
                  <button
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border-[1.5px] border-[#fbf9f9]/20 bg-transparent px-7 py-4 opacity-50 sm:w-auto"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#fbf9f9]" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.18 23.76c.3.17.64.22.98.14l13.76-7.93-2.95-2.95-11.79 10.74zm-1.76-20.3C1.16 3.9 1 4.37 1 4.9v14.2c0 .53.16 1 .42 1.44l.08.07 7.96-7.96v-.19L1.5 3.39l-.08.07zM21.4 10.38l-2.83-1.63-3.18 3.18 3.18 3.18 2.85-1.64c.81-.47.81-1.22 0-1.69zM4.16.47L17.92 8.4l-2.95 2.95L3.18.61C3.52.53 3.88.59 4.16.47z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-[10px] font-medium text-[#fbf9f9]/50">Próximamente en</p>
                      <p className="text-sm font-semibold text-[#fbf9f9]">Google Play</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Right — app available */}
              <div className="flex flex-col gap-6 rounded-[28px] border border-[#fbf9f9]/10 bg-[#fbf9f9]/[0.06] p-8 lg:p-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
                  Ya disponible
                </p>
                <p className="text-[22px] font-medium leading-snug tracking-tight text-[#fbf9f9]">
                  Todo lo que necesitás para gestionar tu negocio, ahora en tu iPhone.
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    "Agenda y citas en un solo lugar",
                    "Historial completo de cada clienta",
                    "Recordatorios automáticos por email",
                    "Página de reservas online",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[14px] text-[#fbf9f9]/70">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e9cece]/20 text-[#e9cece]">
                        ✦
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://apps.apple.com/app/nailflow-gestion-de-salon/id6773913027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-3 rounded-xl bg-[#fbf9f9] px-7 py-4 transition-colors hover:bg-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#2d2424]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] font-medium text-[#2d2424]/60">Disponible en</p>
                    <p className="text-sm font-semibold text-[#2d2424]">App Store</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FAQ — uses the existing FAQSection component */}
      <FAQSection />

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="border-t border-[#2d2424]/[0.08] bg-[#fbf9f9] px-4 py-16 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-sm leading-none text-[#e9cece]">
                  ✦
                </div>
                <h2 className="serif-heading text-lg font-medium tracking-tight">
                  NailFlow
                </h2>
              </div>
              <p className="max-w-xs text-[13px] leading-relaxed text-[#846262]">
                La plataforma de gestión para manicuristas que valoran su tiempo, su marca y su independencia.
              </p>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                Plataforma
              </p>
              <ul className="flex flex-col gap-3 text-[13px] text-[#846262]">
                <li>
                  <a className="hover:text-[#2d2424]" href="#beneficios">
                    Beneficios
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#2d2424]" href="#como-funciona">
                    Cómo funciona
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#2d2424]" href="#precios">
                    Precios
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                Recursos
              </p>
              <ul className="flex flex-col gap-3 text-[13px] text-[#846262]">
                <li>
                  <a className="hover:text-[#2d2424]" href="/soporte">
                    Soporte
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                Síguenos
              </p>
              <div className="flex gap-2">
                <a
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ecec] transition-colors hover:bg-[#e9cece]"
                  href="https://instagram.com/nailflowapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram className="h-4 w-4 text-[#2d2424]" />
                </a>
                <a
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ecec] transition-colors hover:bg-[#e9cece]"
                  href="https://www.tiktok.com/@nailflowapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#2d2424]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#2d2424]/[0.06] pt-6 text-[11px] text-[#b89090] md:flex-row">
            <p>© 2026 NailFlow · Hecho en Costa Rica</p>
            <LegalModals />
          </div>
        </div>
      </footer>
    </div>
  );
}
