import { ArrowRight } from "lucide-react";
import LogoutButton from "./LogoutButton";
import AuthSidePanel from "../_components/AuthSidePanel";

const features = [
  "Página de reservas personalizada",
  "Servicios con imagen y descripción",
  "Galería de trabajos",
  "Correos automáticos",
  "Dashboard con estadísticas",
  "Reportes de ingresos",
  "Pagos anticipados con SINPE",
];

export default function SuscripcionPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#fbf9f9] font-sans text-[#2d2424]">
      <AuthSidePanel kind="suscripcion" />

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
        </div>

        <div className="hidden items-center justify-end lg:flex">
          <LogoutButton />
        </div>

        <div className="flex flex-1 items-center justify-center py-4">
          <div className="w-full max-w-[440px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
              Tu prueba gratuita terminó
            </p>
            <h1 className="serif-heading mt-2.5 text-[36px] font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-4xl">
              Seguí en{" "}
              <em className="font-normal italic text-[#846262]">modo pro</em>.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#846262]">
              Activá tu suscripción para seguir gestionando tus citas sin interrupciones.
            </p>

            {/* Pricing card */}
            <div className="mt-7 rounded-3xl border border-[#e9cece] bg-white p-7 shadow-[0_12px_30px_rgba(184,144,144,0.18)] sm:p-8">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[#b89090]">✦</span>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Plan único
                </p>
              </div>
              <div className="mb-5 mt-4 flex items-baseline gap-1.5">
                <p className="serif-heading text-5xl font-medium leading-none tracking-tight text-[#2d2424]">
                  ₡3.500
                </p>
                <p className="text-sm text-[#846262]">/ mes</p>
              </div>
              <div className="mb-4 h-px bg-[#2d2424]/[0.08]" />
              <ul className="flex flex-col gap-2.5">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-[13.5px] text-[#2d2424]"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e9cece] text-[10px] font-semibold text-[#2d2424]">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2d2424] text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
            >
              Activar suscripción
              <ArrowRight className="h-4 w-4" />
            </a>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-[#b89090]">
              Procesado de forma segura por Lemon Squeezy · ¿Necesitás ayuda?{" "}
              <a
                href="mailto:hola@nailflow.app"
                className="text-[#846262] underline decoration-[#e9cece]"
              >
                hola@nailflow.app
              </a>
            </p>

            {/* Mobile-only logout */}
            <div className="mt-6 flex justify-center lg:hidden">
              <LogoutButton />
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
          © 2026 NailFlow
        </p>
      </main>
    </div>
  );
}
