"use client"

import { useState } from "react"
import { format, addDays, startOfWeek, isSameDay } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainLayout } from "@/components/main-layout"
import { defaultChecklists, mockProgressData } from "@/lib/data"
import { BarChart as BarChartIcon, Calendar as CalendarIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeeklyProgressChart } from "@/components/weekly-progress-chart"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function TrackerPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  // Get tasks completed for the current week
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekDays = [...Array(7)].map((_, i) => addDays(startOfCurrentWeek, i))
  
  // Generate random completion data for the week (in a real app, this would come from the backend)
  const weekTasksData = weekDays.map(day => {
    const totalTasks = Math.floor(Math.random() * 3) + 3
    const completedTasks = Math.floor(Math.random() * (totalTasks + 1))
    
    return {
      date: format(day, "yyyy-MM-dd"),
      dayName: format(day, "EEE"),
      dayOfMonth: format(day, "d"),
      totalTasks,
      completedTasks,
      percentage: Math.round((completedTasks / totalTasks) * 100)
    }
  })
  
  // Calculate streaks and average completion
  const currentStreak = 7
  const longestStreak = 14
  const averageCompletion = Math.round(
    weekTasksData.reduce((acc, day) => acc + day.percentage, 0) / 7
  )
  
  // Generate calendar day data for rendering
  const getDayCompletionStatus = (day: Date) => {
    // This would normally come from your backend or local storage
    // For demo purposes, we'll generate random data
    const random = Math.random()
    if (random > 0.7) return "full"
    if (random > 0.4) return "partial"
    if (random > 0.2) return "none"
    return undefined // No data for this day
  }
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Habit Tracker</h1>
        <p className="text-muted-foreground">
          Track your social media posting consistency
        </p>
      </div>
      
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Current Streak",
            value: currentStreak,
            unit: "days",
            description: "Your current consecutive days of completing tasks"
          },
          {
            title: "Longest Streak",
            value: longestStreak,
            unit: "days",
            description: "Your longest consecutive streak to date"
          },
          {
            title: "Weekly Average",
            value: averageCompletion,
            unit: "%",
            description: "Average task completion for this week"
          }
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stat.value}
                <span className="ml-1 text-lg font-normal text-muted-foreground">
                  {stat.unit}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="calendar">
        <TabsList className="mb-6 grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarIcon size={16} />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="chart" className="flex items-center gap-2">
            <BarChartIcon size={16} />
            Chart View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Task Completion Calendar</CardTitle>
              <CardDescription>
                Review your daily task completion history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  components={{
                    DayContent: ({ date, ...props }) => {
                      const status = getDayCompletionStatus(date)
                      return (
                        <div
                          {...props}
                          className="relative flex h-9 w-9 items-center justify-center p-0"
                        >
                          {/* Day number */}
                          {date.getDate()}
                          
                          {/* Completion indicator */}
                          {status && (
                            <div className={cn(
                              "absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                              status === "full" && "bg-green-500",
                              status === "partial" && "bg-amber-500",
                              status === "none" && "bg-red-500"
                            )} />
                          )}
                        </div>
                      )
                    }
                  }}
                />
              </div>
              
              <div className="mt-4 flex items-center justify-center gap-4">
                {[
                  { label: "All tasks completed", color: "bg-green-500" },
                  { label: "Partial completion", color: "bg-amber-500" },
                  { label: "No tasks completed", color: "bg-red-500" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-xs text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>This Week</CardTitle>
              <CardDescription>
                Daily completion status for the current week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {weekTasksData.map((day, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col items-center rounded-lg border p-2",
                      isSameDay(new Date(day.date), new Date()) && "border-primary bg-primary/5"
                    )}
                  >
                    <span className="text-xs font-medium">{day.dayName}</span>
                    <span className="mb-2 text-lg font-bold">{day.dayOfMonth}</span>
                    
                    <Badge
                      variant="outline"
                      className={cn(
                        "w-full justify-center",
                        day.percentage === 100 && "bg-green-500/10 text-green-500",
                        day.percentage > 0 && day.percentage < 100 && "bg-amber-500/10 text-amber-500",
                        day.percentage === 0 && "bg-red-500/10 text-red-500"
                      )}
                    >
                      {day.percentage}%
                    </Badge>
                    
                    <span className="mt-1 text-xs text-muted-foreground">
                      {day.completedTasks}/{day.totalTasks}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chart" className="mt-0">
          <WeeklyProgressChart data={mockProgressData} />
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}