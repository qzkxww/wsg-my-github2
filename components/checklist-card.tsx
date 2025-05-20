"use client"

import { useState } from "react"
import { Checklist, Task } from "@/lib/types"
import { PlatformIcon } from "@/components/platform-icon"
import { ProgressBar } from "@/components/progress-bar"
import { TaskCard } from "@/components/task-card"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ChecklistCardProps {
  checklist: Checklist
  onTaskComplete: (taskId: string, completed: boolean) => void
  className?: string
}

export function ChecklistCard({
  checklist,
  onTaskComplete,
  className,
}: ChecklistCardProps) {
  const [tasks, setTasks] = useState<Task[]>(checklist.tasks)

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed } : task
    )
    setTasks(updatedTasks)
    onTaskComplete(taskId, completed)
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlatformIcon platform={checklist.platform} size={18} />
            <CardTitle>{checklist.title}</CardTitle>
          </div>
          <Badge variant={checklist.isDaily ? "default" : "outline"}>
            {checklist.isDaily ? "Daily" : "Weekly"}
          </Badge>
        </div>
        {checklist.description && (
          <CardDescription>{checklist.description}</CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="pb-2">
        <ProgressBar tasks={tasks} className="mb-4" />
        <Separator className="mb-4" />
        
        <div className="grid gap-3">
          {tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onComplete={handleTaskComplete} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}