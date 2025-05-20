"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { PlatformFilter } from "@/components/platform-filter"
import { ChecklistCard } from "@/components/checklist-card"
import { defaultChecklists } from "@/lib/data"
import { Platform, Task } from "@/lib/types"
import { CreateTaskForm } from "@/components/create-task-form"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TasksPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "All">("All")
  const [taskFilter, setTaskFilter] = useState<"all" | "completed" | "pending">("all")
  const [checklists, setChecklists] = useState(defaultChecklists)
  
  // Filter by platform
  let filteredChecklists = selectedPlatform === "All"
    ? checklists
    : checklists.filter(checklist => checklist.platform === selectedPlatform)
  
  // Apply task completion filter
  filteredChecklists = filteredChecklists.map(checklist => {
    let filteredTasks = checklist.tasks
    
    if (taskFilter === "completed") {
      filteredTasks = checklist.tasks.filter(task => task.completed)
    } else if (taskFilter === "pending") {
      filteredTasks = checklist.tasks.filter(task => !task.completed)
    }
    
    return {
      ...checklist,
      tasks: filteredTasks
    }
  }).filter(checklist => checklist.tasks.length > 0)
  
  const handleTaskComplete = (taskId: string, completed: boolean) => {
    setChecklists(prevChecklists => 
      prevChecklists.map(checklist => ({
        ...checklist,
        tasks: checklist.tasks.map(task => 
          task.id === taskId ? { ...task, completed } : task
        )
      }))
    )
  }
  
  const handleTaskCreated = (newTask: Task) => {
    // Find if there's a checklist for this platform
    const checklistIndex = checklists.findIndex(
      cl => cl.platform === newTask.platform
    )
    
    if (checklistIndex !== -1) {
      // Add task to existing checklist
      setChecklists(prevChecklists => {
        const updatedChecklists = [...prevChecklists]
        updatedChecklists[checklistIndex] = {
          ...updatedChecklists[checklistIndex],
          tasks: [...updatedChecklists[checklistIndex].tasks, newTask]
        }
        return updatedChecklists
      })
    } else {
      // Create new checklist with this task
      const newChecklist = {
        id: Date.now().toString(),
        title: `${newTask.platform} Tasks`,
        platform: newTask.platform,
        tasks: [newTask],
        isDaily: true,
        createdAt: new Date().toISOString()
      }
      
      setChecklists(prevChecklists => [...prevChecklists, newChecklist])
    }
  }
  
  return (
    <MainLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track your social media tasks
          </p>
        </div>
        
        <div className="flex gap-2">
          <CreateTaskForm onTaskCreated={handleTaskCreated} />
        </div>
      </div>
      
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PlatformFilter
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
        />
        
        <div className="w-full max-w-xs">
          <Select value={taskFilter} onValueChange={(value: "all" | "completed" | "pending") => setTaskFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredChecklists.length > 0 ? (
          filteredChecklists.map((checklist) => (
            <ChecklistCard
              key={checklist.id}
              checklist={checklist}
              onTaskComplete={handleTaskComplete}
            />
          ))
        ) : (
          <Card className="col-span-full p-6 text-center">
            <h3 className="mb-2 text-lg font-medium">No tasks found</h3>
            <p className="mb-4 text-muted-foreground">
              {selectedPlatform === "All"
                ? `No ${taskFilter === "all" ? "" : taskFilter} tasks found.`
                : `No ${taskFilter === "all" ? "" : taskFilter} tasks found for ${selectedPlatform}.`}
            </p>
            <CreateTaskForm 
              onTaskCreated={handleTaskCreated}
              defaultPlatform={selectedPlatform === "All" ? undefined : selectedPlatform}
            />
          </Card>
        )}
      </div>
    </MainLayout>
  )
}