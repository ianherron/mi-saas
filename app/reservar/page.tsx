import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/supabase";

export default async function ReservarPage() {
  async function createAppointment(formData: FormData) {
    "use server";

    const client_name = formData.get("client_name") as string;
    const service_id = formData.get("service_id") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;

    if (!client_name || !service_id || !date || !time) {
      return;
    }

    const { data: service, error: serviceError } = await supabase
      .from("services")
      .select("*")
      .eq("id", service_id)
      .single();

    if (serviceError || !service) {
      console.error("Error obteniendo servicio:", serviceError?.message);
      return;
    }

    const { error } = await supabase.from("appointments").insert({
      client_name,
      service_id,
      date,
      time,
      duration: service.duration,
    });

    if (error) {
      console.error("Error creando cita:", error.message);
      return;
    }

    revalidatePath("/reservar");
    revalidatePath("/citas");
    revalidatePath("/dashboard");
  }

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f7f6f6] text-slate-900">
      <div className="flex h-full grow flex-col">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e9cece]/20 bg-white/50 px-6 py-4 backdrop-blur-md md:px-20 lg:px-40">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="text-[#e9cece]">✦</div>
            <h1 className="text-xl font-bold tracking-tight">NailFlow</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right md:block">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Estudio de lujo
              </p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full border border-[#e9cece]/30 bg-[#e9cece]/20">
              <span className="text-[#e9cece]">👤</span>
            </div>
          </div>
        </header>

        <main className="flex flex-1 justify-center px-4 py-8 md:px-0">
          <form
            action={createAppointment}
            className="flex w-full max-w-[800px] flex-col gap-10"
          >
            <div className="flex flex-col gap-2 px-4">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">
                Reserva tu cita
              </h2>
              <p className="text-slate-500">
                Disfruta una experiencia premium de cuidado de uñas adaptada a tu estilo.
              </p>
            </div>

            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece] text-sm font-bold text-slate-900">
                  1
                </span>
                <h3 className="text-xl font-bold">Selecciona el servicio</h3>
              </div>

              {error && (
                <p className="px-4 text-red-500">
                  Error cargando servicios: {error.message}
                </p>
              )}

              <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
                {services?.map((service: any, index: number) => (
                  <label
                    key={service.id}
                    className={`group relative flex cursor-pointer flex-col gap-3 rounded-xl border-2 bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                      index === 0
                        ? "border-[#e9cece]"
                        : "border-transparent hover:border-[#e9cece]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="service_id"
                      value={service.id}
                      defaultChecked={index === 0}
                      className="sr-only"
                    />

                    {index === 0 && (
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
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-4 px-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece]/30 text-sm font-bold text-slate-900">
                  2
                </span>
                <h3 className="text-xl font-bold">Extras opcionales</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-[#e9cece] bg-[#e9cece]/10 px-4 py-2 text-slate-900 transition-colors"
                >
                  <span className="text-sm">+</span>
                  <span className="text-sm font-medium">Retiro (+30 min)</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 transition-colors hover:border-[#e9cece]"
                >
                  <span className="text-sm">+</span>
                  <span className="text-sm font-medium">Diseño (+20 min)</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 transition-colors hover:border-[#e9cece]"
                >
                  <span className="text-sm">+</span>
                  <span className="text-sm font-medium">Arte complejo (+60 min)</span>
                </button>
              </div>
            </section>

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
                  className="rounded-lg border border-slate-200 bg-white py-3 px-4 focus:border-[#e9cece] focus:ring-[#e9cece]"
                />

                <select
                  name="time"
                  className="rounded-lg border border-slate-200 bg-white py-3 px-4 focus:border-[#e9cece] focus:ring-[#e9cece]"
                  defaultValue="10:00"
                >
                  <option value="10:00">10:00</option>
                  <option value="11:30">11:30</option>
                  <option value="13:00">13:00</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>
            </section>

            <section className="px-4">
              <div className="rounded-xl border border-[#e9cece]/30 bg-white p-6 shadow-sm ring-1 ring-[#e9cece]/10">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#e9cece]/20">
                      <span className="text-[#e9cece]">📅</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                        Cita seleccionada
                      </p>
                      <p className="text-lg font-bold">
                        La duración se calculará según el servicio elegido
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full gap-8 border-t border-slate-100 pt-4 md:w-auto md:border-t-0 md:border-l md:pt-0 md:pl-8">
                    <div>
                      <p className="text-xs uppercase text-slate-500">Estado</p>
                      <p className="text-lg font-bold">Lista para reservar</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

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
                    className="rounded-lg border border-slate-200 bg-white py-3 px-4 focus:border-[#e9cece] focus:ring-[#e9cece]"
                    placeholder="jane@example.com"
                    type="email"
                  />
                </div>
              </div>
            </section>

            <div className="px-4 pb-20">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e9cece] py-5 text-lg font-bold text-slate-900 shadow-lg shadow-[#e9cece]/20 transition-all hover:bg-[#e0c2c2]">
                <span>Confirmar cita</span>
                <span>→</span>
              </button>
              <p className="mt-4 text-center text-xs text-slate-400">
                Al confirmar, aceptas nuestros términos y condiciones de reserva.
              </p>
            </div>
          </form>
        </main>

        <footer className="mt-auto border-t border-slate-200 bg-white px-4 py-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <span>✦</span>
              <span className="font-bold">NailFlow</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2024 NailFlow Premium Studio. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}