export default function CitasPage() {
  return (
    <div className="min-h-screen bg-[#f7f6f6] font-sans text-slate-900 antialiased">
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e9cece]/20 bg-white px-6 py-4 backdrop-blur-sm md:px-10">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-white">
              ✨
            </div>
            <h2 className="text-xl font-bold tracking-tight">NailFlow</h2>
          </div>

          <div className="h-10 w-10 rounded-full border-2 border-[#e9cece]/30 bg-[#e9cece]/20 flex items-center justify-center">
            <span className="text-sm font-bold text-slate-700">M</span>
          </div>
        </header>

        <main className="flex flex-1 justify-center px-4 py-8 md:px-10">
          <div className="flex max-w-[960px] flex-1 flex-col gap-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tight text-slate-900">
                  Citas
                </h1>
                <p className="text-base font-normal text-slate-500">
                  Aquí puedes ver las citas programadas por tus clientas.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                  <span className="text-[#e9cece]">📅</span>
                  Hoy
                </h2>
                <span className="text-sm text-slate-400">3 citas programadas</span>
              </div>

              <div className="group flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row">
                <div className="flex w-full flex-1 items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#e9cece]/10 bg-[#e9cece]/20 text-lg font-bold text-slate-700">
                    A
                  </div>

                  <div className="flex flex-col">
                    <p className="text-lg font-bold text-slate-900">Ana Rodríguez</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1">⏰ 10:00 AM</span>
                      <span className="flex items-center gap-1">⏱ 90 min</span>
                      <span className="flex items-center gap-1">💅 Acrílicas</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex w-full items-center gap-3 border-t pt-4 sm:mt-0 sm:w-auto sm:border-t-0 sm:pt-0">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e9cece]/10 px-5 h-10 text-sm font-semibold text-slate-900 transition-colors hover:bg-[#e9cece]/20 sm:flex-none">
                    <span>👁</span>
                    Ver
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 h-10 text-sm font-semibold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 sm:flex-none">
                    <span>✕</span>
                    Cancelar
                  </button>
                </div>
              </div>

              <div className="group flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row">
                <div className="flex w-full flex-1 items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#e9cece]/10 bg-[#e9cece]/20 text-lg font-bold text-slate-700">
                    L
                  </div>

                  <div className="flex flex-col">
                    <p className="text-lg font-bold text-slate-900">Laura Gómez</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1">⏰ 12:00 PM</span>
                      <span className="flex items-center gap-1">⏱ 60 min</span>
                      <span className="flex items-center gap-1">💅 Gel</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex w-full items-center gap-3 border-t pt-4 sm:mt-0 sm:w-auto sm:border-t-0 sm:pt-0">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e9cece]/10 px-5 h-10 text-sm font-semibold text-slate-900 transition-colors hover:bg-[#e9cece]/20 sm:flex-none">
                    <span>👁</span>
                    Ver
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 h-10 text-sm font-semibold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 sm:flex-none">
                    <span>✕</span>
                    Cancelar
                  </button>
                </div>
              </div>

              <div className="group flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row">
                <div className="flex w-full flex-1 items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#e9cece]/10 bg-[#e9cece]/20 text-lg font-bold text-slate-700">
                    S
                  </div>

                  <div className="flex flex-col">
                    <p className="text-lg font-bold text-slate-900">Sofía Marín</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1">⏰ 03:00 PM</span>
                      <span className="flex items-center gap-1">⏱ 120 min</span>
                      <span className="flex items-center gap-1">💅 Nail Art</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex w-full items-center gap-3 border-t pt-4 sm:mt-0 sm:w-auto sm:border-t-0 sm:pt-0">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e9cece]/10 px-5 h-10 text-sm font-semibold text-slate-900 transition-colors hover:bg-[#e9cece]/20 sm:flex-none">
                    <span>👁</span>
                    Ver
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 h-10 text-sm font-semibold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 sm:flex-none">
                    <span>✕</span>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}