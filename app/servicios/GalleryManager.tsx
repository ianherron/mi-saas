"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";

type GalleryImage = {
  id: number;
  image_url: string;
};

export default function GalleryManager({
  businessId,
  images,
  deleteImage,
}: {
  businessId: string;
  images: GalleryImage[];
  deleteImage: (id: number) => Promise<void>;
}) {
  const [uploading, setUploading] = useState(false);
  const [localImages, setLocalImages] = useState<GalleryImage[]>(images);

  const MAX_PHOTOS = 12;

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remaining = MAX_PHOTOS - localImages.length;
    if (remaining <= 0) {
      toast.error("Límite alcanzado", { description: "La galería permite un máximo de 12 fotos." });
      e.target.value = "";
      return;
    }

    const validFiles = Array.from(files)
      .filter((f) => {
        if (!f.type.startsWith("image/")) { toast.error(`"${f.name}" no es una imagen`); return false; }
        if (f.size > 5 * 1024 * 1024) { toast.error(`"${f.name}" supera 5MB`); return false; }
        return true;
      })
      .slice(0, remaining);

    if (validFiles.length < files.length && remaining > 0) {
      toast.warning(`Solo se subirán ${validFiles.length} foto${validFiles.length !== 1 ? "s" : ""} para no superar el límite de 12.`);
    }

    if (validFiles.length === 0) { e.target.value = ""; return; }

    setUploading(true);
    const toastId = "gallery-upload";
    toast.loading(`Subiendo 0 de ${validFiles.length}...`, { id: toastId });

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    let uploaded = 0;
    for (const file of validFiles) {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const fileName = `${businessId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage.from("gallery-images").upload(fileName, file);

      if (!error && data) {
        const { data: urlData } = supabase.storage.from("gallery-images").getPublicUrl(data.path);
        const { data: inserted } = await supabase
          .from("gallery")
          .insert({ business_id: businessId, image_url: urlData.publicUrl })
          .select()
          .single();
        if (inserted) setLocalImages((prev) => [...prev, inserted]);
      }

      uploaded++;
      toast.loading(`Subiendo ${uploaded} de ${validFiles.length}...`, { id: toastId });
    }

    setUploading(false);
    e.target.value = "";
    toast.success(`${uploaded} foto${uploaded !== 1 ? "s" : ""} agregada${uploaded !== 1 ? "s" : ""} correctamente`, { id: toastId });
  }

  async function handleDelete(id: number) {
    await deleteImage(id);
    setLocalImages((prev) => prev.filter((img) => img.id !== id));
    toast.success("Foto eliminada correctamente");
    
  }

  return (
    <div className="p-5">
      <div className="mb-4">
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500 transition-colors hover:border-[#e9cece] hover:text-[#2d2424] w-fit">
          {uploading ? "Subiendo..." : "＋ Subir fotos"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading || localImages.length >= MAX_PHOTOS}
            className="hidden"
          />
        </label>
        <p className="mt-1 text-xs text-slate-400">
          {localImages.length >= MAX_PHOTOS
            ? "Límite de 12 fotos alcanzado."
            : `${localImages.length}/12 fotos · podés subir varias a la vez`}
        </p>
      </div>

      {localImages.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-4">No hay fotos en la galería.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {localImages.map((img) => (
            <div key={img.id} className="group relative">
              <img
                src={img.image_url}
                alt="Trabajo"
                className="aspect-square w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => handleDelete(img.id)}
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}