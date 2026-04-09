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

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileCount = files.length; 
    setUploading(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        toast.error("Solo se permiten imágenes");
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La imagen no puede superar 5MB");
        continue;
      }
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const fileName = `${businessId}/${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage
        .from("gallery-images")
        .upload(fileName, file);

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from("gallery-images")
          .getPublicUrl(data.path);

        const { data: inserted } = await supabase
          .from("gallery")
          .insert({ business_id: businessId, image_url: urlData.publicUrl })
          .select()
          .single();

        if (inserted) {
          setLocalImages((prev) => [...prev, inserted]);
        }
      }
    }

    setUploading(false);
    e.target.value = "";
    toast.success("Fotos subidas correctamente", {
    description: `${fileCount} foto${fileCount > 1 ? "s" : ""} agregada${fileCount > 1 ? "s" : ""} a la galería.`,
  });

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
            disabled={uploading}
            className="hidden"
          />
        </label>
        <p className="mt-1 text-xs text-slate-400">Puedes subir varias fotos a la vez</p>
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