"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { MobileNavigation } from "@/components/mobile-navigation"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Forgot password request for:", email)
    setSubmitted(true)
    // Handle forgot password logic here
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderWithMenu title="忘記密碼" />

      <main className="max-w-md mx-auto px-4 pt-20 pb-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-muted-foreground">請輸入您的電子郵件地址，我們將發送密碼重設連結給您</p>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                會員帳號 (email)
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="請輸入電子郵件"
                className="h-12"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 bg-[#2B8A9F] hover:bg-[#247A8C] text-white text-lg font-medium"
            >
              發送重設連結
            </Button>

            {/* Back to Login Link */}
            <div className="text-center">
              <Link href="/login" className="text-sm text-foreground hover:underline">
                返回登入頁面
              </Link>
            </div>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">郵件已發送</h2>
            <p className="text-muted-foreground">
              我們已將密碼重設連結發送至 <strong>{email}</strong>
              <br />
              請檢查您的電子郵件信箱
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline" className="w-full h-12">
              重新發送
            </Button>
            <div className="text-center">
              <Link href="/login" className="text-sm text-foreground hover:underline">
                返回登入頁面
              </Link>
            </div>
          </div>
        )}
      </main>

      <MobileNavigation />
    </div>
  )
}
