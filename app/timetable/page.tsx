"use client"

import { useState } from "react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Bus, Plane, Ship, MapIcon, Headphones, Bike, Wifi, BatteryCharging, DoorOpen } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { attractions } from "@/data/attractions"

export default function TimetablePage() {
  const [selectedRoute, setSelectedRoute] = useState("north")

  const routes = [
    {
      id: "north",
      name: "北環線",
      color: "bg-[#6FA650]",
      primaryColor: "#6FA650",
      secondaryColor: "#EAF4EE",
      alertColor: "#598348",
      image: "/images/north-route.png",
    },
    {
      id: "south",
      name: "澎南線",
      color: "bg-[#D96B3E]",
      primaryColor: "#D96B3E",
      secondaryColor: "#FFFBE4",
      alertColor: "#C66239",
      image: "/images/pengnan-route.png",
    },
    {
      id: "xihu",
      name: "湖西線",
      color: "bg-[#63A0B5]",
      primaryColor: "#63A0B5",
      secondaryColor: "#E8F5FC",
      alertColor: "#3D8098",
      image: "/images/xihu-route.png",
    },
  ]

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

  const nearbyTransportation: Record<
    string,
    {
      buses: {
        government: string[]
        scenic: string[]
      }
      flights: string[]
      ships: string[]
      youbike: string[]
      wifi: string[]
      charging: string[]
      restroom: string[]
    }
  > = {
    西衛東站: {
      buses: {
        government: ["1路公車", "2路公車", "7路公車"],
        scenic: ["北環線觀光巴士", "市區環線"],
      },
      flights: [],
      ships: ["馬公港渡輪"],
      youbike: ["西衛站"],
      wifi: ["iTaiwan"],
      charging: ["7-11西衛門市"],
      restroom: ["西衛東站公廁"],
    },
    馬公港站: {
      buses: {
        government: ["1路公車", "2路公車", "3路公車", "4路公車", "5路公車"],
        scenic: ["北環線觀光巴士", "南環線觀光巴士", "湖西線觀光巴士"],
      },
      flights: ["澎湖機場接駁車"],
      ships: ["嘉義布袋港", "高雄港", "台南安平港", "七美島", "望安島"],
      youbike: ["馬公港站", "第一漁港站"],
      wifi: ["iTaiwan", "Penghu Free WiFi"],
      charging: ["馬公遊客服務中心", "全家馬公港門市"],
      restroom: ["馬公港公廁", "遊客服務中心"],
    },
    公車總站: {
      buses: {
        government: ["1路公車", "2路公車", "3路公車", "4路公車", "5路公車", "6路公車", "7路公車", "8路公車"],
        scenic: ["北環線觀光巴士", "南環線觀光巴士", "湖西線觀光巴士", "西嶼線觀光巴士"],
      },
      flights: ["澎湖機場接駁車"],
      ships: [],
      youbike: ["公車總站", "縣政府站"],
      wifi: ["iTaiwan", "Penghu Free WiFi"],
      charging: ["全家公車總站門市", "OK超商馬公店"],
      restroom: ["公車總站公廁"],
    },
    澎湖機場站: {
      buses: {
        government: ["機場接駁車", "3路公車"],
        scenic: ["湖西線觀光巴士"],
      },
      flights: ["台北松山", "台中清泉崗", "高雄小港", "嘉義", "台南"],
      ships: [],
      youbike: ["澎湖機場站"],
      wifi: ["iTaiwan", "Airport Free WiFi"],
      charging: ["機場航廈充電站", "7-11機場門市"],
      restroom: ["機場航廈公廁"],
    },
    "跨海大橋(西嶼端)": {
      buses: {
        government: ["西嶼環島公車"],
        scenic: ["北環線觀光巴士", "西嶼線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: ["漁翁島遊客中心"],
      restroom: ["跨海大橋公廁"],
    },
    風櫃洞: {
      buses: {
        government: ["澎南線公車", "5路公車"],
        scenic: ["南環線觀光巴士"],
      },
      flights: [],
      ships: ["觀光遊艇"],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: ["風櫃溫王殿"],
      restroom: ["風櫃洞景點公廁"],
    },
    山水沙灘: {
      buses: {
        government: ["澎南線公車", "5路公車"],
        scenic: ["南環線觀光巴士"],
      },
      flights: [],
      ships: ["海上活動船隻"],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: ["山水30沙灘"],
      restroom: ["山水沙灘公廁"],
    },
    北寮奎壁山: {
      buses: {
        government: ["湖西線公車", "3路公車"],
        scenic: ["湖西線觀光巴士"],
      },
      flights: [],
      ships: ["潮間帶導覽船"],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: ["北寮社區活動中心"],
      restroom: ["奎壁山景點公廁"],
    },
    大菓葉玄武岩柱: {
      buses: {
        government: ["西嶼環島公車"],
        scenic: ["北環線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: [],
      restroom: ["大菓葉景點公廁"],
    },
    "自由塔(勝國)站": {
      buses: {
        government: ["1路公車", "2路公車"],
        scenic: ["北環線觀光巴士", "南環線觀光巴士", "湖西線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: ["7-11自由塔門市"],
      restroom: [],
    },
    "第三漁港(雅霖)站": {
      buses: {
        government: ["1路公車", "2路公車"],
        scenic: ["北環線觀光巴士", "南環線觀光巴士", "湖西線觀光巴士"],
      },
      flights: [],
      ships: ["觀光漁船"],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: ["全家第三漁港門市"],
      restroom: ["第三漁港公廁"],
    },
    "文澳(元泰.百世多麗)站": {
      buses: {
        government: ["1路公車", "2路公車", "3路公車"],
        scenic: ["北環線觀光巴士", "南環線觀光巴士", "湖西線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: ["元泰大飯店", "百世多麗酒店"],
      restroom: ["飯店公共洗手間"],
    },
    東衛站: {
      buses: {
        government: ["1路公車"],
        scenic: ["北環線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: [],
      restroom: ["東衛社區活動中心"],
    },
    三仙塔: {
      buses: {
        government: ["西嶼環島公車"],
        scenic: ["北環線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: [],
      restroom: ["三仙塔景點公廁"],
    },
    二崁聚落: {
      buses: {
        government: ["西嶼環島公車"],
        scenic: ["北環線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: ["二崁社區咖啡館"],
      restroom: ["二崁聚落公廁"],
    },
    通梁古榕: {
      buses: {
        government: ["西嶼環島公車"],
        scenic: ["北環線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: ["通梁社區活動中心"],
      restroom: ["通梁古榕景點公廁"],
    },
    澎湖縣水產種苗繁殖場: {
      buses: {
        government: ["澎南線公車", "5路公車"],
        scenic: ["南環線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: [],
      restroom: ["水產繁殖場公廁"],
    },
    鎖港子午塔: {
      buses: {
        government: ["澎南線公車", "5路公車"],
        scenic: ["南環線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: ["鎖港社區活動中心"],
      restroom: ["鎖港公廁"],
    },
    南寮社區: {
      buses: {
        government: ["湖西線公車", "3路公車"],
        scenic: ["湖西線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: ["南寮社區活動中心"],
      restroom: ["南寮社區公廁"],
    },
    龍門閉鎖陣地: {
      buses: {
        government: ["湖西線公車", "3路公車"],
        scenic: ["湖西線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: [],
      wifi: ["iTaiwan"],
      charging: [],
      restroom: ["龍門景點公廁"],
    },
    澎湖生活博物館: {
      buses: {
        government: ["湖西線公車", "3路公車"],
        scenic: ["湖西線觀光巴士"],
      },
      flights: [],
      ships: [],
      youbike: ["澎湖生活博物館站"],
      wifi: ["iTaiwan", "博物館WiFi"],
      charging: ["博物館服務台"],
      restroom: ["博物館公廁"],
    },
  }

  const getNearbyTransport = (stationName: string) => {
    return (
      nearbyTransportation[stationName] || {
        buses: {
          government: ["當地接駁車"],
          scenic: ["觀光巴士"],
        },
        flights: [],
        ships: [],
        youbike: [],
        wifi: [],
        charging: [],
        restroom: [],
      }
    )
  }

  const currentTimetable = timetableData[selectedRoute as keyof typeof timetableData]

  const currentRoute = routes.find((r) => r.id === selectedRoute)
  const isNorthRoute = selectedRoute === "north"
  const isHuxiRoute = selectedRoute === "xihu"
  const isPengnanRoute = selectedRoute === "south"

  const crossSeaBridgeAttraction = attractions.find((a) => a.id === "penghu-cross-sea-bridge")
  const sanxianTowerAttraction = attractions.find((a) => a.id === "waian-sanxian-tower")
  const daguoyeBasaltAttraction = attractions.find((a) => a.id === "daguoye-basalt")

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu />

      <main className="max-w-md mx-auto pt-16">
        {/* Header */}
        <div className="mx-3 mt-3 rounded-2xl overflow-hidden">
          <Image
            src={currentRoute?.image || "/images/north-route.png"}
            alt={`${currentRoute?.name} 路線圖`}
            width={400}
            height={200}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Route Selection */}
        <div className="px-3 py-4">
          <h2 className="text-base font-semibold text-foreground mb-3">選擇路線</h2>
          <div className="flex gap-2">
            {routes.map((route) => (
              <Button
                key={route.id}
                variant={selectedRoute === route.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRoute(route.id)}
                className={`flex-1 ${
                  selectedRoute === route.id && route.id === "north"
                    ? "bg-[#6FA650] hover:bg-[#598348] text-white"
                    : selectedRoute === route.id && route.id === "xihu"
                      ? "bg-[#63A0B5] hover:bg-[#3D8098] text-white"
                      : selectedRoute === route.id && route.id === "south"
                        ? "bg-[#D96B3E] hover:bg-[#C66239] text-white"
                        : ""
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${route.color} mr-2`} />
                {route.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Timetable */}
        <div className="px-3 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">
              {routes.find((r) => r.id === selectedRoute)?.name} 班次
            </h3>
          </div>

          <div className="space-y-0 relative">
            {currentTimetable.map((schedule, index) => {
              const isFirst = index === 0
              const isLast = index === currentTimetable.length - 1

              let dotColor = currentRoute?.primaryColor

              if (isFirst) {
                dotColor = "#22c55e" // green
              } else if (isLast) {
                dotColor = "#ef4444" // red
              }

              const nearbyTransport = getNearbyTransport(schedule.station)

              return (
                <div key={index} className="flex items-center">
                  {!isLast && (
                    <div
                      className="absolute left-[7px] w-0.5 bg-gray-200"
                      style={{ top: `${(index + 1) * 56 - 32}px`, height: "40px" }}
                    />
                  )}

                  <div className="w-4 h-4 rounded-full flex-shrink-0 z-10" style={{ backgroundColor: dotColor }} />

                  <div className="flex-1 flex items-center justify-between ml-4 py-3">
                    <div className="flex items-center space-x-3">
                      {schedule.station === "跨海大橋(西嶼端)" && crossSeaBridgeAttraction ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <span className="font-medium text-primary text-sm cursor-pointer underline hover:text-primary/80 transition-colors">
                              {schedule.station}
                            </span>
                          </DialogTrigger>
                          <DialogContent className="max-w-sm max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>{crossSeaBridgeAttraction.title}</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-[60vh] pr-4">
                              <div className="space-y-4">
                                {/* Image */}
                                {crossSeaBridgeAttraction.image && (
                                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                    <Image
                                      src={crossSeaBridgeAttraction.image || "/placeholder.svg"}
                                      alt={crossSeaBridgeAttraction.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                  {crossSeaBridgeAttraction.category.map((cat) => (
                                    <Badge key={cat} variant="secondary">
                                      {cat}
                                    </Badge>
                                  ))}
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground">{crossSeaBridgeAttraction.description}</p>

                                {/* Detailed Description */}
                                <Card>
                                  <CardContent className="pt-4">
                                    <p className="text-sm leading-relaxed whitespace-pre-line">
                                      {crossSeaBridgeAttraction.detailedDescription}
                                    </p>
                                  </CardContent>
                                </Card>

                                {/* Highlights */}
                                {crossSeaBridgeAttraction.highlights && (
                                  <Card>
                                    <CardContent className="pt-4">
                                      <h4 className="font-medium mb-2">景點特色</h4>
                                      <ul className="space-y-2">
                                        {crossSeaBridgeAttraction.highlights.map((highlight, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                            <span>{highlight}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </CardContent>
                                  </Card>
                                )}

                                {/* Visit Info */}
                                <Card>
                                  <CardContent className="pt-4 space-y-2">
                                    <h4 className="font-medium mb-2">參觀資訊</h4>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">開放時間</span>
                                      <span>{crossSeaBridgeAttraction.visitInfo.openingHours}</span>
                                    </div>
                                    {crossSeaBridgeAttraction.visitInfo.recommendedDuration && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">建議停留</span>
                                        <span>{crossSeaBridgeAttraction.visitInfo.recommendedDuration}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">門票費用</span>
                                      <span>{crossSeaBridgeAttraction.visitInfo.admission}</span>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Location */}
                                <Card>
                                  <CardContent className="pt-4">
                                    <h4 className="font-medium mb-2">地點資訊</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {crossSeaBridgeAttraction.location.address}
                                    </p>
                                    {crossSeaBridgeAttraction.transportation?.fromMagong && (
                                      <p className="text-sm text-muted-foreground mt-2">
                                        <span className="font-medium text-foreground">交通：</span>
                                        {crossSeaBridgeAttraction.transportation.fromMagong}
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      ) : schedule.station === "三仙塔" && sanxianTowerAttraction ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <span className="font-medium text-primary text-sm cursor-pointer underline hover:text-primary/80 transition-colors">
                              {schedule.station}
                            </span>
                          </DialogTrigger>
                          <DialogContent className="max-w-sm max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>{sanxianTowerAttraction.title}</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-[60vh] pr-4">
                              <div className="space-y-4">
                                {/* Image */}
                                {sanxianTowerAttraction.image && (
                                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                    <Image
                                      src={sanxianTowerAttraction.image || "/placeholder.svg"}
                                      alt={sanxianTowerAttraction.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                  {sanxianTowerAttraction.category.map((cat) => (
                                    <Badge key={cat} variant="secondary">
                                      {cat}
                                    </Badge>
                                  ))}
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground">{sanxianTowerAttraction.description}</p>

                                {/* Detailed Description */}
                                <Card>
                                  <CardContent className="pt-4">
                                    <p className="text-sm leading-relaxed whitespace-pre-line">
                                      {sanxianTowerAttraction.detailedDescription}
                                    </p>
                                  </CardContent>
                                </Card>

                                {/* Highlights */}
                                {sanxianTowerAttraction.highlights && (
                                  <Card>
                                    <CardContent className="pt-4">
                                      <h4 className="font-medium mb-2">景點特色</h4>
                                      <ul className="space-y-2">
                                        {sanxianTowerAttraction.highlights.map((highlight, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                            <span>{highlight}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </CardContent>
                                  </Card>
                                )}

                                {/* Visit Info */}
                                <Card>
                                  <CardContent className="pt-4 space-y-2">
                                    <h4 className="font-medium mb-2">參觀資訊</h4>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">開放時間</span>
                                      <span>{sanxianTowerAttraction.visitInfo.openingHours}</span>
                                    </div>
                                    {sanxianTowerAttraction.visitInfo.recommendedDuration && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">建議停留</span>
                                        <span>{sanxianTowerAttraction.visitInfo.recommendedDuration}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">門票費用</span>
                                      <span>{sanxianTowerAttraction.visitInfo.admission}</span>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Location */}
                                <Card>
                                  <CardContent className="pt-4">
                                    <h4 className="font-medium mb-2">地點資訊</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {sanxianTowerAttraction.location.address}
                                    </p>
                                    {sanxianTowerAttraction.transportation?.fromMagong && (
                                      <p className="text-sm text-muted-foreground mt-2">
                                        <span className="font-medium text-foreground">交通：</span>
                                        {sanxianTowerAttraction.transportation.fromMagong}
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      ) : schedule.station === "大菓葉玄武岩柱" && daguoyeBasaltAttraction ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <span className="font-medium text-primary text-sm cursor-pointer underline hover:text-primary/80 transition-colors">
                              {schedule.station}
                            </span>
                          </DialogTrigger>
                          <DialogContent className="max-w-sm max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>{daguoyeBasaltAttraction.title}</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-[60vh] pr-4">
                              <div className="space-y-4">
                                {/* Image */}
                                {daguoyeBasaltAttraction.image && (
                                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                    <Image
                                      src={daguoyeBasaltAttraction.image || "/placeholder.svg"}
                                      alt={daguoyeBasaltAttraction.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                  {daguoyeBasaltAttraction.category.map((cat) => (
                                    <Badge key={cat} variant="secondary">
                                      {cat}
                                    </Badge>
                                  ))}
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground">{daguoyeBasaltAttraction.description}</p>

                                {/* Detailed Description */}
                                <Card>
                                  <CardContent className="pt-4">
                                    <p className="text-sm leading-relaxed whitespace-pre-line">
                                      {daguoyeBasaltAttraction.detailedDescription}
                                    </p>
                                  </CardContent>
                                </Card>

                                {/* Highlights */}
                                {daguoyeBasaltAttraction.highlights && (
                                  <Card>
                                    <CardContent className="pt-4">
                                      <h4 className="font-medium mb-2">景點特色</h4>
                                      <ul className="space-y-2">
                                        {daguoyeBasaltAttraction.highlights.map((highlight, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                            <span>{highlight}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </CardContent>
                                  </Card>
                                )}

                                {/* Visit Info */}
                                <Card>
                                  <CardContent className="pt-4 space-y-2">
                                    <h4 className="font-medium mb-2">參觀資訊</h4>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">開放時間</span>
                                      <span>{daguoyeBasaltAttraction.visitInfo.openingHours}</span>
                                    </div>
                                    {daguoyeBasaltAttraction.visitInfo.recommendedDuration && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">建議停留</span>
                                        <span>{daguoyeBasaltAttraction.visitInfo.recommendedDuration}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">門票費用</span>
                                      <span>{daguoyeBasaltAttraction.visitInfo.admission}</span>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Location */}
                                <Card>
                                  <CardContent className="pt-4">
                                    <h4 className="font-medium mb-2">地點資訊</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {daguoyeBasaltAttraction.location.address}
                                    </p>
                                    {daguoyeBasaltAttraction.transportation?.fromMagong && (
                                      <p className="text-sm text-muted-foreground mt-2">
                                        <span className="font-medium text-foreground">交通：</span>
                                        {daguoyeBasaltAttraction.transportation.fromMagong}
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <span className="font-medium text-foreground text-sm">{schedule.station}</span>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Badge
                            variant="secondary"
                            className={`text-xs px-2 py-0.5 cursor-pointer hover:opacity-80 transition-opacity ${
                              isNorthRoute
                                ? "bg-[#EAF4EE] text-[#598348] hover:bg-[#EAF4EE]/80"
                                : isHuxiRoute
                                  ? "bg-[#E8F5FC] text-[#3D8098] hover:bg-[#E8F5FC]/80"
                                  : isPengnanRoute
                                    ? "bg-[#FFFBE4] text-[#C66239] hover:bg-[#FFFBE4]/80"
                                    : ""
                            }`}
                          >
                            附近交通
                          </Badge>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm mx-auto max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center text-lg">
                              <MapIcon className="h-5 w-5 mr-2 text-primary" />
                              {schedule.station}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">附近交通與設施</p>
                          </DialogHeader>
                          
                          <ScrollArea className="max-h-[60vh]">
                            <div className="space-y-4 pr-2">
                              {/* 公車路線 */}
                              {(nearbyTransport.buses.government.length > 0 ||
                                nearbyTransport.buses.scenic.length > 0) && (
                                <Card className="border-l-4 border-l-blue-500">
                                  <CardContent className="p-4">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <Bus className="h-4 w-4 text-blue-600" />
                                      </div>
                                      <h4 className="font-semibold text-foreground">公車路線</h4>
                                    </div>
                                    
                                    <div className="space-y-3">
                                      {/* Government buses */}
                                      {nearbyTransport.buses.government.length > 0 && (
                                        <div>
                                          <p className="text-xs font-medium text-muted-foreground mb-2">澎湖縣政府公共車船管理處</p>
                                          <div className="grid grid-cols-2 gap-2">
                                            {nearbyTransport.buses.government.map((bus, idx) => (
                                              <div key={idx} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium text-center">
                                                {bus}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Scenic area buses */}
                                      {nearbyTransport.buses.scenic.length > 0 && (
                                        <div>
                                          <p className="text-xs font-medium text-muted-foreground mb-2">澎湖國家風景區管理處</p>
                                          <div className="grid grid-cols-2 gap-2">
                                            {nearbyTransport.buses.scenic.map((bus, idx) => (
                                              <div key={idx} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium text-center">
                                                {bus}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              )}

                              {/* 航班資訊 */}
                              {nearbyTransport.flights.length > 0 && (
                                <Card className="border-l-4 border-l-green-500">
                                  <CardContent className="p-4">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <Plane className="h-4 w-4 text-green-600" />
                                      </div>
                                      <h4 className="font-semibold text-foreground">航班資訊</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {nearbyTransport.flights.map((flight, idx) => (
                                        <div key={idx} className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-xs font-medium text-center">
                                          {flight}
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              )}

                              {/* 船班資訊 */}
                              {nearbyTransport.ships.length > 0 && (
                                <Card className="border-l-4 border-l-purple-500">
                                  <CardContent className="p-4">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <Ship className="h-4 w-4 text-purple-600" />
                                      </div>
                                      <h4 className="font-semibold text-foreground">船班資訊</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {nearbyTransport.ships.map((ship, idx) => (
                                        <div key={idx} className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-xs font-medium text-center">
                                          {ship}
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              )}

                              {/* YouBike站點 */}
                              {nearbyTransport.youbike.length > 0 && (
                                <Card className="border-l-4 border-l-orange-500">
                                  <CardContent className="p-4">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                                        <Bike className="h-4 w-4 text-orange-600" />
                                      </div>
                                      <h4 className="font-semibold text-foreground">YouBike站點</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {nearbyTransport.youbike.map((bike, idx) => (
                                        <div key={idx} className="bg-orange-50 text-orange-700 px-3 py-2 rounded-lg text-xs font-medium text-center">
                                          {bike}
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              )}

                              {/* 設施服務 */}
                              <div className="grid grid-cols-2 gap-3">
                                {/* WiFi熱點 */}
                                {nearbyTransport.wifi.length > 0 && (
                                  <Card className="border-l-4 border-l-cyan-500">
                                    <CardContent className="p-3">
                                      <div className="flex items-center mb-2">
                                        <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center mr-2">
                                          <Wifi className="h-3 w-3 text-cyan-600" />
                                        </div>
                                        <h5 className="font-medium text-xs text-foreground">WiFi熱點</h5>
                                      </div>
                                      <div className="space-y-1">
                                        {nearbyTransport.wifi.map((wifi, idx) => (
                                          <div key={idx} className="bg-cyan-50 text-cyan-700 px-2 py-1 rounded text-xs text-center">
                                            {wifi}
                                          </div>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}

                                {/* 充電站 */}
                                {nearbyTransport.charging.length > 0 && (
                                  <Card className="border-l-4 border-l-emerald-500">
                                    <CardContent className="p-3">
                                      <div className="flex items-center mb-2">
                                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                                          <BatteryCharging className="h-3 w-3 text-emerald-600" />
                                        </div>
                                        <h5 className="font-medium text-xs text-foreground">充電站</h5>
                                      </div>
                                      <div className="space-y-1">
                                        {nearbyTransport.charging.map((charging, idx) => (
                                          <div key={idx} className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs text-center">
                                            {charging}
                                          </div>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}

                                {/* 洗手間 */}
                                {nearbyTransport.restroom.length > 0 && (
                                  <Card className="border-l-4 border-l-pink-500">
                                    <CardContent className="p-3">
                                      <div className="flex items-center mb-2">
                                        <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center mr-2">
                                          <DoorOpen className="h-3 w-3 text-pink-600" />
                                        </div>
                                        <h5 className="font-medium text-xs text-foreground">洗手間</h5>
                                      </div>
                                      <div className="space-y-1">
                                        {nearbyTransport.restroom.map((restroom, idx) => (
                                          <div key={idx} className="bg-pink-50 text-pink-700 px-2 py-1 rounded text-xs text-center">
                                            {restroom}
                                          </div>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}
                              </div>

                              {/* 無交通資訊時顯示 */}
                              {nearbyTransport.buses.government.length === 0 &&
                                nearbyTransport.buses.scenic.length === 0 &&
                                nearbyTransport.flights.length === 0 &&
                                nearbyTransport.ships.length === 0 &&
                                nearbyTransport.youbike.length === 0 &&
                                nearbyTransport.wifi.length === 0 &&
                                nearbyTransport.charging.length === 0 &&
                                nearbyTransport.restroom.length === 0 && (
                                  <Card>
                                    <CardContent className="p-6 text-center">
                                      <MapIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                      <p className="text-sm text-muted-foreground">此站點暫無其他交通資訊</p>
                                    </CardContent>
                                  </Card>
                                )}
                            </div>
                          </ScrollArea>
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
                      {schedule.departure && (
                        <span className="text-sm text-muted-foreground">→ {schedule.departure}</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Notice */}
        <div className="px-3 py-4">
          <Card
            className={`${
              isNorthRoute
                ? "bg-[#EAF4EE]/50"
                : isHuxiRoute
                  ? "bg-[#E8F5FC]/50"
                  : isPengnanRoute
                    ? "bg-[#FFFBE4]/50"
                    : "bg-muted/50"
            }`}
          >
            <CardContent className="p-3">
              <h4 className="font-medium text-foreground mb-2">注意事項</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 班次時間可能因天候或交通狀況調整</li>
                <li>• 建議提前10分鐘到站候車</li>
                <li>• 如有異動將於官網公告</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
