"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ReportesChart({ data }: { data: { date: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
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
        <Tooltip
          formatter={(value: any) => [
            `₡${Number(value).toLocaleString()}`,
            "Ingresos",
          ]}
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid #f0eaea",
            fontSize: "12px",
          }}
        />
        <Bar dataKey="total" fill="#e9cece" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}