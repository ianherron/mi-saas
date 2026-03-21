import LegalModals from "./LegalModals";
import AnimateOnScroll from "./AnimateOnScroll";
import { Calendar, Globe, BarChart3, CheckCircle, Sparkles, Instagram, Facebook } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fbf9f9] text-[#2d2424]">
      <header className="fixed top-0 z-50 w-full border-b border-[#e9cece]/20 bg-[#fbf9f9]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <div className="group flex cursor-pointer items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9cece] text-[#2d2424]">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="serif-heading text-xl font-bold tracking-tight">
              NailFlow
            </h2>
          </div>

          <nav className="hidden items-center gap-10 md:flex">
            <a
              className="text-sm font-medium transition-colors hover:text-[#cfaeae]"
              href="#beneficios"
            >
              Beneficios
            </a>
            <a
              className="text-sm font-medium transition-colors hover:text-[#cfaeae]"
              href="#como-funciona"
            >
              Cómo funciona
            </a>
            <a
              className="text-sm font-medium transition-colors hover:text-[#cfaeae]"
              href="#precios"
            >
              Precios
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="hidden text-sm font-semibold hover:opacity-70 sm:block"
            >
              Iniciar sesión
            </a>
            <a
              href="/registrar"
              className="rounded-full bg-[#e9cece] px-6 py-2.5 text-sm font-bold text-[#2d2424] shadow-lg shadow-[#e9cece]/20 transition-transform hover:scale-105"
            >
              Crear cuenta
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24">
        <section className="relative px-6 py-16 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col gap-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e9cece]/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#846262]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e9cece] opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e9cece]"></span>
                  </span>
                  Nueva Experiencia Premium
                </div>

                <h1 className="serif-heading text-5xl leading-[1.1] font-medium md:text-6xl lg:text-7xl">
                  La forma más{" "}
                  <span className="italic text-[#cfaeae]">elegante</span> de
                  gestionar tus citas
                </h1>

                <p className="max-w-lg text-lg leading-relaxed text-[#846262]">
                  NailFlow es la plataforma de gestión diseñada exclusivamente
                  para técnicos de uñas que buscan excelencia, simplicidad y una
                  imagen de marca impecable.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="/registrar"
                    className="rounded-xl bg-[#e9cece] px-8 py-4 text-base font-bold text-[#2d2424] shadow-xl shadow-[#e9cece]/20 transition-all hover:bg-[#dfc2c2]"
                  >
                    Comenzar ahora
                  </a>
                </div>
              </div>

              <div className="relative block pt-4 lg:pt-0">
                <div className="absolute -inset-4 rounded-[2rem] bg-[#e9cece]/10 blur-3xl"></div>

                {/* Card 1 — Agenda (ancha arriba) */}
                <div className="relative z-30 rounded-3xl border border-[#e9cece]/20 bg-white p-6 shadow-2xl transition-transform duration-300 hover:-translate-y-2">
                  <p className="serif-heading mb-2 text-base font-bold text-[#2d2424]">
                    Tu agenda, simplificada
                  </p>
                  <p className="mb-4 text-xs text-[#846262]">
                    Gestiona citas, servicios y clientas desde un solo lugar.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-[#f4ecec] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[#e9cece]/40 text-xs font-bold">
                          E
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#2d2424]">
                            Elena Rodriguez
                          </p>
                          <p className="text-xs text-[#846262]">
                            Nail Art - 14:00h
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold text-green-700">
                        Confirmado
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-[#f4ecec]/50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[#e9cece]/40 text-xs font-bold">
                          S
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#2d2424]">
                            Sofía Marín
                          </p>
                          <p className="text-xs text-[#846262]">
                            Acrílicas - 15:30h
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-[#e9cece]/30 px-3 py-1 text-[10px] font-bold text-[#846262]">
                        Pendiente
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cards 2 y 3 — abajo lado a lado */}
                <div className="relative z-20 mt-3 grid grid-cols-2 gap-3">
                  {/* Card 2 — Servicios */}
                  <div className="rounded-3xl border border-[#e9cece]/20 bg-white p-4 shadow-xl transition-transform duration-300 hover:-translate-y-2">
                    <p className="serif-heading mb-3 text-sm font-bold text-[#2d2424]">
                      Servicios
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-[#f4ecec]/50 px-3 py-2">
                        <span className="text-xs font-medium text-[#2d2424]">
                          Acrílicas
                        </span>
                        <span className="text-xs font-bold text-[#e9cece]">
                          ₡25,000
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-[#f4ecec]/50 px-3 py-2">
                        <span className="text-xs font-medium text-[#2d2424]">
                          Gel
                        </span>
                        <span className="text-xs font-bold text-[#e9cece]">
                          ₡18,000
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-[#f4ecec]/50 px-3 py-2">
                        <span className="text-xs font-medium text-[#2d2424]">
                          Nail Art
                        </span>
                        <span className="text-xs font-bold text-[#e9cece]">
                          ₡30,000
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 — Stats */}
                  <div className="rounded-3xl border border-[#e9cece]/20 bg-white p-4 shadow-xl transition-transform duration-300 hover:-translate-y-2">
                    <p className="serif-heading mb-3 text-sm font-bold text-[#2d2424]">
                      Resumen de hoy
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="rounded-xl bg-[#f4ecec] p-3 text-center">
                        <p className="text-2xl font-bold text-[#2d2424]">4</p>
                        <p className="text-[10px] text-[#846262]">Citas hoy</p>
                      </div>
                      <div className="rounded-xl bg-[#f4ecec] p-3 text-center">
                        <p className="text-2xl font-bold text-[#e9cece]">6</p>
                        <p className="text-[10px] text-[#846262]">
                          Servicios activos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-[#f4ecec]/50 px-6 py-24 lg:px-12"
          id="beneficios"
        >
          <div className="mx-auto max-w-7xl">
            <AnimateOnScroll>
              <div className="mb-16 text-center">
                <h2 className="serif-heading text-4xl font-medium md:text-5xl">
                  Diseñado para la excelencia
                </h2>
                <p className="mt-4 text-[#846262]">
                  Herramientas que transforman la gestión de tu negocio en una
                  experiencia premium.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-8 md:grid-cols-3">
              <AnimateOnScroll delay={0}>
                <div className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9cece]/20 transition-colors group-hover:bg-[#e9cece]">
                    <Calendar className="h-6 w-6 text-[#2d2424]" />
                  </div>
                  <h3 className="serif-heading mb-3 text-xl font-bold">
                    Gestión inteligente
                  </h3>
                  <p className="text-[#846262]">
                    Organiza tu agenda de manera fluida, evita solapamientos y
                    gestiona tiempos de descanso automáticamente.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
                <div className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9cece]/20 transition-colors group-hover:bg-[#e9cece]">
                    <Globe className="h-6 w-6 text-[#2d2424]" />
                  </div>
                  <h3 className="serif-heading mb-3 text-xl font-bold">
                    Reservas 24/7
                  </h3>
                  <p className="text-[#846262]">
                    Tus clientas pueden reservar en cualquier momento desde su
                    móvil. Menos WhatsApps, más citas confirmadas.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={300}>
                <div className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9cece]/20 transition-colors group-hover:bg-[#e9cece]">
                    <BarChart3 className="h-6 w-6 text-[#2d2424]" />
                  </div>
                  <h3 className="serif-heading mb-3 text-xl font-bold">
                    Control total
                  </h3>
                  <p className="text-[#846262]">
                    Define precios exactos por servicio, visualiza tus ingresos
                    y analiza tu productividad con reportes elegantes.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 lg:px-12" id="como-funciona">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-16 lg:flex-row">
              <div className="lg:w-1/2">
                <AnimateOnScroll>
                  <h2 className="serif-heading mb-12 text-4xl font-medium md:text-5xl">
                    Tu salón digital en 3 pasos
                  </h2>
                </AnimateOnScroll>

                <div className="space-y-12">
                  <AnimateOnScroll delay={0}>
                    <div className="flex gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9cece] font-bold text-[#2d2424]">
                        1
                      </div>
                      <div>
                        <h4 className="mb-2 text-xl font-bold">
                          Configura tus servicios
                        </h4>
                        <p className="text-[#846262]">
                          Añade tus tratamientos, define su duración, precio y
                          personaliza los días que estarás disponible.
                        </p>
                      </div>
                    </div>
                  </AnimateOnScroll>

                  <AnimateOnScroll delay={150}>
                    <div className="flex gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9cece] font-bold text-[#2d2424]">
                        2
                      </div>
                      <div>
                        <h4 className="mb-2 text-xl font-bold">
                          Comparte tu enlace
                        </h4>
                        <p className="text-[#846262]">
                          Incluye tu link personalizado en tu biografía de
                          Instagram, TikTok o envíalo por WhatsApp a tus
                          clientas.
                        </p>
                      </div>
                    </div>
                  </AnimateOnScroll>

                  <AnimateOnScroll delay={300}>
                    <div className="flex gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9cece] font-bold text-[#2d2424]">
                        3
                      </div>
                      <div>
                        <h4 className="mb-2 text-xl font-bold">
                          Recibe citas automáticamente
                        </h4>
                        <p className="text-[#846262]">
                          Las citas aparecerán en tu calendario y ambas
                          recibirán notificaciones de confirmación al instante.
                        </p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                </div>
              </div>

              <div className="relative lg:w-1/2 overflow-hidden lg:overflow-visible rounded-[3rem] lg:rounded-none">
                <div
                  className="aspect-square overflow-hidden rounded-[3rem] bg-cover bg-center shadow-2xl lg:rotate-3"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0QnQ7vMc3SO2SEmEePqGtfS1dlHzKJ3umoo4mg1j-FkJhH-hX-klGbTyy5gFNkfGV9jYN2W97L_R0nFjHFV-9rmP6u3_Iv_jGimT6HjHqassyUc_pgQC-x3MMDc20jpKHByTLK5W5418Anqj-ULxJ4zSPV89o2AJncw8oAurQvViWAHKh4X3ZFachASTD-4xQ2vrkyfWcKzzahf0qE7YEYqvr3m28U0vC_v2UX6Ay6NeLVk--LsnaRtzET5J19ptLY0CmtSZ13sg')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#e9cece]/40 to-transparent"></div>
                </div>
                <div className="relative mt-4 max-w-[240px] rounded-2xl bg-white p-6 shadow-xl lg:absolute lg:-bottom-8 lg:-left-8">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    <p className="text-sm font-bold">¡Nueva reserva!</p>
                  </div>
                  <p className="text-xs text-[#846262]">
                    Marta García ha reservado &quot;Mantenimiento Gel&quot; para
                    mañana a las 11:00h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="overflow-hidden bg-[#e9cece]/10 px-6 py-24 lg:px-12"
          id="precios"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-16 rounded-[2.5rem] border border-[#e9cece]/20 bg-[#fbf9f9] p-8 shadow-inner lg:flex-row lg:p-16">
              <div className="lg:w-2/5">
                <h2 className="serif-heading mb-6 text-4xl font-medium">
                  Tu negocio, a tu ritmo
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-[#846262]">
                  Olvídate de las interrupciones durante tus servicios. Tu
                  asistente digital se encarga de todo mientras tú te enfocas en
                  el arte.
                </p>

                <ul className="mb-10 space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="text-[#cfaeae]">✔</span>
                    <span className="font-medium">
                      Historial detallado de clientas
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#cfaeae]">✔</span>
                    <span className="font-medium">
                      Recordatorios por email y SMS
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#cfaeae]">✔</span>
                    <span className="font-medium">
                      Galería de trabajos integrada
                    </span>
                  </li>
                </ul>

                <a
                  href="#beneficios"
                  className="inline-block w-full rounded-xl bg-[#e9cece] px-10 py-4 text-center text-base font-bold text-[#2d2424] shadow-xl shadow-[#e9cece]/20 transition-all hover:scale-105 sm:w-auto"
                >
                  Explorar funciones
                </a>
              </div>

              <div className="w-full lg:w-3/5">
                <div className="overflow-hidden rounded-2xl border border-[#e9cece]/30 shadow-2xl">
                  <div className="flex h-10 w-full items-center gap-2 bg-[#f4ecec] px-4">
                    <div className="h-2 w-2 rounded-full bg-[#e9cece]"></div>
                    <div className="h-2 w-2 rounded-full bg-[#e9cece]/60"></div>
                    <div className="h-2 w-2 rounded-full bg-[#e9cece]/30"></div>
                  </div>

                  <div className="grid h-[400px] grid-cols-12 gap-6 bg-white p-6">
                    <div className="col-span-3 hidden border-r border-[#e9cece]/10 pr-4 md:block">
                      <div className="space-y-6">
                        <div className="h-4 w-20 rounded bg-[#e9cece]/20"></div>
                        <div className="space-y-2">
                          <div className="h-3 w-full rounded bg-slate-50"></div>
                          <div className="h-3 w-3/4 rounded bg-slate-50"></div>
                        </div>
                        <div className="h-4 w-24 rounded bg-[#e9cece]/10"></div>
                        <div className="space-y-2">
                          <div className="h-3 w-full rounded bg-slate-50"></div>
                          <div className="h-3 w-1/2 rounded bg-slate-50"></div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-9">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="h-6 w-32 rounded bg-[#e9cece]/20"></div>
                        <div className="flex gap-2">
                          <div className="h-8 w-8 rounded-full bg-slate-100"></div>
                          <div className="h-8 w-8 rounded-full bg-slate-100"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex h-16 items-center justify-between rounded-xl border border-[#e9cece]/20 bg-[#e9cece]/5 p-4">
                          <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-lg bg-[#e9cece]"></div>
                            <div className="space-y-1">
                              <div className="h-3 w-24 rounded bg-slate-200"></div>
                              <div className="h-2 w-16 rounded bg-slate-100"></div>
                            </div>
                          </div>
                          <div className="h-3 w-12 rounded bg-slate-200"></div>
                        </div>

                        <div className="flex h-16 items-center justify-between rounded-xl border border-slate-100 p-4">
                          <div className="flex items-center gap-4 opacity-40">
                            <div className="h-8 w-8 rounded-lg bg-slate-200"></div>
                            <div className="space-y-1">
                              <div className="h-3 w-24 rounded bg-slate-200"></div>
                              <div className="h-2 w-16 rounded bg-slate-100"></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex h-16 items-center justify-between rounded-xl border border-slate-100 p-4">
                          <div className="flex items-center gap-4 opacity-40">
                            <div className="h-8 w-8 rounded-lg bg-slate-200"></div>
                            <div className="space-y-1">
                              <div className="h-3 w-24 rounded bg-slate-200"></div>
                              <div className="h-2 w-16 rounded bg-slate-100"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <AnimateOnScroll>
              <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center">
                {/* Left — Texto */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="serif-heading mb-6 text-4xl leading-tight font-medium md:text-5xl text-[#2d2424]">
                    ¿Lista para elevar tu salón al siguiente nivel?
                  </h2>
                  <p className="mb-8 max-w-lg text-xl text-[#846262]">
                    Únete a profesionales que ya han digitalizado su pasión con
                    elegancia.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row lg:justify-start justify-center">
                    <a
                      href="/registrar"
                      className="rounded-xl bg-[#2d2424] px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 text-center"
                    >
                      Empezar gratis hoy
                    </a>
                    <a
                      href="/login"
                      className="rounded-xl border-2 border-[#e9cece]/40 px-10 py-5 text-lg font-bold text-[#2d2424] transition-all hover:bg-[#e9cece]/10 text-center"
                    >
                      Iniciar sesión
                    </a>
                  </div>
                  <p className="mt-6 text-sm text-[#846262]">
                    Prueba gratuita de 14 días. No se requiere tarjeta de
                    crédito.
                  </p>
                </div>

                {/* Right — Card de precios */}
                <div className="w-full max-w-sm">
                  <div className="rounded-3xl border border-[#e9cece]/30 bg-white p-8 shadow-2xl shadow-[#e9cece]/20 transition-all hover:-translate-y-2 hover:shadow-[#e9cece]/30">
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#e9cece]/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#846262]">
                        ✦ Plan único
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="serif-heading text-5xl font-bold text-[#2d2424]">
                        ₡3,500
                      </p>
                      <p className="mt-1 text-sm text-[#846262]">por mes</p>
                    </div>

                    <ul className="mb-8 space-y-3">
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
                          className="flex items-center gap-3 text-sm text-[#2d2424]"
                        >
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e9cece]/30 text-[#846262] text-xs">
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="/registrar"
                      className="block w-full rounded-xl bg-[#e9cece] px-6 py-4 text-center text-base font-bold text-[#2d2424] shadow-lg shadow-[#e9cece]/20 transition-all hover:scale-105 hover:bg-[#dfc2c2]"
                    >
                      Empezar 14 días gratis
                    </a>

                    <p className="mt-4 text-center text-xs text-[#846262]">
                      Sin tarjeta de crédito requerida
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
        <section className="relative overflow-hidden bg-[#2d2424] px-6 py-24 lg:px-12">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#e9cece]/5 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#e9cece]/5 blur-3xl"></div>

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e9cece]/20">
                <Sparkles className="h-6 w-6 text-[#e9cece]" />
              </div>
            </div>

            <h2 className="serif-heading mb-4 text-4xl font-bold text-white md:text-5xl">
              Próximamente en iOS y Android
            </h2>

            <p
              className="mb-10 text-lg"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Estamos en los últimos detalles. Sé la primera en saber cuándo
              NailFlow esté disponible para descargar.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-white/10 sm:w-auto"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-[#2d2424]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p
                    className="text-[10px] font-medium"
                    style={{ color: "rgba(45,36,36,0.6)" }}
                  >
                    Próximamente en
                  </p>
                  <p className="text-sm font-bold text-[#2d2424]">App Store</p>
                </div>
              </button>

              <button
                type="button"
                style={{ border: "2px solid rgba(255,255,255,0.3)" }}
                className="flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 transition-all duration-200 hover:scale-105 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 sm:w-auto"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.18 23.76c.3.17.64.22.98.14l13.76-7.93-2.95-2.95-11.79 10.74zm-1.76-20.3C1.16 3.9 1 4.37 1 4.9v14.2c0 .53.16 1 .42 1.44l.08.07 7.96-7.96v-.19L1.5 3.39l-.08.07zM21.4 10.38l-2.83-1.63-3.18 3.18 3.18 3.18 2.85-1.64c.81-.47.81-1.22 0-1.69zM4.16.47L17.92 8.4l-2.95 2.95L3.18.61C3.52.53 3.88.59 4.16.47z" />
                </svg>
                <div className="text-left">
                  <p
                    className="text-[10px] font-medium"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    Próximamente en
                  </p>
                  <p className="text-sm font-bold text-white">Google Play</p>
                </div>
              </button>
            </div>

            <p
              className="mt-8 text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Descarga gratuita
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e9cece]/20 bg-[#fbf9f9] px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9cece] text-[#2d2424]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="serif-heading text-lg font-bold">NailFlow</h2>
              </div>
              <p className="text-sm leading-relaxed text-[#846262]">
                La plataforma de gestión definitiva para el sector del nail art
                y la belleza premium.
              </p>
            </div>

            <div>
              <h4 className="mb-6 font-bold">Plataforma</h4>
              <ul className="space-y-4 text-sm text-[#846262]">
                <li>
                  <a
                    className="transition-colors hover:text-[#cfaeae]"
                    href="#beneficios"
                  >
                    Características
                  </a>
                </li>
                <li>
                  <a
                    className="transition-colors hover:text-[#cfaeae]"
                    href="#precios"
                  >
                    Precios
                  </a>
                </li>
                <li>
                  <a
                    className="transition-colors hover:text-[#cfaeae]"
                    href="#como-funciona"
                  >
                    Cómo funciona
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold">Recursos</h4>
              <ul className="space-y-4 text-sm text-[#846262]">
                <li>
                  <a
                    className="transition-colors hover:text-[#cfaeae]"
                    href="#"
                  >
                    Soporte
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold">Síguenos</h4>
              <div className="flex gap-4">
                <a
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ecec] transition-all hover:bg-[#e9cece]"
                  href="https://instagram.com/nailflowapp"
                  target="_blank"
                >
                  <Instagram className="h-5 w-5 text-[#2d2424]" />
                </a>
                <a
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ecec] transition-all hover:bg-[#e9cece]"
                  href="#"
                >
                  <Facebook className="h-5 w-5 text-[#2d2424]" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#e9cece]/10 pt-8 text-xs text-[#846262] md:flex-row">
            <p>© 2026 NailFlow. Todos los derechos reservados.</p>
            <LegalModals />
          </div>
        </div>
      </footer>
    </div>
  );
}
