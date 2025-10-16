"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PasswordInput } from "@/components/ui/password-input"
import { AccountInput } from "@/components/ui/account-input"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { MobileNavigation } from "@/components/mobile-navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captcha, setCaptcha] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [captchaImage, setCaptchaImage] = useState("/images/captcha.png")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login attempt:", { email, password, captcha, rememberMe })

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", email)

    router.push("/profile")
  }

  const refreshCaptcha = () => {
    setCaptchaImage(`/images/captcha.png?t=${Date.now()}`)
  }

  const handleSocialLogin = async (provider: string) => {
    console.log("[v0] Social login with:", provider)

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", `user@${provider}.com`)
    router.push("/profile")
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderWithMenu title="會員登入" />

      <main className="max-w-md mx-auto px-4 pt-16 pb-20">
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">
              會員帳號 (email/手機號碼)
            </Label>
            <AccountInput
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="請輸入電子郵件或手機號碼"
              className="h-12 bg-card"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base">
              會員密碼
            </Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼"
              className="h-12 bg-card"
              required
            />
          </div>

          {/* Captcha Input */}
          <div className="space-y-2">
            <Label htmlFor="captcha" className="text-base">
              認證碼
            </Label>
            <div className="flex gap-2">
              <Input
                id="captcha"
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="請輸入認證碼"
                className="h-12 flex-1 bg-card"
                required
              />
              <div className="flex items-center gap-2">
                <img
                  src={captchaImage || "/placeholder.svg"}
                  alt="驗證碼"
                  className="h-12 w-28 border rounded object-cover"
                />
                <Button
                  type="button"
                  onClick={refreshCaptcha}
                  className="h-12 bg-[#E91E8C] hover:bg-[#D01A7D] text-white px-4 whitespace-nowrap"
                >
                  換一張
                </Button>
              </div>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
              記住我
            </Label>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-14 bg-[#2B8A9F] hover:bg-[#247A8C] text-white text-lg font-medium bg-primary"
            disabled={isLoading}
          >
            {isLoading ? "登入中..." : "登入"}
          </Button>

          {/* Links */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/forgot-password" className="text-foreground hover:underline">
              忘記密碼
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/register" className="text-foreground hover:underline">
              我要註冊
            </Link>
          </div>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">或使用其他帳號登入/註冊</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button
              type="button"
              onClick={() => handleSocialLogin("facebook")}
              className="w-16 h-16 p-0 bg-transparent hover:bg-gray-100 border border-gray-200 overflow-hidden"
              disabled={isLoading}
            >
              <img src="/images/facebook-logo.png" alt="Facebook" className="w-full h-full object-cover" />
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialLogin("line")}
              className="w-16 h-16 p-0 bg-transparent hover:bg-gray-100 border border-gray-200 overflow-hidden"
              disabled={isLoading}
            >
              <img src="/images/line-logo.png" alt="LINE" className="w-full h-full object-cover" />
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="w-16 h-16 p-0 bg-transparent hover:bg-gray-100 border border-gray-200 overflow-hidden"
              disabled={isLoading}
            >
              <img src="/images/google-logo.png" alt="Google" className="w-12 h-12 object-contain" />
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialLogin("apple")}
              className="w-16 h-16 p-0 bg-transparent hover:bg-gray-100 border border-gray-200 overflow-hidden"
              disabled={isLoading}
            >
              <img src="/images/apple-pay-logo.png" alt="Apple Pay" className="w-12 h-12 object-contain" />
            </Button>
          </div>
        </form>
      </main>

      <MobileNavigation />
    </div>
  )
}
