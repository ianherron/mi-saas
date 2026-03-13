import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/supabase";
import EditServiceForm from "./EditServiceForm";

export default async function ServiciosPage() {
  async function addService(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const duration = Number(formData.get("duration"));

    if (!name || !price || !duration) return;

    const { error } = await supabase.from("services").insert({
      name,
      price,
      duration,
    });

    if (error) {
      console.error("Error insertando servicio:", error.message);
      return;
    }

    revalidatePath("/servicios");
  }

  async function deleteService(id: number) {
    "use server";

    await supabase.from("services").delete().eq("id", id);

    revalidatePath("/servicios");
  }

  async function addTimeSlot(formData: FormData) {
    "use server";
    const time = formData.get("time") as string;
    if (!time) return;
    // Toma solo HH:MM por si el browser incluye segundos
    const formatted = time.slice(0, 5);
    await supabase.from("time_slots").insert({ time: formatted });
    revalidatePath("/servicios");
  }

  async function deleteTimeSlot(id: number) {
    "use server";
    await supabase.from("time_slots").delete().eq("id", id);
    revalidatePath("/servicios");
  }

  async function updateService(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const duration = Number(formData.get("duration"));

    console.log("update:", { id, name, price, duration });

    if (!id || !name || !price || !duration) return;

    await supabase
      .from("services")
      .update({ name, price, duration })
      .eq("id", id);
    revalidatePath("/servicios");
  }

  async function addExtra(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const duration = Number(formData.get("duration"));
    if (!name || !duration) return;
    await supabase.from("extras").insert({ name, duration });
    revalidatePath("/servicios");
  }

  async function deleteExtra(id: number) {
    "use server";
    await supabase.from("extras").delete().eq("id", id);
    revalidatePath("/servicios");
  }

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: timeSlots } = await supabase
    .from("time_slots")
    .select("*")
    .order("time", { ascending: true });

  const { data: extras } = await supabase
    .from("extras")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="min-h-screen bg-[#fdfbf9] font-sans text-[#4a4441]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between border-b border-[#e9cece]/20 py-6">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#e9cece] text-[#4a4441]">
              ✨
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#4a4441]">
              NailFlow
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <a
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#e9cece]"
              href="/dashboard"
            >
              <span>←</span>
              Volver
            </a>

            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#e9cece]">
              <img
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXmXt4WddBJM-K7wYibQW47fcxzeSiY0mwN5fdH4TmZCz4dmYZfKcOnilVMEDPpwZOHYOvk4FmMgReDSgOShm8-V9_fra6IX39cw47VTL5-LywEmJpFmJ8R5YO6TxNt5Yf2OcG12tEwS-lfnw8e2cVXm1jc0M3X6L0lyFp-d6H5ac2us6iON5C0dImF5itfb7_y11QYPMt-Is9wb0aTGeSumMUlj5cPxmofH4SKAaAqb0k1eob5C9o3ryJHiSKX2t8f7YpZIwgoLg"
                alt="Avatar de usuario"
              />
            </div>
          </div>
        </header>

        <main className="py-10">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#4a4441]">
                Servicios
              </h1>
              <p className="text-lg text-[#4a4441]/70">
                Gestiona los servicios que ofreces a tus clientas.
              </p>
            </div>
          </div>

          <form
            action={addService}
            className="mb-10 grid grid-cols-1 gap-4 rounded-xl border border-[#e9cece]/20 bg-white p-6 shadow-sm md:grid-cols-4"
          >
            <input
              name="name"
              type="text"
              placeholder="Nombre del servicio"
              className="rounded-xl border border-[#e9cece]/20 px-4 py-3 outline-none focus:border-[#e9cece]"
            />
            <input
              name="price"
              type="number"
              placeholder="Precio"
              className="rounded-xl border border-[#e9cece]/20 px-4 py-3 outline-none focus:border-[#e9cece]"
            />
            <input
              name="duration"
              type="number"
              placeholder="Duración en min"
              className="rounded-xl border border-[#e9cece]/20 px-4 py-3 outline-none focus:border-[#e9cece]"
            />
            <button className="rounded-xl bg-[#e9cece] px-8 py-3 font-bold text-[#4a4441] shadow-sm transition-all hover:bg-[#e2c1c1]">
              Agregar servicio
            </button>
          </form>

          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {error && (
              <p className="text-red-500">
                Error cargando servicios: {error.message}
              </p>
            )}

            {services?.map((service: any) => (
              <div
                key={service.id}
                className="flex flex-col justify-between rounded-xl border border-[#e9cece]/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-xl font-bold">{service.name}</h3>
                    <span className="text-lg font-bold text-[#e9cece]">
                      ₡{service.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-6 flex items-center gap-2 text-[#4a4441]/60">
                    <span>⏱</span>
                    <span className="text-sm">{service.duration} min</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-t border-[#e9cece]/10 pt-4">
                  <EditServiceForm
                    service={service}
                    updateService={updateService}
                  />
                  <form action={deleteService.bind(null, service.id)}>
                    <button className="flex items-center gap-1 text-sm font-medium text-red-400 transition-colors hover:text-red-500">
                      <span>🗑️</span>
                      Eliminar
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[#e9cece]">🕐</span>
              <h2 className="text-2xl font-bold text-[#4a4441]">
                Horarios disponibles
              </h2>
            </div>
            <form
              action={addTimeSlot}
              className="flex gap-4 rounded-xl border border-[#e9cece]/20 bg-white p-6 shadow-sm"
            >
              <input
                name="time"
                type="text"
                placeholder="HH:MM"
                className="rounded-xl border border-[#e9cece]/20 px-4 py-3 outline-none focus:border-[#e9cece]"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#e9cece] px-8 py-3 font-bold text-[#4a4441] shadow-sm transition-all hover:bg-[#e2c1c1]"
              >
                Agregar horario
              </button>
            </form>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {timeSlots?.length === 0 && (
                <p className="text-sm text-[#4a4441]/60 col-span-full">
                  No hay horarios configurados.
                </p>
              )}
              {timeSlots?.map((slot: any) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between rounded-xl border border-[#e9cece]/20 bg-[#e9cece]/10 px-4 py-3"
                >
                  <span className="font-semibold text-[#4a4441]">
                    {slot.time}
                  </span>
                  <form action={deleteTimeSlot.bind(null, slot.id)}>
                    <button
                      type="submit"
                      className="text-sm text-red-400 transition-colors hover:text-red-500"
                    >
                      ✕
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 mt-10">
              <div className="flex items-center gap-3">
                <span className="text-[#e9cece]">✨</span>
                <h2 className="text-2xl font-bold text-[#4a4441]">Extras</h2>
              </div>

              <form
                action={addExtra}
                className="flex gap-4 rounded-xl border border-[#e9cece]/20 bg-white p-6 shadow-sm"
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Nombre del extra"
                  className="rounded-xl border border-[#e9cece]/20 px-4 py-3 outline-none focus:border-[#e9cece] flex-1"
                />
                <input
                  name="duration"
                  type="number"
                  placeholder="Minutos extra"
                  className="rounded-xl border border-[#e9cece]/20 px-4 py-3 outline-none focus:border-[#e9cece] w-36"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#e9cece] px-8 py-3 font-bold text-[#4a4441] shadow-sm transition-all hover:bg-[#e2c1c1]"
                >
                  Agregar extra
                </button>
              </form>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {extras?.length === 0 && (
                  <p className="text-sm text-[#4a4441]/60 col-span-full">
                    No hay extras configurados.
                  </p>
                )}
                {extras?.map((extra: any) => (
                  <div
                    key={extra.id}
                    className="flex items-center justify-between rounded-xl border border-[#e9cece]/20 bg-[#e9cece]/10 px-4 py-3"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#4a4441]">
                        {extra.name}
                      </span>
                      <span className="text-xs text-[#4a4441]/60">
                        +{extra.duration} min
                      </span>
                    </div>
                    <form action={deleteExtra.bind(null, extra.id)}>
                      <button
                        type="submit"
                        className="text-sm text-red-400 transition-colors hover:text-red-500"
                      >
                        ✕
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </section>    

        </main>

        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#e9cece]/10 py-12 text-sm text-[#4a4441]/50 md:flex-row">
          <p>© 2024 NailFlow Premium SaaS. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a className="transition-colors hover:text-[#e9cece]" href="#">
              Privacidad
            </a>
            <a className="transition-colors hover:text-[#e9cece]" href="#">
              Términos
            </a>
            <a className="transition-colors hover:text-[#e9cece]" href="#">
              Soporte
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
