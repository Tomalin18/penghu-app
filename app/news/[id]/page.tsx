"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Tag } from "lucide-react"

interface NewsDetail {
  id: number
  title: string
  date: string
  category: string
  content: string
  author?: string
  attachments?: string[]
  relatedNews?: number[]
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null)

  // 模擬新聞詳細數據
  const newsDetails: NewsDetail[] = [
    {
      id: 1,
      title: "澎南線體驗活動異動公告",
      date: "2025/09/21",
      category: "latest",
      content: `親愛的旅客您好，

因應天候因素及安全考量，原定於本週末（9/23-9/24）舉辦的澎南線體驗活動將進行以下調整：

【活動異動內容】
• 風櫃洞觀星活動：延後至10/7-10/8舉辦
• 山水沙灘淨灘體驗：改為室內環保講座
• 鎖港子午塔導覽：維持原定時間，但改為室內導覽

【退票與改期】
• 已購票旅客可選擇全額退費或改期參加
• 改期旅客將享有9折優惠
• 退票申請請於9/25前完成

【聯絡資訊】
如有任何疑問，請聯繫客服專線：(06) 927-9789
服務時間：週一至週日 08:00-18:00

感謝您的理解與配合，我們將持續提供優質的旅遊服務。`,
      author: "澎湖好行營運部",
      attachments: ["活動異動通知單.pdf", "退票申請表.pdf"]
    },
    {
      id: 2,
      title: "自由塔（勝國）站調整公告",
      date: "2025/09/21",
      category: "latest",
      content: `各位旅客您好，

為提升服務品質及優化候車環境，自由塔（勝國）站將進行以下調整：

【調整內容】
• 候車亭擴建工程：預計工期2週（9/25-10/8）
• 新增無障礙設施：輪椅坡道及專用候車區
• 增設電子看板：即時顯示班次資訊
• 優化座椅配置：增加候車座位數量

【施工期間注意事項】
• 施工期間將設置臨時候車區
• 班次時間維持正常，不受影響
• 請配合現場工作人員引導
• 如有不便，敬請見諒

【完工後新設施】
• 更寬敞的候車空間
• 更清晰的班次資訊顯示
• 更舒適的候車環境
• 完善的無障礙設施

感謝您的耐心等待，我們將為您提供更好的服務體驗。`,
      author: "澎湖好行工程部"
    },
    {
      id: 3,
      title: "9/14(日)澎南線景點「水產種苗繁殖場」-種植珊瑚體驗暫停一次",
      date: "2025/09/11",
      category: "latest",
      content: `親愛的旅客，

因水產種苗繁殖場進行設備維護作業，原定9/14(日)的種植珊瑚體驗活動將暫停一次。

【暫停詳情】
• 暫停日期：2025年9月14日（週日）
• 暫停活動：種植珊瑚體驗
• 其他景點：正常開放參觀
• 恢復時間：9/21(日)起正常營運

【替代方案】
• 可選擇其他澎南線景點參觀
• 提供室內海洋生態導覽
• 可改期參加下次體驗活動

【已預約旅客】
• 將主動聯繫安排改期或退費
• 改期旅客享有優先預約權
• 退費將於3個工作天內完成

如有任何疑問，請聯繫：
客服專線：(06) 927-9789
服務時間：08:00-18:00

感謝您的理解與配合。`,
      author: "澎湖好行活動部"
    },
    {
      id: 4,
      title: "澎湖好行｜三線大集合 冬季優惠活動",
      date: "2025/09/10",
      category: "latest",
      content: `🎉 澎湖好行冬季優惠活動開跑！🎉

三線大集合，優惠不間斷！即日起至12/31，享受超值優惠價格。

【優惠內容】
• 一日券：原價300元 → 優惠價250元
• 二日券：原價500元 → 優惠價400元  
• 三日券：原價700元 → 優惠價550元
• 家庭套票（2大2小）：原價1000元 → 優惠價800元

【特別優惠】
• 長者票：一律200元（65歲以上）
• 學生票：憑學生證享8折優惠
• 團體票：10人以上享7折優惠
• 早鳥票：提前7天預訂再享9折

【活動期間】
• 活動時間：2025/9/10 - 2025/12/31
• 適用路線：北環線、湖西線、澎南線
• 購票方式：官網、APP、現場購票

【注意事項】
• 優惠不得與其他活動併用
• 團體票需提前3天預訂
• 早鳥票數量有限，售完為止

立即預訂，享受澎湖冬季美景！
客服專線：(06) 927-9789`,
      author: "澎湖好行行銷部"
    },
    {
      id: 5,
      title: "澎湖台灣好行8月13日停駛",
      date: "2025/08/12",
      category: "urgent",
      content: `⚠️ 緊急通知 ⚠️

因颱風警報發布，為確保旅客安全，澎湖台灣好行將於8月13日全面停駛。

【停駛詳情】
• 停駛日期：2025年8月13日（週二）
• 停駛路線：北環線、湖西線、澎南線
• 停駛時間：全天停駛
• 恢復時間：視天氣狀況另行公告

【已購票旅客處理方式】
• 8/13當日票券可全額退費
• 可改期至8/14-8/20期間使用
• 改期票券不另收手續費
• 退費申請請於8/20前完成

【安全提醒】
• 颱風期間請避免外出
• 注意自身安全
• 隨時關注最新天氣資訊

【聯絡資訊】
• 客服專線：(06) 927-9789
• 緊急聯絡：(06) 927-9788
• 服務時間：08:00-20:00

請各位旅客注意安全，我們將盡快恢復正常營運。`,
      author: "澎湖好行安全部"
    },
    {
      id: 6,
      title: "輕鬆暢遊澎湖！由澎湖好行與空港快線聯手推出的台灣好行超值套票來囉！",
      date: "2025/07/27",
      category: "latest",
      content: `🚌✈️ 澎湖好行 × 空港快線 超值套票登場！✈️🚌

讓您的澎湖之旅更加便利！現在購買套票，一次搞定機場接送與景點觀光。

【套票內容】
• 機場往返接送（空港快線）
• 澎湖好行一日券（任選路線）
• 專屬導覽服務
• 景點優惠券

【套票價格】
• 單人套票：原價450元 → 套票價350元
• 雙人套票：原價800元 → 套票價600元
• 家庭套票：原價1200元 → 套票價900元

【使用方式】
• 機場接機：出示套票即可搭乘
• 景點觀光：憑套票搭乘澎湖好行
• 機場送機：回程時使用套票
• 導覽服務：專人陪同解說

【購買地點】
• 澎湖機場服務台
• 澎湖好行官網
• 空港快線櫃台
• 各大飯店櫃台

【注意事項】
• 套票有效期：購買日起30天內
• 需提前1天預約機場接送
• 導覽服務需提前3天預約
• 不得轉讓他人使用

立即購買，享受超值澎湖之旅！
客服專線：(06) 927-9789`,
      author: "澎湖好行合作部"
    },
    {
      id: 7,
      title: "防空演習公告",
      date: "2025/07/16",
      category: "latest",
      content: `📢 防空演習公告 📢

配合澎湖縣政府防空演習，澎湖好行將配合相關管制措施。

【演習時間】
• 演習日期：2025年7月20日（週日）
• 演習時間：14:00-14:30
• 管制期間：13:30-15:00

【影響範圍】
• 北環線：部分路段暫停行駛
• 湖西線：正常行駛
• 澎南線：部分路段暫停行駛

【替代方案】
• 演習期間提供接駁服務
• 調整班次時間避開管制時段
• 提供替代路線建議

【旅客注意事項】
• 演習期間請配合現場人員引導
• 攜帶身分證件以備查驗
• 保持冷靜，聽從指示
• 演習結束後立即恢復正常營運

【聯絡資訊】
• 客服專線：(06) 927-9789
• 緊急聯絡：(06) 927-9788

感謝您的配合，共同維護國防安全。`,
      author: "澎湖好行營運部"
    },
    {
      id: 8,
      title: "澎湖好行服務異動公告",
      date: "2025/07/10",
      category: "important",
      content: `📋 重要服務異動公告 📋

為提供更優質的服務，澎湖好行將進行以下重要調整：

【班次調整】
• 北環線：增加週末班次，每30分鐘一班
• 湖西線：調整首班車時間為07:30
• 澎南線：增加平日班次，每45分鐘一班

【票價調整】
• 一日券：維持300元
• 二日券：調整為500元（原450元）
• 三日券：調整為700元（原600元）
• 長者票：調整為250元（原200元）

【新增服務】
• 無障礙車輛：每線每日2班
• 導覽服務：週末提供免費導覽
• 行李寄放：主要站點提供寄放服務
• 行動支付：支援Apple Pay、Google Pay

【服務時間調整】
• 平日：07:30-18:00
• 週末：07:00-19:00
• 國定假日：07:00-20:00

【注意事項】
• 新票價自8/1起實施
• 已購票券仍按原價使用
• 無障礙車輛需提前預約
• 導覽服務需現場報名

如有疑問，請聯繫客服：(06) 927-9789`,
      author: "澎湖好行管理部"
    }
  ]

  useEffect(() => {
    const news = newsDetails.find(n => n.id === parseInt(id))
    if (news) {
      setNewsDetail(news)
    } else {
      router.replace("/news")
    }
  }, [id, router])

  const getCategoryName = (category: string) => {
    switch (category) {
      case "latest":
        return "最新消息"
      case "important":
        return "重要公告"
      case "urgent":
        return "緊急通知"
      default:
        return "消息"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "latest":
        return "bg-blue-500"
      case "important":
        return "bg-orange-500"
      case "urgent":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!newsDetail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu title="消息詳情" />

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
            返回消息列表
          </Button>
        </div>

        {/* News Detail Card */}
        <Card className="mx-4 mb-6">
          <CardContent className="p-6">
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-4">
              <Badge className={`${getCategoryColor(newsDetail.category)} text-white`}>
                {getCategoryName(newsDetail.category)}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{newsDetail.date}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold text-foreground mb-4 leading-tight">
              {newsDetail.title}
            </h1>

            {/* Author */}
            {newsDetail.author && (
              <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>發布單位：{newsDetail.author}</span>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-sm max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {newsDetail.content}
              </div>
            </div>

            {/* Attachments */}
            {newsDetail.attachments && newsDetail.attachments.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">相關附件</h3>
                <div className="space-y-2">
                  {newsDetail.attachments.map((attachment, index) => (
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
          </CardContent>
        </Card>
      </main>

      <MobileNavigation />
    </div>
  )
}
