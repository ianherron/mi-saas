"use client";

import { useState } from "react";
import { joinWaitlist } from "../actions/waitlist";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const result = await joinWaitlist(email);
    setStatus(result.success ? "done" : "error");
    setMessage(result.message);
    if (result.success) setEmail("");
  }

  if (status === "done") {
    return (
      <p className="text-[15px] font-medium text-[#e9cece]">
        ✦ {message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        className="flex-1 rounded-xl border border-[#fbf9f9]/20 bg-[#fbf9f9]/10 px-5 py-4 text-base text-[#fbf9f9] placeholder-[#fbf9f9]/40 outline-none focus:border-[#fbf9f9]/50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-[#fbf9f9] px-6 py-4 text-base font-medium text-[#2d2424] transition-colors hover:bg-white disabled:opacity-60"
      >
        {status === "loading" ? "..." : "Avisame"}
      </button>
      {status === "error" && (
        <p className="w-full text-[13px] text-[#e9cece]">{message}</p>
      )}
    </form>
  );
}
