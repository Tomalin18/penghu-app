"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Download, MapPin, Calendar, QrCode, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"

interface RouteInfo {
  id: string
  name: string
  date: Date
}

interface PassengerInfo {
  ticketType: string
  name: string
  email: string
  phone: string
  id: string
  ticketSerial: string
  needsAccessibility: string
  sameAsPassenger1: boolean
  pickupLocations: Record<string, string>
}

interface ReservationData {
  ticketInfo: {
    name: string
    price: string
    type: string
  }
  routes: RouteInfo[]
  passengers: PassengerInfo[]
  totalPassengers: number
  ticketQuantities: Record<string, number>
}

export default function ReservationSuccessPage() {
  const router = useRouter()
  const [reservationData, setReservationData] = useState<ReservationData | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("reservationData")
    if (storedData) {
      const data = JSON.parse(storedData)
      // Convert date strings back to Date objects
      data.routes = data.routes.map((route: any) => ({
        ...route,
        date: new Date(route.date),
      }))
      setReservationData(data)
    } else {
      // If no data found, redirect back to reservation page
      router.push("/reservation")
    }
  }, [router])

  const getStationName = (stationValue: string) => {
    if (!stationValue) return ""
    const parts = stationValue.split("-")
    if (parts.length >= 2) {
      return parts[0]
    }
    return stationValue
  }

  const getTicketTypeLabel = (ticketType: string) => {
    const labels: Record<string, string> = {
      adult: "全票",
      discount: "澎湖籍",
      senior: "長者",
      love: "愛心",
      child: "兒童",
    }
    return labels[ticketType] || ticketType
  }

  // 可展開的票券詳情組件
  const ExpandableTicketDetails = ({ ticketData }: { ticketData: any }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    
    return (
      <div className="relative">
        {/* 票券詳情內容 */}
        <div className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-none' : 'max-h-32'
        }`}>
          <div className="space-y-4">
            {/* QR Code 區域 */}
            <div className="flex flex-col items-center pb-4 border-b border-border">
              <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded">
                  <div className="text-center">
                    <QrCode className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <div className="text-xs text-gray-500">QR Code</div>
                    <div className="text-xs text-gray-400 mt-1 truncate max-w-[120px]">
                      {ticketData.reservationId || "RESERVATION-" + Date.now()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 票券基本資訊 */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">{ticketData.ticketInfo?.name || "澎湖好行票券"}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">路線</span>
                  <span className="font-medium">{ticketData.routes?.[0]?.name || "未指定"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">日期</span>
                  <span className="font-medium">{ticketData.routes?.[0]?.date?.toLocaleDateString('zh-TW') || "未指定"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">票券類型</span>
                  <span className="font-medium">一日券</span>
                </div>
              </div>
            </div>

            {/* 票券明細 */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground">票券明細</h4>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                {ticketData.ticketQuantities && Object.entries(ticketData.ticketQuantities).map(([key, count]: [string, any]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {getTicketTypeLabel(key)} x {count || 1}
                    </span>
                    <span className="font-medium">NT${150 * (count || 1)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-border flex justify-between font-semibold">
                  <span>總計</span>
                  <span className="text-primary">NT${ticketData.totalAmount || 0}</span>
                </div>
              </div>
            </div>

            {/* 乘客資訊 */}
            {ticketData.passengers && ticketData.passengers.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-foreground">乘客資訊</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  {ticketData.passengers.map((passenger: any, index: number) => (
                    <div key={index} className="pb-3 border-b border-border last:border-b-0 last:pb-0">
                      <div className="font-medium text-sm mb-2">
                        {ticketData.passengers.length > 1 ? `乘客 ${index + 1}` : "乘客資訊"}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">姓名</span>
                          <span className="font-medium">{passenger.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">電話</span>
                          <span className="font-medium">{passenger.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email</span>
                          <span className="font-medium text-xs">{passenger.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 劃位資訊 */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground">劃位資訊</h4>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">劃位編號</span>
                  <span className="font-mono text-xs">{ticketData.reservationId || "RESERVATION-" + Date.now()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">劃位日期</span>
                  <span className="font-medium">{new Date().toLocaleDateString('zh-TW')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">有效期限</span>
                  <span className="font-medium">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-TW')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">數量</span>
                  <span className="font-medium">{ticketData.totalPassengers || 0} 張</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 漸層遮罩 - 只在未展開時顯示 */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        )}

        {/* 查看更多按鈕 */}
        <div className="flex justify-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary/80 flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <span>收起</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>查看更多</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    )
  }


  if (!reservationData) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="bg-primary px-4 py-4 sticky top-0 z-40 flex-shrink-0">
        <div className="max-w-md mx-auto">
          <h1 className="font-bold text-xl text-primary-foreground text-center">劃位 - 成功</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-8 max-w-md mx-auto pb-24 pt-5">
          {/* Success Message */}
          <div className="flex items-center justify-between gap-4 mt-0 mb-5">
            <div className="flex items-center gap-4 flex-1 flex-row py-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-12 w-12 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-foreground mb-2">劃位成功！</h2>
                <p className="text-muted-foreground">您的劃位已完成</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="outline"
                className="h-16 px-4 flex flex-col items-center justify-center gap-0.5 py-0 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  // TODO: Implement save to album functionality
                  alert("保存至相簿功能開發中")
                }}
              >
                <Download className="h-4 w-4 mb-1" />
                <span className="text-sm leading-tight">保存至相簿</span>
              </Button>
            </div>
          </div>

          {/* Ticket Cards */}
          <div className="space-y-4 mb-8">
            {reservationData.routes.map((route, routeIndex) => (
              <Card key={routeIndex} className="shadow-sm border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm mb-1">
                        {reservationData.ticketInfo.name}
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        {route.name} • {route.date.getFullYear()}/{String(route.date.getMonth() + 1).padStart(2, "0")}/{String(route.date.getDate()).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="default" className="text-xs">
                        已劃位
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xs text-muted-foreground">
                      <div>數量: {reservationData.passengers.length} 張</div>
                      <div>票券類型: {reservationData.ticketInfo.type}</div>
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      <div>劃位: {new Date().toLocaleDateString('zh-TW')}</div>
                      <div>路線: {route.name}</div>
                    </div>
                  </div>

                  {/* 使用可展開的票券詳情組件 */}
                  <ExpandableTicketDetails ticketData={reservationData} />

                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8 text-xs bg-transparent"
                      onClick={() => router.push("/my-tickets")}
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      我的車票
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <MobileNavigation />
    </div>
  )
}
