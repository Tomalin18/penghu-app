"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function EditProfilePage() {
  const router = useRouter()
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)

  // Mock user data - in real app this would come from auth context/state
  const [formData, setFormData] = useState({
    name: "王小明",
    email: "wang@example.com",
    phone: "0912-345-678",
    countryCode: "+886",
    idNumber: "A123456789",
    birthday: "1990-01-15",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Updating profile:", formData)

    // In real app: call API to update profile
    // For now, just show success dialog
    setShowSuccessDialog(true)
  }

  const handleSuccessConfirm = () => {
    setShowSuccessDialog(false)
    router.push("/profile")
  }

  const handleDeleteAccount = () => {
    console.log("[v0] User account deleted")
    // In real app: call API to delete account, clear all user data, etc.
    alert("帳號已成功刪除")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <HeaderWithMenu title="修改個人資料" showBackButton={true} onBack={() => router.back()} />

      <main className="px-4 pt-16 pb-20 max-w-md mx-auto">
        <Card className="shadow-sm border-primary/20">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  姓名 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-11"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  手機號碼 <span className="text-destructive">*</span>
                </Label>
                <div className="flex gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="w-32 h-11 px-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-11 flex-1"
                    placeholder="0912-345-678"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  電子信箱
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-11"
                />
              </div>

              {/* ID Number */}

              {/* Birthday */}
              <div className="space-y-2">
                <Label htmlFor="birthday" className="text-sm font-medium">
                  生日
                </Label>
                <Input
                  id="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  className="h-11"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-11 bg-transparent"
                  onClick={() => router.back()}
                >
                  取消
                </Button>
                <Button type="submit" className="flex-1 h-11">
                  確認修改
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Delete Account Button */}
        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full h-12 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 hover:border-red-400 bg-transparent"
            onClick={() => setShowDeleteAccountDialog(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            刪除帳號
          </Button>
        </div>
      </main>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>修改成功</AlertDialogTitle>
            <AlertDialogDescription>您的個人資料已成功更新。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSuccessConfirm}>確定</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteAccountDialog} onOpenChange={setShowDeleteAccountDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">確定要刪除帳號嗎？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作無法復原！刪除帳號後，您的所有資料（包括車票、收藏等）都將永久刪除。
              <br />
              <br />
              <strong>請確認您真的要刪除此帳號。</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              確定刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <MobileNavigation />
    </div>
  )
}
