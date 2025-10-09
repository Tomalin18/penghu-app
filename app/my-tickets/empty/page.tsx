"use client"

import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { useRouter } from "next/navigation"

export default function MyTicketsEmptyPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu title="我的車票" />

      <main className="px-4 py-6 max-w-md mx-auto">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">目前沒有任何車票</h3>
          <p className="text-muted-foreground text-sm mb-6">購買票券後，您的車票將顯示在這裡</p>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => router.push("/purchase/tickets")}
          >
            立即購票
          </Button>
        </div>
      </main>

      <MobileNavigation activeTab="my-tickets" />
    </div>
  )
}
