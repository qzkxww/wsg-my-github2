"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Shield, UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { MainLayout } from "@/components/main-layout"
import { PlanCard } from "@/components/plan-card"
import { mockUser, plans, platforms } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlatformIcon } from "@/components/platform-icon"
import { PlanType } from "@/lib/types"

export default function SettingsPage() {
  const [selectedPlanType, setSelectedPlanType] = useState<PlanType>(mockUser.isPro ? "pro" : "free")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")
  const [activePlatforms, setActivePlatforms] = useState(mockUser.platforms)
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: true,
    streak: true,
    reminders: true,
    analytics: false,
  })
  
  const handlePlatformToggle = (platform: string) => {
    if (activePlatforms.includes(platform as any)) {
      setActivePlatforms(activePlatforms.filter(p => p !== platform))
    } else {
      setActivePlatforms([...activePlatforms, platform as any])
    }
  }
  
  const toggleNotification = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [key]: !notificationPreferences[key]
    })
  }
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="subscription" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-[600px]">
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard size={16} />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="platforms" className="flex items-center gap-2">
            <PlatformIcon platform="Instagram" size={16} />
            Platforms
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <UserIcon size={16} />
            Preferences
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>
                Choose the plan that best fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center justify-end gap-2">
                <Label htmlFor="billing-cycle">Monthly</Label>
                <Switch
                  id="billing-cycle"
                  checked={billingCycle === "annually"}
                  onCheckedChange={(checked) =>
                    setBillingCycle(checked ? "annually" : "monthly")
                  }
                />
                <Label htmlFor="billing-cycle" className="flex items-center gap-1">
                  Yearly
                  <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500">
                    Save 18%
                  </span>
                </Label>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.type}
                    plan={plan}
                    isCurrentPlan={plan.type === (mockUser.isPro ? "pro" : "free")}
                    isSelected={selectedPlanType === plan.type}
                    onSelect={() => setSelectedPlanType(plan.type)}
                    billingCycle={billingCycle}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Manage your payment methods and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is a demo application. No actual payment processing is implemented.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="platforms" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Platforms</CardTitle>
              <CardDescription>
                Select the social media platforms you want to track
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {platforms.map((platform, index) => {
                  const isActive = activePlatforms.includes(platform)
                  const isLocked = !mockUser.isPro && index > 1 && !isActive
                  
                  return (
                    <motion.div
                      key={platform}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
                          isActive ? "border-primary bg-primary/5" : "",
                          isLocked ? "cursor-not-allowed opacity-50" : ""
                        )}
                        onClick={() => !isLocked && handlePlatformToggle(platform)}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full",
                            isActive ? "bg-primary/10" : "bg-muted"
                          )}
                        >
                          <PlatformIcon 
                            platform={platform} 
                            size={22} 
                            className={isActive ? "text-primary" : "text-muted-foreground"}
                          />
                        </div>
                        
                        <div className="flex-1">
                          <p className="font-medium">{platform}</p>
                          <p className="text-xs text-muted-foreground">
                            {isActive ? "Active" : "Inactive"}
                          </p>
                        </div>
                        
                        {isLocked && (
                          <Shield size={16} className="text-amber-500" />
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              
              {!mockUser.isPro && (
                <div className="mt-6 rounded-lg border border-dashed border-amber-500 bg-amber-500/5 p-4 text-center">
                  <p className="mb-2 text-sm font-medium text-amber-500">
                    Pro Feature
                  </p>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Upgrade to Pro to unlock all platforms and create unlimited tasks
                  </p>
                  <Button size="sm" variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10 hover:text-amber-500">
                    Upgrade to Pro
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "email",
                  label: "Email Notifications",
                  description: "Receive updates and summaries via email"
                },
                {
                  id: "push",
                  label: "Push Notifications",
                  description: "Get timely reminders on your device"
                },
                {
                  id: "streak",
                  label: "Streak Alerts",
                  description: "Be notified when your streak is at risk"
                },
                {
                  id: "reminders",
                  label: "Daily Reminders",
                  description: "Receive a daily reminder to complete your tasks"
                },
                {
                  id: "analytics",
                  label: "Weekly Analytics",
                  description: "Get a weekly report of your performance",
                  pro: true
                }
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between space-x-2"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center">
                      <Label htmlFor={item.id} className="font-medium">
                        {item.label}
                      </Label>
                      {item.pro && !mockUser.isPro && (
                        <span className="ml-2 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-500">
                          Pro
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <Switch
                    id={item.id}
                    checked={notificationPreferences[item.id as keyof typeof notificationPreferences]}
                    onCheckedChange={() => toggleNotification(item.id as keyof typeof notificationPreferences)}
                    disabled={item.pro && !mockUser.isPro}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="account-name">Name</Label>
                <div className="rounded-md border px-3 py-2">
                  {mockUser.name}
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="account-email">Email</Label>
                <div className="rounded-md border px-3 py-2">
                  {mockUser.email}
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="account-joined">Joined</Label>
                <div className="rounded-md border px-3 py-2">
                  {new Date(mockUser.joinedAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Change Password</Button>
              <Button variant="destructive">Delete Account</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}