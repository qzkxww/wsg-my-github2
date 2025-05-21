"use client"

import React from 'react'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange
    >
      {children}
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}