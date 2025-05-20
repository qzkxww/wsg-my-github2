"use client"

import { ProgressData } from "@/lib/types"
import { format, parseISO } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface WeeklyProgressChartProps {
  data: ProgressData[]
  className?: string
}

export function WeeklyProgressChart({ data, className }: WeeklyProgressChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    date: format(parseISO(item.date), "EEE"),
    percentage: Math.round((item.completedTasks / item.totalTasks) * 100)
  }))

  const getBarColor = (value: number) => {
    if (value >= 70) return "#6366f1" // Rich Indigo for high values
    if (value >= 40) return "#a78bfa" // Soft Indigo for medium values
    return "#e0e7ff" // Light Lavender for low values
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
        <CardDescription>
          Your task completion rate for the past 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`} 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, "Completion"]}
                labelFormatter={(value) => `Day: ${value}`}
              />
              <Bar 
                dataKey="percentage" 
                radius={[4, 4, 0, 0]}
                fill="#6366f1"
                barSize={40}
                cellRenderers={[
                  (props: any) => ({
                    ...props,
                    fill: getBarColor(props.value),
                  }),
                ]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}