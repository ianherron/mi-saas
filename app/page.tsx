export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fbf9f9] text-[#2d2424]">
      <header className="fixed top-0 z-50 w-full border-b border-[#e9cece]/20 bg-[#fbf9f9]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <div className="group flex cursor-pointer items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9cece] text-[#2d2424]">
              ✨
            </div>
            <h2 className="text-xl font-bold tracking-tight">NailFlow</h2>
          </div>

          <nav className="hidden items-center gap-10 md:flex">
            <a className="text-sm font-medium transition-colors hover:text-[#cfaeae]" href="#beneficios">
              Beneficios
            </a>
            <a className="text-sm font-medium transition-colors hover:text-[#cfaeae]" href="#como-funciona">
              Cómo funciona
            </a>
            <a className="text-sm font-medium transition-colors hover:text-[#cfaeae]" href="#precios">
              Precios
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden text-sm font-semibold hover:opacity-70 sm:block">
              Ver demo
            </button>
            <button className="rounded-full bg-[#e9cece] px-6 py-2.5 text-sm font-bold text-[#2d2424] shadow-lg shadow-[#e9cece]/20 transition-transform hover:scale-105">
              Crear cuenta
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24">
        <section className="relative px-6 py-16 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col gap-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e9cece]/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#846262]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e9cece] opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e9cece]"></span>
                  </span>
                  Nueva Experiencia Premium
                </div>

                <h1 className="text-5xl leading-[1.1] font-medium md:text-6xl lg:text-7xl">
                  La forma más <span className="italic text-[#cfaeae]">elegante</span> de gestionar tus citas
                </h1>

                <p className="max-w-lg text-lg leading-relaxed text-[#846262]">
                  NailFlow es la plataforma de gestión diseñada exclusivamente para técnicos de uñas que buscan excelencia, simplicidad y una imagen de marca impecable.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button className="rounded-xl bg-[#e9cece] px-8 py-4 text-base font-bold text-[#2d2424] shadow-xl shadow-[#e9cece]/20 transition-all hover:bg-[#dfc2c2]">
                    Comenzar ahora
                  </button>
                  <button className="flex items-center gap-2 rounded-xl bg-[#f4ecec] px-8 py-4 text-base font-bold text-[#2d2424] transition-all hover:bg-[#eadede]">
                    ▶ Ver Demo
                  </button>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-3">
                    <div
                      className="h-10 w-10 rounded-full border-2 border-[#fbf9f9] bg-slate-200 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcT4WPJD64pAvuSO3f60vjO1tHHA8SXraVJNL07ef5dHQIXjKuA8d2oqi8LaAzJHHHM3kQPtEA6TW7Kt9R9Zz4Dl0iLCkZSmh9qlZH1KrsgSy4j3SLA5Cd-5hygOx-IgfWgdF_vR7axMc4uiJ_w-lid4RKOQoX7vWHGHgIguEjYsdD7J_WWsNeqO8jXPWSSk-36HMsm6lc8GtifZXk6itpDIJ8GdVXEZ-WkJ7c2H2LFpNIiMogdZaVBx4q7kigzZFYD2SkFuH1ar0')",
                      }}
                    />
                    <div
                      className="h-10 w-10 rounded-full border-2 border-[#fbf9f9] bg-slate-300 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvIamuztbnDWhG9KdxFHYYdVxvN6XXgsbv0E8FTEhU3-WyA5h8Lcrs5QswCu2edT6EidZQv7Raze-rks8uN3iDxhYmKfcRe0lkiQm8NrTHDqqsfQOL8A3oR2B9oDrxw8JdWqoJnI8dRAn6Hqtn4mgNzsgsvFpSegnV54c5NDEHbcfOE19yPFAbv05RGsSBAu3SEgwCgO6cmAFnd78VxfUokbLI86_QIIhKQu22tPeczHmx-ooQ1_EvydO7mrMtEPN2UdytNZVw7JA')",
                      }}
                    />
                    <div
                      className="h-10 w-10 rounded-full border-2 border-[#fbf9f9] bg-slate-400 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8chES0TXcET_eMbl70hJisxjrcSS3ALV4shfu68xgPPg2CBj8sDTFOXe7EIApgA3RwVJr6zhUB7yPpT6ANwaKUqx-dFzv7ya5p36kyuM8cnoJz0_VfrEcto9fy6EFH5QOit7Gf0tWL_beEDAW0xUDnNvQiTciUchZKnf_xBcLC9KZg8OTCheFT7htmfFx01p5vXyGndaIdYfvbj102BAStMglCEW_5um-dTRit_0wlVLxkxjt7X1NK5Y2EsamVoRt_Xv_QoxihFk')",
                      }}
                    />
                  </div>
                  <p className="text-sm font-medium text-[#846262]">+500 técnicos ya confían en NailFlow</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-[#e9cece]/10 blur-3xl"></div>

                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/40 shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center justify-between border-b border-[#e9cece]/10 bg-white/60 px-6 py-4">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-[#ff5f57]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#febc2e]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#28c840]"></div>
                    </div>
                    <div className="text-xs font-medium text-[#846262]">nailflow.app/tu-salon</div>
                    <div className="w-12"></div>
                  </div>

                  <div className="p-4 sm:p-8">
                    <div className="grid grid-cols-7 gap-2">
                      <div className="col-span-7 mb-4 flex items-center justify-between">
                        <h3 className="font-bold">Agenda Semanal</h3>
                        <span className="text-[#846262]">📅</span>
                      </div>

                      <div className="flex h-24 flex-col justify-between rounded-lg bg-[#e9cece]/30 p-2">
                        <span className="text-[10px] font-bold">LUN</span>
                        <div className="h-1 w-full rounded-full bg-white/50"></div>
                      </div>
                      <div className="flex h-24 flex-col justify-between rounded-lg bg-[#e9cece]/10 p-2">
                        <span className="text-[10px] font-bold">MAR</span>
                        <div className="h-1 w-full rounded-full bg-white/50"></div>
                      </div>
                      <div className="flex h-24 flex-col justify-between rounded-lg bg-[#e9cece]/40 p-2">
                        <span className="text-[10px] font-bold">MIE</span>
                        <div className="h-1 w-full rounded-full bg-white/50"></div>
                      </div>
                      <div className="flex h-24 scale-105 flex-col justify-between rounded-lg border-2 border-white bg-[#e9cece]/60 p-2 shadow-lg">
                        <span className="text-[10px] font-bold">JUE</span>
                        <div className="h-1 w-full rounded-full bg-white/50"></div>
                      </div>
                      <div className="flex h-24 flex-col justify-between rounded-lg bg-[#e9cece]/20 p-2">
                        <span className="text-[10px] font-bold">VIE</span>
                        <div className="h-1 w-full rounded-full bg-white/50"></div>
                      </div>
                      <div className="flex h-24 flex-col justify-between rounded-lg bg-[#f4ecec] p-2 opacity-50">
                        <span className="text-[10px] font-bold">SAB</span>
                      </div>
                      <div className="flex h-24 flex-col justify-between rounded-lg bg-[#f4ecec] p-2 opacity-50">
                        <span className="text-[10px] font-bold">DOM</span>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3">
                      <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9cece]/20">
                            👤
                          </div>
                          <div>
                            <p className="text-sm font-bold">Elena Rodriguez</p>
                            <p className="text-xs text-[#846262]">Nail Art - 14:00h</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold text-green-700">
                          Confirmado
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9cece]/20">
                            👤
                          </div>
                          <div>
                            <p className="text-sm font-bold">Sofía Marín</p>
                            <p className="text-xs text-[#846262]">Acrílicas - 15:30h</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-[#e9cece]/30 px-3 py-1 text-[10px] font-bold text-[#846262]">
                          Pendiente
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f4ecec]/50 px-6 py-24 lg:px-12" id="beneficios">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-medium md:text-5xl">Diseñado para la excelencia</h2>
              <p className="mt-4 text-[#846262]">
                Herramientas que transforman la gestión de tu negocio en una experiencia premium.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9cece]/20 transition-colors group-hover:bg-[#e9cece]">
                  📆
                </div>
                <h3 className="mb-3 text-xl font-bold">Gestión inteligente</h3>
                <p className="text-[#846262]">
                  Organiza tu agenda de manera fluida, evita solapamientos y gestiona tiempos de descanso automáticamente.
                </p>
              </div>

              <div className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9cece]/20 transition-colors group-hover:bg-[#e9cece]">
                  🌐
                </div>
                <h3 className="mb-3 text-xl font-bold">Reservas 24/7</h3>
                <p className="text-[#846262]">
                  Tus clientas pueden reservar en cualquier momento desde su móvil. Menos WhatsApps, más citas confirmadas.
                </p>
              </div>

              <div className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9cece]/20 transition-colors group-hover:bg-[#e9cece]">
                  📊
                </div>
                <h3 className="mb-3 text-xl font-bold">Control total</h3>
                <p className="text-[#846262]">
                  Define precios exactos por servicio, visualiza tus ingresos y analiza tu productividad con reportes elegantes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 lg:px-12" id="como-funciona">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-16 lg:flex-row">
              <div className="lg:w-1/2">
                <h2 className="mb-12 text-4xl font-medium md:text-5xl">Tu salón digital en 3 pasos</h2>

                <div className="space-y-12">
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9cece] font-bold text-[#2d2424]">
                      1
                    </div>
                    <div>
                      <h4 className="mb-2 text-xl font-bold">Configura tus servicios</h4>
                      <p className="text-[#846262]">
                        Añade tus tratamientos, define su duración, precio y personaliza los días que estarás disponible.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9cece] font-bold text-[#2d2424]">
                      2
                    </div>
                    <div>
                      <h4 className="mb-2 text-xl font-bold">Comparte tu enlace</h4>
                      <p className="text-[#846262]">
                        Incluye tu link personalizado en tu biografía de Instagram, TikTok o envíalo por WhatsApp a tus clientas.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9cece] font-bold text-[#2d2424]">
                      3
                    </div>
                    <div>
                      <h4 className="mb-2 text-xl font-bold">Recibe citas automáticamente</h4>
                      <p className="text-[#846262]">
                        Las citas aparecerán en tu calendario y ambas recibirán notificaciones de confirmación al instante.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative lg:w-1/2">
                <div
                  className="aspect-square overflow-hidden rounded-[3rem] bg-cover bg-center shadow-2xl"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0QnQ7vMc3SO2SEmEePqGtfS1dlHzKJ3umoo4mg1j-FkJhH-hX-klGbTyy5gFNkfGV9jYN2W97L_R0nFjHFV-9rmP6u3_Iv_jGimT6HjHqassyUc_pgQC-x3MMDc20jpKHByTLK5W5418Anqj-ULxJ4zSPV89o2AJncw8oAurQvViWAHKh4X3ZFachASTD-4xQ2vrkyfWcKzzahf0qE7YEYqvr3m28U0vC_v2UX6Ay6NeLVk--LsnaRtzET5J19ptLY0CmtSZ13sg')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#e9cece]/40 to-transparent"></div>
                </div>

                <div className="absolute -bottom-8 -left-8 max-w-[240px] rounded-2xl bg-white p-6 shadow-xl">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    <p className="text-sm font-bold">¡Nueva reserva!</p>
                  </div>
                  <p className="text-xs text-[#846262]">
                    Marta García ha reservado &quot;Mantenimiento Gel&quot; para mañana a las 11:00h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#e9cece]/10 px-6 py-24 lg:px-12" id="precios">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-16 rounded-[2.5rem] border border-[#e9cece]/20 bg-[#fbf9f9] p-8 shadow-inner lg:flex-row lg:p-16">
              <div className="lg:w-2/5">
                <h2 className="mb-6 text-4xl font-medium">Tu negocio, a tu ritmo</h2>
                <p className="mb-8 text-lg leading-relaxed text-[#846262]">
                  Olvídate de las interrupciones durante tus servicios. Tu asistente digital se encarga de todo mientras tú te enfocas en el arte.
                </p>

                <ul className="mb-10 space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="text-[#cfaeae]">✔</span>
                    <span className="font-medium">Historial detallado de clientas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#cfaeae]">✔</span>
                    <span className="font-medium">Recordatorios por email y SMS</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#cfaeae]">✔</span>
                    <span className="font-medium">Galería de trabajos integrada</span>
                  </li>
                </ul>

                <button className="w-full rounded-xl bg-[#e9cece] px-10 py-4 text-base font-bold text-[#2d2424] shadow-xl shadow-[#e9cece]/20 transition-all hover:scale-105 sm:w-auto">
                  Explorar funciones
                </button>
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
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-4xl leading-tight font-medium md:text-6xl">
              ¿Lista para elevar tu salón al siguiente nivel?
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-[#846262]">
              Únete a cientos de profesionales que ya han digitalizado su pasión con elegancia.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-xl bg-[#2d2424] px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105">
                Empezar gratis hoy
              </button>
              <button className="rounded-xl border-2 border-[#e9cece]/40 px-10 py-5 text-lg font-bold text-[#2d2424] transition-all hover:bg-[#e9cece]/10">
                Contactar ventas
              </button>
            </div>

            <p className="mt-8 text-sm text-[#846262]">
              Prueba gratuita de 14 días. No se requiere tarjeta de crédito.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e9cece]/20 bg-[#fbf9f9] px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
                  ✨
                </div>
                <h2 className="text-lg font-bold">NailFlow</h2>
              </div>
              <p className="text-sm leading-relaxed text-[#846262]">
                La plataforma de gestión definitiva para el sector del nail art y la belleza premium.
              </p>
            </div>

            <div>
              <h4 className="mb-6 font-bold">Plataforma</h4>
              <ul className="space-y-4 text-sm text-[#846262]">
                <li><a className="transition-colors hover:text-[#cfaeae]" href="#">Características</a></li>
                <li><a className="transition-colors hover:text-[#cfaeae]" href="#">Precios</a></li>
                <li><a className="transition-colors hover:text-[#cfaeae]" href="#">App móvil</a></li>
                <li><a className="transition-colors hover:text-[#cfaeae]" href="#">Integraciones</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold">Recursos</h4>
              <ul className="space-y-4 text-sm text-[#846262]">
                <li><a className="transition-colors hover:text-[#cfaeae]" href="#">Blog</a></li>
                <li><a className="transition-colors hover:text-[#cfaeae]" href="#">Guía para salones</a></li>
                <li><a className="transition-colors hover:text-[#cfaeae]" href="#">Centro de ayuda</a></li>
                <li><a className="transition-colors hover:text-[#cfaeae]" href="#">Soporte</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold">Síguenos</h4>
              <div className="flex gap-4">
                <a className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ecec] transition-all hover:bg-[#e9cece]" href="#">
                  📷
                </a>
                <a className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ecec] transition-all hover:bg-[#e9cece]" href="#">
                  ↗
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#e9cece]/10 pt-8 text-xs text-[#846262] md:flex-row">
            <p>© 2024 NailFlow. Todos los derechos reservados.</p>
            <div className="flex gap-8">
              <a className="transition-colors hover:text-[#cfaeae]" href="#">Términos y condiciones</a>
              <a className="transition-colors hover:text-[#cfaeae]" href="#">Privacidad</a>
              <a className="transition-colors hover:text-[#cfaeae]" href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}