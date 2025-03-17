"use client"

import { useTheme } from "next-themes"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from "recharts"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Weekly data - days of the week
const weeklyData = [
  { day: "Mon", completed: 1, target: 1, minutes: 45, calories: 320 },
  { day: "Tue", completed: 1, target: 1, minutes: 60, calories: 450 },
  { day: "Wed", completed: 1, target: 1, minutes: 50, calories: 380 },
  { day: "Thu", completed: 0, target: 1, minutes: 0, calories: 0 },
  { day: "Fri", completed: 0, target: 1, minutes: 0, calories: 0 },
  { day: "Sat", completed: 0, target: 1, minutes: 0, calories: 0 },
  { day: "Sun", completed: 0, target: 1, minutes: 0, calories: 0 },
]

// Monthly data - last 4 weeks
const monthlyData = [
  { week: "Week 1", completed: 5, target: 7, minutes: 240, calories: 1800 },
  { week: "Week 2", completed: 4, target: 7, minutes: 180, calories: 1500 },
  { week: "Week 3", completed: 6, target: 7, minutes: 300, calories: 2200 },
  { week: "Week 4", completed: 3, target: 7, minutes: 135, calories: 1100 },
]

interface DashboardChartProps {
  timeframe: "week" | "month"
}

export function DashboardChart({ timeframe }: DashboardChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [chartType, setChartType] = useState<"workouts" | "minutes" | "calories">("workouts")

  const data = timeframe === "week" ? weeklyData : monthlyData
  const dataKey = timeframe === "week" ? "day" : "week"

  const textColor = isDark ? "#888888" : "#666666"
  const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

  // Colors
  const primaryColor = "#5E60CE"
  const primaryColorLight = "#5E60CE30"
  const secondaryColor = "#F94C10"
  const tertiaryColor = "#38B000"
  const completedColor = "#5E60CE"
  const incompleteColor = "#E2E8F0"

  // Calculate total completed workouts
  const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0)
  const totalTarget = data.reduce((sum, item) => sum + item.target, 0)
  const completionRate = Math.round((totalCompleted / totalTarget) * 100)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-sm p-3">
          <p className="font-medium">{label}</p>
          {chartType === "workouts" && (
            <p className="text-sm text-muted-foreground">{payload[0].value === 1 ? "Completed" : "Not completed"}</p>
          )}
          {chartType === "minutes" && (
            <p className="text-sm text-muted-foreground">
              Minutes: <span className="font-medium text-[#F94C10]">{payload[0].value}</span>
            </p>
          )}
          {chartType === "calories" && (
            <p className="text-sm text-muted-foreground">
              Calories: <span className="font-medium text-[#38B000]">{payload[0].value}</span>
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <Tabs value={chartType} onValueChange={(v) => setChartType(v as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="minutes">Minutes</TabsTrigger>
          <TabsTrigger value="calories">Calories</TabsTrigger>
        </TabsList>
      </Tabs>

      {chartType === "workouts" && (
        <div className="flex flex-col items-center justify-center mb-4 text-center">
          <div className="text-4xl font-bold">
            {totalCompleted}/{totalTarget}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {timeframe === "week" ? "days worked out this week" : "days worked out this month"}
          </div>
          <div className="w-full max-w-xs mt-3 bg-muted rounded-full h-2.5 overflow-hidden">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${completionRate}%` }}></div>
          </div>
          <div className="text-sm mt-1">{completionRate}% complete</div>
        </div>
      )}

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "workouts" ? (
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey={dataKey}
                stroke={textColor}
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis
                stroke={textColor}
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
                tickFormatter={(value) => `${value}`}
                domain={[0, 1]}
                ticks={[0, 1]}
                tickCount={2}
                hide={timeframe === "week"}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                name="Workout Days"
                dataKey="completed"
                radius={[4, 4, 0, 0]}
                barSize={timeframe === "week" ? 30 : 60}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.completed > 0 ? completedColor : incompleteColor} />
                ))}
              </Bar>
            </BarChart>
          ) : chartType === "minutes" ? (
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={secondaryColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey={dataKey}
                stroke={textColor}
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis
                stroke={textColor}
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="minutes"
                stroke={secondaryColor}
                fillOpacity={1}
                fill="url(#colorMinutes)"
                name="Workout Minutes"
              />
              <ReferenceLine
                y={timeframe === "week" ? 45 : 200}
                label={{
                  value: "Goal",
                  position: "insideTopRight",
                  fill: secondaryColor,
                  fontSize: 12,
                }}
                stroke={secondaryColor}
                strokeDasharray="3 3"
              />
            </AreaChart>
          ) : (
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={tertiaryColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={tertiaryColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey={dataKey}
                stroke={textColor}
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis
                stroke={textColor}
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="calories"
                stroke={tertiaryColor}
                fillOpacity={1}
                fill="url(#colorCalories)"
                name="Calories Burned"
              />
              <ReferenceLine
                y={timeframe === "week" ? 300 : 1500}
                label={{
                  value: "Target",
                  position: "insideTopRight",
                  fill: tertiaryColor,
                  fontSize: 12,
                }}
                stroke={tertiaryColor}
                strokeDasharray="3 3"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

