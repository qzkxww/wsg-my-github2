"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Task } from "@/lib/types"
import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  tasks: Task[]
  className?: string
}

export function ProgressBar({ tasks, className }: ProgressBarProps) {
  const progressStats = useMemo(() => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.completed).length
    const progressPercentage = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0
      
    return {
      totalTasks,
      completedTasks,
      progressPercentage
    }
  }, [tasks])
  
  let progressStatus = "Not started"
  if (progressStats.progressPercentage === 100) {
    progressStatus = "Completed"
  } else if (progressStats.progressPercentage > 0) {
    progressStatus = "In progress"
  }
  
  let progressColor = "bg-primary"
  if (progressStats.progressPercentage === 100) {
    progressColor = "bg-green-500"
  } else if (progressStats.progressPercentage > 50) {
    progressColor = "bg-blue-500"
  }
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="font-medium">{progressStatus}</span>
          <span className="text-muted-foreground">
            {" "}— {progressStats.completedTasks}/{progressStats.totalTasks} tasks
          </span>
        </div>
        <div className="font-semibold">{progressStats.progressPercentage}%</div>
      </div>
      
      <Progress 
        value={progressStats.progressPercentage} 
        className="h-2"
        indicatorClassName={cn(progressColor)}
      />
    </div>
  )
}