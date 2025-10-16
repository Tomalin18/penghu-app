"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Tag, Bell, User, Settings, Megaphone, Clock } from "lucide-react"

type NotificationCategory = "個人通知" | "系統通知" | "活動通知" | "行程提醒"

interface NotificationDetail {
  id: number
  category: NotificationCategory
  message: string
  time: string
  date: string
  unread: boolean
  content: string
  author?: string
  priority?: "low" | "medium" | "high"
  relatedTicketId?: string
  actionRequired?: boolean
  attachments?: string[]
}

export default function NotificationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [notificationDetail, setNotificationDetail] = useState<NotificationDetail | null>(null)

  // 模擬通知詳細數據
  const notificationDetails: NotificationDetail[] = [
    {
      id: 1,
      category: "個人通知",
      message: "您的訂票已確認，車票編號：TW20250102001",
      time: "5分鐘前",
      date: "2025/01/02",
      unread: true,
      content: `親愛的旅客您好，

您的訂票已成功確認！

【訂票資訊】
• 車票編號：TW20250102001
• 路線：北環線
• 搭乘日期：2025/01/15
• 搭乘時間：08:30
• 上車地點：馬公港站
• 座位號碼：A05
• 乘客姓名：陳大明
• 票種：全票

【注意事項】
• 請提前30分鐘到達上車地點
• 請攜帶身分證件以備查驗
• 車票不可轉讓他人使用
• 如需改期或退票，請於出發前24小時辦理

【聯絡資訊】
如有任何疑問，請聯繫客服：
客服專線：(06) 927-9789
服務時間：08:00-18:00

祝您旅途愉快！`,
      author: "澎湖好行訂票系統",
      priority: "high",
      relatedTicketId: "TW20250102001",
      actionRequired: false
    },
    {
      id: 2,
      category: "系統通知",
      message: "春節連假訂票系統將於1月15日開放",
      time: "1小時前",
      date: "2025/01/02",
      unread: true,
      content: `📢 重要系統公告 📢

春節連假訂票系統開放時間公告

【開放時間】
• 開放日期：2025年1月15日（週三）
• 開放時間：上午10:00
• 適用期間：2025年2月8日 - 2月17日（春節連假）

【預訂規則】
• 每人每日最多可預訂4張票券
• 需提前7天預訂
• 預訂後需於24小時內完成付款
• 逾期未付款將自動取消訂位

【優惠方案】
• 早鳥優惠：提前14天預訂享9折
• 家庭套票：2大2小享8折優惠
• 長者優惠：65歲以上享7折優惠

【注意事項】
• 春節期間班次可能調整，請留意最新公告
• 建議提前規劃行程，避免向隅
• 系統開放初期可能較為繁忙，請耐心等候

【聯絡資訊】
客服專線：(06) 927-9789
服務時間：08:00-20:00

感謝您的配合！`,
      author: "澎湖好行系統管理部",
      priority: "high",
      actionRequired: false
    },
    {
      id: 3,
      category: "活動通知",
      message: "早鳥優惠：提前30天訂票享8折優惠",
      time: "2天前",
      date: "2024/12/31",
      unread: false,
      content: `🎉 早鳥優惠活動開跑！🎉

提前規劃您的澎湖之旅，享受超值優惠！

【優惠內容】
• 提前30天訂票：享8折優惠
• 提前21天訂票：享85折優惠
• 提前14天訂票：享9折優惠

【適用路線】
• 北環線：原價300元 → 早鳥價240元
• 湖西線：原價300元 → 早鳥價240元
• 澎南線：原價300元 → 早鳥價240元
• 二日券：原價500元 → 早鳥價400元
• 三日券：原價700元 → 早鳥價560元

【活動期間】
• 活動時間：2025年1月1日 - 3月31日
• 適用日期：2025年2月1日 - 6月30日出發
• 限量優惠：每日限量100張

【使用方式】
• 官網預訂：www.penghu-travel.com
• APP預訂：澎湖好行官方APP
• 現場購票：各主要站點

【注意事項】
• 優惠不得與其他活動併用
• 改期需補差價
• 退票按原價計算手續費
• 優惠數量有限，售完為止

立即預訂，享受早鳥優惠！
客服專線：(06) 927-9789`,
      author: "澎湖好行行銷部",
      priority: "medium",
      actionRequired: false
    },
    {
      id: 4,
      category: "個人通知",
      message: "您預訂的北環線行程將於明天出發，請提前30分鐘到達",
      time: "3天前",
      date: "2024/12/30",
      unread: false,
      content: `🚌 行程提醒 🚌

您預訂的北環線行程即將出發！

【行程資訊】
• 路線：北環線
• 出發日期：2024年12月31日（明天）
• 出發時間：08:30
• 上車地點：馬公港站
• 車票編號：TW20241231001
• 座位號碼：B12

【重要提醒】
• 請提前30分鐘到達上車地點
• 請攜帶身分證件以備查驗
• 建議穿著舒適的鞋子
• 可攜帶輕便行李上車

【天氣預報】
• 明日天氣：多雲時晴
• 氣溫：18-24°C
• 建議攜帶薄外套

【景點資訊】
• 通梁古榕：停留30分鐘
• 二崁聚落：停留45分鐘
• 大菓葉玄武岩：停留20分鐘
• 跨海大橋：停留15分鐘

【緊急聯絡】
• 司機聯絡電話：0912-345-678
• 客服專線：(06) 927-9789
• 緊急聯絡：(06) 927-9788

祝您旅途愉快！`,
      author: "澎湖好行客服部",
      priority: "high",
      relatedTicketId: "TW20241231001",
      actionRequired: true
    },
    {
      id: 5,
      category: "個人通知",
      message: "您的退票申請已處理完成，退款將於3-5個工作天內到帳",
      time: "5天前",
      date: "2024/12/28",
      unread: false,
      content: `✅ 退票處理完成通知 ✅

您的退票申請已成功處理！

【退票資訊】
• 原車票編號：TW20241225001
• 退票日期：2024年12月28日
• 退票金額：NT$ 300
• 手續費：NT$ 30
• 實際退款：NT$ 270

【退款方式】
• 退款方式：原付款方式退回
• 到帳時間：3-5個工作天
• 退款狀態：處理中

【退款明細】
• 票券費用：NT$ 300
• 退票手續費：-NT$ 30
• 實際退款金額：NT$ 270

【注意事項】
• 退款將退回至原付款帳戶
• 如使用現金付款，請至原購票地點領取退款
• 如有疑問請聯繫客服

【聯絡資訊】
客服專線：(06) 927-9789
服務時間：08:00-18:00

感謝您的配合！`,
      author: "澎湖好行財務部",
      priority: "medium",
      relatedTicketId: "TW20241225001",
      actionRequired: false
    },
    {
      id: 6,
      category: "系統通知",
      message: "系統維護通知：1月10日凌晨2:00-4:00進行系統維護",
      time: "1週前",
      date: "2024/12/26",
      unread: false,
      content: `🔧 系統維護公告 🔧

為提供更穩定的服務，系統將進行例行維護。

【維護時間】
• 維護日期：2025年1月10日（週五）
• 維護時間：凌晨02:00 - 04:00
• 維護時長：約2小時

【影響範圍】
• 官網訂票系統：暫停服務
• 手機APP：暫停服務
• 現場購票：正常服務
• 客服專線：正常服務

【維護內容】
• 系統效能優化
• 安全性更新
• 資料庫備份
• 新功能部署

【注意事項】
• 維護期間無法進行線上訂票
• 已購票券不受影響
• 維護完成後將自動恢復服務
• 如有緊急需求請聯繫客服

【聯絡資訊】
客服專線：(06) 927-9789
緊急聯絡：(06) 927-9788

感謝您的理解與配合！`,
      author: "澎湖好行技術部",
      priority: "medium",
      actionRequired: false
    },
    {
      id: 7,
      category: "活動通知",
      message: "會員專屬：湖西線套票限時優惠中",
      time: "1週前",
      date: "2024/12/25",
      unread: false,
      content: `🎁 會員專屬優惠 🎁

湖西線套票限時優惠，會員獨享！

【優惠內容】
• 湖西線一日券：原價300元 → 會員價250元
• 湖西線+餐券套票：原價450元 → 會員價350元
• 湖西線+住宿套票：原價1200元 → 會員價1000元

【會員專屬福利】
• 專屬導覽服務
• 優先座位選擇
• 免費行李寄放
• 專屬客服熱線

【活動期間】
• 活動時間：2024年12月25日 - 2025年1月25日
• 適用日期：2025年2月1日 - 4月30日
• 限量優惠：每日限量50組

【使用方式】
• 登入會員帳號
• 選擇湖西線套票
• 結帳時自動套用優惠
• 憑會員卡享受專屬服務

【注意事項】
• 僅限會員使用
• 需提前3天預訂
• 不得與其他優惠併用
• 優惠數量有限

立即預訂，享受會員專屬優惠！
客服專線：(06) 927-9789`,
      author: "澎湖好行會員部",
      priority: "low",
      actionRequired: false
    },
    {
      id: 8,
      category: "個人通知",
      message: "您的澎南線行程已完成，歡迎給予評價",
      time: "2週前",
      date: "2024/12/20",
      unread: false,
      content: `⭐ 行程完成，歡迎評價 ⭐

感謝您選擇澎湖好行！

【行程回顧】
• 路線：澎南線
• 出發日期：2024年12月20日
• 車票編號：TW20241220001
• 座位號碼：C08

【景點回顧】
• 風櫃洞：欣賞海蝕洞奇觀
• 山水沙灘：享受海灘時光
• 鎖港子午塔：了解歷史文化

【評價邀請】
您的寶貴意見將幫助我們提供更好的服務！

【評價方式】
• 官網評價：www.penghu-travel.com
• APP評價：澎湖好行官方APP
• 客服專線：(06) 927-9789

【評價獎勵】
• 完成評價可獲得50點會員積分
• 積分可兌換優惠券
• 每月抽獎活動

【再次感謝】
感謝您選擇澎湖好行，期待下次為您服務！

祝您生活愉快！`,
      author: "澎湖好行客服部",
      priority: "low",
      relatedTicketId: "TW20241220001",
      actionRequired: true
    }
  ]

  useEffect(() => {
    const notification = notificationDetails.find(n => n.id === parseInt(id))
    if (notification) {
      setNotificationDetail(notification)
    } else {
      router.replace("/notifications")
    }
  }, [id, router])

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case "個人通知":
        return User
      case "系統通知":
        return Settings
      case "活動通知":
        return Megaphone
      case "行程提醒":
        return Clock
      default:
        return Bell
    }
  }

  const getCategoryColor = (category: NotificationCategory) => {
    switch (category) {
      case "個人通知":
        return "bg-[rgba(43,138,160,1)]"
      case "系統通知":
        return "bg-[#5C8DD3]"
      case "活動通知":
        return "bg-[#67AF9B]"
      case "行程提醒":
        return "bg-[#F59E0B]"
      default:
        return "bg-[rgba(43,138,160,1)]"
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!notificationDetail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">載入中...</p>
        </div>
      </div>
    )
  }

  const CategoryIcon = getCategoryIcon(notificationDetail.category)

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu title="通知詳情" />

      <main className="max-w-md mx-auto pt-16">
        {/* Back Button */}
        <div className="px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            返回通知列表
          </Button>
        </div>

        {/* Notification Detail Card */}
        <Card className="mx-4 mb-6">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className={`p-2 rounded-lg ${getCategoryColor(notificationDetail.category)}`}>
                <CategoryIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getCategoryColor(notificationDetail.category)} text-white`}>
                    {notificationDetail.category}
                  </Badge>
                  {notificationDetail.priority && (
                    <Badge className={`${getPriorityColor(notificationDetail.priority)} text-white text-xs`}>
                      {notificationDetail.priority === "high" ? "高" : notificationDetail.priority === "medium" ? "中" : "低"}優先級
                    </Badge>
                  )}
                  {notificationDetail.actionRequired && (
                    <Badge className="bg-orange-500 text-white text-xs">
                      需處理
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{notificationDetail.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{notificationDetail.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-lg font-bold text-foreground mb-4 leading-tight">
              {notificationDetail.message}
            </h1>

            {/* Author */}
            {notificationDetail.author && (
              <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>發布單位：{notificationDetail.author}</span>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-sm max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {notificationDetail.content}
              </div>
            </div>

            {/* Related Ticket */}
            {notificationDetail.relatedTicketId && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">相關票券</h3>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">車票編號：</span>
                    <span className="text-sm font-medium text-foreground">{notificationDetail.relatedTicketId}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Attachments */}
            {notificationDetail.attachments && notificationDetail.attachments.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">相關附件</h3>
                <div className="space-y-2">
                  {notificationDetail.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">PDF</span>
                      </div>
                      <span className="text-sm text-foreground">{attachment}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Required */}
            {notificationDetail.actionRequired && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-orange-800">需要您的處理</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    此通知需要您進行相關操作，請儘快處理。
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <MobileNavigation />
    </div>
  )
}
