"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";

type Service = { id: string; name: string; price: number; duration: number; description?: string; image_url?: string; category?: string; image_position_x?: number; image_position_y?: number; };

export default function EditServiceForm({ service, updateService, categories }: {
  service: Service;
  updateService: (formData: FormData) => Promise<{ error: string } | void>;
  categories: string[];
}) {
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(service.image_url ?? null);
  const [posX, setPosX] = useState(service.image_position_x ?? 50);
  const [posY, setPosY] = useState(service.image_position_y ?? 50);
  const currentCategory = service.category && service.category !== "General" ? service.category : categories[0] ?? "";
  const [customCategory, setCustomCategory] = useState(
    categories.length === 0 || !categories.includes(service.category ?? "")
  );

  if (!editing) {
    return (
      <button type="button" onClick={() => setEditing(true)}
        className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
        Editar
      </button>
    );
  }

  return (
    <form action={async (formData) => {
      if (image) {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        );
        const cleanName = image.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${Date.now()}-${cleanName}`;
        const { data, error } = await supabase.storage
          .from("service-images")
          .upload(fileName, image);
        if (!error && data) {
          const { data: urlData } = supabase.storage
            .from("service-images")
            .getPublicUrl(data.path);
          formData.set("image_url", urlData.publicUrl);
        }
      }
      const result = await updateService(formData);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      setEditing(false);
      toast.success("Servicio actualizado", {
        description: "Los cambios se guardaron correctamente.",
      });
    }}
      className="flex flex-col gap-2">
      <input type="hidden" name="id" value={service.id} />
      <input type="hidden" name="image_url" value={preview ?? ""} />
      <input name="name" type="text" defaultValue={service.name}
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-[#e9cece]" />
      <input name="price" type="number" defaultValue={service.price}
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-[#e9cece]" />
      <input name="duration" type="number" defaultValue={service.duration}
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-[#e9cece]" />
      <input name="description" type="text" defaultValue={service.description ?? ""}
        placeholder="Descripción (opcional)"
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-[#e9cece]" />

      {/* Category — dropdown or text input */}
      {!customCategory ? (
        <div className="flex gap-2">
          <select
            name="category"
            defaultValue={currentCategory}
            className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-[#e9cece]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setCustomCategory(true)}
            className="shrink-0 rounded-lg border border-dashed border-[#e9cece] px-2 py-1.5 text-[10px] text-[#846262] transition-colors hover:bg-[#f4ecec]"
          >
            + Nueva
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            name="category"
            type="text"
            defaultValue={!categories.includes(service.category ?? "") ? (service.category ?? "") : ""}
            placeholder="Nueva categoría"
            maxLength={50}
            autoFocus
            className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-[#e9cece]"
          />
          {categories.length > 0 && (
            <button
              type="button"
              onClick={() => setCustomCategory(false)}
              className="shrink-0 rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] text-[#846262] transition-colors hover:bg-slate-50"
            >
              ← Volver
            </button>
          )}
        </div>
      )}

      {/* Imagen */}
      <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 py-3 transition-all hover:border-[#e9cece]">
        {preview ? (
          <img src={preview} alt="Imagen" className="h-20 w-full rounded-lg object-cover" style={{ objectPosition: `${posX}% ${posY}%` }} />
        ) : (
          <>
            <span className="text-lg">🖼️</span>
            <span className="text-[10px] text-slate-400">Agregar imagen</span>
          </>
        )}
        <input type="file" accept="image/*" className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }
          }} />
      </label>

      {/* Focal point picker */}
      {preview && (
        <div>
          <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#846262]">
            Ajustar enfoque
          </p>
          <div
            className="relative cursor-crosshair overflow-hidden rounded-lg border border-slate-200"
            style={{ aspectRatio: "16/9" }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPosX(Math.round(((e.clientX - rect.left) / rect.width) * 100));
              setPosY(Math.round(((e.clientY - rect.top) / rect.height) * 100));
            }}
          >
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
              style={{ objectPosition: `${posX}% ${posY}%` }}
            />
            <div
              className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)] bg-white/30"
              style={{ left: `${posX}%`, top: `${posY}%` }}
            />
            <div className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-2 py-0.5">
              <p className="text-[9px] font-medium text-white">Tocá para elegir el punto de enfoque</p>
            </div>
          </div>
        </div>
      )}
      <input type="hidden" name="image_position_x" value={posX} />
      <input type="hidden" name="image_position_y" value={posY} />

      <div className="flex gap-1">
        <button type="submit" className="flex-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700">
          Guardar
        </button>
        <button type="button" onClick={() => setEditing(false)}
          className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50">
          Cancelar
        </button>
      </div>
    </form>
  );
}
