"use client";

import { useState } from "react";
import { getBookedSlots } from "./actions";

type Service = {
  id: string;
  name: string;
  price: number;
  duration: number;
};

type TimeSlot = {
  id: number;
  time: string;
};

type Extra = {
  id: number;
  name: string;
  duration: number;
};

export default function BookingForm({
  services,
  timeSlots,
  extras,
  createAppointment,
}: {
  services: Service[];
  timeSlots: TimeSlot[];
  extras: Extra[];
  createAppointment: (formData: FormData) => Promise<void>;
}) {
  const [selectedServiceId, setSelectedServiceId] = useState(
    services[0]?.id ?? "",
  );
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const selectedService = services.find((s) => s.id === selectedServiceId);

  const extraMinutes = extras
    .filter((e) => selectedExtras.includes(String(e.id)))
    .reduce((acc, e) => acc + e.duration, 0);

  const totalDuration = (selectedService?.duration ?? 0) + extraMinutes;

  function toggleExtra(id: string) {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  }

  async function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newDate = e.target.value;
    setDate(newDate);
    const booked = await getBookedSlots(newDate);
    setBookedSlots(booked);
  }

  return (
    <form
      action={createAppointment}
      className="flex w-full max-w-[800px] flex-col gap-10"
    >
      {/* Campo oculto con duración total calculada */}
      <input type="hidden" name="duration" value={totalDuration} />

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
                <div className="h-40 w-full rounded-lg bg-[#e9cece]/10" />
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
            {extra.name} (+{extra.duration} min)
          </button>
        );
      })}

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
            className="rounded-lg border border-slate-200 bg-white py-3 px-4 focus:border-[#e9cece] focus:ring-[#e9cece]"
          />
          <select
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white py-3 px-4 focus:border-[#e9cece] focus:ring-[#e9cece]"
          >
            {timeSlots.length === 0 && (
              <option value="">Sin horarios disponibles</option>
            )}
            {timeSlots.map((slot) => {
              const isBooked = bookedSlots.includes(slot.time);
              return (
                <option key={slot.id} value={slot.time} disabled={isBooked}>
                  {slot.time} {isBooked ? "— ocupado" : ""}
                </option>
              );
            })}
          </select>
        </div>
      </section>

      {/* Resumen dinámico */}
      <section className="px-4">
        <div className="rounded-xl border border-[#e9cece]/30 bg-white p-6 shadow-sm ring-1 ring-[#e9cece]/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#e9cece]/20">
                <span className="text-[#e9cece]">📅</span>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                  Resumen de tu cita
                </p>
                <p className="text-lg font-bold text-slate-900">
                  {selectedService?.name ?? "—"}
                  {selectedExtras.length > 0 && (
                    <span className="text-sm font-normal text-slate-500">
                      {" "}
                      +{" "}
                      {extras.filter((e) => selectedExtras.includes(String(e.id)))
                        .map((e) => e.name)
                        .join(", ")}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-8 border-t border-slate-100 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <div>
                <p className="text-xs uppercase text-slate-500">Duración</p>
                <p className="text-lg font-bold">{totalDuration} min</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-500">Precio</p>
                <p className="text-lg font-bold text-[#e9cece]">
                  ₡{selectedService?.price.toLocaleString() ?? "—"}
                </p>
              </div>
              {date && time && (
                <div>
                  <p className="text-xs uppercase text-slate-500">
                    Fecha y hora
                  </p>
                  <p className="text-lg font-bold">
                    {date} · {time}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Paso 4 — Info del cliente */}
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
              className="rounded-lg border border-slate-200 bg-white py-3 px-4 focus:border-[#e9cece] focus:ring-[#e9cece]"
              placeholder="Jane Doe"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">
              Número de teléfono
            </label>
            <input
              name="phone"
              className="rounded-lg border border-slate-200 bg-white py-3 px-4 focus:border-[#e9cece] focus:ring-[#e9cece]"
              placeholder="+506 6000 0000"
              type="tel"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">
              Correo electrónico
            </label>
            <input
              name="email"
              className="rounded-lg border border-slate-200 bg-white py-3 px-4 focus:border-[#e9cece] focus:ring-[#e9cece]"
              placeholder="jane@example.com"
              type="email"
            />
          </div>
        </div>
      </section>

      <div className="px-4 pb-20">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e9cece] py-5 text-lg font-bold text-slate-900 shadow-lg shadow-[#e9cece]/20 transition-all hover:bg-[#e0c2c2]"
        >
          <span>Confirmar cita</span>
          <span>→</span>
        </button>
        <p className="mt-4 text-center text-xs text-slate-400">
          Al confirmar, aceptas nuestros términos y condiciones de reserva.
        </p>
      </div>
    </form>
  );
}
