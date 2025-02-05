/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useMemo, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface DataPoint {
  name: string // Format: YYYY-MM
  thisYear: number
  lastYear: number
}

function generateMockData(months: number): DataPoint[] {
  const now = new Date()
  const mockData: DataPoint[] = []

  for (let i = 0; i < months; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    mockData.unshift({
      name: formattedDate,
      thisYear: Math.floor(Math.random() * 20000) + 1000,
      lastYear: Math.floor(Math.random() * 20000) + 1000,
    })
  }
  return mockData
}

export function ComparisonChart() {
  const [data, setData] = useState<DataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState("6")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-data")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const jsonData = await response.json()
        if (!Array.isArray(jsonData)) {
          throw new Error("Invalid data format received from API")
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setData(generateMockData(Number(selectedPeriod)))
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedPeriod])

  const maxCount = useMemo(() => {
    if (data.length === 0) return 20000
    return Math.max(...data.map(d => d.thisYear))
  }, [data])

  if (loading)
    return (
      <Card className="bg-white shadow-md rounded-lg p-4">
        <CardContent className="pt-6">Loading...</CardContent>
      </Card>
    )
  if (error)
    return (
      <Card className="bg-white shadow-md rounded-lg p-4">
        <CardContent className="pt-6 text-red-500">Error: {error}</CardContent>
      </Card>
    )

  return (
    <Card className="bg-white shadow-lg rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-lg font-semibold">Comparison</CardTitle>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px] border border-gray-300 rounded-md">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6 months</SelectItem>
            <SelectItem value="12">12 months</SelectItem>
            <SelectItem value="24">24 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tickMargin={12}
                tickFormatter={(value) => {
                  const [year, month] = value.split("-")
                  return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Number(month) - 1]} ${year.slice(2)}`
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tickMargin={4}
                tickFormatter={(value) => `${value / 1000}k`}
                domain={[0, Math.ceil(maxCount / 5000) * 5000]}
              />
              <Tooltip formatter={(value, name) => [`${value.toLocaleString()} tweets`, name === "thisYear" ? "This Year" : "Last Year"]} />
              <Bar dataKey="thisYear" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lastYear" fill="#60A5FA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
