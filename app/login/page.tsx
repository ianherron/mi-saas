import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server";

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      redirect("/login?error=Credenciales incorrectas");
    }

    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf9f9] font-sans">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-2 text-slate-900">
          <div className="size-6 text-[#e9cece]">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight"><a href="">NailFlow</a></h2>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <div
          className="w-full max-w-[480px] rounded-xl border border-[#e9cece]/10 bg-white p-8 shadow-lg md:p-12"
          style={{ boxShadow: "0 10px 40px -10px rgba(233, 206, 206, 0.3)" }}
        >
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
              Iniciar sesión
            </h1>
            <p className="text-sm leading-relaxed text-slate-500">
              Accede a tu panel para gestionar tus citas y servicios.
            </p>
          </div>

          <form action={login} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Correo electrónico
              </label>
              <input
                name="email"
                type="email"
                placeholder="ejemplo@nailflow.com"
                className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/50"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">
                  Contraseña
                </label>
              </div>

              <div className="group relative">
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/50"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition-colors hover:text-[#e9cece]"
                >
                  👁
                </button>
              </div>

              <div className="mt-2 text-right">
                <a
                  href="#"
                  className="text-xs font-medium text-slate-500 underline decoration-[#e9cece]/30 underline-offset-4 transition-all hover:text-[#e9cece]"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="h-14 w-full rounded-xl bg-[#e9cece] font-bold text-slate-900 shadow-lg shadow-[#e9cece]/20 transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="mt-10 border-t border-slate-100 pt-8 text-center">
            <p className="text-sm text-slate-600">
              ¿No tienes cuenta?
              <a
                href="/registrar"
                className="ml-1 font-bold text-slate-900 transition-colors hover:text-[#e9cece]"
              >
                Crear cuenta
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full p-8 text-center">
        <p className="text-[10px] uppercase tracking-widest text-slate-400">
          © 2026 NailFlow · Software para negocios de belleza
        </p>
      </footer>
    </div>
  );
}