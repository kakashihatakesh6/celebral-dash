"use client"
import { ChevronDown } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { StatsCard } from "../components/stats-cards"
import { ComparisonChart } from "../components/comparison-chart"
import { TopProducts } from "../components/top-products"
import { PerformanceScore } from "../components/performance-score"
import { CustomersByDevice } from "../components/customers-by-device"
import { CommunityFeedback } from "../components/community-feedback"
import { Sidebar } from "../components/sidebar"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-grow overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b bg-white px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Compare to</span>
            <Button variant="ghost" size="sm" className="text-sm font-normal">
              Last year <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </header>
        <main className="flex-grow overflow-auto">
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <StatsCard title="Purchases" value="4,294" change={{ value: 26, trend: "up" }} />
              <StatsCard title="Revenue" value="$322.3k" change={{ value: 45, trend: "up" }} />
              <StatsCard title="Refunds" value="$8.2k" change={{ value: 7, trend: "down" }} />
            </div>
            <ComparisonChart />
            <TopProducts />
          </div>
        </main>
      </div>
      <div className="w-80 border-l bg-white overflow-auto">
        <div className="p-6 space-y-6">
          <PerformanceScore />
          <CustomersByDevice />
          <CommunityFeedback />
        </div>
      </div>
    </div>
  )
}

