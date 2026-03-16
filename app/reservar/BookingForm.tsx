"use client";
import { useState } from "react";
import { getBookedSlots } from "./actions";

type Service = { id: string; name: string; price: number; duration: number };
type TimeSlot = { id: number; time: string };
type Extra = { id: number; name: string; duration: number; price: number; };

export default function BookingForm({
  services,
  timeSlots,
  extras,
  businessId,
  createAppointment,
}: {
  services: Service[];
  timeSlots: TimeSlot[];
  extras: Extra[];
  businessId: string;
  createAppointment: (formData: FormData) => Promise<void>;
}) {
  const [selectedServiceId, setSelectedServiceId] = useState(
    services[0]?.id ?? "",
  );
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(timeSlots[0]?.time ?? "");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selectedService = services.find((s) => s.id === selectedServiceId);
  const extraMinutes = extras
    .filter((e) => selectedExtras.includes(String(e.id)))
    .reduce((acc, e) => acc + e.duration, 0);
  const totalDuration = (selectedService?.duration ?? 0) + extraMinutes;
  const extraPrice = extras
  .filter((e) => selectedExtras.includes(String(e.id)))
  .reduce((acc, e) => acc + (e.price ?? 0), 0);
  const totalPrice = (selectedService?.price ?? 0) + extraPrice;

  function toggleExtra(id: string) {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  }

  async function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newDate = e.target.value;
    setDate(newDate);
    const booked = await getBookedSlots(newDate, businessId);
    setBookedSlots(booked);
  }

  async function handleSubmit(formData: FormData) {
    if (submitting) return;
    setSubmitting(true);
    await createAppointment(formData);
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="flex w-full max-w-[800px] flex-1 flex-col items-center justify-center gap-6 px-4 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-[#e9cece]/30 text-2xl">
          ✓
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            ¡Cita confirmada!
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tu reserva fue registrada exitosamente.
          </p>
        </div>
        <div className="w-full max-w-sm rounded-xl border border-[#e9cece]/20 bg-white p-5 text-left">
          <div className="divide-y divide-slate-50">
            <div className="flex justify-between py-2.5">
              <span className="text-sm text-slate-400">Servicio</span>
              <span className="text-sm font-medium text-slate-900">
                {selectedService?.name}
              </span>
            </div>
            {selectedExtras.length > 0 && (
              <div className="flex justify-between py-2.5">
                <span className="text-sm text-slate-400">Extras</span>
                <span className="text-sm font-medium text-slate-900">
                  {extras
                    .filter((e) => selectedExtras.includes(String(e.id)))
                    .map((e) => e.name)
                    .join(", ")}
                </span>
              </div>
            )}
            <div className="flex justify-between py-2.5">
              <span className="text-sm text-slate-400">Duración</span>
              <span className="text-sm font-medium text-slate-900">
                {totalDuration} min
              </span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-sm text-slate-400">Fecha y hora</span>
              <span className="text-sm font-medium text-slate-900">
                {date} · {time}
              </span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-sm text-slate-400">Precio</span>
              <span className="text-sm font-semibold text-[#e9cece]">
                ₡{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setConfirmed(false);
            setSelectedExtras([]);
            setDate("");
            setTime(timeSlots[0]?.time ?? "");
          }}
          className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Reservar otra cita
        </button>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="flex w-full max-w-[800px] flex-col gap-10"
    >
      <input type="hidden" name="duration" value={totalDuration} />
      <input type="hidden" name="business_id" value={businessId} />
      <input type="hidden" name="total_price" value={totalPrice} />

      <div className="flex flex-col gap-2 px-4">
        <h2 className="text-4xl font-black tracking-tight text-slate-900">
          Reserva tu cita
        </h2>
        <p className="text-slate-500">
          Disfruta una experiencia premium de cuidado de uñas adaptada a tu
          estilo.
        </p>
      </div>

      {/* Paso 1 — Servicio */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 px-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece] text-sm font-bold text-slate-900">
            1
          </span>
          <h3 className="text-xl font-bold">Selecciona el servicio</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
          {services.map((service) => {
            const isSelected = service.id === selectedServiceId;
            return (
              <label
                key={service.id}
                className={`group relative flex cursor-pointer flex-col gap-3 rounded-xl border-2 bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                  isSelected
                    ? "border-[#e9cece]"
                    : "border-transparent hover:border-[#e9cece]/50"
                }`}
              >
                <input
                  type="radio"
                  name="service_id"
                  value={service.id}
                  checked={isSelected}
                  onChange={() => setSelectedServiceId(service.id)}
                  className="sr-only"
                />
                {isSelected && (
                  <div className="absolute top-4 right-4 text-[#e9cece]">✓</div>
                )}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-lg font-bold">{service.name}</p>
                    <p className="text-sm text-slate-500">
                      {service.duration} min
                    </p>
                  </div>
                  <p className="text-xl font-bold text-[#e9cece]">
                    ₡{service.price.toLocaleString()}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* Paso 2 — Extras */}
      {extras.length > 0 && (
        <section className="flex flex-col gap-4 px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece]/30 text-sm font-bold text-slate-900">
              2
            </span>
            <h3 className="text-xl font-bold">Extras opcionales</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {extras.map((extra) => {
              const isActive = selectedExtras.includes(String(extra.id));
              return (
                <button
                  key={extra.id}
                  type="button"
                  onClick={() => toggleExtra(String(extra.id))}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-[#e9cece] bg-[#e9cece]/20 text-slate-900"
                      : "border-slate-200 text-slate-600 hover:border-[#e9cece]"
                  }`}
                >
                  <span>{isActive ? "✓" : "+"}</span>
                  {extra.name} (+{extra.duration} min · ₡
                  {extra.price?.toLocaleString() ?? 0})
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Paso 3 — Fecha y hora */}
      <section className="flex flex-col gap-4 px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece]/30 text-sm font-bold text-slate-900">
            3
          </span>
          <h3 className="text-xl font-bold">Selecciona la fecha y hora</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            name="date"
            type="date"
            value={date}
            onChange={handleDateChange}
            className="rounded-lg border border-slate-200 bg-white py-3 px-4 text-sm outline-none focus:border-[#e9cece]"
          />
          <select
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white py-3 px-4 text-sm outline-none focus:border-[#e9cece]"
          >
            {timeSlots.length === 0 && (
              <option value="">Sin horarios disponibles</option>
            )}
            {timeSlots.map((slot) => {
              const isBooked = bookedSlots.includes(slot.time);
              return (
                <option key={slot.id} value={slot.time} disabled={isBooked}>
                  {slot.time}
                  {isBooked ? " — ocupado" : ""}
                </option>
              );
            })}
          </select>
        </div>
      </section>

      {/* Resumen dinámico */}
      <section className="px-4">
        <div className="rounded-xl border border-[#e9cece]/30 bg-white p-6 shadow-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Resumen de tu cita
          </p>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-xs text-slate-400">Servicio</p>
              <p className="text-sm font-semibold text-slate-900">
                {selectedService?.name ?? "—"}
                {selectedExtras.length > 0 && (
                  <span className="font-normal text-slate-400">
                    {" "}
                    +{" "}
                    {extras
                      .filter((e) => selectedExtras.includes(String(e.id)))
                      .map((e) => e.name)
                      .join(", ")}
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Duración</p>
              <p className="text-sm font-semibold text-slate-900">
                {totalDuration} min
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Precio</p>
              <p className="text-sm font-semibold text-[#e9cece]">
                ₡{totalPrice.toLocaleString()}
              </p>
            </div>
            {date && time && (
              <div>
                <p className="text-xs text-slate-400">Fecha y hora</p>
                <p className="text-sm font-semibold text-slate-900">
                  {date} · {time}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Paso 4 — Info cliente */}
      <section className="flex flex-col gap-6 px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece]/30 text-sm font-bold text-slate-900">
            4
          </span>
          <h3 className="text-xl font-bold">Información del cliente</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-600">
              Nombre completo
            </label>
            <input
              name="client_name"
              type="text"
              placeholder="Jane Doe"
              className="rounded-lg border border-slate-200 bg-white py-3 px-4 text-sm outline-none focus:border-[#e9cece]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">
              Número de teléfono
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+506 6000 0000"
              className="rounded-lg border border-slate-200 bg-white py-3 px-4 text-sm outline-none focus:border-[#e9cece]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">
              Correo electrónico
            </label>
            <input
              name="email"
              type="email"
              placeholder="jane@example.com"
              className="rounded-lg border border-slate-200 bg-white py-3 px-4 text-sm outline-none focus:border-[#e9cece]"
            />
          </div>
        </div>
      </section>

      <div className="px-4 pb-20">
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e9cece] py-5 text-lg font-bold text-slate-900 shadow-lg shadow-[#e9cece]/20 transition-all hover:bg-[#e0c2c2] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Confirmando..." : "Confirmar cita →"}
        </button>
        <p className="mt-4 text-center text-xs text-slate-400">
          Al confirmar, aceptas nuestros términos y condiciones de reserva.
        </p>
      </div>
    </form>
  );
}
