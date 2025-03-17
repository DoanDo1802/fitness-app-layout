"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNavigation } from "@/components/mobile-navigation"
import { useIsMobile } from "@/hooks/use-mobile"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 md:p-6 pb-20 md:pb-6 max-w-[1400px] mx-auto w-full">{children}</div>
        {isMobile && <MobileNavigation />}
      </main>
    </div>
  )
}

