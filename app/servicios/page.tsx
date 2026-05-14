import { revalidatePath } from "next/cache";
import { createClient, getBusiness } from "../../lib/supabase-server";
import { Plus } from "lucide-react";
import EditServiceForm from "./EditServiceForm";
import AddServiceForm from "./AddServiceForm";
import DeleteButton from "./DeleteButton";
import { AddExtraForm, AddTimeSlotForm, WorkingDaysForm } from "./ServiciosToasts";
import AppSidebar, { AppMobileHeader } from "../_components/AppSidebar";
import ServiciosTabs from "./ServiciosTabs";

type Tab = "servicios" | "extras" | "horarios";

export default async function ServiciosPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const tab: Tab =
    params.tab === "extras" || params.tab === "horarios"
      ? params.tab
      : "servicios";

  const supabase = await createClient();
  const business = await getBusiness();
  if (!business) return <p>No se encontró tu negocio.</p>;

  // ---------- Server actions (unchanged) ----------
  async function addService(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const duration = Number(formData.get("duration"));
    const description = formData.get("description") as string;
    const image_url = formData.get("image_url") as string;
    const category = (formData.get("category") as string)?.trim().slice(0, 50) || "General";

    if (!name?.trim() || name.trim().length < 2) return;
    if (isNaN(price) || price <= 0 || price > 10000000) return;
    if (isNaN(duration) || duration <= 0 || duration > 480) return;
    if (name.length > 100) return;

    await supabase.from("services").insert({
      name, price, duration, description, image_url, category, business_id: business.id,
    });
    revalidatePath("/servicios");
  }

  async function deleteService(id: string) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;
    await supabase.from("services").delete().eq("id", id).eq("business_id", business.id);
    revalidatePath("/servicios");
  }

  async function updateService(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const duration = Number(formData.get("duration"));
    const description = formData.get("description") as string;
    const image_url = formData.get("image_url") as string;
    const category = (formData.get("category") as string)?.trim().slice(0, 50) || "General";

    if (!id || !name?.trim()) return;
    if (isNaN(price) || price <= 0 || price > 10000000) return;
    if (isNaN(duration) || duration <= 0 || duration > 480) return;

    await supabase
      .from("services")
      .update({
        name, price, duration, description,
        image_url: image_url || undefined, category,
      })
      .eq("id", id)
      .eq("business_id", business.id);
    revalidatePath("/servicios");
  }

  async function addTimeSlot(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;
    const hour = formData.get("hour") as string;
    const period = formData.get("period") as string;
    if (!hour || !period) return;
    if (!/^(1[0-2]|[1-9]):[03]0$/.test(hour)) return;
    if (period !== "AM" && period !== "PM") return;
    const formatted = `${hour} ${period}`;
    await supabase.from("time_slots").insert({ time: formatted, business_id: business.id });
    revalidatePath("/servicios");
  }

  async function deleteTimeSlot(id: number) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;
    await supabase.from("time_slots").delete().eq("id", id).eq("business_id", business.id);
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
    await supabase
      .from("extras")
      .insert({ name, duration, price, business_id: business.id });
    revalidatePath("/servicios");
  }

  async function deleteExtra(id: number) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;
    await supabase.from("extras").delete().eq("id", id).eq("business_id", business.id);
    revalidatePath("/servicios");
  }

  async function saveWorkingDays(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;

    const days = [0, 1, 2, 3, 4, 5, 6].filter(
      (d) => formData.get(`day_${d}`) === "on",
    );
    if (days.length === 0) return;

    await supabase.from("working_days").delete().eq("business_id", business.id);
    if (days.length > 0) {
      await supabase
        .from("working_days")
        .insert(days.map((day) => ({ day, business_id: business.id })));
    }
    revalidatePath("/servicios");
  }

  // ---------- Data ----------
  const [{ data: services }, { data: timeSlots }, { data: extras }, { data: workingDaysData }] =
    await Promise.all([
      supabase.from("services").select("*").eq("business_id", business.id).order("created_at", { ascending: true }),
      supabase.from("time_slots").select("*").eq("business_id", business.id).order("time", { ascending: true }),
      supabase.from("extras").select("*").eq("business_id", business.id).order("created_at", { ascending: true }),
      supabase.from("working_days").select("day").eq("business_id", business.id),
    ]);

  const workingDaysList = workingDaysData?.map((d) => d.day) ?? [];

  const categories = [
    ...new Set(
      (services ?? []).map((s: any) => s.category).filter((c: any) => c && c !== "General")
    ),
  ] as string[];

  return (
    <div className="min-h-screen bg-[#fbf9f9] font-sans text-[#2d2424]">
      <AppSidebar active="servicios" />
      <AppMobileHeader active="servicios" />

      <div className="lg:pl-[220px]">
        <main className="mx-auto max-w-7xl px-4 py-8 lg:px-10 lg:py-10">
          {/* Editorial header */}
          <header className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                {services?.length ?? 0} servicios · {extras?.length ?? 0} extras · {timeSlots?.length ?? 0} horarios
              </p>
              <h1 className="serif-heading mt-2 text-3xl font-medium leading-tight tracking-tight lg:text-4xl">
                Tu catálogo,{" "}
                <em className="font-normal italic text-[#846262]">tu marca</em>.
              </h1>
            </div>
          </header>

          {/* Tabs */}
          <ServiciosTabs
            tab={tab}
            counts={{
              servicios: services?.length ?? 0,
              extras: extras?.length ?? 0,
              horarios: timeSlots?.length ?? 0,
            }}
          />

          {/* ----- Servicios tab ----- */}
          {tab === "servicios" && (
            <>
              {/* Add form */}
              <section className="mb-5 overflow-hidden rounded-2xl border border-dashed border-[#e9cece] bg-white">
                <div className="px-5 py-3.5 border-b border-[#2d2424]/[0.06]">
                  <p className="text-sm font-medium text-[#2d2424]">Agregar servicio</p>
                </div>
                <AddServiceForm addService={addService} categories={categories} />
              </section>

              {/* Service grid */}
              {!services?.length ? (
                <div className="rounded-3xl border border-dashed border-[#e9cece] bg-white p-10 text-center">
                  <p className="text-sm text-[#b89090]">
                    No hay servicios todavía. Agregá uno arriba.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {services.map((service: any) => (
                    <article
                      key={service.id}
                      className="overflow-hidden rounded-2xl border border-[#2d2424]/[0.08] bg-white"
                    >
                      {/* Image / placeholder */}
                      <div
                        className="relative flex aspect-video w-full items-center justify-center"
                        style={{
                          background: service.image_url
                            ? `linear-gradient(135deg, #e9cece, #b89090)`
                            : "#f4ecec",
                        }}
                      >
                        {service.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={service.image_url}
                            alt={service.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="serif-heading text-3xl text-[#b89090]/50">✦</span>
                        )}
                        {service.category && service.category !== "General" && (
                          <span className="absolute left-2.5 top-2.5 rounded-full bg-[#2d2424] px-2.5 py-1 text-[10px] font-medium text-[#fbf9f9]">
                            {service.category}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="serif-heading text-lg font-medium tracking-tight text-[#2d2424]">
                            {service.name}
                          </h3>
                          <p className="serif-heading shrink-0 text-lg font-medium text-[#2d2424]">
                            ₡{service.price.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-[#846262]">
                          {service.duration} min
                          {service.description ? ` · ${service.description}` : ""}
                        </p>
                        <div className="mt-1.5 flex gap-1.5">
                          <div className="flex-1">
                            <EditServiceForm service={service} updateService={updateService} categories={categories} />
                          </div>
                          <DeleteButton action={deleteService.bind(null, service.id)} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Tip */}
              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#f4ecec] p-4">
                <span className="text-base text-[#b89090]">✦</span>
                <p className="text-[13px] leading-relaxed text-[#846262]">
                  <span className="font-medium text-[#2d2424]">Tip:</span>{" "}
                  servicios con foto convierten 3× más. Subí al menos una imagen por servicio.
                </p>
              </div>
            </>
          )}

          {/* ----- Extras tab ----- */}
          {tab === "extras" && (
            <>
              <section className="mb-5 overflow-hidden rounded-2xl border border-dashed border-[#e9cece] bg-white">
                <div className="px-5 py-3.5 border-b border-[#2d2424]/[0.06]">
                  <p className="text-sm font-medium text-[#2d2424]">Agregar extra</p>
                </div>
                <AddExtraForm addExtra={addExtra} />
              </section>

              {!extras?.length ? (
                <div className="rounded-3xl border border-dashed border-[#e9cece] bg-white p-10 text-center">
                  <p className="text-sm text-[#b89090]">No hay extras configurados.</p>
                </div>
              ) : (
                <ul className="overflow-hidden rounded-2xl border border-[#2d2424]/[0.08] bg-white divide-y divide-[#2d2424]/[0.06]">
                  {extras.map((extra: any) => (
                    <li key={extra.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#2d2424] truncate">{extra.name}</p>
                        <p className="text-xs text-[#846262]">
                          +{extra.duration} min · ₡{(extra.price ?? 0).toLocaleString()}
                        </p>
                      </div>
                      <DeleteButton action={deleteExtra.bind(null, extra.id)} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* ----- Horarios y días tab ----- */}
          {tab === "horarios" && (
            <>
              <section className="mb-5 overflow-hidden rounded-2xl border border-[#2d2424]/[0.08] bg-white">
                <div className="px-5 py-3.5 border-b border-[#2d2424]/[0.06]">
                  <p className="text-sm font-medium text-[#2d2424]">Horarios disponibles</p>
                  <p className="mt-0.5 text-xs text-[#846262]">
                    Las horas que tus clientas pueden elegir al reservar.
                  </p>
                </div>
                <AddTimeSlotForm addTimeSlot={addTimeSlot} />

                {!timeSlots?.length ? (
                  <div className="px-5 py-6 text-center">
                    <p className="text-sm text-[#b89090]">No hay horarios configurados.</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 px-6 py-5 sm:px-7">
                    {timeSlots.map((slot: any) => (
                      <span
                        key={slot.id}
                        className="inline-flex items-center gap-2 rounded-full bg-[#f4ecec] px-3.5 py-1.5 text-[13px] font-medium text-[#2d2424]"
                      >
                        {slot.time}
                        <DeleteButton action={deleteTimeSlot.bind(null, slot.id)} compact />
                      </span>
                    ))}
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-2xl border border-[#2d2424]/[0.08] bg-white">
                <div className="px-5 py-3.5 border-b border-[#2d2424]/[0.06]">
                  <p className="text-sm font-medium text-[#2d2424]">Días de trabajo</p>
                  <p className="mt-0.5 text-xs text-[#846262]">
                    Elegí los días que atendés clientas.
                  </p>
                </div>
                <WorkingDaysForm
                  saveWorkingDays={saveWorkingDays}
                  workingDaysList={workingDaysList}
                />
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
