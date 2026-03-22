"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-1 text-lg font-semibold text-[#2d2424]">
          ₡{Number(payload[0].value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function ReportesChart({ data }: { data: { date: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#e9cece" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#e9cece" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₡${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e9cece", strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#e9cece"
          strokeWidth={2}
          fill="url(#colorTotal)"
          dot={{ fill: "#e9cece", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: "#2d2424" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}