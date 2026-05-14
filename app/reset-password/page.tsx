"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

function SidePanelClient() {
  return (
    <aside className="relative hidden flex-col overflow-hidden bg-[#2d2424] px-10 py-12 text-[#fbf9f9] lg:flex lg:w-[480px] lg:flex-none xl:w-[540px]">
      <span
        aria-hidden
        className="serif-heading pointer-events-none absolute -right-16 -top-20 text-[480px] leading-none text-[#e9cece]/[0.08]"
      >
        ✦
      </span>
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#e9cece] text-base leading-none text-[#2d2424]">
          ✦
        </div>
        <span className="serif-heading text-lg font-medium tracking-tight">
          NailFlow
        </span>
      </div>
      <div className="relative z-10 my-auto max-w-[420px]">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
          Nueva contraseña
        </p>
        <h2 className="serif-heading mt-3.5 text-5xl font-medium leading-[1.05] tracking-tight text-[#fbf9f9]">
          Casi
          <br />
          <em className="font-normal italic text-[#e9cece]">lista</em>.
        </h2>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-[#fbf9f9]/70">
          Elegí una contraseña nueva y volvé al dashboard.
        </p>
      </div>
      <p className="relative z-10 text-[11px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
        ✦ Hecho en Costa Rica
      </p>
    </aside>
  );
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );
    const { error: err } = await supabase.auth.updateUser({ password });
    if (err) {
      setError("Error al actualizar la contraseña. Intentá de nuevo.");
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push("/dashboard"), 2000);
  }

  return (
    <div className="flex min-h-screen w-full bg-[#fbf9f9] font-sans text-[#2d2424]">
      <SidePanelClient />

      <main className="flex flex-1 flex-col px-5 py-6 sm:px-10 sm:py-8">
        <div className="mb-8 flex items-center justify-between lg:hidden">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base leading-none text-[#e9cece]">
              ✦
            </div>
            <span className="serif-heading text-lg font-medium tracking-tight">
              NailFlow
            </span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[380px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
              Nueva contraseña
            </p>
            <h1 className="serif-heading mt-2.5 text-[36px] font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-4xl">
              Elegí una{" "}
              <em className="font-normal italic text-[#846262]">nueva</em>.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#846262]">
              Mínimo 6 caracteres. Después te llevamos al dashboard.
            </p>

            {success ? (
              <div className="mt-6 rounded-xl bg-[#6b8a5e]/10 px-4 py-3 text-center text-sm text-[#6b8a5e]">
                ¡Contraseña actualizada! Redirigiendo…
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-[18px]"
              >
                {error && (
                  <div className="rounded-xl bg-[#b86060]/10 px-4 py-3 text-sm text-[#b86060]">
                    {error}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]"
                  >
                    Nueva contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-12 w-full rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm"
                    className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]"
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    id="confirm"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="h-12 w-full rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2d2424] text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
                >
                  Actualizar contraseña
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
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
