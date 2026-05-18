"use client";
import { toast } from "sonner";

export function AddExtraForm({ addExtra }: { addExtra: (formData: FormData) => Promise<{ error: string } | void> }) {
  return (
    <form
      action={async (formData) => {
        const result = await addExtra(formData);
        if (result?.error) { toast.error(result.error); return; }
        toast.success("Extra agregado correctamente");
      }}
      className="relative overflow-hidden bg-white px-6 py-7 sm:px-7"
    >
      <span
        aria-hidden
        className="serif-heading pointer-events-none absolute -right-2 -top-6 text-[120px] leading-none text-[#e9cece]/[0.16]"
      >
        ✦
      </span>

      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
        Nuevo extra
      </p>
      <h3 className="serif-heading mt-1.5 text-[22px] font-medium leading-tight tracking-tight text-[#2d2424]">
        Agregá un <em className="font-normal italic text-[#846262]">extra</em>.
      </h3>
      <p className="mt-2 mb-6 max-w-md text-[13px] leading-relaxed text-[#846262]">
        Lo que tus clientas pueden sumar a un servicio: brillos, diseños extra, etc.
      </p>

      <div className="relative z-10 grid grid-cols-1 gap-3.5 sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-end">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Nombre
          </label>
          <input
            name="name"
            type="text"
            placeholder="Ej. Diseño extra"
            className="h-11 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            + Duración
          </label>
          <div className="flex h-11 items-center gap-1.5 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 focus-within:border-[#e9cece] focus-within:ring-2 focus-within:ring-[#e9cece]/30">
            <input
              name="duration"
              type="number"
              placeholder="10"
              className="w-full bg-transparent text-sm text-[#2d2424] outline-none placeholder:text-[#b89090]"
            />
            <span className="text-xs text-[#b89090]">min</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            + Precio
          </label>
          <div className="flex h-11 items-center gap-1.5 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 focus-within:border-[#e9cece] focus-within:ring-2 focus-within:ring-[#e9cece]/30">
            <span className="text-sm text-[#846262]">₡</span>
            <input
              name="price"
              type="number"
              placeholder="2.000"
              className="w-full bg-transparent text-sm text-[#2d2424] outline-none placeholder:text-[#b89090]"
            />
          </div>
        </div>
        <button
          type="submit"
          aria-label="Agregar extra"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2d2424] px-5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
        >
          <span className="text-base leading-none">+</span>
          <span className="sm:hidden">Agregar</span>
        </button>
      </div>
    </form>
  );
}
