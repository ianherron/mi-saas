import { revalidatePath } from "next/cache";
import { createClient, getBusiness } from "../../lib/supabase-server";
import EditServiceForm from "./EditServiceForm";

export default async function ServiciosPage() {
  const supabase = await createClient();
  const business = await getBusiness();

  if (!business) return <p>No se encontró tu negocio.</p>;

  async function addService(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const duration = Number(formData.get("duration"));
    if (!name || !price || !duration) return;
    await supabase.from("services").insert({ name, price, duration, business_id: business.id });
    revalidatePath("/servicios");
  }

  async function deleteService(id: string) {
    "use server";
    const supabase = await createClient();
    await supabase.from("services").delete().eq("id", id);
    revalidatePath("/servicios");
  }

  async function updateService(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const duration = Number(formData.get("duration"));
    if (!id || !name || !price || !duration) return;
    await supabase.from("services").update({ name, price, duration }).eq("id", id);
    revalidatePath("/servicios");
  }

  async function addTimeSlot(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const business = await getBusiness();
  if (!business) return;
  const time = formData.get("time") as string;
  if (!time) return;
  
  // Convertir a formato 12h con AM/PM
  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  const formatted = `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  
  await supabase.from("time_slots").insert({ time: formatted, business_id: business.id });
  revalidatePath("/servicios");
}

  async function deleteTimeSlot(id: number) {
    "use server";
    const supabase = await createClient();
    await supabase.from("time_slots").delete().eq("id", id);
    revalidatePath("/servicios");
  }

  async function addExtra(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const business = await getBusiness();
  if (!business) return;
  const name = formData.get("name") as string;
  const duration = Number(formData.get("duration"));
  const price = Number(formData.get("price"));
  if (!name || !duration) return;
  await supabase.from("extras").insert({ name, duration, price, business_id: business.id });
  revalidatePath("/servicios");
}

  async function deleteExtra(id: number) {
    "use server";
    const supabase = await createClient();
    await supabase.from("extras").delete().eq("id", id);
    revalidatePath("/servicios");
  }

  async function saveWorkingDays(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const business = await getBusiness();
  if (!business) return;

  const days = [0, 1, 2, 3, 4, 5, 6].filter(
    (d) => formData.get(`day_${d}`) === "on"
  );

  // Borrar los días actuales y reemplazar
  await supabase.from("working_days").delete().eq("business_id", business.id);
  
  if (days.length > 0) {
    await supabase.from("working_days").insert(
      days.map((day) => ({ day, business_id: business.id }))
    );
  }

  revalidatePath("/servicios");
}

  const { data: services, error } = await supabase
    .from("services").select("*").eq("business_id", business.id).order("created_at", { ascending: true });

  const { data: timeSlots } = await supabase
    .from("time_slots").select("*").eq("business_id", business.id).order("time", { ascending: true });

  const { data: extras } = await supabase
    .from("extras").select("*").eq("business_id", business.id).order("created_at", { ascending: true });

  const { data: workingDays } = await supabase
    .from("working_days")
    .select("day")
    .eq("business_id", business.id);

  const workingDaysList = workingDays?.map((d) => d.day) ?? [];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-slate-100 bg-white lg:flex">
        <div className="flex h-14 items-center gap-2 border-b border-slate-100 px-5">
          <div className="flex size-7 items-center justify-center rounded-md bg-[#e9cece] text-[#2d2424] text-xs">
            ✦
          </div>
          <span className="text-sm font-semibold tracking-tight">NailFlow</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <a
            href="/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <span>▦</span> Dashboard
          </a>
          <a
            href="/citas"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <span>◷</span> Citas
          </a>
          <a
            href="/servicios"
            className="flex items-center gap-3 rounded-md bg-[#e9cece]/20 px-3 py-2 text-sm font-medium text-slate-900"
          >
            <span>✦</span> Servicios
          </a>
        </nav>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-100 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-[#e9cece] text-[#2d2424] text-xs">
            ✦
          </div>
          <span className="text-sm font-semibold">NailFlow</span>
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
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Servicios
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Gestiona los servicios que ofreces a tus clientas.
            </p>
          </div>

          {/* Add service form */}
          <div className="mb-8 overflow-hidden rounded-xl border border-slate-100 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Agregar servicio
              </h2>
            </div>
            <form
              action={addService}
              className="flex flex-col gap-3 p-5 sm:flex-row"
            >
              <input
                name="name"
                type="text"
                placeholder="Nombre del servicio"
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white"
              />
              <input
                name="price"
                type="number"
                placeholder="Precio"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white sm:w-32"
              />
              <input
                name="duration"
                type="number"
                placeholder="Duración (min)"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white sm:w-36"
              />
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Agregar
              </button>
            </form>
          </div>

          {/* Services list */}
          {error && (
            <p className="mb-4 text-sm text-red-500">
              Error cargando servicios: {error.message}
            </p>
          )}

          {!services?.length && !error && (
            <div className="mb-8 rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
              <p className="text-sm text-slate-400">
                No hay servicios todavía. Agrega uno arriba.
              </p>
            </div>
          )}

          {services && services.length > 0 && (
            <div className="mb-8 overflow-hidden rounded-xl border border-slate-100 bg-white">
              <ul className="divide-y divide-slate-50">
                {services.map((service: any) => (
                  <li
                    key={service.id}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {service.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {service.duration} min · ₡
                        {service.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <EditServiceForm
                        service={service}
                        updateService={updateService}
                      />
                      <form action={deleteService.bind(null, service.id)}>
                        <button
                          type="submit"
                          className="rounded-md px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Extras */}
          <div className="mb-8 overflow-hidden rounded-xl border border-slate-100 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-900">Extras</h2>
            </div>
            <form
              action={addExtra}
              className="flex flex-col gap-3 border-b border-slate-50 p-5 sm:flex-row"
            >
              <input
                name="name"
                type="text"
                placeholder="Nombre del extra"
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white"
              />
              <input
                name="duration"
                type="number"
                placeholder="Minutos extra"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white sm:w-36"
              />
              <input
                name="price"
                type="number"
                placeholder="Precio"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white sm:w-32"
              />
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Agregar
              </button>
            </form>
            {!extras?.length ? (
              <div className="px-5 py-6 text-center">
                <p className="text-sm text-slate-400">
                  No hay extras configurados.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-50">
                {extras.map((extra: any) => (
                  <li
                    key={extra.id}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {extra.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        +{extra.duration} min · ₡
                        {extra.price?.toLocaleString() ?? 0}
                      </p>
                    </div>
                    <form action={deleteExtra.bind(null, extra.id)}>
                      <button
                        type="submit"
                        className="rounded-md px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        Eliminar
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Horarios */}
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Horarios disponibles
              </h2>
            </div>
            <form
              action={addTimeSlot}
              className="flex flex-col gap-3 border-b border-slate-50 p-5 sm:flex-row"
            >
              <input
                name="time"
                type="text"
                placeholder="09:00"
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white"
              />
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Agregar
              </button>
            </form>
            {!timeSlots?.length ? (
              <div className="px-5 py-6 text-center">
                <p className="text-sm text-slate-400">
                  No hay horarios configurados.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-50">
                {timeSlots.map((slot: any) => (
                  <li
                    key={slot.id}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <p className="text-sm font-medium text-slate-900">
                      {slot.time}
                    </p>
                    <form action={deleteTimeSlot.bind(null, slot.id)}>
                      <button
                        type="submit"
                        className="rounded-md px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        Eliminar
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-100 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Días de trabajo
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Selecciona los días que atiendes clientas.
              </p>
            </div>
            <form action={saveWorkingDays} className="p-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
                {[
                  { label: "Domingo", value: 0 },
                  { label: "Lunes", value: 1 },
                  { label: "Martes", value: 2 },
                  { label: "Miércoles", value: 3 },
                  { label: "Jueves", value: 4 },
                  { label: "Viernes", value: 5 },
                  { label: "Sábado", value: 6 },
                ].map((day) => (
                  <label
                    key={day.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name={`day_${day.value}`}
                      defaultChecked={workingDaysList.includes(day.value)}
                      className="rounded border-slate-300 text-[#e9cece] focus:ring-[#e9cece]"
                    />
                    <span className="text-sm text-slate-700">{day.label}</span>
                  </label>
                ))}
              </div>
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Guardar días
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}