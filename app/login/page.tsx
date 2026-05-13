import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server";
import { ArrowRight } from "lucide-react";
import AuthSidePanel from "../_components/AuthSidePanel";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reset?: string }>;
}) {
  const params = await searchParams;

  async function login(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) redirect("/login?error=Credenciales incorrectas");
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen w-full bg-[#fbf9f9] font-sans text-[#2d2424]">
      <AuthSidePanel kind="login" />

      <main className="flex flex-1 flex-col px-5 py-6 sm:px-10 sm:py-8">
        {/* Mobile-only logo */}
        <div className="mb-8 flex items-center justify-between lg:hidden">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base leading-none text-[#e9cece]">
              ✦
            </div>
            <span className="serif-heading text-lg font-medium tracking-tight">
              NailFlow
            </span>
          </a>
          <a
            href="/registrar"
            className="text-[13px] text-[#846262] underline decoration-[#e9cece] underline-offset-4 hover:text-[#2d2424]"
          >
            Crear cuenta
          </a>
        </div>

        {/* Desktop top-right link */}
        <div className="hidden items-center justify-end lg:flex">
          <p className="text-[13px] text-[#846262]">
            ¿No tenés cuenta?{" "}
            <a
              href="/registrar"
              className="ml-1 font-semibold text-[#2d2424] underline decoration-[#e9cece] underline-offset-4 hover:opacity-80"
            >
              Crear cuenta
            </a>
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[380px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
              Iniciar sesión
            </p>
            <h1 className="serif-heading mt-2.5 text-[36px] font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-4xl">
              Buenas,{" "}
              <em className="font-normal italic text-[#846262]">de vuelta</em>.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#846262]">
              Tu dashboard te está esperando.
            </p>

            {params.error && (
              <div className="mt-6 rounded-xl bg-[#b86060]/10 px-4 py-3 text-sm text-[#b86060]">
                {params.error}
              </div>
            )}
            {params.reset && (
              <div className="mt-6 rounded-xl bg-[#6b8a5e]/10 px-4 py-3 text-sm text-[#6b8a5e]">
                Te enviamos un correo para restablecer tu contraseña.
              </div>
            )}

            <form
              action={login}
              className="mt-8 flex flex-col gap-[18px]"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="h-12 w-full rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 w-full rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
                />
                <a
                  href="/forgot-password"
                  className="mt-2 inline-block text-xs font-medium text-[#846262] underline decoration-[#e9cece] underline-offset-[3px] hover:text-[#2d2424]"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2d2424] text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
              >
                Iniciar sesión
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-[11px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
          © 2026 NailFlow
        </p>
      </main>
    </div>
  );
}
