"use client";
import { useRef, useState } from "react";

const CROP = 16 / 9;

function calcFrame(naturalAspect: number, posX: number, posY: number) {
  let fWPct: number, fHPct: number, maxLeftPct: number, maxTopPct: number;
  if (naturalAspect >= CROP) {
    fHPct = 100;
    fWPct = (CROP / naturalAspect) * 100;
    maxTopPct = 0;
    maxLeftPct = 100 - fWPct;
  } else {
    fWPct = 100;
    fHPct = (naturalAspect / CROP) * 100;
    maxLeftPct = 0;
    maxTopPct = 100 - fHPct;
  }
  const leftPct = (posX / 100) * maxLeftPct;
  const topPct = (posY / 100) * maxTopPct;
  return { fWPct, fHPct, leftPct, topPct, maxLeftPct, maxTopPct };
}

export function FocalPointPicker({
  src,
  posX,
  posY,
  onChange,
}: {
  src: string;
  posX: number;
  posY: number;
  onChange: (x: number, y: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [naturalAspect, setNaturalAspect] = useState(CROP);
  const dragging = useRef(false);

  const { fWPct, fHPct, leftPct, topPct, maxLeftPct, maxTopPct } = calcFrame(naturalAspect, posX, posY);

  function updateFromPointer(clientX: number, clientY: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const fW = (rect.width * fWPct) / 100;
    const fH = (rect.height * fHPct) / 100;
    const maxL = (rect.width * maxLeftPct) / 100;
    const maxT = (rect.height * maxTopPct) / 100;
    const cx = clientX - rect.left - fW / 2;
    const cy = clientY - rect.top - fH / 2;
    const newX = maxL < 1 ? 50 : Math.round((Math.max(0, Math.min(maxL, cx)) / maxL) * 100);
    const newY = maxT < 1 ? 50 : Math.round((Math.max(0, Math.min(maxT, cy)) / maxT) * 100);
    onChange(newX, newY);
  }

  return (
    <div>
      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#846262]">
        Ajustar enfoque — arrastrá el recuadro
      </p>
      <div
        ref={containerRef}
        className="relative w-full select-none overflow-hidden rounded-xl border border-[#2d2424]/[0.08]"
        style={{ aspectRatio: String(naturalAspect) }}
        onPointerMove={(e) => {
          if (dragging.current) updateFromPointer(e.clientX, e.clientY);
        }}
        onPointerUp={() => { dragging.current = false; }}
        onPointerLeave={() => { dragging.current = false; }}
      >
        <img
          src={src}
          alt="Preview"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          onLoad={(e) => {
            const img = e.currentTarget;
            setNaturalAspect(img.naturalWidth / img.naturalHeight);
          }}
          draggable={false}
        />

        {/* Dark overlays outside crop frame */}
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-black/50" style={{ height: `${topPct}%` }} />
        <div className="pointer-events-none absolute inset-x-0 bg-black/50" style={{ top: `${topPct + fHPct}%`, bottom: 0 }} />
        <div className="pointer-events-none absolute bg-black/50" style={{ top: `${topPct}%`, left: 0, width: `${leftPct}%`, height: `${fHPct}%` }} />
        <div className="pointer-events-none absolute bg-black/50" style={{ top: `${topPct}%`, left: `${leftPct + fWPct}%`, right: 0, height: `${fHPct}%` }} />

        {/* Crop frame */}
        <div
          className={`absolute ${dragging.current ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ left: `${leftPct}%`, top: `${topPct}%`, width: `${fWPct}%`, height: `${fHPct}%` }}
          onPointerDown={(e) => {
            e.preventDefault();
            dragging.current = true;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
        >
          <div className="absolute inset-0 border-2 border-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-y-0 left-1/3 border-l border-white/40" />
            <div className="absolute inset-y-0 left-2/3 border-l border-white/40" />
            <div className="absolute inset-x-0 top-1/3 border-t border-white/40" />
            <div className="absolute inset-x-0 top-2/3 border-t border-white/40" />
          </div>
          <div className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-white" />
          <div className="absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 border-white" />
          <div className="absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-white" />
          <div className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-white" />
        </div>
      </div>
      <p className="mt-1 text-[10px] text-[#b89090]">El recuadro representa lo que verán tus clientas</p>
    </div>
  );
}
