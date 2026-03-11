export default function RegistroPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#fbf9f9] font-sans text-slate-900">
      <header className="flex w-full items-center justify-between bg-transparent px-6 py-6 lg:px-20">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center text-[#e9cece]">✨</div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">NailFlow</h1>
        </div>

        <div className="hidden sm:block">
          <a
            className="text-sm font-medium text-[#846262] transition-colors hover:text-slate-900"
            href="#"
          >
            Ayuda
          </a>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[520px] rounded-xl border border-[#f0eaea] bg-white p-8 shadow-sm md:p-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight">Crear cuenta</h2>
            <p className="mx-auto max-w-sm text-sm text-[#846262]">
              Crea tu cuenta y comienza a gestionar tus citas en NailFlow.
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="ml-1 text-sm font-semibold text-slate-700">
                Nombre del negocio
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ej. Studio Belleza"
                  className="h-14 w-full rounded-xl border border-[#f0eaea] bg-[#fbf9f9] px-4 text-slate-900 transition-all placeholder:text-[#846262]/50 focus:border-transparent focus:ring-2 focus:ring-[#e9cece] outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-sm font-semibold text-slate-700">
                Nombre de la manicurista
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  className="h-14 w-full rounded-xl border border-[#f0eaea] bg-[#fbf9f9] px-4 text-slate-900 transition-all placeholder:text-[#846262]/50 focus:border-transparent focus:ring-2 focus:ring-[#e9cece] outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-sm font-semibold text-slate-700">
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="h-14 w-full rounded-xl border border-[#f0eaea] bg-[#fbf9f9] px-4 text-slate-900 transition-all placeholder:text-[#846262]/50 focus:border-transparent focus:ring-2 focus:ring-[#e9cece] outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-sm font-semibold text-slate-700">
                Contraseña
              </label>
              <div className="group relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="h-14 w-full rounded-xl border border-[#f0eaea] bg-[#fbf9f9] px-4 text-slate-900 transition-all placeholder:text-[#846262]/50 focus:border-transparent focus:ring-2 focus:ring-[#e9cece] outline-none"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-[#846262]"
                >
                  👁
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 h-14 w-full rounded-xl bg-[#e9cece] font-bold text-slate-800 shadow-md shadow-[#e9cece]/20 transition-all active:scale-[0.98] hover:bg-[#e9cece]/90"
            >
              Crear cuenta
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#846262]">
              ¿Ya tienes cuenta?
              <a
                className="ml-1 font-bold text-slate-900 underline-offset-4 hover:underline"
                href="#"
              >
                Iniciar sesión
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="px-6 py-8 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-[#846262]">
          © 2024 NailFlow Premium SaaS
        </p>
      </footer>

      <div className="pointer-events-none fixed top-0 left-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#e9cece]/10 blur-[120px]"></div>
        <div className="absolute right-[-5%] bottom-[-5%] h-[30%] w-[30%] rounded-full bg-[#e9cece]/15 blur-[100px]"></div>
      </div>
    </div>
  );
}