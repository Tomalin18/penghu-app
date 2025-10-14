"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { attractions } from "@/data/attractions"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

const HomePage = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  const popularTickets = [
    {
      id: "magong-north-1",
      title: "媽宮・北環線 一日券",
      subtitle: "",
      description: "探索澎湖北部美景，跨海大橋、二崁古厝",
      route: "北環線",
      price: "NT$ 150",
      duration: "1日",
      image: "/images/ticket-north-ring.png",
    },
    {
      id: "magong-xihu-1",
      title: "媽宮・湖西線 一日券",
      subtitle: "",
      description: "暢遊湖西線美景，奎壁山摩西分海奇景",
      route: "湖西線",
      price: "NT$ 125",
      duration: "1日",
      image: "/images/ticket-xihu.png",
    },
    {
      id: "magong-south-1",
      title: "媽宮・澎南線 一日券",
      subtitle: "",
      description: "體驗澎南風情，風櫃洞、山水沙灘",
      route: "澎南線",
      price: "NT$ 100",
      duration: "1日",
      image: "/images/ticket-south.png",
    },
  ]

  const newsData = [
    {
      id: 1,
      title: "澎南線體驗活動異動公告",
      date: "2025/09/21",
      category: "latest",
    },
    {
      id: 2,
      title: "自由塔（勝國）站調整公告",
      date: "2025/09/21",
      category: "latest",
    },
    {
      id: 3,
      title: "9/14(日)澎南線景點「水產種苗繁殖場」-種植珊瑚體驗暫停一次",
      date: "2025/09/11",
      category: "latest",
    },
    {
      id: 4,
      title: "澎湖好行｜三線大集合 冬季優惠活動",
      date: "2025/09/10",
      category: "latest",
    },
  ]

  const getCategoryName = (category: string) => {
    switch (category) {
      case "latest":
        return "最新消息"
      case "important":
        return "重要公告"
      case "urgent":
        return "緊急通知"
      default:
        return "消息"
    }
  }

  const getBadgeColor = (index: number) => {
    return "text-white"
  }

  const getBadgeStyle = (index: number) => {
    return index % 2 === 0 ? { backgroundColor: "#67AF9B" } : { backgroundColor: "#5C8DD3" }
  }

  const popularAttractions = [
    attractions.find((a) => a.id === "kuibishan-moses-sea"),
    attractions.find((a) => a.id === "penghu-tianhou-temple"),
    attractions.find((a) => a.id === "tongliang-ancient-banyan"),
    attractions.find((a) => a.id === "shanshui-beach"),
    attractions.find((a) => a.id === "fengguei-cave"),
  ].filter((attraction): attraction is NonNullable<typeof attraction> => attraction !== undefined)

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu showBackButton={false} />

      {/* Main Content */}
      <main className="max-w-md mx-auto pt-16">
        <div className="relative">
          <Carousel
            opts={{ loop: true }}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              <CarouselItem>
                <img
                  src="/images/home-carousel/好行BN_01.png"
                  alt="澎湖好行宣傳圖1"
                  className="w-full"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/images/home-carousel/好行BN_02.png"
                  alt="澎湖好行宣傳圖2"
                  className="w-full"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/images/home-carousel/好行BN_03.png"
                  alt="澎湖好行宣傳圖3"
                  className="w-full"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/images/home-carousel/好行BN_04.png"
                  alt="澎湖好行宣傳圖4"
                  className="w-full"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
          </Carousel>

        </div>

        <div className="mt-8"></div>

        {/* Popular Tickets */}
        <div className="px-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground text-2xl">熱門票券</h2>
            <Link href="/purchase/tickets">
              <Button variant="outline" size="sm" className="rounded-full px-3 py-1 h-7 bg-transparent text-base">
                MORE &gt;
              </Button>
            </Link>
          </div>
          <div className="space-y-2">
            {popularTickets.map((ticket) => (
              <Link key={ticket.id} href={`/purchase/tickets/${ticket.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow py-px">
                  <CardContent className="p-3 px-1.5 py-1.5">
                    <div className="flex items-center space-x-3 mx-3 my-1">
                      <div className="bg-muted rounded-lg flex items-center justify-center flex-shrink-0 h-20 w-20">
                        <img
                          src={ticket.image || "/placeholder.svg"}
                          alt={ticket.title}
                          className="object-cover rounded h-20 w-20"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1 text-sm">{ticket.title}</h3>
                        {ticket.subtitle && <p className="text-xs text-muted-foreground mb-1">{ticket.subtitle}</p>}
                        <p className="text-xs text-muted-foreground mb-2">{ticket.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{ticket.route}</span>
                          <div className="text-right">
                            <span className="text-base font-bold text-[#2D5CF3]">{ticket.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Attractions */}
        <div className="px-3 space-y-3 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground text-2xl">熱門景點</h2>
            <Link href="/attractions">
              <Button variant="outline" size="sm" className="rounded-full px-3 py-1 h-7 bg-transparent text-base">
                MORE &gt;
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popularAttractions.map((attraction) => (
              <Link key={attraction.id} href={`/attractions/${attraction.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] bg-muted">
                    <img
                      src={attraction.image || "/placeholder.svg"}
                      alt={attraction.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium text-foreground text-center">{attraction.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest News */}
        <div className="px-3 py-4 space-y-3 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground text-2xl">最新消息</h2>
            <Link href="/news">
              <Button variant="outline" size="sm" className="rounded-full px-3 py-1 h-7 bg-transparent text-base">
                MORE &gt;
              </Button>
            </Link>
          </div>
          <div className="space-y-4 bg-white rounded-lg p-4">
            {newsData.map((news, index) => (
              <div key={news.id} className="flex items-start gap-4 py-2">
                {/* Date column */}
                <div className="text-sm text-muted-foreground font-medium min-w-[80px]">{news.date}</div>

                {/* Category badge */}
                <Badge
                  className={`${getBadgeColor(index)} px-3 py-1 text-sm font-medium min-w-fit`}
                  style={getBadgeStyle(index)}
                >
                  {getCategoryName(news.category)}
                </Badge>

                {/* News title */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">
                    <span className="font-medium">【{getCategoryName(news.category)}】</span>
                    {news.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <MobileNavigation activeTab="home" />
    </div>
  )
}

export default HomePage
