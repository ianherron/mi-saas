"use client";
// URL-driven tabs — server renders the right content based on ?tab=...

import { useRouter, useSearchParams } from "next/navigation";

type Tab = "servicios" | "extras" | "horarios";

const TABS: { id: Tab; label: string; countKey: Tab | null }[] = [
  { id: "servicios", label: "Servicios",     countKey: "servicios" },
  { id: "extras",    label: "Extras",        countKey: "extras"    },
  { id: "horarios",  label: "Horarios y días", countKey: "horarios"  },
];

export default function ServiciosTabs({
  tab,
  counts,
}: {
  tab: Tab;
  counts: { servicios: number; extras: number; horarios: number };
}) {
  const router = useRouter();
  const sp = useSearchParams();

  function go(id: Tab) {
    const url = new URLSearchParams(sp);
    if (id === "servicios") url.delete("tab");
    else url.set("tab", id);
    router.push(`/servicios${url.toString() ? `?${url.toString()}` : ""}`, { scroll: false });
  }

  return (
    <div className="mb-5 -mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
      <div className="flex gap-1 border-b border-[#2d2424]/[0.08]">
        {TABS.map((t) => {
          const active = tab === t.id;
          const count = t.countKey ? counts[t.countKey] : null;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => go(t.id)}
              className={[
                "-mb-px flex shrink-0 items-center gap-2 whitespace-nowrap px-3.5 py-2.5 text-sm transition-colors",
                active
                  ? "border-b-2 border-[#2d2424] font-semibold text-[#2d2424]"
                  : "border-b-2 border-transparent font-normal text-[#846262] hover:text-[#2d2424]",
              ].join(" ")}
            >
              {t.label}
              {count !== null && (
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-[11px] font-medium",
                    active
                      ? "bg-[#2d2424] text-[#fbf9f9]"
                      : "bg-[#f4ecec] text-[#846262]",
                  ].join(" ")}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
