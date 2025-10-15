"use client"

import { useState } from "react"
import { MapPin, Star, QrCode, Edit, X, Bus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { MobileNavigation } from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"

// 票券狀態類型
type TicketStatus = "已搭乘" | "已取消" | "已劃位"

interface Ticket {
  id: string
  name: string
  routeName: string
  date: string
  quantity: number
  amount: number
  status: TicketStatus
  purchaseDate: string
  validUntil: string
  features?: string[]
}

export default function MyTicketsPage() {
  const router = useRouter()
  
  // 模擬票券資料 - 根據您的需求調整
  const [tickets] = useState<Ticket[]>([
    {
      id: "1",
      name: "媽宮・西湖線一日券",
      routeName: "西湖線",
      date: "2025/10/15",
      quantity: 1,
      amount: 300,
      status: "已搭乘",
      purchaseDate: "2025/10/1",
      validUntil: "2025/11/1",
      features: ["低地板公車"]
    },
    {
      id: "2",
      name: "媽宮・南環線一日券",
      routeName: "南環線",
      date: "2025/10/10",
      quantity: 3,
      amount: 900,
      status: "已取消",
      purchaseDate: "2025/9/25",
      validUntil: "2025/12/25"
    },
    {
      id: "3",
      name: "媽宮・湖西線一日券",
      routeName: "湖西線",
      date: "2025/9/20",
      quantity: 1,
      amount: 300,
      status: "已搭乘",
      purchaseDate: "2025/9/15",
      validUntil: "2025/12/15"
    },
    {
      id: "4",
      name: "媽宮・北環線一日券",
      routeName: "北環線",
      date: "2025/9/15",
      quantity: 2,
      amount: 600,
      status: "已劃位", // 將其中一個改為「已劃位」
      purchaseDate: "2025/9/10",
      validUntil: "2025/12/10"
    }
  ])

  // 取得狀態顏色
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "已搭乘":
        return "bg-orange-500/10 text-orange-700 border-orange-200"
      case "已取消":
        return "bg-red-500/10 text-red-700 border-red-200"
      case "已劃位":
        return "bg-blue-500/10 text-blue-700 border-blue-200"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200"
    }
  }

  // 處理車票詳情
  const handleTicketDetails = (ticketId: string) => {
    router.push(`/ticket-info/${ticketId}`)
  }

  // 處理評分
  const handleRating = (ticketId: string) => {
    // 導航到評分頁面或開啟評分對話框
    console.log("評分票券:", ticketId)
  }

  // 處理票券QR碼
  const handleQRCode = (ticketId: string) => {
    // 顯示QR碼或導航到QR碼頁面
    console.log("顯示QR碼:", ticketId)
  }

  // 處理修改
  const handleEdit = (ticketId: string) => {
    router.push(`/my-tickets/edit/${ticketId}`)
  }

  // 處理取消
  const handleCancel = (ticketId: string) => {
    // 顯示取消確認對話框
    console.log("取消票券:", ticketId)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu title="我的車票" />

      <main className="px-4 pt-20 pb-20 max-w-md mx-auto">
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="shadow-sm border-border/50">
              <CardContent className="p-4">
                {/* 票券標題和狀態 */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {ticket.name}
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {ticket.routeName} • {ticket.date}
                    </div>
                    {ticket.features && ticket.features.length > 0 && (
                      <div className="flex gap-2 mb-2">
                        {ticket.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Bus className="w-3 h-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </div>

                {/* 票券資訊 */}
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xs text-muted-foreground">
                    <div>數量: {ticket.quantity} 張</div>
                    <div>金額: NT${ticket.amount}</div>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    <div>購買: {ticket.purchaseDate}</div>
                    <div>有效至: {ticket.validUntil}</div>
                  </div>
                </div>

                {/* 按鈕區域 */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handleTicketDetails(ticket.id)}
                  >
                    車票詳情
                  </Button>
                  
                  {/* 根據狀態顯示不同按鈕 */}
                  {ticket.status === "已搭乘" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => handleRating(ticket.id)}
                    >
                      <Star className="w-3 h-3 mr-1" />
                      為此行程評分
                    </Button>
                  )}
                  
                  {ticket.status === "已劃位" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => handleQRCode(ticket.id)}
                      >
                        <QrCode className="w-3 h-3 mr-1" />
                        票券QR碼
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => handleEdit(ticket.id)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        修改
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs text-red-600 hover:text-red-700"
                        onClick={() => handleCancel(ticket.id)}
                      >
                        <X className="w-3 h-3 mr-1" />
                        取消
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 購買更多票券按鈕 */}
        <div className="mt-8">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => router.push("/purchase/tickets")}
          >
            購買更多票券
          </Button>
        </div>
      </main>

      <MobileNavigation activeTab="my-tickets" />
    </div>
  )
}
