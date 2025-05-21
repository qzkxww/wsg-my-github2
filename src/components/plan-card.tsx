"use client"

import { motion } from "framer-motion"
import { CheckIcon } from "lucide-react"
import { Plan } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface PlanCardProps {
  plan: Plan
  isCurrentPlan: boolean
  isSelected: boolean
  onSelect: () => void
  billingCycle: "monthly" | "annually"
}

export function PlanCard({
  plan,
  isCurrentPlan,
  isSelected,
  onSelect,
  billingCycle,
}: PlanCardProps) {
  const handleSubscribe = () => {
    if (isCurrentPlan) {
      toast.info("This is your current plan")
      return
    }
    
    toast.success(`You've selected the ${plan.name} plan`, {
      description: "This is a demo, no actual subscription is processed",
    })
  }
  
  const price = billingCycle === "monthly" 
    ? plan.price.monthly 
    : plan.price.annually
    
  const yearlyDiscount = Math.round(
    ((plan.price.monthly * 12 - plan.price.annually) / (plan.price.monthly * 12)) * 100
  )
  
  return (
    <Card
      className={`relative cursor-pointer transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-primary ring-offset-2"
          : "hover:border-primary/50"
      }`}
      onClick={onSelect}
    >
      {isCurrentPlan && (
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Current plan
          </span>
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <div className="flex items-end">
            <span className="text-3xl font-bold">${price}</span>
            <span className="ml-1 text-muted-foreground">
              /{billingCycle === "monthly" ? "month" : "year"}
            </span>
          </div>
          
          {billingCycle === "annually" && plan.type === "pro" && (
            <p className="mt-1 text-xs text-green-500">
              Save {yearlyDiscount}% with annual billing
            </p>
          )}
        </div>
        
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <CheckIcon className="mt-0.5 h-4 w-4 text-green-500" />
              <span className="text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          variant={plan.type === "free" ? "outline" : "default"}
          onClick={handleSubscribe}
        >
          {plan.type === "free" ? "Current Plan" : "Subscribe"}
        </Button>
      </CardFooter>
    </Card>
  )
}