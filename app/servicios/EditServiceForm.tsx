"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

type Service = { id: string; name: string; price: number; duration: number; description?: string; image_url?: string; };

export default function EditServiceForm({ service, updateService }: {
  service: Service;
  updateService: (formData: FormData) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(service.image_url ?? null);

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
      await updateService(formData);
      setEditing(false);
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

      {/* Imagen */}
      <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 py-3 transition-all hover:border-[#e9cece]">
        {preview ? (
          <img src={preview} alt="Imagen" className="h-20 w-full rounded-lg object-cover" />
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