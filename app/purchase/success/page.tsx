"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Download, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearchParams, useRouter } from "next/navigation"
import { saveTicket } from "@/lib/ticket-storage"
import MobileNavigation from "@/components/mobile-navigation"

export default function PurchaseSuccessPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [ticketSaved, setTicketSaved] = useState(false)
  const searchParams = useSearchParams()

  const orderDataParam = searchParams.get("orderData")

  useEffect(() => {
    console.log("[v0] Processing order data parameter:", orderDataParam)

    if (orderDataParam) {
      try {
        const parsedOrderData = JSON.parse(orderDataParam)
        console.log("[v0] Successfully parsed order data:", parsedOrderData)
        setOrderData(parsedOrderData)

        if (!ticketSaved) {
          const savedTicket = saveTicket(parsedOrderData)
          console.log("[v0] Ticket saved to localStorage:", savedTicket)
          setTicketSaved(true)
        }
      } catch (error) {
        console.error("[v0] Failed to parse order data:", error)
        // Fallback to mock data if parsing fails
        setOrderData({
          ticketName: "北環線",
          ticketType: "一日券",
          passengerCount: 2,
          totalAmount: 600,
          selectedDates: [{ routeName: "北環線", date: "2025/10/16" }],
          ticketBreakdown: {
            一日券: { label: "一日券", count: 2, subtotal: 600 },
          },
        })
      }
    } else {
      console.log("[v0] No order data parameter found, using fallback")
      // No order data, set fallback
      setOrderData({
        ticketName: "北環線",
        ticketType: "一日券",
        passengerCount: 2,
        totalAmount: 600,
        selectedDates: [{ routeName: "北環線", date: "2025/10/16" }],
        ticketBreakdown: {
          一日券: { label: "一日券", count: 2, subtotal: 600 },
        },
      })
    }

    setIsLoading(false)
  }, [orderDataParam, ticketSaved])

  const getStationInfo = (routeId: string, stationId: string) => {
    const stationsByRoute: Record<string, Array<{ value: string; label: string }>> = {
      north: [
        { value: "xiweidong-0828", label: "08:28 西衛東站" },
        { value: "magonggang-0836", label: "08:36 馬公港站" },
        { value: "gongchezong-0840", label: "08:40 公車總站" },
        { value: "ziyouta-0845", label: "08:45 自由塔（勝國）站" },
        { value: "disanyu-0849", label: "08:49 第三漁港（雅霖）站" },
        { value: "wenao-0855", label: "08:55 文澳（元泰.百世多麗）站" },
        { value: "dongwei-0907", label: "09:07 東衛站" },
        { value: "kuahaidaqiao-0930", label: "09:30 跨海大橋（西嶼端）" },
        { value: "sanxianta-1005", label: "10:05 三仙塔" },
        { value: "dacaiye-1035", label: "10:35 大菓葉玄武岩柱" },
        { value: "erkanjuluo-1100", label: "11:00 二崁聚落" },
        { value: "tongliangguta-1150", label: "11:50 通梁古榕" },
      ],
      xihu: [
        { value: "magonggang-0830", label: "08:30 馬公港站" },
        { value: "gongchezong-0834", label: "08:34 公車總站" },
        { value: "ziyouta-0839", label: "08:39 自由塔（勝國）站" },
        { value: "disanyu-0843", label: "08:43 第三漁港（雅霖）站" },
        { value: "wenao-0847", label: "08:47 文澳（元泰.百世多麗）站" },
        { value: "airport-0900", label: "09:00 澎湖機場站" },
        { value: "beiliao-0910", label: "09:10 北寮奎壁山" },
        { value: "nanliao-0950", label: "09:50 南寮社區" },
        { value: "longmen-1035", label: "10:35 龍門閉鎖陣地" },
        { value: "museum-1135", label: "11:35 澎湖生活博物館" },
      ],
      south: [
        { value: "magonggang-0828", label: "08:28 馬公港站" },
        { value: "gongchezong-0832", label: "08:32 公車總站" },
        { value: "ziyouta-0836", label: "08:36 自由塔（勝國）站" },
        { value: "disanyu-0840", label: "08:40 第三漁港（雅霖）站" },
        { value: "wenao-0844", label: "08:44 文澳（元泰.百世多麗）站" },
        { value: "fengkui-0905", label: "09:05 風櫃洞" },
        { value: "fishery-0945", label: "09:45 澎湖縣水產種苗繁殖場" },
        { value: "shanshui-1050", label: "10:50 山水沙灘" },
        { value: "suogang-1130", label: "11:30 鎖港子午塔" },
      ],
    }

    const stations = stationsByRoute[routeId] || []
    const station = stations.find((s) => s.value === stationId)

    if (station) {
      // Extract time and location from label (format: "08:28 西衛東站")
      const parts = station.label.split(" ")
      const time = parts[0]
      const location = parts.slice(1).join(" ")
      return { time, location }
    }

    return { time: "", location: "未指定" }
  }

  const getTicketTypeLabel = (ticketType: string) => {
    const labels: Record<string, string> = {
      adult: "全票（非澎湖籍）",
      discount: "澎湖籍居民票",
      senior: "長者票",
      love: "愛心票",
      child: "兒童票",
    }
    return labels[ticketType] || ticketType
  }

  if (isLoading || !orderData) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="bg-primary px-4 py-4 sticky top-0 z-40 flex-shrink-0">
        <div className="max-w-md mx-auto">
          <h1 className="font-bold text-xl text-primary-foreground text-center">購票 - 訂購成功</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-8 max-w-md mx-auto pb-24 pt-5">
          {/* Success Message */}
          <div className="flex items-start justify-between gap-4 mt-0 mb-5">
            <div className="flex items-center gap-4 flex-1 flex-row py-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-12 w-12 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-foreground mb-2">訂購成功！</h2>
                <p className="text-muted-foreground">您的票券已成功購買</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <Button
                variant="outline"
                className="h-16 px-4 flex flex-col items-center justify-center gap-0.5 bg-white"
                onClick={() => router.push("/survey")}
              >
                <span className="text-sm leading-tight">填寫</span>
                <span className="text-sm leading-tight">滿意度調查</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 px-4 flex flex-col items-center justify-center gap-0.5 bg-white"
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

          {/* Order Summary */}
          <Card className="shadow-lg border-2 border-primary/20 relative overflow-hidden mb-8 p-0">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 border-b border-primary/20 py-3">
              <h3 className="font-bold text-lg text-foreground">訂單摘要</h3>
            </div>

            <CardContent className="p-0">
              <ScrollArea className="h-[300px] w-full">
                <div className="space-y-3 p-4">
                  {orderData.selectedDates.map((dateInfo: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-muted/30 to-muted/50 p-4 rounded-xl border border-border/50 shadow-sm"
                    >
                      {/* Route and Date Header with icons */}
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
                          <div className="font-semibold text-foreground">{dateInfo.routeName || "未指定"}</div>
                          <div className="font-medium text-foreground text-sm">{dateInfo.date}</div>
                        </div>
                      </div>

                      {/* Passenger List Header */}
                      <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2 px-1">
                        <span>乘客資訊</span>
                        <span>票種·價格</span>
                      </div>

                      {/* Passenger Details */}
                      <div className="space-y-2">
                        {orderData.passengers?.map((passenger: any, pIndex: number) => {
                          const stationId = passenger.pickupLocations?.[dateInfo.routeId]
                          if (!stationId) return null

                          const { time, location } = getStationInfo(dateInfo.routeId, stationId)
                          const ticketTypeLabel = getTicketTypeLabel(passenger.ticketType)
                          const ticketPrice = orderData.ticketBreakdown?.[passenger.ticketType]?.price || 0

                          return (
                            <div key={pIndex} className="bg-background/60 rounded-lg p-3 border border-border/30">
                              <div className="flex justify-between items-start gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-foreground mb-1">{passenger.name}</div>
                                  <div className="text-xs text-muted-foreground flex items-start gap-1">
                                    <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary/70" />
                                    <span className="break-words">
                                      {time} {location}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="text-xs text-muted-foreground mb-0.5">{ticketTypeLabel}</div>
                                  <div className="font-bold text-primary">NT${ticketPrice}</div>
                                </div>
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

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  )
}
