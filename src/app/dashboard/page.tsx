/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { ChevronDown } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { StatsCard } from "../components/stats-cards"
import { TopProducts } from "../components/top-products"
import { PerformanceScore } from "../components/performance-score"
import { CustomersByDevice } from "../components/customers-by-device"
import { CommunityFeedback } from "../components/community-feedback"
import { Sidebar } from "../components/sidebar"
import { useEffect, useState } from "react"
import { ComparisonChart } from "../components/new-chart/comparison-chart"

export default function Dashboard() {
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create base64 encoded credentials
        const response = await fetch("/api/get-currency-data")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (value: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-grow overflow-hidden">
        <header className="flex h-40 items-center justify-between border-b bg-white px-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2 space-x-6">
            <span className="text-base font-semibold text-muted-foreground">Compare to</span>
            <Button variant="ghost" size="sm" className="text-sm font-semibold border-2 rounded-full px-4 py-3">
              Last year <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </header>
        <main className="flex-grow overflow-auto">
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <StatsCard
                title="Purchases"
                value={apiData?.purchases ? formatCurrency(apiData.purchases) : "$0"}
                change={{ value: apiData?.purchaseChange || 0, trend: "up" }}
              />
              <StatsCard
                title="Revenue"
                value={apiData?.revenue ? formatCurrency(apiData.revenue) : "$0"}
                change={{ value: apiData?.revenueChange || 0, trend: "up" }}
              />
              <StatsCard
                title="Refunds"
                value={apiData?.refunds ? formatCurrency(apiData.refunds) : "$0"}
                change={{ value: apiData?.refundChange || 0, trend: "down" }}
              />
            </div>
            {/* <ComparisonChart data={apiData?.chartData} /> */}
            {/* <ComparisonChart /> */}
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

