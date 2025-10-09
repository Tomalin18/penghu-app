"use client"

import { useState } from "react"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

type NotificationCategory = "訂票通知" | "系統通知" | "優惠活動" | "行程提醒"
type FilterType = "all" | "unread" | "read"

interface Notification {
  id: number
  category: NotificationCategory
  message: string
  time: string
  unread: boolean
  date: string
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      category: "訂票通知",
      message: "您的訂票已確認，車票編號：TW20250102001",
      time: "5分鐘前",
      date: "2025/01/02",
      unread: true,
    },
    {
      id: 2,
      category: "系統通知",
      message: "春節連假訂票系統將於1月15日開放",
      time: "1小時前",
      date: "2025/01/02",
      unread: true,
    },
    {
      id: 3,
      category: "優惠活動",
      message: "早鳥優惠：提前30天訂票享8折優惠",
      time: "2天前",
      date: "2024/12/31",
      unread: false,
    },
    {
      id: 4,
      category: "行程提醒",
      message: "您預訂的北環線行程將於明天出發，請提前30分鐘到達",
      time: "3天前",
      date: "2024/12/30",
      unread: false,
    },
    {
      id: 5,
      category: "訂票通知",
      message: "您的退票申請已處理完成，退款將於3-5個工作天內到帳",
      time: "5天前",
      date: "2024/12/28",
      unread: false,
    },
    {
      id: 6,
      category: "系統通知",
      message: "系統維護通知：1月10日凌晨2:00-4:00進行系統維護",
      time: "1週前",
      date: "2024/12/26",
      unread: false,
    },
    {
      id: 7,
      category: "優惠活動",
      message: "會員專屬：湖西線套票限時優惠中",
      time: "1週前",
      date: "2024/12/25",
      unread: false,
    },
    {
      id: 8,
      category: "行程提醒",
      message: "您的澎南線行程已完成，歡迎給予評價",
      time: "2週前",
      date: "2024/12/20",
      unread: false,
    },
  ])

  const getCategoryColor = (category: NotificationCategory) => {
    switch (category) {
      case "訂票通知":
        return "bg-[rgba(43,138,160,1)]"
      case "系統通知":
        return "bg-[#5C8DD3]"
      case "優惠活動":
        return "bg-[#67AF9B]"
      case "行程提醒":
        return "bg-[#F59E0B]"
      default:
        return "bg-[rgba(43,138,160,1)]"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return notification.unread
    if (filter === "read") return !notification.unread
    return true
  })

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      <HeaderWithMenu title="通知" showBackButton={true} />

      <main className="max-w-md mx-auto px-3 py-4">
        {/* Header with Mark All Read Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[rgba(43,138,160,1)]" />
            <h1 className="text-lg font-semibold text-foreground">所有通知</h1>
            {unreadCount > 0 && (
              <Badge className="bg-[rgba(43,138,160,1)] text-white text-xs px-2 py-0.5">{unreadCount}</Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-[rgba(43,138,160,1)] hover:text-[rgba(43,138,160,0.8)] hover:bg-[rgba(43,138,160,0.1)] text-xs h-8 px-3"
            >
              全部標為已讀
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={
              filter === "all" ? "bg-[rgba(43,138,160,1)] hover:bg-[rgba(43,138,160,0.9)] text-white" : "bg-transparent"
            }
          >
            全部 ({notifications.length})
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
            className={
              filter === "unread"
                ? "bg-[rgba(43,138,160,1)] hover:bg-[rgba(43,138,160,0.9)] text-white"
                : "bg-transparent"
            }
          >
            未讀 ({unreadCount})
          </Button>
          <Button
            variant={filter === "read" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("read")}
            className={
              filter === "read"
                ? "bg-[rgba(43,138,160,1)] hover:bg-[rgba(43,138,160,0.9)] text-white"
                : "bg-transparent"
            }
          >
            已讀 ({notifications.length - unreadCount})
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <Card className="p-8">
              <div className="text-center text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">目前沒有{filter === "unread" ? "未讀" : filter === "read" ? "已讀" : ""}通知</p>
              </div>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`overflow-hidden ${notification.unread ? "border-l-4 border-l-[rgba(43,138,160,1)]" : ""} ${notification.unread ? "cursor-pointer hover:bg-accent/50 transition-colors" : ""}`}
                onClick={() => notification.unread && handleMarkAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Unread Indicator */}
                    {notification.unread && (
                      <div className="h-2 w-2 mt-1.5 rounded-full bg-[rgba(43,138,160,1)] flex-shrink-0" />
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${getCategoryColor(notification.category)} text-white text-xs px-2 py-0.5`}>
                          {notification.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p
                        className={`text-sm leading-relaxed ${notification.unread ? "font-medium text-foreground" : "text-muted-foreground"}`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
