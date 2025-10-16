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

      <main className="max-w-md mx-auto px-4 pt-16 pb-8">
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
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              onClick={() => handleSocialLogin("facebook")}
              className="w-16 h-16 p-0 bg-[#3B5998] hover:bg-[#2D4373]"
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialLogin("line")}
              className="w-16 h-16 p-0 bg-[#00B900] hover:bg-[#009900]"
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .628.285.628.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 0c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.348 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="w-16 h-16 p-0 bg-white hover:bg-gray-100 border border-gray-300"
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 6.16-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </Button>
          </div>
        </form>
      </main>

      <MobileNavigation />
    </div>
  )
}
