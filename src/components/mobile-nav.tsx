"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { NavItems } from "@/components/nav-items"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mb-4">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Navigate through PostPilot
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <NavItems direction="vertical" />
        </div>
      </SheetContent>
    </Sheet>
  )
}