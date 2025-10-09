"use client"

import { useRouter } from "next/navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const router = useRouter()

  const menuItems = [
    {
      id: "terms",
      label: "服務條款",
      onClick: () => router.push("/terms"),
      isExternal: false,
    },
    {
      id: "privacy",
      label: "隱私權條款",
      onClick: () => router.push("/privacy"),
      isExternal: false,
    },
    {
      id: "website",
      label: "前往澎湖好行網頁",
      onClick: () => window.open("https://www.penghufuneasy.com.tw/penghufuneasy/index.php?action=index", "_blank"),
      isExternal: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <HeaderWithMenu title="關於" showBackButton />

      <main className="px-4 pt-20 pb-8 max-w-md mx-auto">
        {/* App Icon and Info */}
        <div className="flex flex-col items-center mb-8 space-y-4">
          <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
            <Image src="/images/taiwan-logo.png" alt="澎湖好行" width={80} height={80} className="rounded-xl" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground mb-1">澎湖好行 - 探索澎湖之美</h1>
            <p className="text-sm text-muted-foreground">版本 1.0.0</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-xl overflow-hidden border border-border">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-accent/30 transition-colors border-b border-border last:border-b-0"
            >
              <span className="text-foreground">{item.label}</span>
              {item.isExternal ? (
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
