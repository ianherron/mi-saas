"use client";

import { useState } from "react";

type Service = {
  id: string;
  name: string;
  price: number;
  duration: number;
};

export default function EditServiceForm({
  service,
  updateService,
}: {
  service: Service;
  updateService: (formData: FormData) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#e9cece]"
      >
        <span>✏️</span>
        Editar
      </button>
    );
  }

  return (
    <form
      action={async (formData) => {
        await updateService(formData);
        setEditing(false);
      }}
      className="flex flex-col gap-2 w-full mt-2"
    >
      <input type="hidden" name="id" value={service.id} />
      <input
        name="name"
        type="text"
        defaultValue={service.name}
        className="rounded-lg border border-[#e9cece]/20 px-3 py-2 text-sm outline-none focus:border-[#e9cece]"
      />
      <input
        name="price"
        type="number"
        defaultValue={service.price}
        className="rounded-lg border border-[#e9cece]/20 px-3 py-2 text-sm outline-none focus:border-[#e9cece]"
      />
      <input
        name="duration"
        type="number"
        defaultValue={service.duration}
        className="rounded-lg border border-[#e9cece]/20 px-3 py-2 text-sm outline-none focus:border-[#e9cece]"
      />
      <div className="flex gap-2 mt-1">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-[#e9cece] px-3 py-2 text-sm font-bold text-[#4a4441] transition-colors hover:bg-[#e2c1c1]"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}