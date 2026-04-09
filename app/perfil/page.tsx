import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, getBusiness } from "../../lib/supabase-server";
import {
  LayoutDashboard, Clock, Scissors, Images, CreditCard, BarChart3, Sparkles, User,
} from "lucide-react";
import LogoutButton from "../dashboard/LogoutButton";
import CoverImageUpload from "./CoverImageUpload";

export default async function PerfilPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const business = await getBusiness();

  if (!business) return <p>No se encontró tu negocio.</p>;

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

    const RESERVED_SLUGS = ["api", "admin", "dashboard", "login", "registrar", "servicios", "citas", "galeria", "pagos", "reportes", "perfil", "suscripcion", "bienvenida", "reservar"];
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
    const cancellation_policy = (formData.get("cancellation_policy") as string)?.trim().slice(0, 300) || null;

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

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-slate-100 bg-white lg:flex">
        <div className="flex h-14 items-center gap-2 border-b border-slate-100 px-5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="serif-heading text-sm font-semibold tracking-tight">
            NailFlow
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <a
            href="/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </a>
          <a
            href="/citas"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Clock className="h-4 w-4" /> Citas
          </a>
          <a
            href="/servicios"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Scissors className="h-4 w-4" /> Servicios
          </a>
          <a
            href="/galeria"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Images className="h-4 w-4" /> Galería
          </a>
          <a
            href="/pagos"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <CreditCard className="h-4 w-4" /> Pagos
          </a>
          <a
            href="/reportes"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <BarChart3 className="h-4 w-4" /> Reportes
          </a>
          <a
            href="/perfil"
            className="flex items-center gap-3 rounded-md bg-[#e9cece]/20 px-3 py-2 text-sm font-medium text-slate-900"
          >
            <User className="h-4 w-4" /> Perfil
          </a>
        </nav>
        <div className="border-t border-slate-100 p-3">
          <div className="flex items-center justify-between rounded-md px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                {business.owner_name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-700 truncate max-w-[100px]">
                {business.owner_name}
              </span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-100 bg-white px-4 lg:hidden"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 0px)",
          height: "calc(3.5rem + env(safe-area-inset-top))",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="serif-heading text-sm font-semibold">NailFlow</span>
        </div>
        <a
          href="/dashboard"
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Volver
        </a>
      </header>

      {/* Main content */}
      <div className="lg:pl-60">
        <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-10">
          <div className="mb-8">
            <h1 className="serif-heading text-2xl font-semibold tracking-tight text-slate-900">
              Perfil
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Actualiza la información de tu negocio.
            </p>
          </div>

          {params.error && (
            <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {params.error}
            </div>
          )}

          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Información del negocio
              </h2>
            </div>
            <form action={updateProfile} className="divide-y divide-slate-50">
              <div className="px-5 py-4">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Nombre del negocio
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={business.name ?? ""}
                  required
                  maxLength={100}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#e9cece] transition-colors"
                />
              </div>
              <div className="px-5 py-4">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Nombre de la manicurista
                </label>
                <input
                  name="owner_name"
                  type="text"
                  defaultValue={business.owner_name ?? ""}
                  required
                  maxLength={100}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#e9cece] transition-colors"
                />
              </div>
              <div className="px-5 py-4">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Slug (URL de reservas)
                </label>
                <input
                  name="slug"
                  type="text"
                  defaultValue={business.slug ?? ""}
                  required
                  maxLength={60}
                  pattern="[a-z0-9-]+"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#e9cece] transition-colors"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Preview:{" "}
                  <span className="font-medium text-[#2d2424]">
                    nailflow.app/reservar/{business.slug}
                  </span>
                </p>
              </div>
              <div className="px-5 py-4">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Bio del negocio
                </label>
                <textarea
                  name="bio"
                  defaultValue={(business as any).bio ?? ""}
                  placeholder="Cuéntales a tus clientas sobre tu trabajo..."
                  maxLength={300}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#e9cece] transition-colors"
                />
                <p className="mt-1 text-xs text-slate-400">Máximo 300 caracteres · Se muestra en tu página de reservas</p>
              </div>
              <div className="px-5 py-4">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Política de cancelación
                </label>
                <textarea
                  name="cancellation_policy"
                  defaultValue={(business as any).cancellation_policy ?? ""}
                  placeholder="Ej. Se requiere aviso de 24 horas para cancelar..."
                  maxLength={700}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#e9cece] transition-colors"
                />
                <p className="mt-1 text-xs text-slate-400">Máximo 700 caracteres · Se muestra antes del botón de confirmar cita</p>
              </div>
              <div className="px-5 py-4">
                <button
                  type="submit"
                  className="rounded-lg bg-[#e9cece] px-4 py-2 text-sm font-medium text-[#2d2424] transition-colors hover:bg-[#dbbcbc]"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>

          {/* Foto de portada */}
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-100 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-900">Foto de portada</h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Se muestra como banner arriba de tu página de reservas.
              </p>
            </div>
            <div className="px-5 py-4">
              <CoverImageUpload
                currentUrl={(business as any).cover_image_url}
                updateCoverImage={updateCoverImage}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
