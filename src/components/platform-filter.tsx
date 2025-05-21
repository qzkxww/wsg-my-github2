"use client"

import { Platform } from "@/lib/types"
import { platforms } from "@/lib/data"
import { PlatformIcon } from "@/components/platform-icon"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PlatformFilterProps {
  selectedPlatform: Platform | "All"
  onSelectPlatform: (platform: Platform | "All") => void
}

export function PlatformFilter({ 
  selectedPlatform, 
  onSelectPlatform 
}: PlatformFilterProps) {
  return (
    <div className="mb-6">
      <ScrollArea className="w-full whitespace-nowrap">
        <Tabs defaultValue="All" value={selectedPlatform} onValueChange={(value) => onSelectPlatform(value as Platform | "All")}>
          <TabsList className="inline-flex w-full">
            <TabsTrigger value="All" className="min-w-16">
              All
            </TabsTrigger>
            
            {platforms.map((platform) => (
              <TabsTrigger 
                key={platform} 
                value={platform}
                className="flex min-w-24 items-center gap-2"
              >
                <PlatformIcon platform={platform} size={14} />
                {platform}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}