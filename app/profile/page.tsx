"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Ticket, Settings, Headphones, Info, LogOut, ChevronRight } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useFavorites } from "@/contexts/favorites-context"

export default function ProfilePage() {
  const router = useRouter()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const { favorites } = useFavorites()

  // Mock user data - in real app this would come from auth context/state
  const user = {
    name: "王小明",
    email: "wang@example.com",
    avatar: null, // null means no avatar uploaded yet
    memberSince: "2024/01",
    ticketCount: 3,
  }

  const handleLogout = () => {
    console.log("[v0] User logged out")
    // In real app: clear auth tokens, user state, etc.
    router.push("/")
  }

  const menuItems = [
    {
      id: "tickets",
      label: "我的車票",
      icon: Ticket,
      badge: user.ticketCount,
      onClick: () => router.push("/my-tickets"),
    },
    {
      id: "personal-info",
      label: "個人資料",
      icon: User,
      onClick: () => router.push("/profile/edit"),
    },
    {
      id: "settings",
      label: "密碼修改",
      icon: Settings,
      onClick: () => router.push("/profile/change-password"),
    },
    {
      id: "support",
      label: "客服中心",
      icon: Headphones,
      onClick: () => router.push("/support"),
    },
    {
      id: "about",
      label: "關於我們",
      icon: Info,
      onClick: () => router.push("/about"),
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu title="會員中心" />

      {/* User Profile Card */}
      <main className="px-4 pt-16 pb-6 max-w-md mx-auto space-y-6">
        <Card className="shadow-sm border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30">
                  {user.avatar ? (
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-primary" />
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-1">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-1">{user.email}</p>
                <p className="text-xs text-muted-foreground">會員自 {user.memberSince}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-2">
              <button
                onClick={() => router.push("/my-tickets")}
                className="text-center hover:bg-accent/50 rounded-lg p-2 transition-colors cursor-pointer"
              >
                <div className="text-2xl font-bold text-primary">{user.ticketCount}</div>
                <div className="text-xs text-muted-foreground mt-1">我的車票</div>
              </button>
              <button
                onClick={() => router.push("/favorites")}
                className="text-center hover:bg-accent/50 rounded-lg p-2 transition-colors cursor-pointer"
              >
                <div className="text-2xl font-bold text-primary">{favorites.length}</div>
                <div className="text-xs text-muted-foreground mt-1">景點收藏</div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="w-full bg-card rounded-xl p-4 shadow-sm border border-border flex items-center justify-between hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            )
          })}
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive bg-transparent"
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut className="h-5 w-5 mr-2" />
          登出帳號
        </Button>
      </main>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要登出嗎？</AlertDialogTitle>
            <AlertDialogDescription>登出後您需要重新登入才能使用會員功能。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">
              確定登出
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <MobileNavigation activeTab="more" />
    </div>
  )
}
