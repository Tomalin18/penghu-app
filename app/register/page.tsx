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

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [countryCode, setCountryCode] = useState("+886")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [captcha, setCaptcha] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [captchaImage, setCaptchaImage] = useState("/images/captcha.png")
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("密碼與確認密碼不符")
      return
    }

    if (!agreeTerms) {
      alert("請同意服務條款與隱私權政策")
      return
    }

    console.log("[v0] Register attempt:", { email, password, captcha })

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    localStorage.setItem("registerEmail", email)
    setIsLoading(false)
    router.push("/register/verify-sms")
  }

  const refreshCaptcha = () => {
    setCaptchaImage(`/images/captcha.png?t=${Date.now()}`)
  }

  const handleSocialRegister = async (provider: string) => {
    console.log("[v0] Social register with:", provider)
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", `user@${provider}.com`)
    router.push("/profile")
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderWithMenu title="會員註冊" />

      <main className="max-w-md mx-auto px-4 pt-16 pb-8">
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">
              會員帳號 (手機號碼)
            </Label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-32 h-12 px-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="+886">🇹🇼 +886</option>
                <option value="+86">🇨🇳 +86</option>
                <option value="+852">🇭🇰 +852</option>
                <option value="+853">🇲🇴 +853</option>
                <option value="+65">🇸🇬 +65</option>
                <option value="+60">🇲🇾 +60</option>
                <option value="+81">🇯🇵 +81</option>
                <option value="+82">🇰🇷 +82</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <AccountInput
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="請輸入手機號碼"
                className="h-12 flex-1"
                required
              />
            </div>
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
              className="h-12"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-base">
              確認密碼
            </Label>
            <PasswordInput
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="請再次輸入密碼"
              className="h-12"
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
                className="h-12 flex-1"
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

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked === true)} />
            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
              我已閱讀並同意
              <Link href="/terms" className="text-[#2B8A9F] hover:underline mx-1 bg-secondary">
                服務條款
              </Link>
              與
              <Link href="/privacy" className="text-[#2B8A9F] hover:underline mx-1">
                隱私權政策
              </Link>
            </Label>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            className="w-full h-14 bg-[#2B8A9F] hover:bg-[#247A8C] text-white text-lg font-medium bg-primary"
            disabled={isLoading}
          >
            {isLoading ? "註冊中..." : "註冊"}
          </Button>

          {/* Link to Login */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">已經有帳號了？</span>
            <Link href="/login" className="text-foreground hover:underline ml-2">
              立即登入
            </Link>
          </div>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">或使用其他帳號註冊</span>
            </div>
          </div>

          {/* Social Registration Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              onClick={() => handleSocialRegister("facebook")}
              className="w-16 h-16 p-0 bg-[#3B5998] hover:bg-[#2D4373]"
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialRegister("line")}
              className="w-16 h-16 p-0 bg-[#00B900] hover:bg-[#009900]"
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .628.285.628.63 0 .349-.281.63-.63.63v4.771zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.345.285-.63.63-.63.346 0 .628.285.628.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialRegister("google")}
              className="w-16 h-16 p-0 bg-white hover:bg-gray-100 border border-gray-300"
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
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
