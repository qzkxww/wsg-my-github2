"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Info } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Task } from "@/lib/types"
import { PlatformIcon } from "@/components/platform-icon"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TaskCardProps {
  task: Task
  onComplete: (taskId: string, completed: boolean) => void
  className?: string
}

export function TaskCard({ task, onComplete, className }: TaskCardProps) {
  const [isPending, setIsPending] = useState(false)
  
  const handleToggleComplete = () => {
    setIsPending(true)
    
    // Simulate API delay
    setTimeout(() => {
      onComplete(task.id, !task.completed)
      setIsPending(false)
      
      if (!task.completed) {
        toast.success("Task completed!", {
          description: `Great job! You've completed: ${task.title}`,
        })
      }
    }, 400)
  }
  
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300", 
        task.completed ? "border-green-500/20 bg-green-500/5" : "",
        className
      )}
    >
      {task.completed && (
        <div className="absolute right-0 top-0">
          <div className="h-14 w-14 translate-x-7 -translate-y-7 rotate-45 bg-green-500" />
        </div>
      )}
      
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <PlatformIcon platform={task.platform} />
            <span>{task.platform}</span>
          </div>
          
          {task.isPremade && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={14} className="text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pre-made recommended task</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <CardTitle className={cn(
          task.completed ? "line-through opacity-70" : ""
        )}>
          {task.title}
        </CardTitle>
        
        {task.description && (
          <CardDescription className={cn(
            task.completed ? "line-through opacity-70" : ""
          )}>
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardFooter className="px-4 pb-4 pt-0">
        <Button 
          variant="outline"
          className="w-full gap-2"
          onClick={handleToggleComplete}
          disabled={isPending}
        >
          {!isPending ? (
            <>
              {task.completed ? (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2 size={16} className="text-green-500" />
                </motion.div>
              ) : (
                <Circle size={16} />
              )}
              {task.completed ? "Completed" : "Mark as complete"}
            </>
          ) : (
            <span>Updating...</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}