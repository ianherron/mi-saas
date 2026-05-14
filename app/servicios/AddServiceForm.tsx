"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";

export default function AddServiceForm({
  addService,
  categories,
}: {
  addService: (formData: FormData) => Promise<{ error: string } | void>;
  categories: string[];
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState(categories.length === 0);

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
      if (!imageFile.type.startsWith("image/")) {
        toast.error("Solo se permiten imágenes");
        setUploading(false);
        return;
      }
      if (imageFile.size > 5 * 1024 * 1024) {
        toast.error("La imagen no puede superar 5MB");
        setUploading(false);
        return;
      }

      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      );

      const ext = imageFile.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const fileName = `${Date.now()}.${ext}`;
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

    const result = await addService(formData);
    if (result?.error) {
      toast.error(result.error);
      setUploading(false);
      return;
    }
    setUploading(false);
    setImageFile(null);
    setPreview(null);
    setCustomCategory(categories.length === 0);
    (e.target as HTMLFormElement).reset();
    toast.success("Servicio agregado", {
      description: "El servicio se agregó correctamente.",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden bg-white px-6 py-7 sm:px-7"
    >
      <span
        aria-hidden
        className="serif-heading pointer-events-none absolute -right-2 -top-6 text-[120px] leading-none text-[#e9cece]/[0.16]"
      >
        ✦
      </span>

      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
        Nuevo servicio
      </p>
      <h3 className="serif-heading mt-1.5 mb-6 text-[22px] font-medium leading-tight tracking-tight text-[#2d2424]">
        Agregá un <em className="font-normal italic text-[#846262]">servicio</em>.
      </h3>

      {/* Row 1: name + price + duration */}
      <div className="relative z-10 grid grid-cols-1 gap-3.5 sm:grid-cols-[1.6fr_110px_130px]">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Nombre
          </label>
          <input
            name="name"
            type="text"
            placeholder="Ej. Acrílicas"
            className="h-11 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Precio
          </label>
          <div className="flex h-11 items-center gap-1.5 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 focus-within:border-[#e9cece] focus-within:ring-2 focus-within:ring-[#e9cece]/30">
            <span className="text-sm text-[#846262]">₡</span>
            <input
              name="price"
              type="number"
              placeholder="22.000"
              className="w-full bg-transparent text-sm text-[#2d2424] outline-none placeholder:text-[#b89090]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Duración
          </label>
          <div className="flex h-11 items-center gap-1.5 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 focus-within:border-[#e9cece] focus-within:ring-2 focus-within:ring-[#e9cece]/30">
            <input
              name="duration"
              type="number"
              placeholder="90"
              className="w-full bg-transparent text-sm text-[#2d2424] outline-none placeholder:text-[#b89090]"
            />
            <span className="text-xs text-[#b89090]">min</span>
          </div>
        </div>
      </div>

      {/* Row 2: description + category */}
      <div className="relative z-10 mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-[1fr_200px]">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Descripción{" "}
            <span className="lowercase italic tracking-normal text-[#b89090]">
              — opcional
            </span>
          </label>
          <textarea
            name="description"
            maxLength={500}
            rows={2}
            placeholder="Contale a tu clienta qué incluye este servicio…"
            className="resize-none rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 py-3 text-sm leading-relaxed text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Categoría
          </label>
          {!customCategory ? (
            <>
              <select
                name="category"
                className="h-11 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setCustomCategory(true)}
                className="text-left text-[11px] text-[#846262] transition-colors hover:text-[#2d2424]"
              >
                + Nueva categoría
              </button>
            </>
          ) : (
            <>
              <input
                name="category"
                type="text"
                placeholder="Manicure, Pedicure…"
                maxLength={50}
                autoFocus
                className="h-11 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
              />
              {categories.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCustomCategory(false)}
                  className="text-left text-[11px] text-[#846262] transition-colors hover:text-[#2d2424]"
                >
                  ← Volver al listado
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Actions row */}
      <div className="relative z-10 mt-5 flex flex-col gap-3 border-t border-[#2d2424]/[0.06] pt-5 sm:flex-row sm:items-center">
        <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl border border-dashed border-[#e9cece] bg-[#f4ecec]/40 px-3.5 py-2.5 text-sm text-[#846262] transition-colors hover:bg-[#f4ecec]">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-10 w-14 rounded-lg border border-[#2d2424]/[0.08] object-cover"
            />
          ) : (
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-[#b89090]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 8h.01" />
                <rect width="16" height="16" x="4" y="4" rx="3" />
                <path d="m4 15 4-4a3 5 0 0 1 3 0l5 5" />
                <path d="m14 14 1-1a3 5 0 0 1 3 0l2 2" />
              </svg>
            </span>
          )}
          <span className="truncate">
            {imageFile ? imageFile.name : "Subí una foto del servicio "}
            {!imageFile && (
              <em className="not-italic text-[#b89090]">— recomendado</em>
            )}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        <button
          type="submit"
          disabled={uploading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2d2424] px-5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232] disabled:opacity-50 sm:px-6"
        >
          {uploading ? "Subiendo…" : "Agregar servicio"}
        </button>
      </div>
    </form>
  );
}
