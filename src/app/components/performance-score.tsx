/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"


export function PerformanceScore() {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-performance")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("performance-data", data);
        setPerformanceData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching performance data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  if (isLoading) {
    return <Card><CardContent>Loading...</CardContent></Card>;
  }

  return (
    <Card>
      <CardContent className="">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <svg className="h-28 w-28 rotate-[-90deg]">
              <circle className="stroke-muted" cx="48" cy="48" r="52" strokeWidth="12" fill="none" />
              <circle
                className="stroke-blue-500"
                cx="48"
                cy="48"
                r="45"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${(performanceData?.score * 263.8) / 100} 263.8`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center pr-3">
                <div className="text-2xl font-bold">{performanceData?.score || 78}</div>
                <div className="text-xs text-muted-foreground">of 100 points</div>
              </div>
            </div>
          </div>
          <div className="text-start">
            <div className="text-lg font-semibold">{performanceData?.title+'!' || `You're good!`}</div>
            <div className="text-xs text-muted-foreground max-w-[180px] mx-auto">
              {performanceData?.description || "Your sales performance score is better than 80% other users"}
            </div>
          </div>
          <Button variant="link" size="sm" className="text-blue-500 border rounded-2xl">
            Improve your score
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

