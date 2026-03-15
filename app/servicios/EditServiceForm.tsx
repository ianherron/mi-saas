"use client";
import { useState } from "react";

type Service = { id: string; name: string; price: number; duration: number; };

export default function EditServiceForm({ service, updateService }: {
  service: Service;
  updateService: (formData: FormData) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <button type="button" onClick={() => setEditing(true)}
        className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
        Editar
      </button>
    );
  }

  return (
    <form action={async (formData) => { await updateService(formData); setEditing(false); }}
      className="flex flex-col gap-2">
      <input type="hidden" name="id" value={service.id} />
      <input name="name" type="text" defaultValue={service.name}
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-[#e9cece]" />
      <input name="price" type="number" defaultValue={service.price}
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-[#e9cece]" />
      <input name="duration" type="number" defaultValue={service.duration}
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-[#e9cece]" />
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