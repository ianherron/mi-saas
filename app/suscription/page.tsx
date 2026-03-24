import { Sparkles } from "lucide-react";

export default function SuscripcionPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fbf9f9] px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e9cece] text-[#2d2424]">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="serif-heading mb-3 text-3xl font-medium text-[#2d2424]">
          Tu prueba gratuita ha terminado
        </h1>
        <p className="mb-8 text-[#846262]">
          Activa tu suscripción para seguir gestionando tus citas con NailFlow.
        </p>

        <div className="mb-8 rounded-2xl border border-[#e9cece]/30 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-[#846262]">Plan NailFlow</p>
          <p className="serif-heading mt-2 text-4xl font-bold text-[#2d2424]">₡3,500</p>
          <p className="text-sm text-[#846262]">por mes</p>
          <ul className="mt-4 space-y-2 text-left text-sm text-[#2d2424]">
            {[
              "Página de reservas personalizada",
              "Servicios con imagen y descripción",
              "Galería de trabajos",
              "Correos automáticos",
              "Dashboard con estadísticas",
              "Reportes de ingresos",
              "Pagos anticipados con SINPE",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-[#e9cece]">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>

        
        <a
          href={process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL}
          className="block w-full rounded-xl bg-[#e9cece] px-6 py-4 text-center text-base font-bold text-[#2d2424] shadow-lg transition-all hover:scale-105"
        >
          Activar suscripción
        </a>

        <p className="mt-4 text-xs text-[#846262]">
          Procesado de forma segura por Lemon Squeezy
        </p>
      </div>
    </div>
  );
}