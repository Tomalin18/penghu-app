"use client"

import { useState } from "react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, Info } from "lucide-react"

export default function RouteMapPage() {
  const [selectedRoute, setSelectedRoute] = useState("north")

  const routes = [
    {
      id: "north",
      name: "北環線",
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      duration: "約3小時",
      distance: "45公里",
    },
    {
      id: "south",
      name: "澎南線",
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      duration: "約2.5小時",
      distance: "35公里",
    },
    {
      id: "xihu",
      name: "湖西線",
      color: "bg-orange-500",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      duration: "約2小時",
      distance: "28公里",
    },
  ]

  const routeStops = {
    north: [
      { name: "馬公總站", time: "08:00", isTerminal: true, description: "起點站" },
      { name: "澎湖水族館", time: "08:15", isTerminal: false, description: "海洋生物展示" },
      { name: "通樑古榕", time: "08:30", isTerminal: false, description: "百年古榕樹" },
      { name: "跨海大橋", time: "08:45", isTerminal: false, description: "澎湖地標" },
      { name: "二崁古厝", time: "09:00", isTerminal: false, description: "傳統建築群" },
      { name: "西嶼燈塔", time: "09:30", isTerminal: true, description: "終點站" },
    ],
    south: [
      { name: "馬公總站", time: "08:00", isTerminal: true, description: "起點站" },
      { name: "風櫃洞", time: "08:20", isTerminal: false, description: "海蝕洞奇觀" },
      { name: "山水沙灘", time: "08:40", isTerminal: false, description: "金黃沙灘" },
      { name: "嵵裡沙灘", time: "09:00", isTerminal: false, description: "貝殼沙灘" },
      { name: "青灣仙人掌公園", time: "09:20", isTerminal: true, description: "終點站" },
    ],
    xihu: [
      { name: "馬公總站", time: "08:00", isTerminal: true, description: "起點站" },
      { name: "奎壁山摩西分海", time: "08:25", isTerminal: false, description: "潮汐奇觀" },
      { name: "南寮古厝", time: "08:50", isTerminal: false, description: "咾咕石建築" },
      { name: "菓葉灰窯", time: "09:15", isTerminal: true, description: "終點站" },
    ],
  }

  const currentRoute = routes.find((r) => r.id === selectedRoute)!
  const currentStops = routeStops[selectedRoute as keyof typeof routeStops]

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu />

      <main className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 mx-3 mt-3 rounded-2xl">
          <h1 className="text-xl font-bold mb-2">路線圖</h1>
          <p className="text-primary-foreground/90 text-sm">查看各路線站點與路線資訊</p>
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
                className="flex-1"
              >
                <div className={`w-3 h-3 rounded-full ${route.color} mr-2`} />
                {route.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Route Info */}
        <div className="px-3 pb-4">
          <Card className={`${currentRoute.bgColor} border-0`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-lg font-bold ${currentRoute.textColor}`}>{currentRoute.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  <Navigation className="w-3 h-3 mr-1" />
                  {currentStops.length} 站點
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className={`w-4 h-4 ${currentRoute.textColor}`} />
                  <span className="text-muted-foreground">{currentRoute.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className={`w-4 h-4 ${currentRoute.textColor}`} />
                  <span className="text-muted-foreground">{currentRoute.distance}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Route Map */}
        <div className="px-3 space-y-3">
          <h3 className="text-base font-semibold text-foreground">站點路線圖</h3>

          <div className="relative">
            {currentStops.map((stop, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < currentStops.length - 1 && (
                  <div className={`absolute left-6 top-12 w-0.5 h-16 ${currentRoute.color.replace("bg-", "bg-")}/30`} />
                )}

                {/* Stop Card */}
                <Card className="mb-4 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Stop Icon */}
                      <div className="flex-shrink-0 relative">
                        <div
                          className={`w-12 h-12 rounded-full ${currentRoute.color} flex items-center justify-center`}
                        >
                          {stop.isTerminal ? (
                            <Navigation className="w-5 h-5 text-white" />
                          ) : (
                            <MapPin className="w-5 h-5 text-white" />
                          )}
                        </div>
                        {stop.isTerminal && (
                          <Badge
                            variant="secondary"
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs px-1 py-0"
                          >
                            {index === 0 ? "起點" : "終點"}
                          </Badge>
                        )}
                      </div>

                      {/* Stop Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-foreground">{stop.name}</h4>
                          <span className="text-sm text-muted-foreground">{stop.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{stop.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            第 {index + 1} 站
                          </Badge>
                          {stop.isTerminal && (
                            <Badge variant="secondary" className="text-xs">
                              {index === 0 ? "上車站" : "下車站"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Route Details */}
        <div className="px-3 py-4">
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="w-5 h-5 text-primary" />
                <h4 className="font-medium text-foreground">路線資訊</h4>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>總行程時間：</span>
                  <span className="font-medium">{currentRoute.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>總距離：</span>
                  <span className="font-medium">{currentRoute.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span>停靠站數：</span>
                  <span className="font-medium">{currentStops.length} 站</span>
                </div>
                <div className="flex justify-between">
                  <span>發車間隔：</span>
                  <span className="font-medium">30-60分鐘</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notice */}
        <div className="px-3 pb-4">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-3">
              <h4 className="font-medium text-orange-800 mb-2">溫馨提醒</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• 請於發車前10分鐘抵達候車站點</li>
                <li>• 各站點停留時間約5-10分鐘</li>
                <li>• 天候不佳時路線可能調整</li>
                <li>• 建議攜帶防曬用品及飲用水</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
