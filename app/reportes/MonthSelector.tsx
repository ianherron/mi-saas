"use client";

import { useRouter } from "next/navigation";

export default function MonthSelector({ currentMonth }: { currentMonth: string }) {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(`/reportes?month=${e.target.value}`);
  }

  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = d.toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" }).slice(0, 7);
    const label = d.toLocaleDateString("es-CR", { month: "long", year: "numeric" });
    months.push({ value, label });
  }

  return (
    <select
      value={currentMonth}
      onChange={handleChange}
      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-[#e9cece] capitalize"
    >
      {months.map((m) => (
        <option key={m.value} value={m.value} className="capitalize">
          {m.label}
        </option>
      ))}
    </select>
  );
}