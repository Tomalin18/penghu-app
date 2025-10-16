"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { MapPin, Star, Headphones } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { attractions } from "@/data/attractions"

interface Attraction {
  id: string
  title: string
  description: string
  detailedDescription: string
  category: string[]
  highlights?: string[]
  warnings?: string[]
  image?: string
  images?: string[]
  visitInfo: {
    openingHours: string
    recommendedDuration?: string
    admission: string
  }
  contact?: {
    phone?: string
  }
  location: {
    address: string
  }
  transportation?: {
    fromMagong?: string
    parking?: string
  }
  nearbyAttractions?: {
    name: string
    distance: string
  }[]
  source: string
}

export default function AttractionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [attraction, setAttraction] = useState<Attraction | undefined>(undefined)

  useEffect(() => {
    const fetchedAttraction = attractions.find((a) => a.id === id)
    if (!fetchedAttraction) {
      router.replace("/404")
    } else {
      setAttraction(fetchedAttraction)
    }
  }, [id, router])

  if (!attraction) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <HeaderWithMenu title="景點詳情" />

      <main className="max-w-md mx-auto pt-16">
        {/* Hero Image Carousel */}
        <div className="bg-muted">
          {attraction.images && attraction.images.length > 1 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {attraction.images.map((image, index: number) => (
                  <CarouselItem key={index}>
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${attraction.title} - 圖片 ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          ) : (
            <img
              src={attraction.image || "/placeholder.svg"}
              alt={attraction.title}
              className="w-full h-auto object-contain"
            />
          )}
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {attraction.category.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h2 className="text-xl font-bold text-foreground">{attraction.title}</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-accent flex-shrink-0"
                onClick={() => {
                  console.log(`[v0] Audio guide clicked for attraction: ${attraction.title}`)
                }}
              >
                <Headphones className="h-5 w-5 text-foreground font-bold stroke-[2.5]" />
              </Button>
            </div>
            <p className="text-muted-foreground mb-4">{attraction.description}</p>
          </div>

          {/* Quick Info Cards */}

          {/* Detailed Description */}
          <Card>
            <CardContent>
              <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {attraction.detailedDescription}
              </div>
            </CardContent>
          </Card>

          {/* Highlights */}
          {attraction.highlights && attraction.highlights.length > 0 && (
            <Card>
              <CardContent>
                <ul className="space-y-2">
                  {attraction.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Warnings */}
          {attraction.warnings && attraction.warnings.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent>
                <ul className="space-y-2">
                  {attraction.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-orange-700">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Visit Information */}
          <Card>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">開放時間</span>
                <span className="text-sm font-medium">{attraction.visitInfo.openingHours}</span>
              </div>
              {attraction.visitInfo.recommendedDuration && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">建議停留</span>
                  <span className="text-sm font-medium">{attraction.visitInfo.recommendedDuration}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">門票費用</span>
                <span className="text-sm font-medium">{attraction.visitInfo.admission}</span>
              </div>
              {attraction.contact?.phone && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">聯絡電話</span>
                  <a href={`tel:${attraction.contact.phone}`} className="text-sm font-medium text-primary">
                    {attraction.contact.phone}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location & Transportation */}
          <Card>
            <CardContent className="space-y-3">
              <div>
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">地址</p>
                    <p className="text-sm text-muted-foreground">{attraction.location.address}</p>
                  </div>
                </div>
              </div>

              {attraction.transportation?.fromMagong && (
                <>
                  <div>
                    <div className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium mb-1">自駕路線</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {attraction.transportation.fromMagong}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {attraction.transportation?.parking && (
                <>
                  <div className="text-sm">
                    <span className="text-muted-foreground">停車資訊：</span>
                    <span className="font-medium">{attraction.transportation.parking}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Nearby Attractions */}
          {attraction.nearbyAttractions && attraction.nearbyAttractions.length > 0 && (
            <Card>
              <CardContent>
                <div className="space-y-2">
                  {attraction.nearbyAttractions.map((nearby, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{nearby.name}</span>
                      <span className="text-xs text-muted-foreground">{nearby.distance}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Source */}
          <div className="text-xs text-muted-foreground text-center">資料來源：{attraction.source}網站</div>
        </div>
      </main>

      <MobileNavigation activeTab="attractions" />
    </div>
  )
}
