import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server";
import { Mail, ArrowRight } from "lucide-react";
import AuthSidePanel from "../_components/AuthSidePanel";

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
    <div className="flex min-h-screen w-full bg-[#fbf9f9] font-sans text-[#2d2424]">
      <AuthSidePanel kind="forgot" />

      <main className="flex flex-1 flex-col px-5 py-6 sm:px-10 sm:py-8">
        {/* Mobile-only header */}
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
            href="/login"
            className="text-[13px] text-[#846262] underline decoration-[#e9cece] underline-offset-4 hover:text-[#2d2424]"
          >
            Iniciar sesión
          </a>
        </div>

        {/* Desktop top-right link */}
        <div className="hidden items-center justify-end lg:flex">
          <p className="text-[13px] text-[#846262]">
            ¿Te acordaste?{" "}
            <a
              href="/login"
              className="ml-1 font-semibold text-[#2d2424] underline decoration-[#e9cece] underline-offset-4 hover:opacity-80"
            >
              Iniciar sesión
            </a>
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[380px]">
            {params.sent ? (
              <div className="text-center">
                <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#e9cece] text-[#2d2424]">
                  <Mail className="h-7 w-7" />
                </div>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Correo enviado
                </p>
                <h1 className="serif-heading mt-2.5 text-[36px] font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-4xl">
                  Revisá tu{" "}
                  <em className="font-normal italic text-[#846262]">bandeja</em>.
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-[#846262]">
                  Te enviamos un enlace para restablecer tu contraseña. Si no aparece en unos minutos, revisá la carpeta de spam.
                </p>
                <a
                  href="/login"
                  className="mt-7 inline-block text-sm font-medium text-[#2d2424] underline decoration-[#e9cece] underline-offset-4 hover:opacity-80"
                >
                  ← Volver al login
                </a>
              </div>
            ) : (
              <>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Recuperar contraseña
                </p>
                <h1 className="serif-heading mt-2.5 text-[36px] font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-4xl">
                  Te mandamos un{" "}
                  <em className="font-normal italic text-[#846262]">enlace</em>.
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-[#846262]">
                  Ingresá tu correo y te enviamos un link para restablecerla.
                </p>

                <form action={sendReset} className="mt-8 flex flex-col gap-[18px]">
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
                      required
                      placeholder="tu@email.com"
                      className="h-12 w-full rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2d2424] text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
                  >
                    Enviar enlace
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href="/login"
                    className="text-center text-xs font-medium text-[#846262] underline decoration-[#e9cece] underline-offset-[3px] hover:text-[#2d2424]"
                  >
                    ← Volver al login
                  </a>
                </form>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-[11px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
          © 2026 NailFlow
        </p>
      </main>
    </div>
  );
}
