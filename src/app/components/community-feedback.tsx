/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Progress } from "@/app/components/ui/progress"

export function CommunityFeedback() {
  const [feedbackData, setFeedbackData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const credentials = btoa('trial:assignment123');
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/api/v1/sample_assignment_api_5/`, {
          headers: {
            'Authorization': `Basic ${credentials}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFeedbackData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
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
      <CardHeader className="pb-1">
        <CardTitle className="text-muted-foreground text-xs font-normal">Community feedback</CardTitle>
        <div className="text-base font-semibold">{feedbackData?.overall || "Mostly positive"}</div>
      </CardHeader>
      {/* <CardContent>
        <div className="space-y-2">
          <div className="flex gap-1">
            <div className="w-14 text-xs text-muted-foreground">Positive</div>
            <div className="flex-1">
              <Progress value={feedbackData?.positive || 0} className="bg-green-100" />
            </div>
            <div className="w-8 text-sm text-muted-foreground">{feedbackData?.positive || 0}</div>
          </div>
          <div className="flex gap-2">
            <div className="w-16 text-sm text-muted-foreground">Neutral</div>
            <div className="flex-1">
              <Progress value={feedbackData?.neutral || 0} className="bg-gray-100" />
            </div>
            <div className="w-8 text-sm text-muted-foreground">{feedbackData?.neutral || 0}</div>
          </div>
          <div className="flex gap-2">
            <div className="w-16 text-sm text-muted-foreground">Negative</div>
            <div className="flex-1">
              <Progress value={feedbackData?.negative || 0} className="bg-red-100" />
            </div>
            <div className="w-8 text-sm text-muted-foreground">{feedbackData?.negative || 0}</div>
          </div>
        </div>
      </CardContent> */}

      <CardContent>
        <div className="w-full max-w-sm space-y-4">
          {/* <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Community feedback</h3>

            </div>
            <p className="text-lg font-medium">Mostly positive</p>
          </div> */}

          <div className="relative h-2 overflow-hidden rounded-full">
            <div className="absolute h-full bg-red-400/90" style={{ width: `${(12 / (12 + 34 + 134)) * 100}%` }} />
            <div
              className="absolute h-full bg-yellow-400/90"
              style={{ left: `${(12 / 180) * 100}%`, width: `${(34 / 180) * 100}%` }}
            />
            <div
              className="absolute h-full bg-green-400/90"
              style={{ left: `${((12 / 180) * 100) + ((34 / 180) * 100)}%`, width: `${((134 / 180) * 100)}%` }}
            />
          </div>

          <div className="flex justify-between space-x-1 text-sm text-muted-foreground">
            <div className="flex gap-1">
              <span>Negative</span>
              <span className="font-medium text-foreground">12</span>
            </div>
            <div className="flex gap-1">
              <span>Neutral</span>
              <span className="font-medium text-foreground">34</span>
            </div>
            <div className="flex gap-1">
              <span>Positive</span>
              <span className="font-medium text-foreground">134</span>
            </div>
          </div>

          
        </div>
      </CardContent>
    </Card>
  )
}

