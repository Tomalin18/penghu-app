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

      <main className="max-w-md mx-auto px-4 pt-16 pb-20">
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
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button
              type="button"
              onClick={() => handleSocialRegister("facebook")}
              className="w-16 h-16 p-0 bg-transparent hover:bg-gray-100 border border-gray-200 overflow-hidden"
              disabled={isLoading}
            >
              <img src="/images/facebook-logo.png" alt="Facebook" className="w-full h-full object-cover" />
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialRegister("line")}
              className="w-16 h-16 p-0 bg-transparent hover:bg-gray-100 border border-gray-200 overflow-hidden"
              disabled={isLoading}
            >
              <img src="/images/line-logo.png" alt="LINE" className="w-full h-full object-cover" />
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialRegister("google")}
              className="w-16 h-16 p-0 bg-transparent hover:bg-gray-100 border border-gray-200 overflow-hidden"
              disabled={isLoading}
            >
              <img src="/images/google-logo.png" alt="Google" className="w-12 h-12 object-contain" />
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialRegister("apple")}
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
