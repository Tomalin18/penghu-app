"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MobileNavigation } from "@/components/mobile-navigation"
import { TicketTypeSelector } from "@/components/ticket-type-selector"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function TicketPurchasePage() {
  const [selectedTicketType, setSelectedTicketType] = useState("一日券")
  const [selectedRoute, setSelectedRoute] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const typeParam = searchParams.get("type")
    if (typeParam && ["一日券", "二日券", "三日券", "其他票券"].includes(typeParam)) {
      setSelectedTicketType(typeParam)
    }
  }, [searchParams])

  const handleTicketTypeChange = (type: string) => {
    console.log("[v0] Page handleTicketTypeChange called with:", type)
    console.log("[v0] Previous selectedTicketType:", selectedTicketType)
    setSelectedTicketType(type)
    // Clear selected route when changing ticket type
    setSelectedRoute("")
    router.push(`/purchase/tickets?type=${encodeURIComponent(type)}`)
    console.log("[v0] New selectedTicketType set to:", type)
  }

  const ticketOptions = {
    一日券: [
      {
        id: "magong-north-1",
        name: "媽宮・北環線 一日券",
        minPrice: 150, // Non-adult ticket price
        maxPrice: 300, // Adult ticket price
        image: "/images/ticket-north-ring.png",
      },
      {
        id: "magong-xihu-1",
        name: "媽宮・湖西線 一日券",
        minPrice: 125, // Non-adult ticket price
        maxPrice: 250, // Adult ticket price
        image: "/images/ticket-xihu.png",
      },
      {
        id: "magong-south-1",
        name: "媽宮・澎南線 一日券",
        minPrice: 100, // Non-adult ticket price
        maxPrice: 200, // Adult ticket price
        image: "/images/ticket-south.png",
      },
    ],
    二日券: [
      {
        id: "north-xihu-2",
        name: "台灣好行 二日券 北環・湖西線",
        minPrice: 250, // Non-adult ticket price
        maxPrice: 500, // Adult ticket price
        image: "/images/ticket-north-xihu-2day.png",
      },
      {
        id: "north-south-2",
        name: "台灣好行 二日券 北環・澎南線",
        minPrice: 225, // Non-adult ticket price
        maxPrice: 450, // Adult ticket price
        image: "/images/ticket-north-south-2day.png",
      },
      {
        id: "xihu-south-2",
        name: "台灣好行 二日券 湖西・澎南線",
        minPrice: 200, // Non-adult ticket price
        maxPrice: 400, // Adult ticket price
        image: "/images/ticket-xihu-south-2day.png",
      },
    ],
    三日券: [
      {
        id: "penghu-3-300",
        name: "台灣好行 三日券 北環・湖西・澎南線",
        minPrice: 300, // Non-adult ticket price
        maxPrice: 600, // Adult ticket price
        image: "/images/ticket-3day-300.png",
      },
    ],
    其他票券: [
      {
        id: "north-airport-combo",
        name: "媽宮・暢遊北環線一日券+空港快線",
        minPrice: 300, // Non-adult ticket price
        maxPrice: 600, // Adult ticket price
        image: "/images/ticket-magong-north-300.png",
      },
      {
        id: "xihu-airport-combo",
        name: "媽宮・湖西慢旅趣一日券+空港快線",
        minPrice: 250, // Non-adult ticket price
        maxPrice: 500, // Adult ticket price
        image: "/images/ticket-magong-xihu-250.png",
      },
      {
        id: "south-airport-combo",
        name: "媽宮・澎南輕旅行一日券+空港快線",
        minPrice: 200, // Non-adult ticket price
        maxPrice: 400, // Adult ticket price
        image: "/images/ticket-magong-south-200.png",
      },
    ],
  }

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId)
    router.push(`/purchase/tickets/${routeId}`)
  }

  const handleNext = () => {
    if (selectedRoute) {
      router.push("/purchase/route-date")
    }
  }

  const currentTickets = ticketOptions[selectedTicketType as keyof typeof ticketOptions] || []

  console.log("[v0] Current selectedTicketType:", selectedTicketType)
  console.log("[v0] Current tickets count:", currentTickets.length)

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-20 bg-primary px-3 py-3 flex-shrink-0">
        <div className="max-w-md mx-auto flex items-center">
          <Link href="/" className="text-primary-foreground">
            <span className="text-lg">←</span>
          </Link>
          <h1 className="flex-1 font-bold text-lg text-primary-foreground text-center">購票 - 選擇票券</h1>
        </div>
      </header>

      <div className="px-3 pt-4 max-w-md mx-auto w-full flex-shrink-0">
        <TicketTypeSelector selectedType={selectedTicketType} onTypeChange={handleTicketTypeChange} />
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="px-3 pt-4 pb-20 max-w-md mx-auto">
            <div className="space-y-3">
              {currentTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className={`shadow-sm cursor-pointer transition-all border-2 ${
                    selectedRoute === ticket.id
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:border-primary/50"
                  }`}
                  onClick={() => handleRouteSelect(ticket.id)}
                >
                  <CardContent className="p-3 py-0 px-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={ticket.image || "/placeholder.svg?height=32&width=32"}
                          alt="Ticket"
                          className={`object-contain rounded w-24 h-24 ${selectedRoute === ticket.id ? "opacity-100" : "opacity-70"}`}
                        />
                        <div>
                          <h3
                            className={`font-semibold text-sm ${selectedRoute === ticket.id ? "text-primary" : "text-foreground"}`}
                          >
                            {ticket.name}
                          </h3>
                          <p
                            className={`text-sm font-medium mt-1 ${selectedRoute === ticket.id ? "text-primary" : "text-primary/70"}`}
                          >
                            NT$ {ticket.minPrice}~{ticket.maxPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Bottom Navigation - Fixed */}
      <MobileNavigation activeTab="purchase" />
    </div>
  )
}
