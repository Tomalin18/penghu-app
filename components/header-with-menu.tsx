"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Home, Ticket, Calendar, MessageCircle, MapPin, Globe, ChevronLeft, Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface HeaderWithMenuProps {
  title?: string
  showBackButton?: boolean
  onBack?: () => void
}

export function HeaderWithMenu({ title, showBackButton = true, onBack }: HeaderWithMenuProps) {
  const router = useRouter()
  const [currentLanguage, setCurrentLanguage] = useState<"zh-TW" | "en" | "ja" | "ko">("zh-TW")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigationItems = [
    { id: "home", label: "首頁", icon: Home, href: "/" },
    { id: "my-tickets", label: "我的車票", icon: Ticket, href: "/my-tickets" },
    { id: "reservation", label: "有票劃位", icon: Calendar, href: "/reservation" },
    { id: "support", label: "客服", icon: MessageCircle, href: "/support" },
    { id: "attractions", label: "景點", icon: MapPin, href: "/attractions" },
    { id: "timetable", label: "時刻表（站點及附近交通）", icon: Calendar, href: "/timetable" },
    { id: "news", label: "最新消息", icon: MessageCircle, href: "/news" },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const handleLanguageChange = (language: "zh-TW" | "en" | "ja" | "ko") => {
    setCurrentLanguage(language)
    // Here you would typically integrate with your i18n system
    console.log("[v0] Language switched to:", language)
  }

  const handleUserProfileClick = () => {
    if (isLoggedIn) {
      router.push("/profile")
    } else {
      router.push("/login")
    }
  }

  const languageOptions = {
    "zh-TW": "繁中",
    en: "English",
    ja: "日本語",
    ko: "한국어",
  }

  const notifications = [
    {
      id: 1,
      category: "個人通知",
      message: "您的訂票已確認，車票編號：TW20250102001",
      time: "5分鐘前",
      unread: true,
    },
    {
      id: 2,
      category: "系統通知",
      message: "春節連假訂票系統將於1月15日開放",
      time: "1小時前",
      unread: true,
    },
    {
      id: 3,
      category: "活動通知",
      message: "早鳥優惠：提前30天訂票享8折優惠",
      time: "2天前",
      unread: false,
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllRead = () => {
    console.log("[v0] Mark all notifications as read")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm px-3 py-3">
      <div className="relative flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-1">
          {showBackButton && (
            <Button variant="ghost" size="icon" className="rounded-full" onClick={handleBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>選單</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className="w-full justify-start h-12"
                      onClick={() => handleNavigation(item.href)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Button>
                  )
                })}

                <div className="pt-4 mt-4 border-t border-border">
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground">語言 / Language</div>
                  <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full h-12 justify-start">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5" />
                        <span>{languageOptions[currentLanguage]}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-TW">繁中</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="ko">한국어</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center - Logo or Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          {title ? (
            <h1 className="text-lg font-semibold">{title}</h1>
          ) : (
            <img src="/images/taiwan-logo.png" alt="Taiwan Tourist Shuttle" className="h-10 w-auto object-contain" />
          )}
        </div>

        <div className="flex items-stretch gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative inline-flex items-center justify-center w-8 h-8 p-0 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <Bell className="h-4 w-4 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full text-[10px] font-medium text-white flex items-center justify-center bg-primary">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">通知</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-sm">通知</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-primary hover:bg-transparent"
                  onClick={handleMarkAllRead}
                >
                  全部已讀
                </Button>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b border-border last:border-0 hover:bg-accent/50 cursor-pointer transition-colors ${
                      notification.unread ? "bg-accent/20" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs font-medium text-primary">{notification.category}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{notification.message}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full text-sm text-primary hover:bg-accent"
                  onClick={() => router.push("/notifications")}
                >
                  查看全部通知
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleUserProfileClick}>
            <div className="w-5 h-5 text-muted-foreground">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default HeaderWithMenu