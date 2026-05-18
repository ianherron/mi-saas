"use client";
import { useEffect, useState } from "react";

type Template = "editorial" | "dark" | "cards";

const TEMPLATES: { id: Template; label: string }[] = [
  { id: "editorial", label: "Editorial" },
  { id: "dark", label: "Dark" },
  { id: "cards", label: "Cards" },
];

export default function ShareDisponibilidadModal({ onClose }: { onClose: () => void }) {
  const [template, setTemplate] = useState<Template>("editorial");
  const [downloading, setDownloading] = useState(false);

  const previewSrc = `/api/share-availability?template=${template}&v=${template}`;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleDownload() {
    setDownloading(true);
    try {
      const r = await fetch(`/api/share-availability?template=${template}&download=1`);
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nailflow-disponibilidad-${template}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2d2424]/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[92vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl bg-[#fbf9f9] shadow-[0_24px_60px_-20px_rgba(45,36,36,0.4)] lg:grid-cols-[420px_1fr]"
      >
        {/* Preview pane */}
        <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#f4ecec] to-[#ece6e6] p-6 sm:p-8">
          <div
            className="overflow-hidden rounded-2xl shadow-[0_18px_40px_-20px_rgba(45,36,36,0.35)]"
            style={{ aspectRatio: "9 / 16", width: 280 }}
          >
            <img
              src={previewSrc}
              alt="Preview"
              className="block h-full w-full object-cover"
            />
          </div>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-[#846262]">
            Preview · 1080 × 1920
          </span>
        </div>

        {/* Controls */}
        <div className="relative flex flex-col overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#846262] transition-colors hover:bg-[#f4ecec] hover:text-[#2d2424]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Compartir disponibilidad
          </p>
          <h2 className="serif-heading mt-1.5 text-[26px] font-medium leading-tight tracking-tight text-[#2d2424]">
            Tu agenda, <em className="font-normal italic text-[#846262]">esta semana</em>.
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-[#846262]">
            Generamos la imagen con tus horarios y cupos libres reales. Las
            horas ya reservadas se tachan automáticamente.
          </p>

          <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Plantilla
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {TEMPLATES.map((t) => {
              const active = t.id === template;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplate(t.id)}
                  className={[
                    "rounded-xl border-2 p-3 text-center transition-colors",
                    active ? "border-[#2d2424] bg-white" : "border-transparent bg-white/60 hover:bg-white",
                  ].join(" ")}
                >
                  <div className={["text-[12px] font-medium", active ? "text-[#2d2424]" : "text-[#846262]"].join(" ")}>
                    {t.label}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex-1" />

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d2424]/[0.12] bg-white px-4 text-sm font-medium text-[#2d2424] transition-colors hover:bg-[#f4ecec]/40 disabled:opacity-50"
            >
              {downloading ? "Descargando…" : "Descargar PNG"}
            </button>
            <a
              href="instagram://story-camera"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2d2424] px-4 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
            >
              Abrir Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
