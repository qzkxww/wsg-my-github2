"use client"

import { Activity, Award, Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { mockUser } from "@/lib/data"
import { cn } from "@/lib/utils"

interface UserStatsCardProps {
  className?: string
}

export function UserStatsCard({ className }: UserStatsCardProps) {
  const stats = [
    {
      label: "Streak",
      value: mockUser.streak,
      icon: Flame,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      label: "Habit Score",
      value: mockUser.habitScore,
      icon: Award,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Platforms",
      value: mockUser.platforms.length,
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ]

  return (
    <Card className={cn("border", className)}>
      <CardContent className="px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full",
                    stat.bgColor
                  )}
                >
                  <Icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}