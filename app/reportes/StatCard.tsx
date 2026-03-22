import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  variant?: "default" | "success" | "warning"
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = "vs mes anterior",
  icon,
  variant = "default",
}: StatCardProps) {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) {
      return <Minus className="h-3 w-3" />
    }
    return change > 0 ? (
      <TrendingUp className="h-3 w-3" />
    ) : (
      <TrendingDown className="h-3 w-3" />
    )
  }

  const getTrendColor = () => {
    if (change === undefined || change === 0) return "text-[#846262]"
    if (variant === "warning") {
      return change > 0 ? "text-amber-600" : "text-emerald-600"
    }
    return change > 0 ? "text-emerald-600" : "text-red-500"
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#e9cece]/60 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#e9cece] hover:shadow-md">
      {/* Decorative gradient */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#e9cece]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-[#846262]">{title}</span>
          {icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9cece]/30 text-[#846262]">
              {icon}
            </div>
          )}
        </div>
        
        <p className="serif-heading text-3xl tracking-tight text-[#2d2424]">
          {value}
        </p>
        
        {change !== undefined && (
          <div className="mt-3 flex items-center gap-1.5">
            <span
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                getTrendColor(),
                change > 0
                  ? variant === "warning"
                    ? "bg-amber-50"
                    : "bg-emerald-50"
                  : change < 0
                  ? variant === "warning"
                    ? "bg-emerald-50"
                    : "bg-red-50"
                  : "bg-gray-50"
              )}
            >
              {getTrendIcon()}
              {Math.abs(change)}%
            </span>
            <span className="text-xs text-[#846262]">{changeLabel}</span>
          </div>
        )}
      </div>
    </div>
  )
}
