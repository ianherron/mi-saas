"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { sendSupportMessage } from "./actions";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await sendSupportMessage(formData);
      toast.success("Mensaje enviado, te respondemos pronto 💅");
      formRef.current?.reset();
    } catch {
      toast.error("Hubo un error al enviar el mensaje. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]"
        >
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Tu nombre"
          className="h-12 w-full rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]"
        >
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tu@correo.com"
          className="h-12 w-full rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]"
        >
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="¿En qué te ayudamos?"
          className="w-full resize-none rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 py-3 text-sm leading-relaxed text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2d2424] text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232] disabled:opacity-50"
      >
        {loading ? "Enviando…" : "Enviar mensaje"}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
