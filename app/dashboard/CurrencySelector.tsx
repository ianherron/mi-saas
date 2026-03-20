"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const currencies = [
  { code: "CRC", symbol: "₡", name: "Colón costarricense" },
  { code: "USD", symbol: "$", name: "Dólar americano" },
  { code: "MXN", symbol: "$", name: "Peso mexicano" },
  { code: "COP", symbol: "$", name: "Peso colombiano" },
  { code: "GTQ", symbol: "Q", name: "Quetzal guatemalteco" },
];

export default function CurrencySelector({
  businessId,
  currentCurrency,
}: {
  businessId: string;
  currentCurrency: string;
}) {
  const [currency, setCurrency] = useState(currentCurrency ?? "CRC");
  const [saved, setSaved] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    setSaved(false);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    await supabase
      .from("businesses")
      .update({ currency: newCurrency })
      .eq("id", businessId);

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={currency}
        onChange={handleChange}
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#e9cece]"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.symbol} — {c.name}
          </option>
        ))}
      </select>
      {saved && <span className="text-xs text-green-500">¡Guardado!</span>}
    </div>
  );
}