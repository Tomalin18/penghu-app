"use client"
import { MapPin, Clock, Users, AlertCircle, Bus, Plane, Ship, MapIcon, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface TicketDetail {
  id: string
  name: string
  englishName: string
  price: number
  image: string
  description: string
  packageContents: string[]
  usageInstructions: string[]
  importantNotes: string[]
  usageRestrictions: string[]
}

export default function TicketInfoPage({ params }: { params: { ticketId: string } }) {
  const router = useRouter()
  const { ticketId } = params
  const [ticket, setTicket] = useState<TicketDetail | undefined>(undefined)

  const timetableData = {
    north: [
      { time: "08:28", station: "西衛東站", status: "準點", stopDuration: "2分鐘", departure: "08:30" },
      { time: "08:36", station: "馬公港站", status: "準點", stopDuration: "2分鐘", departure: "08:38" },
      { time: "08:40", station: "公車總站", status: "準點", stopDuration: "2分鐘", departure: "08:42" },
      { time: "08:45", station: "自由塔(勝國)站", status: "準點", stopDuration: "2分鐘", departure: "08:47" },
      { time: "08:49", station: "第三漁港(雅霖)站", status: "準點", stopDuration: "2分鐘", departure: "08:51" },
      { time: "08:55", station: "文澳(元泰.百世多麗)站", status: "準點", stopDuration: "2分鐘", departure: "08:57" },
      { time: "09:07", station: "東衛站", status: "準點", stopDuration: "2分鐘", departure: "09:09" },
      { time: "09:30", station: "跨海大橋(西嶼端)", status: "準點", stopDuration: "15分鐘", departure: "09:45" },
      { time: "10:05", station: "三仙塔", status: "準點", stopDuration: "15分鐘", departure: "10:20" },
      { time: "10:35", station: "大菓葉玄武岩柱", status: "準點", stopDuration: "20分鐘", departure: "10:55" },
      { time: "11:00", station: "二崁聚落", status: "準點", stopDuration: "40分鐘", departure: "11:40" },
      { time: "11:50", station: "通梁古榕", status: "準點", stopDuration: "20分鐘", departure: "12:00" },
      { time: "12:20", station: "東衛站", status: "準點", stopDuration: "2分鐘", departure: "12:22" },
      { time: "12:33", station: "文澳(元泰.百世多麗)站", status: "準點", stopDuration: "2分鐘", departure: "12:35" },
      { time: "12:39", station: "第三漁港(雅霖)站", status: "準點", stopDuration: "2分鐘", departure: "12:41" },
      { time: "12:43", station: "自由塔(勝國)站", status: "準點", stopDuration: "2分鐘", departure: "12:45" },
      { time: "12:48", station: "公車總站", status: "準點", stopDuration: "2分鐘", departure: "12:50" },
      { time: "12:52", station: "馬公港站", status: "準點", stopDuration: "2分鐘", departure: "12:54" },
      { time: "13:00", station: "西衛東站", status: "準點", stopDuration: "2分鐘", departure: "13:02" },
    ],
    south: [
      { time: "08:28", station: "馬公港站", status: "準點", stopDuration: "2分鐘", departure: "08:30" },
      { time: "08:32", station: "公車總站", status: "準點", stopDuration: "2分鐘", departure: "08:34" },
      { time: "08:36", station: "自由塔(勝國)站", status: "準點", stopDuration: "2分鐘", departure: "08:38" },
      { time: "08:40", station: "第三漁港(雅霖)站", status: "準點", stopDuration: "2分鐘", departure: "08:42" },
      { time: "08:44", station: "文澳(元泰.百世多麗)站", status: "準點", stopDuration: "2分鐘", departure: "08:46" },
      { time: "09:05", station: "風櫃洞", status: "準點", stopDuration: "30分鐘", departure: "09:35" },
      { time: "09:45", station: "澎湖縣水產種苗繁殖場", status: "準點", stopDuration: "50分鐘", departure: "10:35" },
      { time: "10:50", station: "山水沙灘", status: "準點", stopDuration: "30分鐘", departure: "11:20" },
      { time: "11:30", station: "鎖港子午塔", status: "準點", stopDuration: "20分鐘", departure: "11:50" },
      { time: "12:05", station: "文澳(元泰.百世多麗)站", status: "準點", stopDuration: "2分鐘", departure: "12:07" },
      { time: "12:08", station: "第三漁港(雅霖)站", status: "準點", stopDuration: "2分鐘", departure: "12:10" },
      { time: "12:12", station: "自由塔(勝國)站", status: "準點", stopDuration: "2分鐘", departure: "12:14" },
      { time: "12:16", station: "公車總站", status: "準點", stopDuration: "2分鐘", departure: "12:18" },
      { time: "12:20", station: "馬公港站", status: "準點", stopDuration: "2分鐘", departure: "12:22" },
    ],
    xihu: [
      { time: "08:30", station: "馬公港站", status: "準點", stopDuration: "2分鐘", departure: "08:32" },
      { time: "08:34", station: "公車總站", status: "準點", stopDuration: "2分鐘", departure: "08:36" },
      { time: "08:39", station: "自由塔(勝國)站", status: "準點", stopDuration: "2分鐘", departure: "08:41" },
      { time: "08:43", station: "第三漁港(雅霖)站", status: "準點", stopDuration: "2分鐘", departure: "08:45" },
      { time: "08:47", station: "文澳(元泰.百世多麗)站", status: "準點", stopDuration: "2分鐘", departure: "08:49" },
      { time: "09:00", station: "澎湖機場站", status: "準點", stopDuration: "2分鐘", departure: "09:02" },
      { time: "09:10", station: "北寮奎壁山", status: "準點", stopDuration: "30分鐘", departure: "09:40" },
      { time: "09:50", station: "南寮社區", status: "準點", stopDuration: "35分鐘", departure: "10:25" },
      { time: "10:35", station: "龍門閉鎖陣地", status: "準點", stopDuration: "30分鐘", departure: "11:05" },
      { time: "11:21", station: "澎湖機場站", status: "準點", stopDuration: "2分鐘", departure: "11:23" },
      { time: "11:35", station: "澎湖生活博物館", status: "準點", stopDuration: "45分鐘", departure: "12:20" },
      { time: "12:22", station: "文澳(元泰.百世多麗)站", status: "準點", stopDuration: "2分鐘", departure: "12:24" },
      { time: "12:26", station: "第三漁港(雅霖)站", status: "準點", stopDuration: "2分鐘", departure: "12:28" },
      { time: "12:30", station: "自由塔(勝國)站", status: "準點", stopDuration: "2分鐘", departure: "12:32" },
      { time: "12:34", station: "公車總站", status: "準點", stopDuration: "2分鐘", departure: "12:36" },
      { time: "12:40", station: "馬公港站", status: "準點", stopDuration: "2分鐘", departure: "12:42" },
    ],
  }

  const routes = [
    {
      id: "north",
      name: "北環線",
      color: "bg-[#6FA650]",
      primaryColor: "#6FA650",
      secondaryColor: "#EAF4EE",
      alertColor: "#598348",
    },
    {
      id: "south",
      name: "澎南線",
      color: "bg-[#D96B3E]",
      primaryColor: "#D96B3E",
      secondaryColor: "#FFFBE4",
      alertColor: "#C66239",
    },
    {
      id: "xihu",
      name: "湖西線",
      color: "bg-[#63A0B5]",
      primaryColor: "#63A0B5",
      secondaryColor: "#E8F5FC",
      alertColor: "#3D8098",
    },
  ]

  const getTicketRoutes = (ticketId: string): string[] => {
    if (ticketId.includes("north") || ticketId === "magong-north-1" || ticketId === "north-airport-combo") {
      return ["north"]
    } else if (ticketId.includes("xihu") || ticketId === "magong-xihu-1" || ticketId === "xihu-airport-combo") {
      return ["xihu"]
    } else if (ticketId.includes("south") || ticketId === "magong-south-1" || ticketId === "south-airport-combo") {
      return ["south"]
    } else if (ticketId.includes("north-xihu")) {
      return ["north", "xihu"]
    } else if (ticketId.includes("north-south")) {
      return ["north", "south"]
    } else if (ticketId.includes("xihu-south")) {
      return ["xihu", "south"]
    } else if (ticketId.includes("penghu-3")) {
      return ["north", "xihu", "south"]
    }
    return []
  }

  const nearbyTransportation: Record<
    string,
    {
      buses: string[]
      flights: string[]
      ships: string[]
    }
  > = {
    西衛東站: {
      buses: ["1路公車", "2路公車", "7路公車"],
      flights: [],
      ships: ["馬公港渡輪"],
    },
    馬公港站: {
      buses: ["1路公車", "2路公車", "3路公車", "4路公車", "5路公車"],
      flights: ["澎湖機場接駁車"],
      ships: ["嘉義布袋港", "高雄港", "台南安平港", "七美島", "望安島"],
    },
    公車總站: {
      buses: ["1路公車", "2路公車", "3路公車", "4路公車", "5路公車", "6路公車", "7路公車", "8路公車"],
      flights: ["澎湖機場接駁車"],
      ships: [],
    },
    澎湖機場站: {
      buses: ["機場接駁車", "3路公車"],
      flights: ["台北松山", "台中清泉崗", "高雄小港", "嘉義", "台南"],
      ships: [],
    },
    "跨海大橋(西嶼端)": {
      buses: ["西嶼環島公車"],
      flights: [],
      ships: [],
    },
    風櫃洞: {
      buses: ["澎南線公車", "5路公車"],
      flights: [],
      ships: ["觀光遊艇"],
    },
    山水沙灘: {
      buses: ["澎南線公車", "5路公車"],
      flights: [],
      ships: ["海上活動船隻"],
    },
    北寮奎壁山: {
      buses: ["湖西線公車", "3路公車"],
      flights: [],
      ships: ["潮間帶導覽船"],
    },
  }

  const getNearbyTransport = (stationName: string) => {
    return (
      nearbyTransportation[stationName] || {
        buses: ["當地接駁車"],
        flights: [],
        ships: [],
      }
    )
  }

  useEffect(() => {
    const ticketDetails: Record<string, TicketDetail> = {
      "magong-north-1": {
        id: "magong-north-1",
        name: "媽宮・北環線 一日券",
        englishName: "Magong・North Ring Line 1-Day Pass",
        price: 150,
        image: "/images/ticket-north-ring.png",
        description:
          "探索澎湖北環線的美麗景點，包含跨海大橋、通樑古榕、二崁古厝等知名景點。一日券讓您輕鬆暢遊北環線所有站點，體驗澎湖的自然美景與人文風情。",
        packageContents: [
          "台灣好行北環線一日無限搭乘",
          "澎湖跨海大橋景點導覽",
          "通樑古榕樹景點介紹",
          "二崁古厝文化體驗",
          "小門鯨魚洞地質奇觀",
          "竹灣螃蟹博物館參觀",
        ],
        usageInstructions: [
          "請於購票後7日內開始使用",
          "首次搭乘時請向司機出示QR Code票券",
          "票券啟用後24小時內有效",
          "可在任一北環線站點上下車",
          "建議提早10分鐘到站等候",
          "請保持票券完整，遺失不補發",
        ],
        importantNotes: [
          "票券僅限本人使用，不得轉讓",
          "如遇天候不佳，部分景點可能暫停開放",
          "建議攜帶防曬用品及充足飲水",
          "景點開放時間請以現場公告為準",
          "搭乘時請遵守車上安全規定",
          "如有問題請洽客服專線",
        ],
        usageRestrictions: [
          "限購票日起30日內使用",
          "不適用於國定假日及連續假期",
          "每人限購5張",
          "不得與其他優惠併用",
          "退票需於使用前24小時申請",
          "部分特殊活動日不適用",
        ],
      },
      // ... other ticket details would be here
    }

    const foundTicket = ticketDetails[ticketId]
    setTicket(foundTicket)
  }, [ticketId])

  if (!ticket) {
    return (
      <div className="h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-muted-foreground">票券資訊不存在</p>
        <Button onClick={() => router.back()} className="mt-4">
          返回
        </Button>
      </div>
    )
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <HeaderWithMenu title="票券資訊" />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto pb-6">
          {/* Title */}
          <div className="px-4 py-4">
            <h2 className="text-xl font-bold text-foreground mb-1">{ticket.name}</h2>
            <p className="text-sm text-muted-foreground">{ticket.englishName}</p>
            <p className="text-lg font-semibold text-primary mt-2">NT$ {ticket.price}</p>
          </div>

          {/* Hero Banner */}
          <div className="px-4 mb-4">
            <img
              src={ticket.image || "/placeholder.svg?height=200&width=400&query=澎湖觀光巴士票券"}
              alt={ticket.name}
              className="w-full h-48 object-cover rounded-lg shadow-sm"
            />
          </div>

          {/* Description */}
          <div className="px-4 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              票券說明
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{ticket.description}</p>
          </div>

          {/* Route Schedule */}
          <div className="px-4 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Bus className="h-5 w-5 mr-2 text-primary" />
              行車路線
            </h3>
            <div className="space-y-4">
              {getTicketRoutes(ticketId).map((routeId) => {
                const route = routes.find((r) => r.id === routeId)
                const routeTimetable = timetableData[routeId as keyof typeof timetableData]

                return (
                  <div key={routeId} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${route?.color}`} />
                      <h4 className="font-medium text-foreground">{route?.name}</h4>
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: route?.secondaryColor,
                          color: route?.alertColor,
                        }}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        即時更新
                      </Badge>
                    </div>

                    <div className="space-y-0 relative">
                      {routeTimetable.map((schedule, index) => {
                        const isFirst = index === 0
                        const isLast = index === routeTimetable.length - 1

                        let dotColor = route?.primaryColor
                        let stopType = "景點"

                        if (isFirst) {
                          dotColor = "#22c55e" // green
                          stopType = "起點"
                        } else if (isLast) {
                          dotColor = "#ef4444" // red
                          stopType = "終點"
                        }

                        const nearbyTransport = getNearbyTransport(schedule.station)

                        return (
                          <div key={index} className="flex items-center">
                            <div
                              className="w-4 h-4 rounded-full flex-shrink-0 z-10"
                              style={{ backgroundColor: dotColor }}
                            />

                            <div className="flex-1 flex items-center justify-between ml-4 py-3">
                              <div className="flex items-center space-x-3">
                                <span className="font-medium text-foreground text-sm">{schedule.station}</span>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Badge
                                      variant="secondary"
                                      className="text-xs px-2 py-0.5 cursor-pointer hover:opacity-80 transition-opacity"
                                      style={{
                                        backgroundColor: route?.secondaryColor,
                                        color: route?.alertColor,
                                      }}
                                    >
                                      附近交通
                                    </Badge>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-sm mx-auto">
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center">
                                        <MapIcon className="h-5 w-5 mr-2 text-primary" />
                                        {schedule.station} - 附近交通
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      {/* Bus Information */}
                                      {nearbyTransport.buses.length > 0 && (
                                        <div>
                                          <h4 className="font-medium text-sm flex items-center mb-2">
                                            <Bus className="h-4 w-4 mr-2 text-blue-600" />
                                            公車路線
                                          </h4>
                                          <div className="flex flex-wrap gap-1">
                                            {nearbyTransport.buses.map((bus, idx) => (
                                              <Badge key={idx} variant="outline" className="text-xs">
                                                {bus}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Flight Information */}
                                      {nearbyTransport.flights.length > 0 && (
                                        <div>
                                          <h4 className="font-medium text-sm flex items-center mb-2">
                                            <Plane className="h-4 w-4 mr-2 text-green-600" />
                                            航班資訊
                                          </h4>
                                          <div className="flex flex-wrap gap-1">
                                            {nearbyTransport.flights.map((flight, idx) => (
                                              <Badge key={idx} variant="outline" className="text-xs">
                                                {flight}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Ship Information */}
                                      {nearbyTransport.ships.length > 0 && (
                                        <div>
                                          <h4 className="font-medium text-sm flex items-center mb-2">
                                            <Ship className="h-4 w-4 mr-2 text-purple-600" />
                                            船班資訊
                                          </h4>
                                          <div className="flex flex-wrap gap-1">
                                            {nearbyTransport.ships.map((ship, idx) => (
                                              <Badge key={idx} variant="outline" className="text-xs">
                                                {ship}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {nearbyTransport.buses.length === 0 &&
                                        nearbyTransport.flights.length === 0 &&
                                        nearbyTransport.ships.length === 0 && (
                                          <p className="text-sm text-muted-foreground text-center py-4">
                                            此點暫無其他交通資訊
                                          </p>
                                        )}
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 hover:bg-accent"
                                  onClick={() => {
                                    console.log(`[v0] Audio guide clicked for station: ${schedule.station}`)
                                  }}
                                >
                                  <Headphones className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                                </Button>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-foreground">{schedule.time}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="px-4 mb-6">
            <Accordion type="multiple" className="space-y-2">
              {/* Package Contents */}
              <AccordionItem value="package-contents">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    套票資訊
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {/* 乘車須知 */}
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-foreground">乘車須知：</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">
                            持本車票仍請務必上網劃位，劃位網址：
                            <a
                              href="https://www.penghufuneasy.com.tw"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline ml-1"
                            >
                              https://www.penghufuneasy.com.tw
                            </a>
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">
                            旅客使用本車票，應自行確認是否在有效期限內，逾期未使用視同作廢。
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">
                            旅客搭乘澎湖好行公車，乘車時請主動出示本車票，俾利駕駛員驗票。
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">
                            購買優待票之旅客，乘車時請主動出示相關優待身分證明文件，俾利駕駛員查驗身分。
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">
                            搭乘當日、搭乘後一日可憑購票證明不限次數免費搭乘澎湖縣內公車(專車除外)
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* 補票、退票及手續費規定 */}
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-foreground">補票、退票及手續費規定：</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">
                            持本車票搭乘非本路線之好行公車，應依實際搭乘之路線補收票價。
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">
                            若旅客需辦理退票，請洽原購票通路，相關退票所衍生之手續費，依各銷售通路規定辦裡之。
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">本車票逾期未使用，不受理退票。</span>
                        </li>
                      </ul>
                    </div>

                    {/* 聯絡專線 */}
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-foreground">聯絡專線：</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">
                            電話：
                            <a href="tel:0906315953" className="text-primary hover:underline ml-1">
                              0906315953
                            </a>
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">Line客服：@845izxyb</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Usage Instructions */}
              <AccordionItem value="usage-instructions">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    使用說明
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {ticket.usageInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-muted-foreground">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Important Notes */}
              <AccordionItem value="important-notes">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                    注意事項
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {ticket.importantNotes.map((note, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-muted-foreground">{note}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Usage Restrictions */}
              <AccordionItem value="usage-restrictions">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                    使用限制
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {ticket.usageRestrictions.map((restriction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-muted-foreground">{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
