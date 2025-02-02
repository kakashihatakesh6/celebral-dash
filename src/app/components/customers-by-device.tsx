"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

const data = [
  { month: "Jan", web: 2000, offline: 1000 },
  { month: "Feb", web: 3000, offline: 1500 },
  { month: "Mar", web: 4000, offline: 2000 },
  { month: "Apr", web: 5000, offline: 2500 },
  { month: "May", web: 6000, offline: 3000 },
  { month: "Jun", web: 8000, offline: 4000 },
]

export function CustomersByDevice() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers by device</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="web" stroke="#2563EB" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="offline" stroke="#60A5FA" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between border-t pt-4 mt-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-blue-600" />
              <div className="text-sm font-medium">Web sales</div>
            </div>
            <div className="text-sm text-muted-foreground">1,304%</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-blue-300" />
              <div className="text-sm font-medium">Offline selling</div>
            </div>
            <div className="text-sm text-muted-foreground">473%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

