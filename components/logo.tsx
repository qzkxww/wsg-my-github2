"use client"

import { Rocket } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Rocket className="h-6 w-6 text-primary" />
      <span className="font-bold text-xl">PostPilot</span>
    </Link>
  )
}