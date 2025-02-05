/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

export function CommunityFeedback() {
  const [feedbackData, setFeedbackData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/community-feedback")

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

      <CardContent>
        <div className="w-full max-w-sm space-y-3">

          <div className="relative h-2 overflow-hidden rounded-full">
            {/* <div className="absolute h-full bg-red-400/90" style={{ width: `${(12 / (12 + 34 + 134)) * 100}%` }} /> */}
            <div className="absolute h-full bg-green-400/90" style={{ width: `${(feedbackData?.positive / 90) * 100}%` }} />
            <div
              className="absolute h-full bg-yellow-400/90"
              // style={{ left: `${(12 / 180) * 100}%`, width: `${(34 / 180) * 100}%` }}
              style={{ left: `${(feedbackData?.positive / 90) * 100}%`, width: `${(feedbackData?.neutral / 90) * 100}%` }}
            />
            <div
              className="absolute h-full bg-red-400/90"
              // style={{ left: `${((12 / 180) * 100) + ((34 / 180) * 100)}%`, width: `${((134 / 180) * 100)}%` }}
              style={{ left: `${((feedbackData?.positive / 90) * 100) + ((feedbackData?.neutral / 90) * 100)}%`, width: `${((feedbackData?.negative / 90) * 100)}%` }}
            />
          </div>

          <div className="flex justify-between space-x-1 text-sm text-muted-foreground">

            <div className="flex gap-1">
              <span>Positive</span>
              <span className="font-medium text-foreground">{feedbackData?.positive || 10}</span>
            </div>
            <div className="flex gap-1">
              <span>Neutral</span>
              <span className="font-medium text-foreground">{feedbackData?.neutral || 10}</span>
            </div>
            <div className="flex gap-1">
              <span>Negative</span>
              <span className="font-medium text-foreground">{feedbackData?.negative || 67}</span>
            </div>
          </div>


        </div>
      </CardContent>
    </Card>
  )
}

