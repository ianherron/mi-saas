"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface RevenueChartProps {
  data: { date: string; total: number }[]
}

export default function ReportesChart({ data }: RevenueChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.getDate().toString()
  }

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e9cece" stopOpacity={0.6} />
              <stop offset="50%" stopColor="#e9cece" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#e9cece" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e9cece"
            strokeOpacity={0.5}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#846262", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            tickFormatter={(value) => `₡${(value / 1000).toFixed(0)}k`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#846262", fontSize: 12 }}
            dx={-10}
            width={60}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const date = new Date(label ?? "")
                const formattedDate = date.toLocaleDateString("es-CR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })
                return (
                  <div className="rounded-lg border border-[#e9cece] bg-white px-4 py-3 shadow-lg">
                    <p className="mb-1 text-xs text-[#846262]">{formattedDate}</p>
                    <p className="serif-heading text-lg text-[#2d2424]">
                      {formatCurrency(payload[0].value as number)}
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#d4a5a5"
            strokeWidth={2}
            fill="url(#colorRevenue)"
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
