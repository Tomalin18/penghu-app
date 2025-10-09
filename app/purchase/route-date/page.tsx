"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function RouteDatePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const ticketId = searchParams.get("ticketId")
    const redirectUrl = ticketId ? `/purchase/passenger-info?ticketId=${ticketId}` : "/purchase/passenger-info"

    router.replace(redirectUrl)
  }, [router, searchParams])

  // Show loading state while redirecting
  return (
    <div className="h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">正在跳轉...</p>
      </div>
    </div>
  )
}
