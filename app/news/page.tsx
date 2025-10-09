"use client"

import { useState } from "react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "全部" },
    { id: "latest", name: "最新消息" },
    { id: "important", name: "重要公告" },
    { id: "urgent", name: "緊急通知" },
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
    {
      id: 5,
      title: "澎湖台灣好行8月13日停駛",
      date: "2025/08/12",
      category: "urgent",
    },
    {
      id: 6,
      title: "輕鬆暢遊澎湖！由澎湖好行與空港快線聯手推出的台灣好行超值套票來囉！",
      date: "2025/07/27",
      category: "latest",
    },
    {
      id: 7,
      title: "防空演習公告",
      date: "2025/07/16",
      category: "latest",
    },
    {
      id: 8,
      title: "澎湖好行服務異動公告",
      date: "2025/07/10",
      category: "important",
    },
  ]

  const filteredNews =
    selectedCategory === "all" ? newsData : newsData.filter((news) => news.category === selectedCategory)

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
    // Odd items (1st, 3rd, 5th, etc.) use #67AF9B, Even items use #5C8DD3
    return index % 2 === 0 ? "text-white" : "text-white"
  }

  const getBadgeStyle = (index: number) => {
    // Odd items (1st, 3rd, 5th, etc.) use #67AF9B, Even items use #5C8DD3
    return index % 2 === 0 ? { backgroundColor: "#67AF9B" } : { backgroundColor: "#5C8DD3" }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu />

      <main className="max-w-md mx-auto pt-16">
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 mx-3 mt-3 rounded-2xl">
          <h1 className="text-xl font-bold mb-2">最新消息</h1>
          <p className="text-primary-foreground/90 text-sm">掌握最新公告與活動資訊</p>
        </div>

        <div className="px-3 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex-shrink-0"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="px-3 space-y-4">
          {filteredNews.map((news, index) => (
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
              <div className="flex-1">
                <p className="text-sm text-foreground leading-relaxed">
                  <span className="font-medium">【{getCategoryName(news.category)}】</span>
                  {news.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
