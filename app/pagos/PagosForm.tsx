"use client";
import { toast } from "sonner";

export default function PagosForm({
  business,
  savePaymentSettings,
}: {
  business: any;
  savePaymentSettings: (formData: FormData) => Promise<void>;
}) {
  return (
    <form
      action={async (formData) => {
        await savePaymentSettings(formData);
        toast.success("Configuración guardada", {
          description: "Los cambios se aplicaron correctamente.",
        });
      }}
      className="space-y-6"
    >
      {/* Toggle pagos */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Pagos anticipados</h2>
            <p className="mt-0.5 text-xs text-slate-400">Solicita un adelanto antes de confirmar la cita.</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" name="payments_enabled" defaultChecked={business.payments_enabled} className="peer sr-only" />
            <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#e9cece] peer-checked:after:translate-x-full"></div>
          </label>
        </div>
      </div>

      {/* Porcentaje */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Porcentaje de adelanto</h2>
        <div className="flex flex-wrap gap-3">
          {[25, 30, 50, 75, 100].map((pct) => (
            <label key={pct} className="cursor-pointer">
              <input type="radio" name="payment_percentage" value={pct} defaultChecked={business.payment_percentage === pct} className="sr-only peer" />
              <div className="rounded-full border-2 border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition-all peer-checked:border-[#e9cece] peer-checked:bg-[#e9cece]/10 peer-checked:text-[#2d2424]">
                {pct}%
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* SINPE */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-6 space-y-4">
        <h2 className="text-sm font-semibold text-slate-900">Datos de SINPE Móvil</h2>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Número de teléfono</label>
          <input name="sinpe_number" type="tel" placeholder="8888-8888" defaultValue={business.sinpe_number ?? ""}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#e9cece]" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Banco</label>
          <select name="sinpe_bank" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#e9cece]">
            <option value="" selected={!business.sinpe_bank}>Selecciona tu banco</option>
            <option value="BCR" selected={business.sinpe_bank === "BCR"}>BCR</option>
            <option value="BNCR" selected={business.sinpe_bank === "BNCR"}>Banco Nacional</option>
            <option value="BAC" selected={business.sinpe_bank === "BAC"}>BAC</option>
            <option value="Scotiabank" selected={business.sinpe_bank === "Scotiabank"}>Scotiabank</option>
            <option value="Davivienda" selected={business.sinpe_bank === "Davivienda"}>Davivienda</option>
            <option value="Popular" selected={business.sinpe_bank === "Popular"}>Banco Popular</option>
            <option value="Promerica" selected={business.sinpe_bank === "Promerica"}>Promerica</option>
          </select>
        </div>
      </div>

      {/* WhatsApp */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-6">
        <h2 className="mb-1 text-sm font-semibold text-slate-900">WhatsApp (opcional)</h2>
        <p className="mb-4 text-xs text-slate-400">Las clientas podrán enviarte el comprobante por WhatsApp.</p>
        <input name="whatsapp_number" type="tel" placeholder="+506 8888-8888" defaultValue={business.whatsapp_number ?? ""}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#e9cece]" />
      </div>

      <button type="submit" className="w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700">
        Guardar configuración
      </button>
    </form>
  );
}