"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { MobileNavigation } from "@/components/mobile-navigation"
import { CheckCircle2 } from "lucide-react"

export default function RegisterSuccessPage() {
  const router = useRouter()

  const handleLogin = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderWithMenu title="註冊成功" />

      <main className="max-w-md mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-6 py-12">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">註冊成功！</h1>
            <p className="text-muted-foreground">
              恭喜您已成功完成會員註冊
              <br />
              現在可以開始使用所有功能
            </p>
          </div>

          <div className="w-full space-y-3 pt-6">
            <Button
              onClick={handleLogin}
              className="w-full h-14 bg-[#2B8A9F] hover:bg-[#247A8C] text-white text-lg font-medium bg-primary"
            >
              立即登入
            </Button>

            <Button onClick={() => router.push("/")} variant="outline" className="w-full h-14 text-lg font-medium">
              返回首頁
            </Button>
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}
