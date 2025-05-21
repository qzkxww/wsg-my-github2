"use client"

import { Facebook, Instagram, Linkedin, Pencil, Twitter, Youtube } from "lucide-react"
import { Platform } from "@/lib/types"

interface PlatformIconProps {
  platform: Platform
  className?: string
  size?: number
}

export function PlatformIcon({ platform, className, size = 16 }: PlatformIconProps) {
  switch (platform) {
    case "Instagram":
      return <Instagram className={className} size={size} />
    case "X":
      return <Twitter className={className} size={size} />
    case "TikTok":
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={className}
        >
          <path 
            d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" 
            fill="currentColor"
          />
        </svg>
      )
    case "LinkedIn":
      return <Linkedin className={className} size={size} />
    case "YouTube":
      return <Youtube className={className} size={size} />
    case "Pinterest":
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={className}
        >
          <path 
            d="M12 0a12 12 0 0 0-4.33 23.15c-.02-.94 0-2.06.24-3.08l1.73-7.36s-.43-.86-.43-2.13c0-2 1.16-3.49 2.6-3.49 1.23 0 1.82.92 1.82 2.02 0 1.23-.79 3.07-1.2 4.78-.33 1.43.72 2.59 2.13 2.59 2.55 0 4.5-2.7 4.5-6.6 0-3.46-2.48-5.87-5.99-5.87-4.08 0-6.5 3.07-6.5 6.23 0 1.23.48 2.55 1.07 3.25.12.15.13.27.1.42l-.4 1.6c-.06.26-.2.32-.47.2-1.72-.83-2.8-3.38-2.8-5.43 0-4.44 3.23-8.53 9.32-8.53 4.9 0 8.68 3.5 8.68 8.17 0 4.88-3.07 8.8-7.33 8.8-1.43 0-2.77-.75-3.24-1.62l-.88 3.37c-.32 1.23-1.18 2.77-1.76 3.7A12 12 0 1 0 12 0z" 
            fill="currentColor"
          />
        </svg>
      )
    case "Facebook":
      return <Facebook className={className} size={size} />
    default:
      return <Pencil className={className} size={size} />
  }
}