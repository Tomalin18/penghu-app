"use client"

import { useRouter } from "next/navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Ticket, ChevronRight, Clock } from "lucide-react"

export default function BookingHistoryPage() {
  const router = useRouter()

  // Mock booking history data
  const bookings = [
    {
      id: "1",
      orderNumber: "PH20240315001",
      route: "湖西線",
      ticketType: "湖西線一日券",
      date: "2024/03/15",
      time: "09:00",
      status: "已使用",
      price: 150,
      passengers: 2,
      totalPrice: 300,
    },
    {
      id: "2",
      orderNumber: "PH20240310002",
      route: "北環線",
      ticketType: "北環線一日券",
      date: "2024/03/10",
      time: "10:30",
      status: "已使用",
      price: 150,
      passengers: 1,
      totalPrice: 150,
    },
    {
      id: "3",
      orderNumber: "PH20240305003",
      route: "澎南線",
      ticketType: "澎南線一日券",
      date: "2024/03/05",
      time: "08:00",
      status: "已使用",
      price: 150,
      passengers: 3,
      totalPrice: 450,
    },
    {
      id: "4",
      orderNumber: "PH20240301004",
      route: "湖西線+澎南線",
      ticketType: "湖西線+澎南線二日券",
      date: "2024/03/01",
      time: "09:30",
      status: "已使用",
      price: 250,
      passengers: 2,
      totalPrice: 500,
    },
    {
      id: "5",
      orderNumber: "PH20240225005",
      route: "北環線",
      ticketType: "北環線一日券",
      date: "2024/02/25",
      time: "11:00",
      status: "已取消",
      price: 150,
      passengers: 1,
      totalPrice: 150,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已使用":
        return "bg-green-500/10 text-green-700 border-green-200"
      case "已取消":
        return "bg-red-500/10 text-red-700 border-red-200"
      case "待使用":
        return "bg-blue-500/10 text-blue-700 border-blue-200"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200"
    }
  }

  const getRouteColor = (route: string) => {
    if (route.includes("湖西線")) return "bg-blue-500/10 text-blue-700 border-blue-200"
    if (route.includes("北環線")) return "bg-emerald-500/10 text-emerald-700 border-emerald-200"
    if (route.includes("澎南線")) return "bg-orange-500/10 text-orange-700 border-orange-200"
    return "bg-purple-500/10 text-purple-700 border-purple-200"
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu title="訂票紀錄" showBack onBack={() => router.back()} />

      <main className="px-4 pt-20 pb-20 max-w-md mx-auto space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card key={booking.id} className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                {/* Header with Order Number and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">訂單編號</p>
                    <p className="font-mono text-sm font-medium text-foreground">{booking.orderNumber}</p>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </div>

                {/* Route Badge */}
                <Badge className={`${getRouteColor(booking.route)} mb-3`}>{booking.route}</Badge>

                {/* Ticket Type */}
                <div className="flex items-center gap-2 mb-3">
                  <Ticket className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">{booking.ticketType}</span>
                </div>

                {/* Booking Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>使用日期：{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>預約時間：{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>乘客人數：{booking.passengers} 人</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">總金額</p>
                    <p className="text-xl font-bold text-primary">NT$ {booking.totalPrice}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log("[v0] View booking details:", booking.id)}
                    className="flex items-center gap-2"
                  >
                    查看詳情
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Ticket className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center mb-6">尚無訂票紀錄</p>
            <Button onClick={() => router.push("/tickets")} className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              立即購票
            </Button>
          </div>
        )}
      </main>

      <MobileNavigation activeTab="more" />
    </div>
  )
}
