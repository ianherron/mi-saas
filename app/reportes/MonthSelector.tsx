"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface MonthSelectorProps {
  currentMonth: Date
  selectedMonthStr: string
}

export function MonthSelector({ currentMonth, selectedMonthStr }: MonthSelectorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("es-CR", { month: "long", year: "numeric" })
  }

  const goToPreviousMonth = () => {
    if (loading) return;
    setLoading(true);
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() - 1)
    const newMonth = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`
    router.push(`/reportes?month=${newMonth}`)
  }

  const goToNextMonth = () => {
    if (loading) return;
    setLoading(true);
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() + 1)
    const newMonth = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`
    router.push(`/reportes?month=${newMonth}`)
  }

  const isCurrentMonth = () => {
    const now = new Date()
    return (
      currentMonth.getMonth() === now.getMonth() &&
      currentMonth.getFullYear() === now.getFullYear()
    )
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-[#e9cece] bg-white px-2 py-1 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-[#846262] hover:bg-[#e9cece]/30 hover:text-[#2d2424] disabled:opacity-40"
        onClick={goToPreviousMonth}
        disabled={loading}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2 px-3">
        <Calendar className="h-4 w-4 text-[#846262]" />
        <span className="min-w-[130px] text-center text-sm font-medium capitalize text-[#2d2424]">
          {loading ? "Cargando..." : formatMonth(currentMonth)}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-[#846262] hover:bg-[#e9cece]/30 hover:text-[#2d2424] disabled:opacity-40"
        onClick={goToNextMonth}
        disabled={loading || isCurrentMonth()}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}