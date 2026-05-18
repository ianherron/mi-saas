"use client";
import { useState } from "react";
import ShareDisponibilidadModal from "./ShareDisponibilidadModal";

export default function ShareDisponibilidadButton({ freeCount }: { freeCount: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative mb-5 flex w-full items-center gap-4 overflow-hidden rounded-2xl bg-[#2d2424] px-5 py-4 text-left transition-colors hover:bg-[#3d3232]"
      >
        <span
          aria-hidden
          className="serif-heading pointer-events-none absolute -right-3 -top-8 text-[110px] leading-none text-[#e9cece]/[0.14]"
        >
          ✦
        </span>
        <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e9cece]/[0.16] text-[#e9cece]">
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </span>
        <span className="relative z-10 min-w-0 flex-1">
          <span className="serif-heading block text-[17px] font-medium leading-tight tracking-tight text-[#fbf9f9]">
            Compartir <em className="font-normal italic text-[#e9cece]">disponibilidad</em>
          </span>
          <span className="mt-0.5 block text-[12px] text-[#fbf9f9]/70">
            Generá una Story con tus cupos libres — lista para Instagram
          </span>
        </span>
        <span className="relative z-10 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
          {freeCount} libres
          <span className="text-base text-[#e9cece] transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </button>
      {open && <ShareDisponibilidadModal onClose={() => setOpen(false)} />}
    </>
  );
}
