"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import HeaderWithMenu from "@/components/header-with-menu"
import MobileNavigation from "@/components/mobile-navigation"

export default function SurveyPage() {
  const router = useRouter()
  const [showThankYou, setShowThankYou] = useState(false)
  const [surveyAnswers, setSurveyAnswers] = useState({
    convenience: "",
    smoothness: "",
    clarity: "",
    satisfaction: "",
    recommendation: "",
  })

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if all questions are answered
    const allAnswered = Object.values(surveyAnswers).every((answer) => answer !== "")

    if (!allAnswered) {
      alert("請回答所有問題")
      return
    }

    console.log("[v0] Survey submitted:", surveyAnswers)
    setShowThankYou(true)

    // Redirect after showing thank you message
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  const handleAnswerChange = (question: string, value: string) => {
    setSurveyAnswers((prev) => ({
      ...prev,
      [question]: value,
    }))
  }

  if (showThankYou) {
    return (
      <div className="h-screen bg-background flex flex-col">
        <HeaderWithMenu title="購票體驗問卷" />
        <div className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-sm w-full">
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-3">感謝您的回饋！</h2>
              <p className="text-muted-foreground">您的意見對我們非常重要，我們會持續改善服務品質</p>
            </CardContent>
          </Card>
        </div>
        <MobileNavigation />
      </div>
    )
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <HeaderWithMenu title="購票體驗問卷" />

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-20 pb-24 max-w-md mx-auto">
          <div className="mb-6">
            <p className="text-center text-muted-foreground">請花一分鐘時間，協助我們了解您的購票體驗</p>
          </div>

          <form onSubmit={handleSurveySubmit} className="space-y-8">
            {/* Question 1: Convenience */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">1. 購票流程的便捷性如何？</Label>
                  <RadioGroup
                    value={surveyAnswers.convenience}
                    onValueChange={(value) => handleAnswerChange("convenience", value)}
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="5" id="conv-5" />
                      <Label htmlFor="conv-5" className="font-normal cursor-pointer flex-1">
                        非常便捷
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="4" id="conv-4" />
                      <Label htmlFor="conv-4" className="font-normal cursor-pointer flex-1">
                        便捷
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="3" id="conv-3" />
                      <Label htmlFor="conv-3" className="font-normal cursor-pointer flex-1">
                        普通
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="2" id="conv-2" />
                      <Label htmlFor="conv-2" className="font-normal cursor-pointer flex-1">
                        不便捷
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="1" id="conv-1" />
                      <Label htmlFor="conv-1" className="font-normal cursor-pointer flex-1">
                        非常不便捷
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Question 2: Smoothness */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">2. 操作流暢度如何？</Label>
                  <RadioGroup
                    value={surveyAnswers.smoothness}
                    onValueChange={(value) => handleAnswerChange("smoothness", value)}
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="5" id="smooth-5" />
                      <Label htmlFor="smooth-5" className="font-normal cursor-pointer flex-1">
                        非常流暢
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="4" id="smooth-4" />
                      <Label htmlFor="smooth-4" className="font-normal cursor-pointer flex-1">
                        流暢
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="3" id="smooth-3" />
                      <Label htmlFor="smooth-3" className="font-normal cursor-pointer flex-1">
                        普通
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="2" id="smooth-2" />
                      <Label htmlFor="smooth-2" className="font-normal cursor-pointer flex-1">
                        不流暢
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="1" id="smooth-1" />
                      <Label htmlFor="smooth-1" className="font-normal cursor-pointer flex-1">
                        非常不流暢
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Question 3: Clarity */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">3. 購票流程是否簡單明瞭？</Label>
                  <RadioGroup
                    value={surveyAnswers.clarity}
                    onValueChange={(value) => handleAnswerChange("clarity", value)}
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="5" id="clarity-5" />
                      <Label htmlFor="clarity-5" className="font-normal cursor-pointer flex-1">
                        非常明瞭
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="4" id="clarity-4" />
                      <Label htmlFor="clarity-4" className="font-normal cursor-pointer flex-1">
                        明瞭
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="3" id="clarity-3" />
                      <Label htmlFor="clarity-3" className="font-normal cursor-pointer flex-1">
                        普通
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="2" id="clarity-2" />
                      <Label htmlFor="clarity-2" className="font-normal cursor-pointer flex-1">
                        不明瞭
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="1" id="clarity-1" />
                      <Label htmlFor="clarity-1" className="font-normal cursor-pointer flex-1">
                        非常不明瞭
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Question 4: Satisfaction */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">4. 整體使用體驗滿意度？</Label>
                  <RadioGroup
                    value={surveyAnswers.satisfaction}
                    onValueChange={(value) => handleAnswerChange("satisfaction", value)}
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="5" id="sat-5" />
                      <Label htmlFor="sat-5" className="font-normal cursor-pointer flex-1">
                        非常滿意
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="4" id="sat-4" />
                      <Label htmlFor="sat-4" className="font-normal cursor-pointer flex-1">
                        滿意
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="3" id="sat-3" />
                      <Label htmlFor="sat-3" className="font-normal cursor-pointer flex-1">
                        普通
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="2" id="sat-2" />
                      <Label htmlFor="sat-2" className="font-normal cursor-pointer flex-1">
                        不滿意
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="1" id="sat-1" />
                      <Label htmlFor="sat-1" className="font-normal cursor-pointer flex-1">
                        非常不滿意
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Question 5: Recommendation */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">5. 您是否願意推薦給親友使用？</Label>
                  <RadioGroup
                    value={surveyAnswers.recommendation}
                    onValueChange={(value) => handleAnswerChange("recommendation", value)}
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="5" id="rec-5" />
                      <Label htmlFor="rec-5" className="font-normal cursor-pointer flex-1">
                        非常願意
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="4" id="rec-4" />
                      <Label htmlFor="rec-4" className="font-normal cursor-pointer flex-1">
                        願意
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="3" id="rec-3" />
                      <Label htmlFor="rec-3" className="font-normal cursor-pointer flex-1">
                        普通
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="2" id="rec-2" />
                      <Label htmlFor="rec-2" className="font-normal cursor-pointer flex-1">
                        不願意
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="1" id="rec-1" />
                      <Label htmlFor="rec-1" className="font-normal cursor-pointer flex-1">
                        非常不願意
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full h-12 text-base">
              送出問卷
            </Button>
          </form>
        </div>
      </div>

      <MobileNavigation />
    </div>
  )
}
