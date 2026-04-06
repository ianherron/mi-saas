import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const params = await searchParams;

  async function sendReset(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    if (!email) return;
    const supabase = await createClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://nailflow.app/reset-password",
    });
    redirect("/forgot-password?sent=true");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf9f9] font-sans">
      <header
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-8"
        style={{
          paddingTop: "max(2rem, calc(env(safe-area-inset-top) + 1rem))",
        }}
      >
        <div className="flex items-center gap-2 text-slate-900">
          <div className="size-6 text-[#e9cece]">
            <svg
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight">NailFlow</h2>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <div
          className="w-full max-w-[480px] rounded-xl border border-[#e9cece]/10 bg-white p-8 shadow-lg md:p-12"
          style={{ boxShadow: "0 10px 40px -10px rgba(233, 206, 206, 0.3)" }}
        >
          {params.sent ? (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-[#e9cece]/30 text-2xl">
                  ✓
                </div>
              </div>
              <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">
                Correo enviado
              </h1>
              <p className="mb-8 text-sm text-slate-500">
                Te enviamos un enlace para restablecer tu contraseña. Revisa tu
                bandeja de entrada.
              </p>

              <a
                href="/login"
                className="text-sm font-medium text-[#e9cece] hover:opacity-80"
              >
                ← Volver al login
              </a>
            </div>
          ) : (
            <>
              <div className="mb-10 text-center">
                <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
                  ¿Olvidaste tu contraseña?
                </h1>
                <p className="text-sm leading-relaxed text-slate-500">
                  Ingresa tu correo y te enviaremos un enlace para
                  restablecerla.
                </p>
              </div>

              <form action={sendReset} className="space-y-6">
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

                <button
                  type="submit"
                  className="h-14 w-full rounded-xl bg-[#e9cece] font-bold text-slate-900 shadow-lg shadow-[#e9cece]/20 transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  Enviar enlace
                </button>
              </form>

              <div className="mt-8 text-center">
                <a
                  href="/login"
                  className="text-sm font-medium text-slate-500 hover:text-[#e9cece]"
                >
                  ← Volver al login
                </a>
              </div>
            </>
          )}
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