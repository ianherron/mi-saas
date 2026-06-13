"use client";

import { useRef, useState } from "react";
import { sendDeletionRequest } from "./actions";

export default function DeletionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      await sendDeletionRequest(new FormData(e.currentTarget));
      setStatus("done");
      formRef.current?.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Algo salió mal, intentá de nuevo.");
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
          Correo electrónico de tu cuenta
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tu@correo.com"
          className="w-full rounded-xl border border-[#2d2424]/[0.12] bg-[#fbf9f9] px-4 py-3 text-[14px] text-[#2d2424] outline-none placeholder:text-[#b89090] focus:border-[#2d2424]/30 focus:ring-0"
        />
      </div>

      {status === "done" ? (
        <p className="rounded-xl bg-[#f4ecec] px-4 py-3 text-[13px] text-[#2d2424]">
          Solicitud recibida. Eliminaremos tu cuenta y datos en un plazo de 30 días.
        </p>
      ) : (
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-[#2d2424] px-6 py-3.5 text-[14px] font-medium text-[#fbf9f9] transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {status === "loading" ? "Enviando…" : "Solicitar eliminación"}
        </button>
      )}

      {status === "error" && (
        <p className="text-[13px] text-red-500">{errorMsg}</p>
      )}
    </form>
  );
}
