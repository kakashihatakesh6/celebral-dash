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
        const credentials = btoa('trial:assignment123');
        const response = await fetch('http://3.111.196.92:8020/api/v1/sample_assignment_api_5/', {
          headers: {
            'Authorization': `Basic ${credentials}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
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
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <svg className="h-32 w-32 rotate-[-90deg]">
              <circle className="stroke-muted" cx="64" cy="64" r="56" strokeWidth="16" fill="none" />
              <circle
                className="stroke-blue-500"
                cx="64"
                cy="64"
                r="56"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(performanceData?.score * 351.8) / 100} 351.8`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold">{performanceData?.score || 0}</div>
                <div className="text-xs text-muted-foreground">of 100 points</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">{performanceData?.message || "Loading..."}</div>
            <div className="text-sm text-muted-foreground max-w-[200px] mx-auto">
              {performanceData?.description || "Loading performance data..."}
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

