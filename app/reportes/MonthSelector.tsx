"use client"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface MonthSelectorProps {
  selectedMonthStr: string
}

export function MonthSelector({ selectedMonthStr }: MonthSelectorProps) {
  const router = useRouter()
  const [year, month] = selectedMonthStr.split("-").map(Number)

  const formatMonth = () => {
    return new Date(year, month - 1, 1).toLocaleDateString("es-CR", {
      month: "long", year: "numeric"
    })
  }

  const goToPreviousMonth = () => {
    const newDate = new Date(year, month - 2, 1)
    const newMonth = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`
    router.push(`/reportes?month=${newMonth}`)
  }

  const goToNextMonth = () => {
    const newDate = new Date(year, month, 1)
    const newMonth = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`
    router.push(`/reportes?month=${newMonth}`)
  }

  const isCurrentMonth = () => {
    const now = new Date()
    return month === (now.getMonth() + 1) && year === now.getFullYear()
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-[#e9cece] bg-white px-2 py-1 shadow-sm">
      <Button variant="ghost" size="icon"
        className="h-8 w-8 rounded-full text-[#846262] hover:bg-[#e9cece]/30 hover:text-[#2d2424]"
        onClick={goToPreviousMonth}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2 px-3">
        <Calendar className="h-4 w-4 text-[#846262]" />
        <span className="min-w-[130px] text-center text-sm font-medium capitalize text-[#2d2424]">
          {formatMonth()}
        </span>
      </div>
      <Button variant="ghost" size="icon"
        className="h-8 w-8 rounded-full text-[#846262] hover:bg-[#e9cece]/30 hover:text-[#2d2424] disabled:opacity-40"
        onClick={goToNextMonth}
        disabled={isCurrentMonth()}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}