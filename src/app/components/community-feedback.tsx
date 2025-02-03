/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"

export function CommunityFeedback() {
  const [feedbackData, setFeedbackData] = useState<any>(null);
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
      <CardHeader className="pb-2">
        <CardTitle className="text-muted-foreground text-sm font-normal">Community feedback</CardTitle>
        <div className="text-lg font-semibold">{feedbackData?.overall || "Mostly positive"}</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="w-16 text-sm text-muted-foreground">Positive</div>
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
      </CardContent>
    </Card>
  )
}

