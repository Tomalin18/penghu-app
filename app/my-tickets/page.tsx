"use client"

import { MapPin, QrCode, Star, Accessibility } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
import { useState, useEffect, useCallback } from "react"
import { getTickets, updateTicket, type StoredTicket } from "@/lib/ticket-storage"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function MyTicketsPage() {
  const router = useRouter()
  const [selectedTicket, setSelectedTicket] = useState<StoredTicket | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isTicketInfoDialogOpen, setIsTicketInfoDialogOpen] = useState(false)
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [ticketToCancel, setTicketToCancel] = useState<StoredTicket | null>(null)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)
  const [ratings, setRatings] = useState({
    booking: 0,
    transportation: 0,
    sightseeing: 0,
    food: 0,
    overall: 0,
  })
  const [comment, setComment] = useState("")
  const [tickets, setTickets] = useState<StoredTicket[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadedTickets = getTickets()

    // Sample tickets with different statuses
    const sampleTickets: StoredTicket[] = [
      // 已劃位 (Seat Assigned) - future date
      {
        id: "TK251015",
        name: "媽宮・西湖線 一日券",
        routeName: "西湖線",
        date: "2025/10/15",
        quantity: 1,
        totalAmount: 300,
        status: "purchased",
        seatAssigned: true,
        seatNumber: "B05",
        purchaseDate: "2025/10/1",
        validUntil: "2025/11/1",
        type: "一日券",
        breakdown: {
          adult: {
            label: "全票（非澎湖籍）",
            count: 1,
            price: 300,
            subtotal: 300,
          },
        },
        selectedDates: [
          {
            routeId: "xihu",
            routeName: "西湖線",
            date: "2025/10/15",
          },
        ],
        passengers: [
          {
            ticketType: "adult",
            name: "陳大明",
            email: "chen@example.com",
            phone: "0934567890",
            id: "B234567890",
            needsAccessibility: "yes",
            pickupLocations: { xihu: "magong-port" },
          },
        ],
      },
      // 已劃位 (Seat Assigned) - future date
      {
        id: "TK250915",
        name: "媽宮・北環線 一日券",
        routeName: "北環線",
        date: "2026/10/10",
        quantity: 2,
        totalAmount: 600,
        status: "purchased",
        seatAssigned: true,
        seatNumber: "A12, A13",
        purchaseDate: "2025/9/10",
        validUntil: "2025/12/10",
        type: "一日券",
        breakdown: {
          adult: {
            label: "全票（非澎湖籍）",
            count: 2,
            price: 300,
            subtotal: 600,
          },
        },
        selectedDates: [
          {
            routeId: "north",
            routeName: "北環線",
            date: "2026/10/10",
          },
        ],
        passengers: [
          {
            ticketType: "adult",
            name: "王小明",
            email: "wang@example.com",
            phone: "0912345678",
            id: "A123456789",
            needsAccessibility: "no",
            pickupLocations: { north: "xiweidong-0828" },
          },
          {
            ticketType: "adult",
            name: "李小華",
            email: "lee@example.com",
            phone: "0923456789",
            needsAccessibility: "no",
            pickupLocations: { north: "xiweidong-0828" },
          },
        ],
      },
      // 已搭乘 (Completed) - past date
      {
        id: "TK250920",
        name: "媽宮・湖西線 一日券",
        routeName: "湖西線",
        date: "2025/9/20",
        quantity: 1,
        totalAmount: 300,
        status: "purchased",
        seatAssigned: true,
        seatNumber: "B08",
        purchaseDate: "2025/9/15",
        validUntil: "2025/12/15",
        type: "一日券",
        breakdown: {
          adult: {
            label: "全票（非澎湖籍）",
            count: 1,
            price: 300,
            subtotal: 300,
          },
        },
        selectedDates: [
          {
            routeId: "xihu",
            routeName: "湖西線",
            date: "2025/9/20",
          },
        ],
        passengers: [
          {
            ticketType: "adult",
            name: "陳小美",
            email: "chen@example.com",
            phone: "0934567890",
            id: "B234567890",
            needsAccessibility: "no",
            pickupLocations: { xihu: "magonggang-0830" },
          },
        ],
      },
      // 已取消 (Cancelled)
      {
        id: "TK251010",
        name: "媽宮・南環線 一日券",
        routeName: "南環線",
        date: "2025/10/10",
        quantity: 3,
        totalAmount: 900,
        status: "cancelled",
        seatAssigned: true,
        seatNumber: "C10, C11, C12",
        purchaseDate: "2025/9/25",
        validUntil: "2025/12/25",
        type: "一日券",
        breakdown: {
          adult: {
            label: "全票（非澎湖籍）",
            count: 3,
            price: 300,
            subtotal: 900,
          },
        },
        selectedDates: [
          {
            routeId: "south",
            routeName: "南環線",
            date: "2025/10/10",
          },
        ],
        passengers: [
          {
            ticketType: "adult",
            name: "林小美",
            email: "lin@example.com",
            phone: "0945678901",
            id: "C345678901",
            needsAccessibility: "no",
            pickupLocations: { south: "magong-port" },
          },
          {
            ticketType: "adult",
            name: "張小強",
            email: "zhang@example.com",
            phone: "0956789012",
            needsAccessibility: "no",
            pickupLocations: { south: "magong-port" },
          },
          {
            ticketType: "adult",
            name: "劉小芳",
            email: "liu@example.com",
            phone: "0967890123",
            needsAccessibility: "no",
            pickupLocations: { south: "magong-port" },
          },
        ],
      },
    ]

    const existingSampleIds = sampleTickets.map((t) => t.id)
    const filteredLoadedTickets = loadedTickets.filter((t) => !existingSampleIds.includes(t.id))

    const allTickets = [...sampleTickets, ...filteredLoadedTickets]

    // Only show tickets with assigned seats
    const assignedTickets = allTickets.filter((ticket) => ticket.seatAssigned === true)

    // Sort tickets: future dates first (ascending), then past dates (descending)
    const sortedTickets = assignedTickets.sort((a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      const now = new Date()

      const aIsPast = aDate < now
      const bIsPast = bDate < now

      if (!aIsPast && bIsPast) return -1
      if (aIsPast && !bIsPast) return 1

      if (!aIsPast && !bIsPast) {
        return aDate.getTime() - bDate.getTime()
      } else {
        return bDate.getTime() - aDate.getTime()
      }
    })

    setTickets(sortedTickets)
    setIsLoading(false)
  }, [])

  const handleCancelTicket = () => {
    if (!ticketToCancel) return

    // Update the ticket in local state
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketToCancel.id ? { ...ticket, status: "cancelled" as const } : ticket,
      ),
    )

    // Also update in localStorage if it exists there
    const updatedTicket = { ...ticketToCancel, status: "cancelled" as const }
    updateTicket(ticketToCancel.id, { status: "cancelled" })

    setIsCancelDialogOpen(false)
    setTicketToCancel(null)
  }

  const handleEditTicket = (ticket: StoredTicket) => {
    router.push(`/my-tickets/edit/${ticket.id}`)
  }

  const handleQRCodeClick = (ticket: StoredTicket) => {
    setSelectedTicket(ticket)
    setIsDialogOpen(true)
  }

  const handleViewTicketInfo = (ticket: StoredTicket) => {
    setSelectedTicket(ticket)
    setIsTicketInfoDialogOpen(true)
  }

  const handleRatingClick = (ticket: StoredTicket) => {
    setSelectedTicket(ticket)
    setIsRatingDialogOpen(true)
    setRatingSubmitted(false)
    setRatings({
      booking: 0,
      transportation: 0,
      sightseeing: 0,
      food: 0,
      overall: 0,
    })
    setComment("")
  }

  const handleStarClick = useCallback((category: keyof typeof ratings, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }))
  }, [])

  const handleRatingSubmit = () => {
    setRatingSubmitted(true)
    setTimeout(() => {
      setIsRatingDialogOpen(false)
      setRatingSubmitted(false)
    }, 2000)
  }

  const isRatingComplete = Object.values(ratings).every((rating) => rating > 0)

  const StarRating = useCallback(
    ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onChange(star)
            }}
            className="focus:outline-none transition-colors"
          >
            <Star className={`h-6 w-6 ${star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    ),
    [],
  )

  const RatingDialog = useCallback(
    () => (
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">為此行程評分</DialogTitle>
          </DialogHeader>
          {ratingSubmitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600 fill-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">感謝您的評分！</h3>
              <p className="text-muted-foreground text-sm">您的寶貴意見將幫助我們提供更好的服務</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {selectedTicket?.name} • {selectedTicket?.date}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">訂票流程</Label>
                  <StarRating value={ratings.booking} onChange={(v) => handleStarClick("booking", v)} />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">交通服務</Label>
                  <StarRating value={ratings.transportation} onChange={(v) => handleStarClick("transportation", v)} />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">景點遊覽</Label>
                  <StarRating value={ratings.sightseeing} onChange={(v) => handleStarClick("sightseeing", v)} />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">美食體驗</Label>
                  <StarRating value={ratings.food} onChange={(v) => handleStarClick("food", v)} />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">整體滿意度</Label>
                  <StarRating value={ratings.overall} onChange={(v) => handleStarClick("overall", v)} />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">建議（選填）</Label>
                  <Textarea
                    placeholder="請分享您的旅遊心得或建議..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleRatingSubmit}
                disabled={!isRatingComplete}
              >
                送出評分
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    ),
    [
      isRatingDialogOpen,
      ratingSubmitted,
      selectedTicket,
      ratings,
      comment,
      isRatingComplete,
      StarRating,
      handleStarClick,
    ],
  )

  const QRCodeDisplay = ({ ticket }: { ticket: StoredTicket }) => (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded">
          <div className="text-center">
            <QrCode className="h-16 w-16 mx-auto mb-2 text-gray-400" />
            <div className="text-xs text-gray-500">QR Code</div>
            <div className="text-xs text-gray-400 mt-1">{ticket.id}</div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-foreground text-sm mb-1">{ticket.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {ticket.routeName} • {ticket.date}
        </p>
        <p className="text-xs text-muted-foreground">
          數量: {ticket.quantity} 張 • NT${ticket.totalAmount}
        </p>
      </div>
    </div>
  )

  const TicketInfoDisplay = ({ ticket, showQRCode = true }: { ticket: StoredTicket; showQRCode?: boolean }) => (
    <div className="space-y-2">
      {showQRCode && (
        <div className="flex flex-col items-center pb-2 border-b border-border">
          <div className="bg-white p-2 rounded-lg border-2 border-gray-200">
            <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded">
              <div className="text-center">
                <QrCode className="h-10 w-10 mx-auto mb-1 text-gray-400" />
                <div className="text-xs text-gray-500">QR Code</div>
                <div className="text-xs text-gray-400 mt-1 truncate max-w-[120px]">{ticket.id}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-muted/50 p-2 rounded-lg">
        <h3 className="font-semibold text-foreground mb-1 text-sm">{ticket.name}</h3>
        <div className="space-y-0.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">路線</span>
            <span className="font-medium">{ticket.routeName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">日期</span>
            <span className="font-medium">{ticket.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">票券類型</span>
            <span className="font-medium">{ticket.type}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="font-semibold text-xs text-foreground">票券明細</h4>
        <div className="bg-muted/50 p-2 rounded-lg space-y-1">
          {ticket.breakdown &&
            Object.entries(ticket.breakdown).map(([key, detail]) => (
              <div key={key} className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  {detail.label} x {detail.count}
                </span>
                <span className="font-medium">NT${detail.subtotal}</span>
              </div>
            ))}
          <div className="pt-1 border-t border-border flex justify-between font-semibold text-xs">
            <span>總計</span>
            <span className="text-primary">NT${ticket.totalAmount}</span>
          </div>
        </div>
      </div>

      {ticket.passengers && ticket.passengers.length > 0 && (
        <div className="space-y-1">
          <h4 className="font-semibold text-xs text-foreground">乘客資訊</h4>
          <div className="bg-muted/50 p-2 rounded-lg space-y-1">
            {ticket.passengers.map((passenger, index) => (
              <div key={index} className="pb-1 border-b border-border last:border-b-0 last:pb-0">
                <div className="font-medium text-xs mb-1">
                  {ticket.passengers && ticket.passengers.length > 1 ? `乘客 ${index + 1}` : "乘客資訊"}
                </div>
                <div className="space-y-0.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">姓名</span>
                    <span className="font-medium">{passenger.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">電話</span>
                    <span className="font-medium">{passenger.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-xs">{passenger.email}</span>
                  </div>
                  {passenger.id && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">證件號碼</span>
                      <span className="font-medium">{passenger.id}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1">
        <h4 className="font-semibold text-xs text-foreground">購票資訊</h4>
        <div className="bg-muted/50 p-2 rounded-lg space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">票券編號</span>
            <span className="font-mono text-xs">{ticket.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">購買日期</span>
            <span className="font-medium">{ticket.purchaseDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">有效期限</span>
            <span className="font-medium">{ticket.validUntil}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">數量</span>
            <span className="font-medium">{ticket.quantity} 張</span>
          </div>
        </div>
      </div>
    </div>
  )

  const getTicketStatus = (ticket: StoredTicket) => {
    const ticketDate = new Date(ticket.date)
    const validUntilDate = new Date(ticket.validUntil)
    const now = new Date()

    if (ticket.status === "cancelled") {
      return { label: "已取消", variant: "destructive" as const }
    }

    if (validUntilDate < now) {
      return { label: "已失效", variant: "secondary" as const }
    }

    if (ticketDate < now) {
      return { label: "已搭乘", variant: "secondary" as const }
    }

    return { label: "已劃位", variant: "default" as const }
  }

  const TicketCard = ({ ticket }: { ticket: StoredTicket }) => {
    const isPastTicket = new Date(ticket.date) < new Date()
    const status = getTicketStatus(ticket)
    const canEdit =
      ticket.seatAssigned && !isPastTicket && ticket.status !== "cancelled" && new Date(ticket.validUntil) >= new Date()

    const needsLowFloorBus = ticket.passengers?.some((p) => p.needsAccessibility === "yes")

    return (
      <Card className="shadow-sm border-l-4 border-l-primary">
        <CardContent className="px-3 py-1">
          <div className="flex justify-between items-start mb-1">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm mb-1">{ticket.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                {ticket.routeName} • {ticket.date}
              </div>
              {needsLowFloorBus && (
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    <Accessibility className="h-3 w-3 mr-1" />
                    低地板公車
                  </Badge>
                </div>
              )}
            </div>
            <div className="flex flex-col items-end">
              <Badge variant={status.variant} className="text-xs">
                {status.label}
              </Badge>
            </div>
          </div>

          <div className="flex justify-between items-center mb-1 pl-4 pr-1">
            <div className="text-xs text-muted-foreground">
              <div>數量: {ticket.quantity} 張</div>
              <div>金額: NT${ticket.totalAmount}</div>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              <div>購買: {ticket.purchaseDate}</div>
              <div>有效至: {ticket.validUntil}</div>
            </div>
          </div>

          <div className="flex gap-2">
            {status.label === "已取消" ? (
              // 已取消：車票詳情（不顯示QR碼）
              <Dialog open={isTicketInfoDialogOpen} onOpenChange={setIsTicketInfoDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full h-8 text-xs bg-transparent"
                    onClick={() => handleViewTicketInfo(ticket)}
                  >
                    車票詳情
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-center">車票詳情</DialogTitle>
                  </DialogHeader>
                  {selectedTicket && <TicketInfoDisplay ticket={selectedTicket} showQRCode={false} />}
                </DialogContent>
              </Dialog>
            ) : status.label === "已劃位" ? (
              // 已劃位：票券QR碼、修改、取消
              <>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8 text-xs bg-transparent"
                      onClick={() => handleQRCodeClick(ticket)}
                    >
                      <QrCode className="h-3 w-3 mr-1" />
                      票券QR碼
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-center">票券資訊</DialogTitle>
                    </DialogHeader>
                    {selectedTicket && <TicketInfoDisplay ticket={selectedTicket} showQRCode={true} />}
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8 text-xs bg-transparent"
                  onClick={() => handleEditTicket(ticket)}
                >
                  修改
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8 text-xs bg-transparent text-destructive hover:text-destructive"
                  onClick={() => {
                    setTicketToCancel(ticket)
                    setIsCancelDialogOpen(true)
                  }}
                >
                  取消
                </Button>
              </>
            ) : status.label === "已搭乘" ? (
              // 已搭乘：車票詳情（不顯示QR碼）、為此行程評分
              <>
                <Dialog open={isTicketInfoDialogOpen} onOpenChange={setIsTicketInfoDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8 text-xs bg-transparent"
                      onClick={() => handleViewTicketInfo(ticket)}
                    >
                      車票詳情
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-center">車票詳情</DialogTitle>
                    </DialogHeader>
                    {selectedTicket && <TicketInfoDisplay ticket={selectedTicket} showQRCode={false} />}
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8 text-xs bg-accent"
                  onClick={() => handleRatingClick(ticket)}
                >
                  <Star className="h-3 w-3 mr-1" />
                  為此行程評分
                </Button>
              </>
            ) : (
              // 其他狀態（如已失效）
              <Dialog open={isTicketInfoDialogOpen} onOpenChange={setIsTicketInfoDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full h-8 text-xs bg-transparent"
                    onClick={() => handleViewTicketInfo(ticket)}
                  >
                    車票詳情
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-center">車票詳情</DialogTitle>
                  </DialogHeader>
                  {selectedTicket && <TicketInfoDisplay ticket={selectedTicket} showQRCode={false} />}
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
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
      <HeaderWithMenu title="我的車票" />

      <main className="px-4 pb-20 pt-16 max-w-md mx-auto">
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">尚無車票</h3>
            <p className="text-muted-foreground text-sm mb-6">購買票券後，您的車票將顯示在這裡</p>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => router.push("/purchase/tickets")}
            >
              立即購票
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <Button
                size="lg"
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                onClick={() => router.push("/purchase/tickets")}
              >
                購買更多票券
              </Button>
            </div>
          </>
        )}
      </main>

      {RatingDialog()}

      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認取消劃位</AlertDialogTitle>
            <AlertDialogDescription>
              您確定要取消此票券的劃位嗎？取消後將無法恢復，但票券仍可在有效期限內重新劃位。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>返回</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelTicket} className="bg-destructive hover:bg-destructive/90">
              確認取消
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <MobileNavigation activeTab="my-tickets" />
    </div>
  )
}
