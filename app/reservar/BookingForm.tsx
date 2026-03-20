"use client";
import { useState, useRef } from "react";
import { Check, Plus, Clock, Sparkles, Calendar, User, Phone, Mail, ArrowRight } from "lucide-react";
import { getBookedSlots } from "./actions";

type Service = {
  id: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
  image_url?: string;
};
type TimeSlot = { id: number; time: string };
type Extra = { id: number; name: string; duration: number; price: number };
type GalleryImage = { image_url: string };

export default function BookingForm({
  services,
  timeSlots,
  extras,
  businessId,
  workingDays,
  gallery,
  createAppointment,
}: {
  services: Service[];
  timeSlots: TimeSlot[];
  extras: Extra[];
  businessId: string;
  workingDays: number[];
  gallery: GalleryImage[];
  createAppointment: (formData: FormData) => Promise<void>;
}) {
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id ?? "");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(timeSlots[0]?.time ?? "");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dateError, setDateError] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }

  async function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newDate = e.target.value;
    if (isDateDisabled(newDate)) {
      setDateError("La manicurista no trabaja ese día. Por favor elige otra fecha.");
      return;
    }
    setDateError("");
    setDate(newDate);
    const booked = await getBookedSlots(newDate, businessId);
    setBookedSlots(booked);
  }

  async function handleSubmit(formData: FormData) {
    if (submitting) return;
    setSubmitting(true);

    if (referenceImage) {
      const { createBrowserClient } = await import("@supabase/ssr");
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      );

      const fileName = `${Date.now()}-${referenceImage.name}`;
      const { data, error } = await supabase.storage
        .from("reference-images")
        .upload(fileName, referenceImage);

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from("reference-images")
          .getPublicUrl(data.path);
        formData.set("reference_image", urlData.publicUrl);
      }
    }

    await createAppointment(formData);
    setConfirmed(true);
    setSubmitting(false);
  }

  function isDateDisabled(dateString: string): boolean {
    if (!dateString) return false;
    if (workingDays.length === 0) return false;
    const day = new Date(dateString + "T12:00:00").getDay();
    return !workingDays.includes(day);
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setReferenceImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  if (confirmed) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#fbf9f9] px-4 py-20">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#e9cece]/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e9cece]">
              <Check className="h-7 w-7 text-[#2d2424]" strokeWidth={2.5} />
            </div>
          </div>

          <h2 className="serif-heading text-3xl font-medium tracking-tight text-[#2d2424] md:text-4xl">
            Cita Confirmada
          </h2>
          <p className="mt-3 text-[#846262]">
            Tu reserva ha sido registrada exitosamente. Te esperamos.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#e9cece]" />
              <span className="text-xs font-medium uppercase tracking-widest text-[#846262]">
                Detalles de tu cita
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="flex items-center justify-between py-4">
                <span className="text-sm text-[#846262]">Servicio</span>
                <span className="text-sm font-medium text-[#2d2424]">{selectedService?.name}</span>
              </div>
              {selectedExtras.length > 0 && (
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-[#846262]">Extras</span>
                  <span className="text-right text-sm font-medium text-[#2d2424]">
                    {extras.filter((e) => selectedExtras.includes(String(e.id))).map((e) => e.name).join(", ")}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between py-4">
                <span className="text-sm text-[#846262]">Duración</span>
                <span className="text-sm font-medium text-[#2d2424]">{totalDuration} minutos</span>
              </div>
              <div className="flex items-center justify-between py-4">
                <span className="text-sm text-[#846262]">Fecha</span>
                <span className="text-sm font-medium capitalize text-[#2d2424]">{formatDate(date)}</span>
              </div>
              <div className="flex items-center justify-between py-4">
                <span className="text-sm text-[#846262]">Hora</span>
                <span className="text-sm font-medium text-[#2d2424]">{time}</span>
              </div>
              <div className="flex items-center justify-between py-4">
                <span className="text-sm text-[#846262]">Total</span>
                <span className="text-lg font-semibold text-[#2d2424]">₡{totalPrice.toLocaleString()}</span>
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
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 px-8 py-3 text-sm font-medium text-[#2d2424] transition-all hover:bg-[#f4ecec]"
          >
            Reservar otra cita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f9]">
      <main className="mx-auto max-w-6xl px-4 py-12 md:py-16 overflow-hidden">
        <div className="mb-16 text-center">
          <h1 className="serif-heading text-4xl font-medium tracking-tight text-[#2d2424] md:text-5xl lg:text-6xl">
            <span className="block">Reserva tu</span>
            <span className="block italic text-[#cfaeae]">
              momento de cuidado
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[#846262]">
            Disfruta una experiencia exclusiva de belleza y bienestar, diseñada
            especialmente para ti.
          </p>
        </div>

        <form
          action={handleSubmit}
          className="flex flex-col gap-16 lg:flex-row lg:gap-12"
        >
          <div className="flex-1 space-y-16">
            <input type="hidden" name="duration" value={totalDuration} />
            <input type="hidden" name="business_id" value={businessId} />
            <input type="hidden" name="total_price" value={totalPrice} />
            <input
              type="hidden"
              name="reference_image"
              id="reference_image_url"
              value=""
            />

            {/* Step 1 - Services */}
            <section>
              <StepHeader number={1} title="Elige tu servicio" />
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {services.map((service) => {
                  const isSelected = service.id === selectedServiceId;
                  return (
                    <label
                      key={service.id}
                      className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 bg-white transition-all duration-300 ${
                        isSelected
                          ? "border-[#e9cece] shadow-lg shadow-[#e9cece]/20"
                          : "border-transparent hover:border-[#e9cece]/30 hover:shadow-md"
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
                      <div className="aspect-video w-full overflow-hidden">
                        {service.image_url ? (
                          <img
                            src={service.image_url}
                            alt={service.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#f4ecec]">
                            <Sparkles className="h-8 w-8 text-[#e9cece]" />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="serif-heading text-lg font-medium text-[#2d2424]">
                              {service.name}
                            </h3>
                            {service.description && (
                              <p className="mt-1 line-clamp-2 text-sm text-[#846262]">
                                {service.description}
                              </p>
                            )}
                            <div className="mt-3 flex items-center gap-1 text-sm text-[#846262]">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{service.duration} min</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="serif-heading text-xl font-semibold text-[#2d2424]">
                              ₡{service.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#e9cece] shadow-md">
                          <Check
                            className="h-4 w-4 text-[#2d2424]"
                            strokeWidth={2.5}
                          />
                        </div>
                      )}
                    </label>
                  );
                })}
              </div>
            </section>

            {/* Step 2 - Extras */}
            {extras.length > 0 && (
              <section>
                <StepHeader number={2} title="Extras opcionales" />
                <div className="mt-8 flex flex-wrap gap-3">
                  {extras.map((extra) => {
                    const isActive = selectedExtras.includes(String(extra.id));
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(String(extra.id))}
                        className={`group flex items-center gap-3 rounded-full border-2 px-5 py-3 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "border-[#e9cece] bg-[#e9cece] text-[#2d2424] shadow-md shadow-[#e9cece]/20"
                            : "border-slate-200 bg-white text-[#2d2424] hover:border-[#e9cece]/50"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                            isActive
                              ? "border-[#2d2424]/30 bg-[#2d2424]/10"
                              : "border-slate-300"
                          }`}
                        >
                          {isActive ? (
                            <Check className="h-3 w-3" strokeWidth={2.5} />
                          ) : (
                            <Plus className="h-3 w-3 text-[#846262]" />
                          )}
                        </span>
                        <span>{extra.name}</span>
                        <span className="text-[#846262]">
                          +{extra.duration}min · ₡
                          {extra.price?.toLocaleString() ?? 0}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Step 3 - Date & Time */}
            <section>
              <StepHeader
                number={extras.length > 0 ? 3 : 2}
                title="Fecha y hora"
              />
              <div className="mt-8 grid gap-4">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#846262]">
                    Fecha
                  </label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#846262]" />
                    <input
                      ref={dateInputRef}
                      name="date"
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white py-4 pl-11 pr-4 text-sm text-[#2d2424] outline-none transition-all focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/20"
                    />
                  </div>
                  {dateError && (
                    <p className="mt-1 text-xs text-red-500">{dateError}</p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#846262]">
                    Hora
                  </label>
                  <div className="relative">
                    <Clock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#846262]" />
                    <select
                      name="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full appearance-none rounded-xl border-2 border-slate-200 bg-white py-4 pl-11 pr-4 text-sm text-[#2d2424] outline-none transition-all focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/20"
                    >
                      {timeSlots.length === 0 && (
                        <option value="">Sin horarios disponibles</option>
                      )}
                      {timeSlots.map((slot) => {
                        const isBooked = bookedSlots.includes(slot.time);
                        return (
                          <option
                            key={slot.id}
                            value={slot.time}
                            disabled={isBooked}
                          >
                            {slot.time}
                            {isBooked ? " — ocupado" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 4 - Client Info */}
            <section>
              <StepHeader
                number={extras.length > 0 ? 4 : 3}
                title="Tus datos"
              />
              <div className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#846262]">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#846262]" />
                    <input
                      name="client_name"
                      type="text"
                      placeholder="Tu nombre"
                      required
                      className="w-full rounded-xl border-2 border-slate-200 bg-white py-4 pl-11 pr-4 text-sm text-[#2d2424] placeholder:text-[#846262]/60 outline-none transition-all focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/20"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#846262]">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#846262]" />
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+506 0000 0000"
                        className="w-full rounded-xl border-2 border-slate-200 bg-white py-4 pl-11 pr-4 text-sm text-[#2d2424] placeholder:text-[#846262]/60 outline-none transition-all focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#846262]">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#846262]" />
                      <input
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full rounded-xl border-2 border-slate-200 bg-white py-4 pl-11 pr-4 text-sm text-[#2d2424] placeholder:text-[#846262]/60 outline-none transition-all focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/20"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#846262]">
                    Foto de referencia (opcional)
                  </label>
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-white py-6 transition-all hover:border-[#e9cece]">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Referencia"
                        className="h-32 w-32 rounded-lg object-cover"
                      />
                    ) : (
                      <>
                        <span className="text-2xl">📷</span>
                        <span className="text-xs text-[#846262]">
                          Sube una foto del diseño que quieres
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:w-96">
            <div className="sticky top-8 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-[#2d2424]/5">
                <div className="bg-[#f4ecec]/50 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#846262]" />
                    <span className="text-xs font-medium uppercase tracking-widest text-[#846262]">
                      Resumen de tu cita
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="divide-y divide-slate-100">
                    <div className="pb-4">
                      <p className="text-xs text-[#846262]">Servicio</p>
                      <p className="serif-heading mt-1 text-lg font-medium text-[#2d2424]">
                        {selectedService?.name ?? "Selecciona un servicio"}
                      </p>
                    </div>
                    {selectedExtras.length > 0 && (
                      <div className="py-4">
                        <p className="text-xs text-[#846262]">Extras</p>
                        <p className="mt-1 text-sm text-[#2d2424]">
                          {extras
                            .filter((e) =>
                              selectedExtras.includes(String(e.id)),
                            )
                            .map((e) => e.name)
                            .join(", ")}
                        </p>
                      </div>
                    )}
                    <div className="py-4">
                      <p className="text-xs text-[#846262]">
                        Duración estimada
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-[#2d2424]">
                        <Clock className="h-3.5 w-3.5 text-[#846262]" />
                        {totalDuration} minutos
                      </p>
                    </div>
                    {date && time && (
                      <div className="py-4">
                        <p className="text-xs text-[#846262]">Fecha y hora</p>
                        <p className="mt-1 flex items-center gap-1 text-sm capitalize text-[#2d2424]">
                          <Calendar className="h-3.5 w-3.5 text-[#846262]" />
                          {formatDate(date)} · {time}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 rounded-xl bg-[#f4ecec]/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#846262]">Total</span>
                      <span className="serif-heading text-2xl font-semibold text-[#2d2424]">
                        ₡{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || !date}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2d2424] py-4 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      "Confirmando..."
                    ) : (
                      <>
                        Confirmar cita <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-center text-xs text-[#846262]">
                    Al confirmar, aceptas nuestros términos y condiciones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="mt-24">
            <div className="mb-8 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#846262]">
                Nuestro trabajo
              </p>
              <h2 className="serif-heading mt-2 text-2xl font-medium text-[#2d2424]">
                Inspiración para tu próxima visita
              </h2>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <div className="mb-3 flex animate-marquee-left gap-3">
                {[
                  ...gallery.slice(0, Math.ceil(gallery.length / 2)),
                  ...gallery.slice(0, Math.ceil(gallery.length / 2)),
                ].map((img, i) => (
                  <img
                    key={i}
                    src={img.image_url}
                    alt="Trabajo"
                    className="h-40 w-40 shrink-0 rounded-xl object-cover"
                  />
                ))}
              </div>
              <div className="flex animate-marquee-right gap-3">
                {[
                  ...gallery.slice(Math.ceil(gallery.length / 2)),
                  ...gallery.slice(Math.ceil(gallery.length / 2)),
                ].map((img, i) => (
                  <img
                    key={i}
                    src={img.image_url}
                    alt="Trabajo"
                    className="h-40 w-40 shrink-0 rounded-xl object-cover"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function StepHeader({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9cece] text-sm font-semibold text-[#2d2424]">
        {number}
      </div>
      <h2 className="serif-heading text-xl font-medium tracking-tight text-[#2d2424] md:text-2xl">{title}</h2>
    </div>
  );
}