"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";

export default function ProfileImageUpload({
  currentUrl,
  ownerInitial,
  updateProfileImage,
}: {
  currentUrl?: string | null;
  ownerInitial: string;
  updateProfileImage: (url: string) => Promise<void>;
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
    if (file.size > 3 * 1024 * 1024) {
      toast.error("La imagen no puede superar 3MB");
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
        .from("profile-images")
        .upload(fileName, file);

      if (error || !data) {
        toast.error("Error al subir la imagen");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("profile-images")
        .getPublicUrl(data.path);

      await updateProfileImage(urlData.publicUrl);
      setPreview(urlData.publicUrl);
      toast.success("Foto de perfil actualizada");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-5">
      <label className="group relative cursor-pointer">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white shadow-md ring-2 ring-[#e9cece]/40 transition-opacity group-hover:opacity-80">
          {preview ? (
            <img
              src={preview}
              alt="Foto de perfil"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#e9cece] text-2xl font-semibold text-[#2d2424]">
              {ownerInitial}
            </div>
          )}
        </div>
        <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#2d2424] text-white shadow">
          <span className="text-xs">{uploading ? "…" : "✎"}</span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={uploading}
          className="hidden"
        />
      </label>
      <div>
        <p className="text-sm font-medium text-slate-700">
          {preview ? "Cambiar foto de perfil" : "Subir foto de perfil"}
        </p>
        <p className="mt-0.5 text-xs text-slate-400">
          Máximo 3MB · Se muestra en tu página de reservas
        </p>
      </div>
    </div>
  );
}
