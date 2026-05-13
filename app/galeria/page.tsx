import { createClient, getBusiness } from "../../lib/supabase-server";
import { revalidatePath } from "next/cache";
import { Upload } from "lucide-react";
import GalleryManager from "../servicios/GalleryManager";
import AppSidebar, { AppMobileHeader } from "../_components/AppSidebar";

const TARGET = 12;

export default async function GaleriaPage() {
  const supabase = await createClient();
  const business = await getBusiness();

  if (!business) return <p>No se encontró tu negocio.</p>;

  async function deleteGalleryImage(id: number) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;
    await supabase
      .from("gallery")
      .delete()
      .eq("id", id)
      .eq("business_id", business.id);
    revalidatePath("/galeria");
  }

  const { data: galleryImages } = await supabase
    .from("gallery")
    .select("*")
    .eq("business_id", business.id)
    .order("created_at", { ascending: false });

  const count = galleryImages?.length ?? 0;
  const progress = Math.min(100, (count / TARGET) * 100);
  const remaining = Math.max(0, TARGET - count);

  return (
    <div className="min-h-screen bg-[#fbf9f9] font-sans text-[#2d2424] lg:flex">
      <AppSidebar active="galeria" />

      <div className="min-w-0 flex-1">
        <AppMobileHeader />
        <main className="mx-auto max-w-7xl px-4 py-8 lg:px-10 lg:py-10">
          {/* Editorial header */}
          <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                {count} fotos {remaining > 0 ? `· faltan ${remaining} para completar` : "· completa"}
              </p>
              <h1 className="serif-heading mt-2 text-3xl font-medium leading-tight tracking-tight lg:text-4xl">
                Tu galería,{" "}
                <em className="font-normal italic text-[#846262]">tu escaparate</em>.
              </h1>
            </div>
          </header>

          {/* Progress + tip card */}
          <div className="mb-5 grid grid-cols-1 gap-3.5 lg:grid-cols-[1.4fr_1fr]">
            {/* Progress card */}
            <section className="rounded-2xl border border-[#2d2424]/[0.08] bg-white p-5 sm:p-6">
              <div className="mb-2 flex items-end justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Progreso
                </p>
                <span className="serif-heading text-xl tracking-tight text-[#2d2424]">
                  {count}
                  <span className="text-sm text-[#b89090]"> / {TARGET}</span>
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#f4ecec]">
                <div className="h-full bg-[#2d2424]" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-[#846262]">
                Recomendamos al menos{" "}
                <span className="font-medium text-[#2d2424]">12 fotos</span> para que tu página de reservas se sienta completa.
              </p>
            </section>

            {/* Tip card (dark) */}
            <section className="relative overflow-hidden rounded-2xl bg-[#2d2424] p-5 text-[#fbf9f9] sm:p-6">
              <span
                aria-hidden
                className="serif-heading pointer-events-none absolute -right-4 -top-6 text-[110px] leading-none text-[#e9cece]/10"
              >
                ✦
              </span>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
                Tip
              </p>
              <p className="serif-heading mt-2 text-lg font-medium leading-tight tracking-tight sm:text-xl">
                Las páginas con{" "}
                <em className="font-normal italic text-[#e9cece]">12+ fotos</em>{" "}
                reciben 3× más reservas.
              </p>
            </section>
          </div>

          {/* Dropzone + grid (handled by existing GalleryManager) */}
          <section className="overflow-hidden rounded-3xl border border-[#2d2424]/[0.08] bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2d2424]/[0.06] px-5 py-4 sm:px-6">
              <div>
                <p className="text-sm font-medium text-[#2d2424]">Mis trabajos</p>
                <p className="mt-0.5 text-xs text-[#846262]">
                  Arrastrá fotos o usá el botón para subir
                </p>
              </div>
              <div className="hidden items-center gap-2 text-[#b89090] sm:flex">
                <Upload className="h-4 w-4" />
                <span className="text-xs">JPG, PNG · hasta 5MB</span>
              </div>
            </div>
            <GalleryManager
              businessId={business.id}
              images={galleryImages ?? []}
              deleteImage={deleteGalleryImage}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
