import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, getBusiness } from "../../lib/supabase-server";
import CoverImageUpload from "./CoverImageUpload";
import ProfileImageUpload from "./ProfileImageUpload";
import AppSidebar, { AppMobileHeader } from "../_components/AppSidebar";

const RESERVED_SLUGS = [
  "api","admin","dashboard","login","registrar","servicios","citas","galeria",
  "pagos","reportes","perfil","suscripcion","bienvenida","reservar",
];

export default async function PerfilPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const business = await getBusiness();
  if (!business) return <p>No se encontró tu negocio.</p>;

  // ---------- Actions (unchanged) ----------
  async function updateProfile(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;

    const name = (formData.get("name") as string)?.trim();
    const owner_name = (formData.get("owner_name") as string)?.trim();
    const slug = (formData.get("slug") as string)
      ?.trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!name || !owner_name || !slug) return;

    if (RESERVED_SLUGS.includes(slug)) {
      redirect("/perfil?error=Este enlace no está disponible");
    }

    const { data: existingSlug } = await supabase
      .from("businesses")
      .select("id")
      .eq("slug", slug)
      .neq("id", business.id)
      .single();

    if (existingSlug) {
      redirect("/perfil?error=Este enlace ya está en uso por otro negocio");
    }

    const bio = (formData.get("bio") as string)?.trim().slice(0, 300) || null;
    const cancellation_policy =
      (formData.get("cancellation_policy") as string)?.trim().slice(0, 700) || null;

    await supabase
      .from("businesses")
      .update({ name, owner_name, slug, bio, cancellation_policy })
      .eq("id", business.id);

    revalidatePath("/perfil");
  }

  async function updateCoverImage(url: string) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;
    await supabase
      .from("businesses")
      .update({ cover_image_url: url })
      .eq("id", business.id);
    revalidatePath("/perfil");
  }

  async function updateProfileImage(url: string) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;
    await supabase
      .from("businesses")
      .update({ profile_image_url: url })
      .eq("id", business.id);
    revalidatePath("/perfil");
  }

  const ownerInitial = business.owner_name?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="min-h-screen bg-[#fbf9f9] font-sans text-[#2d2424]">
      <AppSidebar active="perfil" />
      <AppMobileHeader />

      <div className="lg:pl-[220px]">
        <main className="mx-auto max-w-7xl px-4 py-8 lg:px-10 lg:py-10">
          {/* Editorial header */}
          <header className="mb-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
              Cómo te ven tus clientas
            </p>
            <h1 className="serif-heading mt-2 text-3xl font-medium leading-tight tracking-tight lg:text-4xl">
              Tu perfil,{" "}
              <em className="font-normal italic text-[#846262]">tu carta de presentación</em>.
            </h1>
          </header>

          {params.error && (
            <div className="mb-5 rounded-2xl bg-[#b86060]/10 px-4 py-3 text-sm text-[#b86060]">
              {params.error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr] lg:gap-5">
            {/* Left column: form */}
            <form action={updateProfile} className="flex flex-col gap-4">
              {/* Identidad */}
              <section className="flex flex-col gap-3.5 rounded-3xl border border-[#2d2424]/[0.08] bg-white p-5 sm:p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Identidad
                </p>
                <Field
                  label="Nombre del negocio"
                  name="name"
                  defaultValue={business.name ?? ""}
                  required
                  maxLength={100}
                />
                <Field
                  label="Nombre de la manicurista"
                  name="owner_name"
                  defaultValue={business.owner_name ?? ""}
                  required
                  maxLength={100}
                />
                <Field
                  label="Enlace de reservas"
                  name="slug"
                  defaultValue={business.slug ?? ""}
                  required
                  maxLength={60}
                  pattern="[a-z0-9-]+"
                  prefix="nailflow.app/reservar/"
                  hint="Cambialo solo si es necesario — las clientas pueden tenerlo guardado."
                />
              </section>

              {/* Voz */}
              <section className="flex flex-col gap-3.5 rounded-3xl border border-[#2d2424]/[0.08] bg-white p-5 sm:p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Voz
                </p>
                <Field
                  label="Bio"
                  name="bio"
                  defaultValue={(business as any).bio ?? ""}
                  placeholder="Una línea con personalidad funciona mejor que un párrafo."
                  multiline
                  maxLength={300}
                  hint="Aparece debajo de tu nombre en la página de reservas. Máximo 300 caracteres."
                />
                <Field
                  label="Política de cancelación"
                  name="cancellation_policy"
                  defaultValue={(business as any).cancellation_policy ?? ""}
                  placeholder="Ej. Se requiere aviso de 24 horas para cancelar sin penalidad."
                  multiline
                  maxLength={700}
                  hint="Se muestra antes del botón de confirmar cita."
                />
              </section>

              {/* Visuales */}
              <section className="rounded-3xl border border-[#2d2424]/[0.08] bg-white p-5 sm:p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Visuales
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium text-[#2d2424]">Foto de perfil</p>
                    <ProfileImageUpload
                      currentUrl={(business as any).profile_image_url}
                      ownerInitial={ownerInitial}
                      updateProfileImage={updateProfileImage}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-[#2d2424]">Foto de portada</p>
                    <CoverImageUpload
                      currentUrl={(business as any).cover_image_url}
                      updateCoverImage={updateCoverImage}
                    />
                  </div>
                </div>
              </section>

              {/* Actions */}
              <div className="flex gap-2.5">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2d2424] px-5 py-2.5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
                >
                  Guardar cambios
                </button>
              </div>
            </form>

            {/* Right column: preview */}
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <PreviewCard business={business} ownerInitial={ownerInitial} />
              <div className="mt-3.5 rounded-2xl bg-[#f4ecec] p-4">
                <p className="text-xs leading-relaxed text-[#846262]">
                  <span className="font-medium text-[#2d2424]">Vista previa</span> de cómo te ven las clientas al abrir tu enlace de reservas.
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

// ---- subcomponents ----
function Field({
  label, name, defaultValue, prefix, hint, multiline,
  placeholder, required, maxLength, pattern,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  prefix?: string;
  hint?: string;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
        {label}
      </p>
      <div
        className={[
          "flex gap-2 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 py-2.5",
          multiline ? "items-start" : "items-center",
        ].join(" ")}
      >
        {prefix && (
          <span className="shrink-0 text-sm text-[#846262]">{prefix}</span>
        )}
        {multiline ? (
          <textarea
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={3}
            className="w-full resize-none bg-transparent text-sm leading-relaxed text-[#2d2424] outline-none placeholder:text-[#b89090]"
          />
        ) : (
          <input
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
            pattern={pattern}
            className="w-full bg-transparent text-sm text-[#2d2424] outline-none placeholder:text-[#b89090]"
          />
        )}
      </div>
      {hint && (
        <p className="mt-1.5 text-xs leading-relaxed text-[#846262]">{hint}</p>
      )}
    </div>
  );
}

function PreviewCard({ business, ownerInitial }: { business: any; ownerInitial: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#2d2424]/[0.08] bg-[#fbf9f9]">
      <div
        className="relative aspect-[16/7] w-full"
        style={{
          background: business.cover_image_url
            ? `url('${business.cover_image_url}') center/cover`
            : "linear-gradient(135deg, #e9cece, #b89090)",
        }}
      />
      <div className="relative px-5 pb-6 pt-0 text-center">
        <div className="-mt-9 inline-flex">
          {business.profile_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={business.profile_image_url}
              alt={business.owner_name ?? business.name}
              className="h-[68px] w-[68px] rounded-full border-4 border-[#fbf9f9] object-cover"
            />
          ) : (
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-4 border-[#fbf9f9] bg-[#e9cece]">
              <span className="serif-heading text-2xl font-medium text-[#2d2424]">
                {ownerInitial}
              </span>
            </div>
          )}
        </div>
        <p className="serif-heading mt-2 text-xl font-semibold tracking-tight text-[#2d2424]">
          {business.name || "Tu negocio"}
        </p>
        {business.owner_name && (
          <p className="mt-0.5 text-xs text-[#846262]">by {business.owner_name}</p>
        )}
        {business.bio && (
          <p className="mx-auto mt-3 max-w-[260px] text-xs leading-relaxed text-[#846262]">
            {business.bio}
          </p>
        )}
      </div>
    </div>
  );
}
