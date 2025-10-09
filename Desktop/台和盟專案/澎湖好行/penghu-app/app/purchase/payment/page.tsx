"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MobileNavigation } from "@/components/mobile-navigation"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState("credit")
  const [orderData, setOrderData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const orderDataParam = searchParams.get("orderData")
    console.log("[v0] Payment page orderDataParam:", orderDataParam)

    if (orderDataParam) {
      try {
        const parsedOrderData = JSON.parse(orderDataParam)
        console.log("[v0] Parsed order data:", parsedOrderData)
        setOrderData(parsedOrderData)
      } catch (error) {
        console.error("Failed to parse order data:", error)
        // Fallback to mock data if parsing fails
        setOrderData({
          ticketName: "北環線",
          ticketType: "一日券",
          passengerCount: 2,
          totalAmount: 600,
          selectedDates: [{ routeName: "北環線", date: "2025/10/16" }],
          ticketBreakdown: {
            一日券: { label: "一日券", count: 2, subtotal: 600 },
          },
        })
      }
    } else {
      // No order data, set fallback
      setOrderData({
        ticketName: "北環線",
        ticketType: "一日券",
        passengerCount: 2,
        totalAmount: 600,
        selectedDates: [{ routeName: "北環線", date: "2025/10/16" }],
        ticketBreakdown: {
          一日券: { label: "一日券", count: 2, subtotal: 600 },
        },
      })
    }

    setIsLoading(false)
  }, []) // Removed searchParams from dependency array to prevent infinite loop

  const paymentMethods = [{ id: "credit", name: "信用卡", icon: "💳", color: "#438EA7" }]

  const handlePayment = () => {
    const orderDataString = encodeURIComponent(JSON.stringify(orderData))
    router.push(`/purchase/success?orderData=${orderDataString}`)
  }

  if (isLoading || !orderData) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header - Fixed */}
      <header className="sticky top-0 z-40 bg-primary px-4 py-4 flex-shrink-0">
        <div className="max-w-md mx-auto flex items-center">
          <Link href="/purchase/passenger-info" className="text-primary-foreground">
            <span className="text-xl">←</span>
          </Link>
          <h1 className="flex-1 font-bold text-xl text-primary-foreground text-center">購票 - 選擇付款方式</h1>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="px-4 py-6 max-w-md mx-auto space-y-6">
          {/* Order Summary */}
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">訂單摘要</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">路線</span>
                  <span className="text-foreground">
                    {orderData.selectedDates.map((dateInfo: any) => dateInfo.routeName).join("、")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">日期</span>
                  <span className="text-foreground">
                    {orderData.selectedDates.map((dateInfo: any) => dateInfo.date).join("、")}
                  </span>
                </div>

                <div className="border-t pt-2 mt-3">
                  <span className="text-muted-foreground text-sm font-medium">票種明細</span>
                  <div className="mt-2 space-y-1">
                    {orderData.ticketBreakdown &&
                      Object.entries(orderData.ticketBreakdown).map(([ticketType, details]: [string, any]) => (
                        <div key={ticketType} className="flex justify-between text-sm">
                          <span className="text-foreground">
                            {details.label} × {details.count}
                          </span>
                          <span className="text-foreground">NT${details.subtotal}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">小計</span>
                    <span className="text-foreground">NT${orderData.totalAmount}</span>
                  </div>
                </div>

                <hr className="my-3" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">總金額</span>
                  <span className="font-bold text-primary text-lg">NT${orderData.totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="pb-4">
            <h2 className="font-semibold text-lg text-foreground mb-4">付款方式</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`shadow-sm cursor-pointer transition-all border-2 ${
                    selectedPayment === method.id
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:border-primary"
                  }`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`font-medium ${selectedPayment === method.id ? "text-primary" : "text-foreground"}`}
                      >
                        {method.name}
                      </span>
                      {selectedPayment === method.id && (
                        <div className="ml-auto w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-red-500 text-sm mt-3">*請於30分鐘內完成付款</p>
          </div>
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 z-30 px-4 bg-background/95 backdrop-blur-sm border-t pb-0">
        <div className="max-w-md mx-auto py-4">
          <Button
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium"
            onClick={handlePayment}
          >
            前往付款
          </Button>
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <MobileNavigation activeTab="passes" />
      </div>
    </div>
  )
}
