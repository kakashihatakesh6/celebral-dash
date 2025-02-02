import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"

export function CommunityFeedback() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-muted-foreground text-sm font-normal">Community feedback</CardTitle>
        <div className="text-lg font-semibold">Mostly positive</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="w-16 text-sm text-muted-foreground">Positive</div>
            <div className="flex-1">
              <Progress value={67} className="bg-green-100" />
            </div>
            <div className="w-8 text-sm text-muted-foreground">134</div>
          </div>
          <div className="flex gap-2">
            <div className="w-16 text-sm text-muted-foreground">Neutral</div>
            <div className="flex-1">
              <Progress value={17} className="bg-gray-100" />
            </div>
            <div className="w-8 text-sm text-muted-foreground">34</div>
          </div>
          <div className="flex gap-2">
            <div className="w-16 text-sm text-muted-foreground">Negative</div>
            <div className="flex-1">
              <Progress value={6} className="bg-red-100" />
            </div>
            <div className="w-8 text-sm text-muted-foreground">12</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

