export default function ReservarPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f7f6f6] text-slate-900">
      <div className="flex h-full grow flex-col">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e9cece]/20 bg-white/50 px-6 py-4 backdrop-blur-md md:px-20 lg:px-40">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="text-[#e9cece]">✦</div>
            <h1 className="text-xl font-bold tracking-tight">NailFlow</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right md:block">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Estudio de lujo
              </p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full border border-[#e9cece]/30 bg-[#e9cece]/20">
              <span className="text-[#e9cece]">👤</span>
            </div>
          </div>
        </header>

        <main className="flex flex-1 justify-center px-4 py-8 md:px-0">
          <div className="flex w-full max-w-[800px] flex-col gap-10">
            <div className="flex flex-col gap-2 px-4">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">
                Reserva tu cita
              </h2>
              <p className="text-slate-500">
                Disfruta una experiencia premium de cuidado de uñas adaptada a tu estilo.
              </p>
            </div>

            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece] text-sm font-bold text-slate-900">
                  1
                </span>
                <h3 className="text-xl font-bold">Selecciona el servicio</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
                <div className="group relative flex cursor-pointer flex-col gap-3 rounded-xl border-2 border-[#e9cece] bg-white p-4 shadow-sm transition-all hover:shadow-md">
                  <div className="absolute top-4 right-4 text-[#e9cece]">✓</div>
                  <div
                    className="h-40 w-full rounded-lg bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDClFQUFJE0UXYOr6tT4rC1CgXpy2OdVlkvbHlf9j9t5UrR5mp6LcfeEPxo1C0rZCEuYgjDkfwOv1OIKVo1tmn8IJQgKGykvgV4opMelN27cPPDYGQGzUIhh8v9Z_54rrzUNLk5PeDI-VnZxgnuwku82IGwcdODVSEXeHRXA4hIrviIAI9X8Ub1haScOe8PS6GvRD_CzFInHP5U1usp7R0VUEji3rwzFzPyjLvZQJbKl0ME_Qx-xhEIOnE3y0WcOzqEyYy1d0txzTM")',
                    }}
                  />
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold">Uñas acrílicas</p>
                      <p className="text-sm text-slate-500">90 min • Set completo</p>
                    </div>
                    <p className="text-xl font-bold text-[#e9cece]">₡65</p>
                  </div>
                </div>

                <div className="group relative flex cursor-pointer flex-col gap-3 rounded-xl border-2 border-transparent bg-white p-4 shadow-sm transition-all hover:border-[#e9cece]/50">
                  <div
                    className="h-40 w-full rounded-lg bg-cover bg-center bg-no-repeat opacity-80"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuClfFJ8lWHmYzWOsi8xHcPWUnZpLpGtoXP-cTUE_zpJHwc7xiv5iuuycBZOBlfYQNIkLegR-5jYUn0KQb0TcGV3Tk_XjYimk_lNi5Av8OY7yRaS7au-lHRlC-N9iUL-cqFxlo8lL_0DvVjl1pmLu2yikzN2lm906mThDSU4PL0Q-SoEYnEVDBRHGkNo51sivzwjMQkAyqjlWjnKhAoLGG3p5komDi5LJNpopirR9B4JP71XCH4oWsnYYL6YjwkVMSbJSzyLzlVEYmQ")',
                    }}
                  />
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold">Manicure en gel</p>
                      <p className="text-sm text-slate-500">60 min • Larga duración</p>
                    </div>
                    <p className="text-xl font-bold">₡45</p>
                  </div>
                </div>

                <div className="group relative flex cursor-pointer flex-col gap-3 rounded-xl border-2 border-transparent bg-white p-4 shadow-sm transition-all hover:border-[#e9cece]/50">
                  <div
                    className="h-40 w-full rounded-lg bg-cover bg-center bg-no-repeat opacity-80"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBq2REvhIbC0TYENJ6Vd58YhWjSu_evCq7or9bXti4W_3Sc7LeWb656nAEbFZNGDpG6ijlD8bltFn1cYLZftwsEushrIYuNzfaGKq6kGEr6-QMBPJv2-N-VV05Mh288XPcAHXNH4yb8xr9otc6x3ceo0GRPdFmg6AQUb57Cq-d8a0xrMIJ1jdrkKd8n-N0BwSBo54HcFL4khx8aD481hGgcYOwee9j0uS4_Z5f-7t314TyDFLSCtefKIEZlDudd0wf7jBKRgxr_8L8")',
                    }}
                  />
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold">Mantenimiento</p>
                      <p className="text-sm text-slate-500">45 min • Relleno</p>
                    </div>
                    <p className="text-xl font-bold">₡30</p>
                  </div>
                </div>

                <div className="group relative flex cursor-pointer flex-col gap-3 rounded-xl border-2 border-transparent bg-white p-4 shadow-sm transition-all hover:border-[#e9cece]/50">
                  <div
                    className="h-40 w-full rounded-lg bg-cover bg-center bg-no-repeat opacity-80"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9i-AKy9BNb178pl1UpdDFm0HcMlmEwIrKUmD5g-T3zoF5_Q7RJ_P3O1Kd9dFcVefLfomsR3iScaowPhR2UBjb4Y4A8qWjMfhknVJjoHUMVNOcch0MC8VThKgAhM0hzhCPF7tD6szuGVRxRy3Sc5yvJYicHSatOynNND2tqLF60pLVSWBueJ_Ogb2zoYSTxII5pmKfLZ5N89WTCan95ovIrLHPguctJzkkTejCN6OCl65hx71ucq-GpHVnNhA4ha4rLjFwT73B8cs")',
                    }}
                  />
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold">Nail art</p>
                      <p className="text-sm text-slate-500">120 min • Personalizado</p>
                    </div>
                    <p className="text-xl font-bold">₡85</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-4 px-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece]/30 text-sm font-bold text-slate-900">
                  2
                </span>
                <h3 className="text-xl font-bold">Extras opcionales</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-full border border-[#e9cece] bg-[#e9cece]/10 px-4 py-2 text-slate-900 transition-colors">
                  <span className="text-sm">+</span>
                  <span className="text-sm font-medium">Retiro (+30 min)</span>
                </button>

                <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 transition-colors hover:border-[#e9cece]">
                  <span className="text-sm">+</span>
                  <span className="text-sm font-medium">Diseño (+20 min)</span>
                </button>

                <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 transition-colors hover:border-[#e9cece]">
                  <span className="text-sm">+</span>
                  <span className="text-sm font-medium">Arte complejo (+60 min)</span>
                </button>
              </div>
            </section>

            <section className="flex flex-col gap-4 px-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece]/30 text-sm font-bold text-slate-900">
                  3
                </span>
                <h3 className="text-xl font-bold">Selecciona la hora</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <button className="rounded-lg border-2 border-[#e9cece] bg-[#e9cece]/5 py-3 font-bold text-slate-900">
                  10:00
                </button>
                <button className="rounded-lg border border-slate-200 py-3 transition-colors hover:border-[#e9cece]">
                  11:30
                </button>
                <button className="rounded-lg border border-slate-200 py-3 transition-colors hover:border-[#e9cece]">
                  13:00
                </button>
                <button className="rounded-lg border border-slate-200 py-3 transition-colors hover:border-[#e9cece]">
                  15:00
                </button>
              </div>
            </section>

            <section className="px-4">
              <div className="rounded-xl border border-[#e9cece]/30 bg-white p-6 shadow-sm ring-1 ring-[#e9cece]/10">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#e9cece]/20">
                      <span className="text-[#e9cece]">📅</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                        Cita seleccionada
                      </p>
                      <p className="text-lg font-bold">Uñas acrílicas + Retiro</p>
                    </div>
                  </div>

                  <div className="flex w-full gap-8 border-t border-slate-100 pt-4 md:w-auto md:border-t-0 md:border-l md:pt-0 md:pl-8">
                    <div>
                      <p className="text-xs uppercase text-slate-500">Duración</p>
                      <p className="text-lg font-bold">120 min</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-slate-500">Precio total</p>
                      <p className="text-lg font-bold text-[#e9cece]">₡65</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-6 px-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece]/30 text-sm font-bold text-slate-900">
                  4
                </span>
                <h3 className="text-xl font-bold">Información del cliente</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-600">
                    Nombre completo
                  </label>
                  <input
                    className="rounded-lg border border-slate-200 bg-white py-3 focus:border-[#e9cece] focus:ring-[#e9cece]"
                    placeholder="Jane Doe"
                    type="text"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-600">
                    Número de teléfono
                  </label>
                  <input
                    className="rounded-lg border border-slate-200 bg-white py-3 focus:border-[#e9cece] focus:ring-[#e9cece]"
                    placeholder="+506 6000 0000"
                    type="tel"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-600">
                    Correo electrónico
                  </label>
                  <input
                    className="rounded-lg border border-slate-200 bg-white py-3 focus:border-[#e9cece] focus:ring-[#e9cece]"
                    placeholder="jane@example.com"
                    type="email"
                  />
                </div>
              </div>
            </section>

            <div className="px-4 pb-20">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e9cece] py-5 text-lg font-bold text-slate-900 shadow-lg shadow-[#e9cece]/20 transition-all hover:bg-[#e0c2c2]">
                <span>Confirmar cita</span>
                <span>→</span>
              </button>
              <p className="mt-4 text-center text-xs text-slate-400">
                Al confirmar, aceptas nuestros términos y condiciones de reserva.
              </p>
            </div>
          </div>
        </main>

        <footer className="mt-auto border-t border-slate-200 bg-white px-4 py-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <span>✦</span>
              <span className="font-bold">NailFlow</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2024 NailFlow Premium Studio. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}