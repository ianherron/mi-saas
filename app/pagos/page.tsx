import { createClient, getBusiness } from "../../lib/supabase-server";
import { revalidatePath } from "next/cache";
import { LayoutDashboard, Clock, Scissors, Images, CreditCard, BarChart3 } from "lucide-react";
import { Sparkles } from "lucide-react";

export default async function PagosPage() {
  const supabase = await createClient();
  const business = await getBusiness();

  if (!business) return <p>No se encontró tu negocio.</p>;

  async function savePaymentSettings(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;

    const payments_enabled = formData.get("payments_enabled") === "on";
    const payment_percentage = parseInt(formData.get("payment_percentage") as string);
    const sinpe_number = formData.get("sinpe_number") as string;
    const sinpe_bank = formData.get("sinpe_bank") as string;
    const whatsapp_number = formData.get("whatsapp_number") as string;

    await supabase.from("businesses").update({
      payments_enabled,
      payment_percentage,
      sinpe_number,
      sinpe_bank,
      whatsapp_number,
    }).eq("id", business.id);

    revalidatePath("/pagos");
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-slate-100 bg-white lg:flex">
        <div className="flex h-14 items-center gap-2 border-b border-slate-100 px-5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="serif-heading text-sm font-semibold tracking-tight">
            NailFlow
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <a
            href="/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </a>
          <a
            href="/citas"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Clock className="h-4 w-4" /> Citas
          </a>
          <a
            href="/servicios"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Scissors className="h-4 w-4" /> Servicios
          </a>
          <a
            href="/galeria"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Images className="h-4 w-4" /> Galería
          </a>
          <a
            href="/pagos"
            className="flex items-center gap-3 rounded-md bg-[#e9cece]/20 px-3 py-2 text-sm font-medium text-slate-900"
          >
            <CreditCard className="h-4 w-4" /> Pagos
          </a>
          <a
            href="/reportes"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <BarChart3 className="h-4 w-4" /> Reportes
          </a>
        </nav>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-100 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="serif-heading text-sm font-semibold">NailFlow</span>
        </div>
        <a
          href="/dashboard"
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Volver
        </a>
      </header>

      <div className="lg:pl-60">
        <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-10">
          <div className="mb-8">
            <h1 className="serif-heading text-2xl font-semibold tracking-tight text-slate-900">
              Pagos
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Configura los pagos anticipados para tus citas.
            </p>
          </div>

          <form action={savePaymentSettings} className="space-y-6">
            {/* Toggle pagos */}
            <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Pagos anticipados
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Solicita un adelanto antes de confirmar la cita.
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    name="payments_enabled"
                    defaultChecked={business.payments_enabled}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#e9cece] peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>

            {/* Porcentaje */}
            <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-6">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">
                Porcentaje de adelanto
              </h2>
              <div className="flex flex-wrap gap-3">
                {[25, 30, 50, 75, 100].map((pct) => (
                  <label key={pct} className="cursor-pointer">
                    <input
                      type="radio"
                      name="payment_percentage"
                      value={pct}
                      defaultChecked={business.payment_percentage === pct}
                      className="sr-only peer"
                    />
                    <div className="rounded-full border-2 border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition-all peer-checked:border-[#e9cece] peer-checked:bg-[#e9cece]/10 peer-checked:text-[#2d2424]">
                      {pct}%
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* SINPE */}
            <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-6 space-y-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Datos de SINPE Móvil
              </h2>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Número de teléfono
                </label>
                <input
                  name="sinpe_number"
                  type="tel"
                  placeholder="8888-8888"
                  defaultValue={business.sinpe_number ?? ""}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#e9cece]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Banco
                </label>
                <select
                  name="sinpe_bank"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#e9cece]"
                >
                  <option value="" selected={!business.sinpe_bank}>
                    Selecciona tu banco
                  </option>
                  <option value="BCR" selected={business.sinpe_bank === "BCR"}>
                    BCR
                  </option>
                  <option
                    value="BNCR"
                    selected={business.sinpe_bank === "BNCR"}
                  >
                    Banco Nacional
                  </option>
                  <option value="BAC" selected={business.sinpe_bank === "BAC"}>
                    BAC
                  </option>
                  <option
                    value="Scotiabank"
                    selected={business.sinpe_bank === "Scotiabank"}
                  >
                    Scotiabank
                  </option>
                  <option
                    value="Davivienda"
                    selected={business.sinpe_bank === "Davivienda"}
                  >
                    Davivienda
                  </option>
                  <option
                    value="Popular"
                    selected={business.sinpe_bank === "Popular"}
                  >
                    Banco Popular
                  </option>
                  <option
                    value="Promerica"
                    selected={business.sinpe_bank === "Promerica"}
                  >
                    Promerica
                  </option>
                </select>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-6">
              <h2 className="mb-1 text-sm font-semibold text-slate-900">
                WhatsApp (opcional)
              </h2>
              <p className="mb-4 text-xs text-slate-400">
                Las clientas podrán enviarte el comprobante por WhatsApp.
              </p>
              <input
                name="whatsapp_number"
                type="tel"
                placeholder="+506 8888-8888"
                defaultValue={business.whatsapp_number ?? ""}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#e9cece]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Guardar configuración
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}