"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  ActivitySquare, 
  BarChart2, 
  CheckSquare, 
  Crown, 
  LayoutDashboard, 
  Settings, 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { mockUser } from "@/lib/data"

interface NavItemsProps {
  direction?: "horizontal" | "vertical"
}

export function NavItems({ direction = "horizontal" }: NavItemsProps) {
  const pathname = usePathname()

  const navItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      active: pathname === "/"
    },
    {
      label: "Tasks",
      href: "/tasks",
      icon: CheckSquare,
      active: pathname === "/tasks"
    },
    {
      label: "Habit Tracker",
      href: "/tracker",
      icon: ActivitySquare,
      active: pathname === "/tracker"
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: BarChart2,
      active: pathname === "/analytics",
      pro: true
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      active: pathname === "/settings"
    }
  ]

  return (
    <div className={cn(
      "flex items-center gap-1", 
      direction === "vertical" ? "flex-col w-full" : ""
    )}>
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Button
            key={item.href}
            variant={item.active ? "default" : "ghost"}
            size={direction === "horizontal" ? "sm" : "default"}
            className={cn(
              direction === "vertical" ? "w-full justify-start" : "",
              "gap-2"
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon size={16} />
              {item.label}
              {item.pro && !mockUser.isPro && (
                <Crown size={12} className="ml-1 text-amber-400" />
              )}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}