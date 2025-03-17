"use client"

import { Home, Dumbbell, Users, ShoppingBag, Settings, Package } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Workout",
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

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <nav className="flex justify-around items-center h-16">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

