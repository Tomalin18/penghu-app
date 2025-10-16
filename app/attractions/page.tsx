"use client"

import { MobileNavigation } from "@/components/mobile-navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Clock,
  Bus,
  Star,
  Heart,
  Download,
  Phone,
  Navigation,
  Store,
  Fuel,
  ParkingCircle,
  Bath,
  Banknote,
  Hotel,
  Info,
  BatteryCharging,
  Car,
  Wifi,
  Headphones,
} from "lucide-react"
import Link from "next/link"
import { attractionsByRoute } from "@/data/attractions"
import { shoppingDistricts } from "@/data/shopping-districts"
import { nearbyFacilities } from "@/data/nearby-facilities"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/contexts/favorites-context"

export default function AttractionsPage() {
  const [selectedRoute, setSelectedRoute] = useState("湖西線")
  const [selectedContentTab, setSelectedContentTab] = useState("景點介紹")
  const { toggleFavorite, isFavorite } = useFavorites()

  const currentAttractions = attractionsByRoute[selectedRoute as keyof typeof attractionsByRoute] || []
  const currentShoppingDistricts = shoppingDistricts.filter((district) => district.route === selectedRoute)
  const currentFacilities = nearbyFacilities.filter((category) => category.route === selectedRoute)

  const filteredAttractions = currentAttractions

  const routeColors = {
    湖西線: "from-blue-500/20 to-blue-600/30",
    北環線: "from-emerald-500/20 to-emerald-600/30",
    澎南線: "from-orange-500/20 to-orange-600/30",
  }

  const routeBadgeColors = {
    湖西線: "bg-blue-500/10 text-blue-700 border-blue-200",
    北環線: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    澎南線: "bg-orange-500/10 text-orange-700 border-orange-200",
  }

  const travelGuides = [
    {
      id: "north-ring",
      title: "北環線電子指南",
      subtitle: "",
      color: "bg-emerald-500",
      route: "北環線",
    },
    {
      id: "xihu",
      title: "湖西線電子指南",
      subtitle: "",
      color: "bg-blue-500",
      route: "湖西線",
    },
    {
      id: "south",
      title: "澎南線電子指南",
      subtitle: "",
      color: "bg-orange-500",
      route: "澎南線",
    },
    {
      id: "complete",
      title: "澎湖好行完整指南",
      subtitle: "Complete Travel Guide",
      color: "bg-purple-500",
      route: "all",
    },
  ]

  const filteredTravelGuides = travelGuides.filter((guide) => guide.route === selectedRoute || guide.route === "all")

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Store,
      Fuel,
      ParkingCircle,
      Bath,
      Banknote,
      Hotel,
      Info,
      BatteryCharging,
      Car,
      Wifi,
    }
    return icons[iconName] || Store
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-gradient-end">
      <HeaderWithMenu title="景點導覽" />

      <div className="sticky top-16 z-30 bg-surface-elevated/95 backdrop-blur-md border-b border-border/50 px-4 py-6 space-y-4">
        <div className="max-w-md mx-auto space-y-4">
          {/* Route Tabs */}
          <Tabs value={selectedRoute} onValueChange={setSelectedRoute} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-surface p-1 rounded-xl">
              <TabsTrigger
                value="湖西線"
                className="text-sm font-medium rounded-lg data-[state=active]:bg-surface-elevated data-[state=active]:shadow-sm"
              >
                <Bus className="w-4 h-4 mr-2" />
                湖西線
              </TabsTrigger>
              <TabsTrigger
                value="北環線"
                className="text-sm font-medium rounded-lg data-[state=active]:bg-surface-elevated data-[state=active]:shadow-sm"
              >
                <Bus className="w-4 h-4 mr-2" />
                北環線
              </TabsTrigger>
              <TabsTrigger
                value="澎南線"
                className="text-sm font-medium rounded-lg data-[state=active]:bg-surface-elevated data-[state=active]:shadow-sm"
              >
                <Bus className="w-4 h-4 mr-2" />
                澎南線
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs value={selectedContentTab} onValueChange={setSelectedContentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-surface p-1 rounded-xl">
              <TabsTrigger
                value="景點介紹"
                className="text-xs font-medium rounded-lg data-[state=active]:bg-surface-elevated data-[state=active]:shadow-sm"
              >
                景點介紹
              </TabsTrigger>
              <TabsTrigger
                value="商圈優惠"
                className="text-xs font-medium rounded-lg data-[state=active]:bg-surface-elevated data-[state=active]:shadow-sm"
              >
                商圈優惠
              </TabsTrigger>
              <TabsTrigger
                value="周邊設施"
                className="text-xs font-medium rounded-lg data-[state=active]:bg-surface-elevated data-[state=active]:shadow-sm"
              >
                周邊設施
              </TabsTrigger>
              <TabsTrigger
                value="電子折頁"
                className="text-xs font-medium rounded-lg data-[state=active]:bg-surface-elevated data-[state=active]:shadow-sm"
              >
                電子折頁
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <main className="px-4 pb-20 max-w-md mx-auto pt-24">
        {selectedContentTab === "景點介紹" && (
          <div className="space-y-6">
            {filteredAttractions.map((attraction, index) => (
              <Link key={attraction.id} href={`/attractions/${attraction.id}`}>
                <div className="group relative bg-surface-elevated rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Image Container with Gradient Overlay */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={attraction.image || "/placeholder.svg?height=300&width=400&query=penghu attraction"}
                      alt={attraction.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${routeColors[selectedRoute as keyof typeof routeColors]} opacity-60`}
                    />

                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(attraction.id)
                      }}
                      className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-colors ${
                        isFavorite(attraction.id)
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-surface-elevated/90 hover:bg-surface-elevated"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite(attraction.id) ? "text-white fill-white" : "text-muted-foreground"
                        }`}
                      />
                    </button>

                    {/* Route Badge */}
                    <div className="absolute top-4 left-4"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {attraction.category.slice(0, 3).map((cat) => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className="text-xs font-medium px-2 py-1 rounded-md bg-muted/50"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    {/* Title and Audio Icon */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors leading-tight flex-1">
                        {attraction.title}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-accent flex-shrink-0"
                        onClick={(e) => {
                          e.preventDefault()
                          console.log(`[v0] Audio guide clicked for attraction: ${attraction.title}`)
                        }}
                      >
                        <Headphones className="h-4 w-4 text-foreground font-bold stroke-[2.5]" />
                      </Button>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">{attraction.description}</p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{attraction.location.address.split("澎湖縣")[1]}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">4.{Math.floor(Math.random() * 4) + 5}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {selectedContentTab === "商圈優惠" && (
          <div className="space-y-6">
            {currentShoppingDistricts.length > 0 ? (
              currentShoppingDistricts.map((district) => (
                <div key={district.id} className="space-y-4">
                  {/* District Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <Store className="w-5 h-5 text-primary" />
                    <div>
                      <h2 className="font-bold text-lg text-foreground">{district.name}</h2>
                      <p className="text-sm text-muted-foreground">{district.description}</p>
                    </div>
                  </div>

                  {/* Stores List */}
                  <div className="space-y-3">
                    {district.stores.map((store) => (
                      <div
                        key={store.id}
                        className="bg-surface-elevated rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        {/* Store Name and Rating */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-foreground mb-1">{store.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium text-foreground">{store.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2 bg-transparent"
                              onClick={(e) => {
                                e.preventDefault()
                                const searchQuery = encodeURIComponent(`${store.name} 澎湖`)
                                window.open(`https://www.google.com/maps/search/?api=1&query=${searchQuery}`, "_blank")
                              }}
                            >
                              <Navigation className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2 bg-transparent"
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = `tel:${store.phone}`
                              }}
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Promotion Badge */}
                        {store.promotion && (
                          <Badge className="mb-3 bg-orange-500/10 text-orange-700 border-orange-200">
                            {store.promotion}
                          </Badge>
                        )}

                        {/* Store Info */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{store.hours}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span>{store.phone}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-surface-elevated rounded-2xl p-8 text-center">
                <p className="text-muted-foreground">此路線暫無商圈優惠資訊</p>
              </div>
            )}
          </div>
        )}

        {selectedContentTab === "周邊設施" && (
          <div className="space-y-6">
            {currentFacilities.length > 0 ? (
              currentFacilities.map((category) => {
                const IconComponent = getIconComponent(category.icon)
                return (
                  <div key={category.id} className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <h2 className="font-bold text-lg text-foreground">{category.name}</h2>
                    </div>

                    {/* Facilities List */}
                    <div className="space-y-3">
                      {category.facilities.map((facility) => (
                        <div
                          key={facility.id}
                          className="bg-surface-elevated rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          {/* Facility Name and Navigation */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-bold text-foreground mb-1">{facility.name}</h3>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2 bg-transparent"
                              onClick={(e) => {
                                e.preventDefault()
                                const encodedAddress = encodeURIComponent(facility.address)
                                window.open(
                                  `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
                                  "_blank",
                                )
                              }}
                            >
                              <Navigation className="w-4 h-4" />
                              導航
                            </Button>
                          </div>

                          {/* Facility Info */}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="flex-1">{facility.address}</span>
                            </div>
                            {facility.hours && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>{facility.hours}</span>
                              </div>
                            )}
                            {facility.phone && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                <a href={`tel:${facility.phone}`} className="text-primary hover:underline">
                                  {facility.phone}
                                </a>
                              </div>
                            )}
                            {facility.distance && (
                              <div className="text-xs text-muted-foreground">距離約 {facility.distance}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="bg-surface-elevated rounded-2xl p-8 text-center">
                <p className="text-muted-foreground">此路線暫無周邊設施資訊</p>
              </div>
            )}
          </div>
        )}

        {selectedContentTab === "電子折頁" && (
          <div className="space-y-6">
            {filteredTravelGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-surface-elevated rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${guide.color} rounded-xl flex items-center justify-center`}>
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{guide.title}</h3>
                    {guide.subtitle && <p className="text-sm text-muted-foreground">{guide.subtitle}</p>}
                  </div>
                </div>
                <button className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors">
                  下載
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <MobileNavigation activeTab="more" />
    </div>
  )
}
