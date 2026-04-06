"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { Sparkles, Check } from "lucide-react";

const features = [
  "Reservas automáticas 24/7 desde tu enlace",
  "Pagos con SINPE Móvil integrado",
  "Reportes de ingresos mensuales",
  "Gestión de servicios y galería",
  "Recordatorios automáticos a clientes",
];

export default function BienvenidaPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/dashboard");
    });
  }, [router]);

  return (
    <div
      className="flex min-h-screen flex-col bg-[#fbf9f9] font-sans"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Header / Logo */}
      <header
        className="flex items-center gap-2 px-6"
        style={{
          paddingTop: "max(2rem, calc(env(safe-area-inset-top) + 1rem))",
        }}
      >
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#e9cece] text-[#2d2424]">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="serif-heading text-xl font-bold tracking-tight text-[#2d2424]">
          NailFlow
        </span>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col px-6 pb-10 pt-10">
        {/* Headline */}
        <div className="mb-8">
          <h1 className="serif-heading mb-4 text-[2.15rem] font-bold leading-tight tracking-tight text-[#2d2424]">
            Tu agenda de uñas,{" "}
            <span>
              ahora en{" "}
              <em style={{ color: "#b89090" }} className="not-italic">
                <em>modo pro.</em>
              </em>
            </span>
          </h1>
          <p className="text-base leading-relaxed text-[#846262]">
            Reservas automáticas, pagos con SINPE Móvil y reportes de ingresos.
            Todo en un solo lugar.
          </p>
        </div>

        {/* Plan card */}
        <div
          className="mb-8 rounded-2xl border border-[#e9cece]/40 bg-white p-6"
          style={{ boxShadow: "0 8px 32px -8px rgba(233, 206, 206, 0.35)" }}
        >
          {/* Price */}
          <div className="mb-5 flex items-end gap-1">
            <span className="serif-heading text-4xl font-bold text-[#2d2424]">
              ₡3,500
            </span>
            <span className="mb-1 text-sm text-[#846262]">/mes</span>
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e9cece]/60">
                  <Check className="h-3 w-3 text-[#2d2424]" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-snug text-[#2d2424]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <Link
          href="/registrar"
          className="mb-4 flex h-14 w-full items-center justify-center rounded-xl bg-[#2d2424] text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98] hover:opacity-90"
          style={{ boxShadow: "0 8px 24px -6px rgba(45, 36, 36, 0.35)" }}
        >
          Empezar 30 días gratis
        </Link>

        {/* Secondary link */}
        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-[#846262] transition-colors hover:text-[#2d2424]"
          >
            Ya tengo cuenta → Iniciar sesión
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-6 text-center">
        <p className="text-xs text-[#846262]/60">nailflow.app</p>
      </footer>
    </div>
  );
}
