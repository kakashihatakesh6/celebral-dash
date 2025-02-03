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
    let hoursToShow: number

    switch (period) {
      case '6months':
        hoursToShow = 12 // Show last 12 hours
        break
      case '12months':
        hoursToShow = 18 // Show last 18 hours
        break
      case '24months':
        hoursToShow = 24 // Show full 24 hours
        break
      default:
        hoursToShow = 12
    }

    // Create an array of hour intervals
    const hours = []
    for (let i = 0; i < hoursToShow; i++) {
      const date = new Date(data[0].name)
      date.setHours(date.getHours() + i)
      hours.unshift({
        hour: date.getHours(),
        date: date
      })
    }

    // Create a map of existing data points grouped by hour
    const dataMap = new Map()
    data.forEach(item => {
      const date = new Date(item.name)
      const hour = date.getHours()
      if (!dataMap.has(hour)) {
        dataMap.set(hour, {
          thisYear: [],
          lastYear: []
        })
      }
      const hourData = dataMap.get(hour)
      hourData.thisYear.push(item.thisYear)
      hourData.lastYear.push(item.lastYear)
    })

    // Fill in missing hours and calculate averages
    return hours.map(({ hour, date }) => {
      const hourData = dataMap.get(hour) || { thisYear: [0], lastYear: [0] }
      return {
        name: `${hour}:00`,
        thisYear: Math.round(hourData.thisYear.reduce((a: any, b: any) => a + b, 0) / hourData.thisYear.length),
        lastYear: Math.round(hourData.lastYear.reduce((a: any, b: any) => a + b, 0) / hourData.lastYear.length)
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...")
        const response = await fetch("/api/get-data")

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }

        const jsonData = await response.json()
        console.log("Received data:", jsonData)

        if (!Array.isArray(jsonData)) {
          throw new Error("Invalid data received from API")
        }

        // Transform the API data into chart format
        const transformedData = jsonData.map(item => {
          const date = new Date(item.date2)
          return {
            name: date.toISOString(),
            thisYear: item.unique_count,
            lastYear: item.cumulative_tweets
          }
        })

        const filteredData = filterDataByPeriod(transformedData, selectedPeriod)
        console.log("Transformed data:", filteredData)
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
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}k`}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="lastYear" fill="hsl(216, 80%, 85%)" radius={[4, 4, 0, 0]} name="Last year" />
              <Bar dataKey="thisYear" fill="hsl(216, 80%, 50%)" radius={[4, 4, 0, 0]} name="This year" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

