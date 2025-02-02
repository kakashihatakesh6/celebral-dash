import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent } from "@/app/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  change: {
    value: number
    trend: "up" | "down"
  }
}

export function StatsCard({ title, value, change }: StatsCardProps) {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <span
            className={`text-xs flex items-center gap-1 ${change.trend === "up" ? "text-green-500" : "text-red-500"}`}
          >
            {change.trend === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {change.value}%
          </span>
        </div>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </CardContent>
    </Card>
  )
}

