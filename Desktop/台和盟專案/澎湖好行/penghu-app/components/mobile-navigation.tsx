"use client"

import { Home, Ticket, CreditCard, Calendar, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"

interface MobileNavigationProps {
  activeTab?: string
}

export function MobileNavigation({ activeTab = "home" }: MobileNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  const isPurchaseFlow = pathname.startsWith("/purchase") && !pathname.includes("/success")
  if (isPurchaseFlow) {
    return null
  }
  // </CHANGE>

  const navItems = [
    { id: "home", label: "首頁", icon: Home, labelEn: "Home", href: "/" },
    { id: "my-tickets", label: "我的車票", icon: Ticket, labelEn: "My Tickets", href: "/my-tickets" },
    { id: "purchase", label: "購票", icon: CreditCard, labelEn: "Purchase", href: "/purchase/tickets" },
    { id: "reservation", label: "有票劃位", icon: Calendar, labelEn: "Reservation", href: "/reservation" },
    { id: "support", label: "客服", icon: MessageCircle, labelEn: "Support", href: "/support" },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.href)}
              className={cn(
                "flex flex-col items-center justify-center rounded-lg transition-colors min-w-0 flex-1 py-2 px-0",
                isActive
                  ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive ? "text-blue-600 dark:text-blue-400" : "")} />
              <span
                className={cn("text-xs font-medium leading-none", isActive ? "text-blue-600 dark:text-blue-400" : "")}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MobileNavigation
