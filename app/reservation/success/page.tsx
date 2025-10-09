"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Download, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
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
    englishName: string
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

          <Card className="shadow-lg border-2 border-primary/20 relative overflow-hidden mb-8 p-0">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 border-b border-primary/20 py-3">
              <h3 className="font-bold text-lg text-foreground">劃位資訊</h3>
            </div>

            <CardContent className="p-0">
              <ScrollArea className="h-[300px] w-full">
                <div className="space-y-3 p-4">
                  <div className="bg-gradient-to-br from-muted/30 to-muted/50 p-4 rounded-xl border border-border/50 shadow-sm mb-3">
                    <div className="font-semibold text-foreground mb-1">{reservationData.ticketInfo.name}</div>
                    <div className="text-xs text-muted-foreground">{reservationData.ticketInfo.englishName}</div>
                  </div>

                  {reservationData.routes.map((route, routeIndex) => (
                    <div
                      key={routeIndex}
                      className="bg-gradient-to-br from-muted/30 to-muted/50 p-4 rounded-xl border border-border/50 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-3 pb-3 border-b border-border/50">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-xs text-muted-foreground">路線</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-xs text-muted-foreground">日期</span>
                          </div>
                        </div>
                        <div className="text-right space-y-1.5">
                          <div className="font-semibold text-foreground">{route.name}</div>
                          <div className="font-medium text-foreground text-sm">
                            {route.date.getFullYear()}/{String(route.date.getMonth() + 1).padStart(2, "0")}/
                            {String(route.date.getDate()).padStart(2, "0")}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {reservationData.passengers.map((passenger, passengerIndex) => {
                          const pickupLocation = passenger.pickupLocations[route.id]
                          if (!pickupLocation) return null

                          return (
                            <div
                              key={passengerIndex}
                              className="bg-background/60 rounded-lg p-3 border border-border/30"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-muted-foreground">乘客 {passengerIndex + 1}</span>
                                <span className="font-medium text-foreground">{passenger.name}</span>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-muted-foreground">票種</span>
                                <span className="font-medium text-foreground">
                                  {getTicketTypeLabel(passenger.ticketType)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-muted-foreground">上車地點</span>
                                <span className="font-medium text-foreground">{getStationName(pickupLocation)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">聯絡電話</span>
                                <span className="font-medium text-foreground">{passenger.phone}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <MobileNavigation />
    </div>
  )
}
