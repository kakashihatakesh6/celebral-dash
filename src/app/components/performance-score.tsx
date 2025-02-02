import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"

export function PerformanceScore() {
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
                strokeDasharray={`${(78 * 351.8) / 100} 351.8`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold">78</div>
                <div className="text-xs text-muted-foreground">of 100 points</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">You&apos;re good!</div>
            <div className="text-sm text-muted-foreground max-w-[200px] mx-auto">
              Your sales performance score is better than 80% other users
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

