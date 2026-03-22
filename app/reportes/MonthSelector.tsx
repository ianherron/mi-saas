"use client";

import { useRouter } from "next/navigation";

export default function MonthSelector({ currentMonth }: { currentMonth: string }) {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(`/reportes?month=${e.target.value}`);
  }

  const months = [];
  const now = new Date();
  for (let i = -3; i < 9; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("es-CR", {
      month: "long",
      year: "numeric",
    });
    months.push({ value, label });
  }

  return (
    <select
      value={currentMonth}
      onChange={handleChange}
      className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 outline-none cursor-pointer hover:border-[#e9cece] focus:border-[#e9cece] transition-colors capitalize"
    >
      {months.map((m) => (
        <option key={m.value} value={m.value} className="capitalize">
          {m.label}
        </option>
      ))}
    </select>
  );
}