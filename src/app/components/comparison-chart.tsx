"use client"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { ChevronDown } from "lucide-react"

const data = [
  { month: "Jan", thisYear: 8000, lastYear: 3000 },
  { month: "Feb", thisYear: 10000, lastYear: 6000 },
  { month: "Mar", thisYear: 6000, lastYear: 4000 },
  { month: "Apr", thisYear: 20000, lastYear: 18000 },
  { month: "May", thisYear: 15000, lastYear: 8000 },
  { month: "Jun", thisYear: 6000, lastYear: 4000 },
]

export function ComparisonChart() {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-base font-medium">Comparison</CardTitle>
        <Button variant="ghost" size="sm" className="text-sm font-normal h-8">
          6 months <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} tickMargin={12} />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tickMargin={4}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Bar dataKey="lastYear" fill="#E0E7FF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="thisYear" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

