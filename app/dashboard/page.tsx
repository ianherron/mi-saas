export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf9] font-sans text-[#2d2926]">
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#f2d4d7]/20 bg-white/50 px-6 py-4 backdrop-blur-md lg:px-20">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#2d2926] text-[#f2d4d7]">
              ✨
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#2d2926]">
              NailFlow
            </h2>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="hidden gap-2 md:flex">
              <button className="flex size-10 items-center justify-center rounded-full bg-[#f2d4d7]/20 text-[#2d2926] transition-colors hover:bg-[#f2d4d7]/40">
                🔔
              </button>
              <button className="flex size-10 items-center justify-center rounded-full bg-[#f2d4d7]/20 text-[#2d2926] transition-colors hover:bg-[#f2d4d7]/40">
                ⚙️
              </button>
            </div>

            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#f2d4d7] shadow-sm">
              <img
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcVffW3M3JNlCr43uXHqd4sh77mbBkBxXd7uR9OgxcDec9YlVJq1QwQz-TQP0u4IkBRcxpsJ0wVjvJSXmQsAjj4JUmRblafdxFFA1EJBTMLDDPBgfcYlU5Aia6dHLMYh98JVYzUy7gYZmZgeihW8-H6Fk9pjL38OSwzWzcgvh_I1hZRtc34SCINv7DapdoJmH0qKRiuogrEb1SFO-ai6_zEaZfEDBTPESMBZe6xBH9kHC6ie18xlBH99K0IJi6KRpm8hvFr7PnJEo"
                alt="Perfil de la manicurista María sonriendo"
              />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="mb-10">
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-[#2d2926]">
              Bienvenida, María
            </h1>
            <p className="text-lg text-slate-500">
              Aquí tienes un resumen de tu agenda de hoy.
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#f2d4d7]/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl text-[#f2d4d7]">📅</span>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Citas de hoy
                </p>
              </div>
              <p className="text-4xl font-bold tracking-tight text-[#2d2926]">4</p>
            </div>

            <div className="rounded-xl border border-[#f2d4d7]/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl text-[#f2d4d7]">💅</span>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Servicios activos
                </p>
              </div>
              <p className="text-4xl font-bold tracking-tight text-[#2d2926]">6</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="px-2">
                <h2 className="text-xl font-bold text-[#2d2926]">Próximas citas</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-[#f2d4d7]/10 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-[#f2d4d7]/30">
                      <img
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhRlCiqo8XYdJF2u-rzKeXii9LXxFHnTQDQgeccopaRBieuldogEzNVNTfsRW0f5g6EKjYzGC9Ngh8T3oBlK3k30WEd54pCMAVirBazYoJuSrPGeajhp2NiblDCar1Ng5sigIBZEeXC_ZVF3wEwX326gMKfL2086sBLbiGtnUlwWY5aqM7IDAnJLTM9KI5f_IQlq6kJSsWnLWn5pctMcpB436ZFBDvn7KNGXbnACvTdGRKBDqGGOhkMv2OirXBrZ5TI3x7dgGahFE"
                        alt="Avatar cliente Elena"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2d2926]">Elena Rodríguez</p>
                      <p className="text-sm text-slate-500">Acrílicas — 10:00 AM</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-600">
                    Confirmada
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#f2d4d7]/10 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-[#f2d4d7]/30">
                      <img
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpqISCLpMECVbQ-a429ESezoUD9LRSP8eEC_8-O8uKaO-zOlNaRYvq0hzRBwKI-dGoM9YoeOQdcUx_R4Qu6dJfJixy4XeR-KaoYZ8HzJcJ2Tja7aoqGQK7aKKxni3zPVz3Ub7H3P9vbqNIsJPal-oSm96KWbIfF-G1xjb2aLlUCSlve1Bbcf9h3fPzimepW3MqCIERfZm-mgJSSz2FbMerWibCCtZpO5DQs2jUo8S3ocreZ0Pt0xe3rDNL4FwQhMKDoj-Xk7h0CJw"
                        alt="Avatar cliente Sofía"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2d2926]">Sofía Marín</p>
                      <p className="text-sm text-slate-500">Gel — 12:30 PM</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-500">
                    Pendiente
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#f2d4d7]/10 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-[#f2d4d7]/30">
                      <img
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk9jEBNcsGgVSseUegiVOm7fYY47GN_e7WYN2SuTKU8L21St7FrXKzuwrSbfcl5L1IVhsxwJqypQvC9cgKhzx8Qs74m8brpoMTKB8Sz40cLUq_hYYuLRVv92GlAej2aNe_DQqOobxCCh3l2jXJHQPr5YUAF6IpcikwCipz1j-V-GSY3jtV1h6zN1J3FreNDL00vk2fVG83xhCatm1zH-2z9BiCgx_7NSvldrC9gFot0AL0SvnH7h88YX_YhICMXmBOQ43sOJKOzAA"
                        alt="Avatar cliente Andrea"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2d2926]">Andrea López</p>
                      <p className="text-sm text-slate-500">Nail Art — 3:00 PM</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-600">
                    Confirmada
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="mb-6 px-2 text-xl font-bold text-[#2d2926]">
                  Acciones rápidas
                </h2>

                <div className="space-y-3">
                  <button className="flex w-full items-center justify-between rounded-xl bg-[#f2d4d7] px-5 py-4 font-bold text-[#2d2926] shadow-sm transition-all hover:bg-[#efc8cd]">
                    <span>Gestionar servicios</span>
                    <span>📝</span>
                  </button>

                  <button className="flex w-full items-center justify-between rounded-xl border border-[#f2d4d7]/20 bg-white px-5 py-4 font-bold text-[#2d2926] shadow-sm transition-all hover:bg-[#f2d4d7]/10">
                    <span>Ver todas las citas</span>
                    <span>📋</span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-[#f2d4d7]/30 bg-[#f2d4d7]/20 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-[#2d2926]">🔗</span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#2d2926]/70">
                    Tu enlace de reservas
                  </p>
                </div>

                <p className="mb-4 truncate text-sm font-medium italic text-[#2d2926]">
                  nailflow.app/reservar/maria-nails
                </p>

                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#f2d4d7]/20 bg-white/80 py-3 text-xs font-bold text-[#2d2926] transition-colors hover:bg-white">
                  <span>📋</span>
                  Copiar enlace
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-auto px-6 py-10 text-center">
          <p className="text-sm text-slate-400">
            © 2024 NailFlow — El aliado perfecto para tu salón
          </p>
        </footer>
      </div>
    </div>
  );
}