/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"

interface DataPoint {
  name: string
  thisYear: number
  lastYear: number
}

export function ComparisonChart() {
  const [data, setData] = useState<DataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('6months')

  const filterDataByPeriod = (data: DataPoint[], period: string) => {
    const currentDate = new Date()
    let monthsToShow: number

    switch (period) {
      case '6months':
        monthsToShow = 6
        break
      case '12months':
        monthsToShow = 12
        break
      case '24months':
        monthsToShow = 24
        break
      default:
        monthsToShow = 6
    }

    // Create an array of month intervals
    const months = []
    for (let i = 0; i < monthsToShow; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      months.unshift({
        month: date.getMonth(),
        year: date.getFullYear()
      })
    }

    // Group data by month and year
    const monthlyData = new Map()
    
    data.forEach(item => {
      const date = new Date(item.name)
      const key = `${date.getFullYear()}-${date.getMonth()}`
      
      if (!monthlyData.has(key)) {
        monthlyData.set(key, {
          uniqueCount: [],
          cumulativeTweets: []
        })
      }
      
      const entry = monthlyData.get(key)
      entry.uniqueCount.push(item.thisYear)
      entry.cumulativeTweets.push(item.lastYear)
    })

    // Generate final data with averages
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    return months.map(({ month, year }) => {
      const key = `${year}-${month}`
      const monthData = monthlyData.get(key) || { uniqueCount: [0], cumulativeTweets: [0] }
      
      return {
        name: `${monthNames[month]} ${year}`,
        thisYear: Math.round(
          monthData.uniqueCount.reduce((sum: number, val: number) => sum + val, 0) / 
          monthData.uniqueCount.length
        ),
        lastYear: Math.round(
          monthData.cumulativeTweets.reduce((sum: number, val: number) => sum + val, 0) / 
          monthData.cumulativeTweets.length
        )
      }
    })
  }

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

        // Transform API data to chart format
        const transformedData = jsonData.map(item => ({
          name: item.date2,
          thisYear: Number(item.unique_count) || 0,
          lastYear: Number(item.cumulative_tweets) || 0
        }))

        // Sort by date
        transformedData.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())

        // Apply period filter
        const filteredData = filterDataByPeriod(transformedData, selectedPeriod)
        
        if (filteredData.length === 0) {
          throw new Error("No data available for the selected period")
        }

        setData(filteredData)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedPeriod])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Comparison</CardTitle>
          <CardDescription>Loading data...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please check the console for more details.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Comparison</CardTitle>
        <Select 
          defaultValue="6months" 
          value={selectedPeriod}
          onValueChange={(value) => setSelectedPeriod(value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6months">6 months</SelectItem>
            <SelectItem value="12months">12 months</SelectItem>
            <SelectItem value="24months">24 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`} // Removed 'k' suffix
              />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="lastYear" 
                fill="hsl(216, 80%, 85%)" 
                radius={[4, 4, 0, 0]} 
                name="Last year"
                isAnimationActive={false} // Disable animation for debugging
              />
              <Bar 
                dataKey="thisYear" 
                fill="hsl(216, 80%, 50%)" 
                radius={[4, 4, 0, 0]} 
                name="This year"
                isAnimationActive={false} // Disable animation for debugging
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

