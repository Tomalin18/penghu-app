"use client"

import { useState, useRef } from "react"
import { ArrowLeft, Store, Bus, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function ReservationSourcePage() {
  const [selectedChannel, setSelectedChannel] = useState<string>("")
  const [selectedTicketType, setSelectedTicketType] = useState<string>("none")
  const [selectedRoute, setSelectedRoute] = useState<string>("")

  const ticketTypeRef = useRef<HTMLDivElement>(null)
  const routeRef = useRef<HTMLDivElement>(null)

  const channels = [
    { id: "7-11", name: "7-11", icon: Store },
    { id: "family", name: "全家", icon: Store },
    { id: "bus", name: "和盟澎湖分公司", icon: Bus },
    { id: "klook", name: "KLOOK", icon: Plane },
    { id: "trip", name: "Trip", icon: Plane },
  ]

  const ticketOptions = {
    一日券: [
      {
        id: "magong-north-1",
        name: "媽宮・北環線 一日券",
        englishName: "Magong・North Ring Line",
        price: 150,
        image: "/images/ticket-north-ring.png",
      },
      {
        id: "magong-xihu-1",
        name: "媽宮・湖西線 一日券",
        englishName: "Magong・Xihu Line",
        price: 125,
        image: "/images/ticket-xihu.png",
      },
      {
        id: "magong-south-1",
        name: "媽宮・澎南線 一日券",
        englishName: "Magong・South Line",
        price: 100,
        image: "/images/ticket-south.png",
      },
    ],
    二日券: [
      {
        id: "north-xihu-2",
        name: "台灣好行 二日券 北環・湖西線",
        englishName: "Taiwan Tourist Shuttle North Ring・Xihu 2-Day Pass",
        price: 250,
        image: "/images/ticket-north-xihu-2day.png",
      },
      {
        id: "north-south-2",
        name: "台灣好行 二日券 北環・澎南線",
        englishName: "Taiwan Tourist Shuttle North Ring・South 2-Day Pass",
        price: 225,
        image: "/images/ticket-north-south-2day.png",
      },
      {
        id: "xihu-south-2",
        name: "台灣好行 二日券 湖西・澎南線",
        englishName: "Taiwan Tourist Shuttle Xihu・South 2-Day Pass",
        price: 200,
        image: "/images/ticket-xihu-south-2day.png",
      },
    ],
    三日券: [
      {
        id: "penghu-3-300",
        name: "台灣好行 三日券 北環・湖西・澎南線",
        englishName: "Taiwan Tourist Shuttle 3-Day Pass All Routes",
        price: 300,
        image: "/images/ticket-3day-300.png",
      },
    ],
  }

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId)
    setTimeout(() => {
      ticketTypeRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, 100)
  }

  const handleTicketTypeSelect = (type: string) => {
    setSelectedTicketType(type)
    setSelectedRoute("") // Reset route selection when ticket type changes

    if (type !== "none") {
      setTimeout(() => {
        routeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 100)
    }
  }

  const handleTicketSelect = (ticketId: string) => {
    setSelectedRoute(ticketId)
  }

  const currentTickets = ticketOptions[selectedTicketType as keyof typeof ticketOptions] || []

  const isAllSelected = selectedChannel && selectedTicketType && selectedTicketType !== "none" && selectedRoute

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-30 bg-primary px-4 py-4">
        <div className="max-w-md mx-auto flex items-center">
          <Link href="/" className="text-primary-foreground">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="flex-1 font-bold text-primary-foreground text-center text-xl">劃位 </h1>
        </div>
      </header>

      <div className="flex-1 pt-16 pb-20">
        <ScrollArea className="h-full">
          <div className="px-4 py-6 max-w-md mx-auto">
            {/* Purchase Channel Selection */}
            <div
              className={`mb-8 rounded-lg p-4 border-2 transition-all duration-300 ${
                !selectedChannel ? "bg-primary/5 border-primary/20" : "bg-transparent border-transparent"
              }`}
            >
              <h2 className="font-semibold text-foreground mb-4 text-lg">請選擇您的購買通路</h2>
              <div className="grid grid-cols-2 gap-3">
                {channels.map((channel) => {
                  const IconComponent = channel.icon
                  const isSelected = selectedChannel === channel.id
                  return (
                    <Card
                      key={channel.id}
                      className={`shadow-sm hover:shadow-md transition-all cursor-pointer border-2 ${
                        isSelected ? "border-primary bg-primary/5" : "border-transparent hover:border-primary/60"
                      }`}
                      onClick={() => handleChannelSelect(channel.id)}
                    >
                      <CardContent className="p-3 text-center py-0 px-0">
                        <IconComponent
                          className={`h-6 w-6 mx-auto mb-2 ${isSelected ? "text-primary" : "text-primary/70"}`}
                        />
                        <p className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {channel.name}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Ticket Type Selection */}
            <div
              className={`mb-8 rounded-lg p-4 border-2 transition-all duration-300 ${
                selectedChannel && !selectedRoute
                  ? "bg-primary/5 border-primary/20"
                  : "bg-transparent border-transparent"
              }`}
              ref={ticketTypeRef}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">請選擇您的票券類型</h2>
              <Select value={selectedTicketType} onValueChange={handleTicketTypeSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="請選擇票券類型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">請選擇</SelectItem>
                  <SelectItem value="一日券">一日券</SelectItem>
                  <SelectItem value="二日券">二日券</SelectItem>
                  <SelectItem value="三日券">三日券</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Route Selection Section */}
            <div
              className={`mb-8 pb-4 rounded-lg p-4 border-2 transition-all duration-300 ${
                selectedTicketType && selectedTicketType !== "none" && !selectedRoute
                  ? "bg-primary/5 border-primary/20"
                  : "bg-transparent border-transparent"
              }`}
              ref={routeRef}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">請選擇票券</h2>
              {!selectedTicketType || selectedTicketType === "none" ? (
                <div className="space-y-3 opacity-50">
                  <div className="text-sm text-muted-foreground mb-3 p-3 bg-muted/50 rounded-lg">請先選擇票券類型</div>
                  <Card className="shadow-sm border-2 border-transparent cursor-not-allowed">
                    <CardContent className="p-3 py-0 px-2.5">
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-24 bg-muted/50 rounded"></div>
                        <div>
                          <h3 className="font-semibold text-sm text-muted-foreground">票券名稱</h3>
                          <p className="text-xs text-muted-foreground">English Name</p>
                          <p className="text-sm font-medium mt-1 text-muted-foreground">NT$ 價格</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentTickets.map((ticket) => (
                    <Card
                      key={ticket.id}
                      className={`shadow-sm cursor-pointer transition-all border-2 ${
                        selectedRoute === ticket.id
                          ? "border-primary bg-primary/5"
                          : "border-transparent hover:border-primary/50"
                      }`}
                      onClick={() => handleTicketSelect(ticket.id)}
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
                              <p className="text-xs text-muted-foreground">{ticket.englishName}</p>
                              <p
                                className={`text-sm font-medium mt-1 ${selectedRoute === ticket.id ? "text-primary" : "text-primary/70"}`}
                              >
                                NT$ {ticket.price}~{ticket.price * 2}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-4 bg-background/95 backdrop-blur-sm border-t z-20">
        <div className="max-w-md mx-auto py-4">
          {isAllSelected ? (
            <Link
              href={`/reservation/ticket-info?ticketId=${selectedRoute}&channel=${selectedChannel}&ticketType=${selectedTicketType}`}
            >
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium">
                下一步
              </Button>
            </Link>
          ) : (
            <Button
              disabled
              className="w-full h-12 bg-muted text-muted-foreground rounded-xl font-medium cursor-not-allowed"
            >
              下一步
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
