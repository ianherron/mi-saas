"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";

export default function CoverImageUpload({
  currentUrl,
  updateCoverImage,
}: {
  currentUrl?: string | null;
  updateCoverImage: (url: string) => Promise<void>;
}) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [uploading, setUploading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten imágenes");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no puede superar 5MB");
      return;
    }

    setUploading(true);
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      );

      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const fileName = `${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage
        .from("cover-images")
        .upload(fileName, file);

      if (error || !data) {
        toast.error("Error al subir la imagen");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("cover-images")
        .getPublicUrl(data.path);

      await updateCoverImage(urlData.publicUrl);
      setPreview(urlData.publicUrl);
      toast.success("Foto de portada actualizada");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {preview && (
        <img
          src={preview}
          alt="Portada actual"
          className="h-32 w-full rounded-lg object-cover border border-slate-200"
        />
      )}
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500 transition-colors hover:border-[#e9cece] hover:text-[#2d2424]">
        <span>🖼️</span>
        <span>{uploading ? "Subiendo..." : preview ? "Cambiar foto de portada" : "Subir foto de portada"}</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={uploading}
          className="hidden"
        />
      </label>
      <p className="text-xs text-slate-400">
        Máximo 5MB · Se muestra arriba de tu página de reservas
      </p>
    </div>
  );
}
