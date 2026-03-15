"use client";

export default function CopyButton({ url }: { url: string }) {
  function handleCopy() {
    navigator.clipboard.writeText(url);
    alert("¡Enlace copiado!");
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
    >
      Copiar enlace
    </button>
  );
}