"use client"

import { Header } from "@/components/header"
import { UserStatsCard } from "@/components/user-stats-card"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6">
          <UserStatsCard className="mb-6" />
          {children}
        </div>
      </main>
    </div>
  )
}