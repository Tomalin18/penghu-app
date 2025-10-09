"use client"

import { useState } from "react"
import { ChevronLeft, ChevronDown, Globe } from "lucide-react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import AiChatSupport from "@/components/ai-chat-support"

export default function SupportPage() {
  const router = useRouter()
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("繁體中文")

  const languages = [
    { code: "zh-TW", name: "繁體中文" },
    { code: "en", name: "English" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
  ]

  const getLanguageCode = (languageName: string) => {
    const language = languages.find((lang) => lang.name === languageName)
    return language?.code || "zh-TW"
  }

  const getTitleByLanguage = (languageName: string) => {
    const titles = {
      繁體中文: "客服中心",
      English: "Customer Service",
      日本語: "カスタマーサービス",
      한국어: "고객 서비스",
    }
    return titles[languageName as keyof typeof titles] || "客服中心"
  }

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)
    setIsLanguageOpen(false)
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="bg-primary text-primary-foreground p-4 flex-shrink-0 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Title */}
          <h1 className="text-xl font-bold">{getTitleByLanguage(selectedLanguage)}</h1>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-1 p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
            >
              <Globe className="h-5 w-5" />
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* Dropdown Menu */}
            {isLanguageOpen && (
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[120px]">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.name)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedLanguage === language.name ? "bg-muted text-primary font-medium" : "text-foreground"
                    }`}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="max-w-md mx-auto flex-1 flex flex-col h-full">
          <AiChatSupport language={getLanguageCode(selectedLanguage)} />
        </div>
      </div>

      <div className="flex-shrink-0 sticky bottom-0 z-40">
        <MobileNavigation activeTab="support" />
      </div>
    </div>
  )
}
