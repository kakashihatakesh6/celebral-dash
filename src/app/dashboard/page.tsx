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
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const handleLogout = () => {
    // Logic for logging out the user
    // For example, clearing tokens, redirecting to login page, etc.
    localStorage.removeItem('token');
    router.push('/');
  };

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
    <div className="flex h-screen ">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-grow overflow-hidden">
        <header className="flex h-36 items-center justify-between border-b bg-white px-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2 space-x-6">
            <span className="text-base font-semibold text-muted-foreground">Compare to</span>
            <Button variant="ghost" size="sm" className="text-sm font-semibold border-2 rounded-full px-4 py-3">
              Last year <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="default"
              size="sm"
              className="text-sm font-semibold border-2 rounded-full px-4 py-3 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </header>
        <main className="flex-grow overflow-auto">
          <div className="max-w-6xl mx-auto p-2 space-y-4">
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
      <div className="w-80 border-l bg-white overflow-hidden">
        <div className="p-6 space-y-3">
          <PerformanceScore />
          <CustomersByDevice />
          <CommunityFeedback />
        </div>
      </div>
    </div>
  )
}

