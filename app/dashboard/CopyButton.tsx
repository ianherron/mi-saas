"use client";

export default function CopyButton({ url }: { url: string }) {
  function handleCopy() {
    navigator.clipboard.writeText(url);
    alert("¡Enlace copiado!");
  }

  return (
    <button type="button"
      onClick={handleCopy}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#f2d4d7]/20 bg-white/80 py-3 text-xs font-bold text-[#2d2926] transition-colors hover:bg-white"
    >
      <span>📋</span>
      Copiar enlace
    </button>
  );
}