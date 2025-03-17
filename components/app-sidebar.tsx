"use client"

import { Home, Dumbbell, Users, ShoppingBag, Settings, Sun, Moon, Package } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Workout Plan",
    icon: Dumbbell,
    href: "/workout",
  },
  {
    title: "Community",
    icon: Users,
    href: "/community",
  },
  {
    title: "Shop",
    icon: ShoppingBag,
    href: "/shop",
  },
  {
    title: "Inventory",
    icon: Package,
    href: "/inventory",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function AppSidebar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [collapsed, setCollapsed] = useState(true)
  const [hovering, setHovering] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Handle hover events with a slight delay for better UX
  const handleMouseEnter = () => {
    setHovering(true)
    setTimeout(() => {
      if (hovering) setCollapsed(false)
    }, 100)
  }

  const handleMouseLeave = () => {
    setHovering(false)
    setTimeout(() => {
      if (!hovering) setCollapsed(true)
    }, 300)
  }

  // Handle click outside to collapse sidebar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && !isMobile) {
        setCollapsed(true)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <TooltipProvider delayDuration={300}>
      <div
        ref={sidebarRef}
        className={cn(
          "h-screen sticky top-0 flex flex-col border-r bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out z-10 shadow-sm",
          collapsed ? "w-[70px]" : "w-[240px]",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        <div className="flex items-center justify-center p-4 h-16 border-b">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-sm">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h1
              className={cn(
                "text-xl font-bold transition-all duration-300 whitespace-nowrap",
                collapsed ? "opacity-0 max-w-0 overflow-hidden" : "opacity-100 max-w-[160px]",
              )}
            >
              FitTrack
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto scrollbar-hide">
          <ul className="space-y-2 px-3">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.title}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-center h-10 w-10 rounded-md transition-all duration-200",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer with theme toggle */}
        <div className="p-4 border-t">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-10 h-10 rounded-full"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{theme === "dark" ? "Light Mode" : "Dark Mode"}</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="outline"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full flex items-center justify-center gap-2 transition-all duration-200"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span>Dark Mode</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}

