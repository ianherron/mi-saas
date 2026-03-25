"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function AddServiceForm({
  addService,
}: {
  addService: (formData: FormData) => Promise<void>;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);

    if (imageFile) {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      );

      const fileName = `${Date.now()}-${imageFile.name}`;
      const { data, error } = await supabase.storage
        .from("service-images")
        .upload(fileName, imageFile);

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from("service-images")
          .getPublicUrl(data.path);
        formData.set("image_url", urlData.publicUrl);
      }
    }

    await addService(formData);
    setUploading(false);
    setImageFile(null);
    setPreview(null);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          name="name"
          type="text"
          placeholder="Nombre del servicio"
          className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white"
        />
        <input
          name="price"
          type="number"
          placeholder="Precio"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white sm:w-32"
        />
        <input
          name="duration"
          type="number"
          placeholder="Duración (min)"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white sm:w-36"
        />
      </div>
      <input
        name="description"
        type="text"
        placeholder="Descripción del servicio (opcional)"
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-16 w-24 rounded-lg object-cover border border-slate-200"
            />
          )}
          <label className="cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-500 transition-colors hover:border-[#e9cece] hover:text-[#2d2424]">
            {imageFile ? imageFile.name : "Subir imagen (recomendado)"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-50 sm:ml-auto"
        >
          {uploading ? "Subiendo..." : "Agregar"}
        </button>
      </div>
    </form>
  );
}