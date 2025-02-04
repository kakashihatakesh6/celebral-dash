/* eslint-disable @typescript-eslint/no-empty-object-type */
import { cn } from "@/lib/utils"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Settings, Users, Grid, LayoutGrid, Zap, MessageSquare, Webhook } from "lucide-react"
import type React from "react" // Import React

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("flex h-full w-[240px] flex-col bg-zinc-50", className)}>
      {/* Header */}
      <div className="flex h-14 items-center gap-2 px-4">
        <Button className="h-8 w-8">
          <Webhook className="h-full w-full text-2xl" />
        </Button>
        <span className="text-xl font-bold">Salesway</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 p-4">
        {/* Top nav items */}
        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-zinc-100">
            <Settings className="h-4 w-4" />
            <span className="text-sm font-normal">Settings</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-zinc-100">
            <Users className="h-4 w-4" />
            <span className="text-sm font-normal">Team</span>
          </Button>
        </nav>

        {/* Menu section */}
        <div className="py-4">
          <h2 className="px-2 text-xs font-medium text-zinc-500">MENU</h2>
          <nav className="mt-2 space-y-1">
            <Button variant="secondary" className="w-full justify-start gap-3 bg-white hover:bg-zinc-100">
              <Grid className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-normal">Dashboard</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-zinc-100">
              <LayoutGrid className="h-4 w-4" />
              <span className="text-sm font-normal">Campaigns</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-zinc-100">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-normal">Flows</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-zinc-100">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm font-normal">Integrations</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-zinc-100">
              <Users className="h-4 w-4" />
              <span className="text-sm font-normal">Customers</span>
            </Button>
          </nav>
        </div>
      </div>

      {/* User profile */}
      <div className="p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>TW</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Tom Wang</span>
            <span className="text-xs text-muted-foreground">Product Manager</span>
          </div>
        </div>
      </div>
    </div>
  )
}

