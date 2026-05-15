"use client";

import { useState } from "react";
import { Phone, Building2, MessageCircleMore } from "lucide-react";
import { toast } from "sonner";
import { getCurrencySymbol } from "../../lib/utils";

type Business = {
  id: string;
  name?: string | null;
  currency?: string | null;
  payments_enabled?: boolean | null;
  payment_percentage?: number | null;
  sinpe_number?: string | null;
  sinpe_bank?: string | null;
  whatsapp_number?: string | null;
};

export default function PagosForm({
  business,
  savePaymentSettings,
}: {
  business: Business;
  savePaymentSettings: (formData: FormData) => Promise<void>;
}) {
  const [enabled, setEnabled] = useState(Boolean(business.payments_enabled));
  const [pct, setPct] = useState<number>(business.payment_percentage ?? 50);
  const [sinpe, setSinpe] = useState(business.sinpe_number ?? "");
  const [bank, setBank] = useState(business.sinpe_bank ?? "");
  const [submitting, setSubmitting] = useState(false);

  const symbol = getCurrencySymbol(business.currency ?? "CRC");
  const samplePrice = 22000;
  const sampleAdelanto = Math.ceil((samplePrice * pct) / 100);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    await savePaymentSettings(fd);
    setSubmitting(false);
    toast.success("Cambios guardados", {
      description: "Tus clientas ya ven la nueva configuración.",
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr] lg:gap-5"
    >
      {/* Hidden mirror of toggle for the FormData */}
      <input type="hidden" name="payments_enabled" value={enabled ? "on" : ""} />

      {/* ---------- Left column ---------- */}
      <div className="flex flex-col gap-4">
        {/* Big toggle card */}
        <section className="flex items-start justify-between gap-4 rounded-3xl border border-[#2d2424]/[0.08] bg-white p-5 sm:p-6">
          <div className="min-w-0">
            <p className="serif-heading text-xl font-medium leading-tight tracking-tight text-[#2d2424]">
              Cobrar adelanto
            </p>
            <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-[#846262]">
              Cuando una clienta reserva, le pedís un porcentaje por SINPE Móvil. Reduce los no-show.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => setEnabled((v) => !v)}
            className={[
              "relative h-7 w-12 shrink-0 rounded-full transition-colors",
              enabled ? "bg-[#2d2424]" : "bg-[#2d2424]/20",
            ].join(" ")}
          >
            <span
              className={[
                "absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                enabled ? "translate-x-5" : "translate-x-0",
              ].join(" ")}
            />
          </button>
        </section>

        {/* Settings card — only shown when enabled */}
        {enabled && (
          <section className="flex flex-col gap-4 rounded-3xl border border-[#2d2424]/[0.08] bg-white p-5 sm:p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
              Configuración
            </p>

            {/* Percentage */}
            <div>
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                Porcentaje de adelanto
              </p>
              <div className="flex items-center gap-2 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 py-2.5">
                <input
                  name="payment_percentage"
                  type="number"
                  min={1}
                  max={100}
                  value={pct}
                  onChange={(e) => setPct(parseInt(e.target.value || "0", 10))}
                  className="w-full bg-transparent text-sm text-[#2d2424] outline-none"
                />
                <span className="text-sm text-[#846262]">%</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#846262]">
                Lo que la clienta paga por adelantado del total de la cita.
              </p>
            </div>

            {/* SINPE number + bank */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Número SINPE
                </p>
                <div className="flex items-center gap-2 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 py-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-[#846262]" />
                  <input
                    name="sinpe_number"
                    type="tel"
                    value={sinpe}
                    onChange={(e) => setSinpe(e.target.value)}
                    placeholder="8888-1234"
                    className="w-full bg-transparent text-sm text-[#2d2424] outline-none"
                  />
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Banco
                </p>
                <div className="flex items-center gap-2 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 py-2.5">
                  <Building2 className="h-4 w-4 shrink-0 text-[#846262]" />
                  <input
                    name="sinpe_bank"
                    type="text"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    placeholder="BCR"
                    className="w-full bg-transparent text-sm text-[#2d2424] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                WhatsApp para comprobantes
              </p>
              <div className="flex items-center gap-2 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 py-2.5">
                <MessageCircleMore className="h-4 w-4 shrink-0 text-[#846262]" />
                <input
                  name="whatsapp_number"
                  type="tel"
                  defaultValue={business.whatsapp_number ?? ""}
                  placeholder="+506 8888-1234"
                  className="w-full bg-transparent text-sm text-[#2d2424] outline-none"
                />
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#846262]">
                Donde las clientas te envían el comprobante de la transferencia.
              </p>
            </div>
          </section>
        )}

        {/* Save button — always accessible */}
        <div className="flex">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2d2424] px-5 py-2.5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232] disabled:opacity-50"
          >
            {submitting ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>

      {/* ---------- Right column: preview ---------- */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="overflow-hidden rounded-2xl border border-[#2d2424]/[0.08] bg-[#fbf9f9] p-5 sm:p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Vista previa · cliente
          </p>
          <p className="serif-heading mt-2 text-sm font-medium text-[#2d2424]">
            Adelanto requerido ({pct}%)
          </p>

          <div className="mt-3 rounded-2xl bg-[#f4ecec] p-4">
            <p className="text-[11px] text-[#846262]">Monto a transferir</p>
            <p className="serif-heading mt-1 text-3xl font-medium leading-none tracking-tight text-[#2d2424]">
              {symbol}
              {sampleAdelanto.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] text-[#846262]">
              de {symbol}
              {samplePrice.toLocaleString()} total{" "}
              <span className="opacity-60">(ejemplo)</span>
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-[#2d2424]/[0.08] bg-white p-3.5">
            <p className="text-[11px] text-[#846262]">SINPE Móvil</p>
            <p className="mt-0.5 text-base font-semibold text-[#2d2424]">
              {sinpe || "—"}
            </p>
            {bank && <p className="mt-0.5 text-xs text-[#846262]">{bank}</p>}
          </div>
        </div>

        <div className="mt-3.5 rounded-2xl bg-[#f4ecec] p-4">
          <p className="text-xs leading-relaxed text-[#846262]">
            <span className="font-medium text-[#2d2424]">Así lo ven tus clientas</span> al reservar — el adelanto aparece después de elegir servicio y hora.
          </p>
        </div>
      </aside>
    </form>
  );
}
