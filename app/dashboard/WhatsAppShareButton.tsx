"use client";

import { MessageCircleMore, Copy } from "lucide-react";

interface WhatsAppProps {
  text: string;
}

export default function WhatsAppShareButton({ text }: WhatsAppProps) {
  function handleClick() {
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#fbf9f9] px-4 py-2.5 text-sm font-medium text-[#2d2424] transition-colors hover:bg-white sm:flex-1"
    >
      <MessageCircleMore className="h-4 w-4" />
      Compartir
    </button>
  );
}

interface DarkCopyProps {
  url: string;
}

export function DarkCopyButton({ url }: DarkCopyProps) {
  function handleCopy() {
    navigator.clipboard.writeText(url);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-white/20"
    >
      <Copy className="h-4 w-4" />
      Copiar
    </button>
  );
}
