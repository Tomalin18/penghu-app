"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function VerifySmsPage() {
  const router = useRouter()
  const [inputCode, setInputCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const storedEmail = localStorage.getItem("registerEmail")

    if (!storedEmail) {
      // If no email, redirect back to register
      router.push("/register")
      return
    }

    setEmail(storedEmail)
  }, [router])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Clear the temporary data
    localStorage.removeItem("registerEmail")

    // Navigate to success page
    router.push("/register/success")
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderWithMenu title="簡訊驗證" />

      <main className="max-w-md mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">輸入驗證碼</h1>
            <p className="text-muted-foreground">
              我們已發送驗證碼至
              <br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="smsCode" className="text-base">
                簡訊驗證碼
              </Label>
              <Input
                id="smsCode"
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="請輸入4位數驗證碼"
                className="h-14 text-center text-2xl tracking-widest"
                maxLength={4}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-[#2B8A9F] hover:bg-[#247A8C] text-white text-lg font-medium bg-primary"
              disabled={isLoading || inputCode.length !== 4}
            >
              {isLoading ? "驗證中..." : "送出驗證"}
            </Button>
          </form>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
