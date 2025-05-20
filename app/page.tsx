"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Plus, Rocket } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { WeeklyProgressChart } from "@/components/weekly-progress-chart"
import { defaultChecklists, mockProgressData, platforms } from "@/lib/data"
import { ChecklistCard } from "@/components/checklist-card"
import { PlatformFilter } from "@/components/platform-filter"
import { CreateTaskForm } from "@/components/create-task-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Platform, Task } from "@/lib/types"

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "All">("All")
  const [checklists, setChecklists] = useState(defaultChecklists)
  
  const filteredChecklists = selectedPlatform === "All"
    ? checklists
    : checklists.filter(checklist => checklist.platform === selectedPlatform)
    
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
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your social media posting habits
          </p>
        </div>
        
        <div className="flex gap-2">
          <CreateTaskForm onTaskCreated={handleTaskCreated} />
        </div>
      </div>
      
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <WeeklyProgressChart data={mockProgressData} />
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>
              Get started with PostPilot in a few simple steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                {
                  title: "Complete today's tasks",
                  description:
                    "Finish your daily social media tasks to maintain your streak",
                  icon: Clock,
                  color: "text-blue-500",
                  bgColor: "bg-blue-500/10",
                },
                {
                  title: "Add a custom task",
                  description:
                    "Create personalized tasks for your specific content goals",
                  icon: Plus,
                  color: "text-purple-500",
                  bgColor: "bg-purple-500/10",
                },
                {
                  title: "Upgrade to Pro",
                  description:
                    "Get access to AI-powered features and unlimited platforms",
                  icon: Rocket,
                  color: "text-amber-500",
                  bgColor: "bg-amber-500/10",
                  action: (
                    <Button size="sm" variant="outline" asChild>
                      <a href="/settings">Upgrade</a>
                    </Button>
                  ),
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.bgColor}`}
                  >
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  {item.action}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Daily Tasks</h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/tasks">View all</a>
          </Button>
        </div>
        
        <PlatformFilter
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
        />
        
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
              <h3 className="mb-2 text-lg font-medium">No checklists found</h3>
              <p className="mb-4 text-muted-foreground">
                {selectedPlatform === "All"
                  ? "You don't have any checklists set up yet."
                  : `You don't have any checklists for ${selectedPlatform}.`}
              </p>
              <CreateTaskForm 
                onTaskCreated={handleTaskCreated} 
                defaultPlatform={selectedPlatform === "All" ? undefined : selectedPlatform}
              />
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  )
}