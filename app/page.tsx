"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell, Trophy, Zap } from "lucide-react"
import { DashboardChart } from "@/components/dashboard-chart"
import { AiAssistant } from "@/components/ai-assistant"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<"week" | "month">("week")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Dumbbell className="mr-2 h-4 w-4" /> Start Workout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
            <Trophy className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">+120 points this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Workout</CardTitle>
            <Dumbbell className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Upper Body</div>
            <p className="text-xs text-muted-foreground">45 minutes • 5 exercises</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Zap className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 Days</div>
            <p className="text-xs text-muted-foreground">Keep it up! You're on fire!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Progress</CardTitle>
              <CardDescription>Your workout progress over time</CardDescription>
            </div>
            <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as "week" | "month")} className="w-[180px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="week">Weekly</TabsTrigger>
                <TabsTrigger value="month">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <DashboardChart timeframe={timeframe} />
          </CardContent>
        </Card>

        <AiAssistant />
      </div>
    </div>
  )
}

