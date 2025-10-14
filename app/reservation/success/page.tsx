"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Download, MapPin, Calendar } from "lucide-react"
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

  // 簡化的票券詳情組件（與購票成功頁面一致）
  const TicketDetails = ({ ticketData }: { ticketData: any }) => {
    return (
      <div className="space-y-4">
        {/* 乘客資訊 */}
        {ticketData.passengers && ticketData.passengers.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-foreground">乘客資訊</h4>
            <div className="bg-muted/50 p-4 rounded-lg space-y-4">
              {ticketData.passengers.map((passenger: any, index: number) => (
                <div key={index} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <div className="space-y-3 text-xs">
                    {/* 第一行：姓名、票種 */}
                    <div className="grid grid-cols-2 gap-3 items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs whitespace-nowrap">姓名：</span>
                        <span className="font-medium text-xs whitespace-nowrap">{passenger.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs whitespace-nowrap">票種：</span>
                        <span className="font-medium text-xs whitespace-nowrap">{getTicketTypeLabel(passenger.ticketType)}</span>
                      </div>
                    </div>
                    {/* 第二行：Email、電話 */}
                    <div className="grid grid-cols-2 gap-3 items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs whitespace-nowrap">Email：</span>
                        <span className="font-medium text-xs whitespace-nowrap">{passenger.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs whitespace-nowrap">電話：</span>
                        <span className="font-medium text-xs whitespace-nowrap">
                          {passenger.countryCode ? `${passenger.countryCode} ${passenger.phone}` : passenger.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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

                  {/* 使用簡化的票券詳情組件 */}
                  <TicketDetails ticketData={reservationData} />

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
