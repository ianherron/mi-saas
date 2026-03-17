"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

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
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError("Error al actualizar la contraseña. Intenta de nuevo.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/dashboard"), 2000);
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
          <h2 className="text-xl font-bold tracking-tight">NailFlow</h2>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <div
          className="w-full max-w-[480px] rounded-xl border border-[#e9cece]/10 bg-white p-8 shadow-lg md:p-12"
          style={{ boxShadow: "0 10px 40px -10px rgba(233, 206, 206, 0.3)" }}
        >
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
              Nueva contraseña
            </h1>
            <p className="text-sm leading-relaxed text-slate-500">
              Ingresa tu nueva contraseña.
            </p>
          </div>

          {success ? (
            <div className="rounded-xl bg-green-50 px-4 py-3 text-center text-sm text-green-600">
              ¡Contraseña actualizada! Redirigiendo...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/50"
                />
              </div>

              <button
                type="submit"
                className="h-14 w-full rounded-xl bg-[#e9cece] font-bold text-slate-900 shadow-lg shadow-[#e9cece]/20 transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Actualizar contraseña
              </button>
            </form>
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