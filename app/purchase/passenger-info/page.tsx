"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MobileNavigation } from "@/components/mobile-navigation"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Minus, Plus, ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

const PassengerInfoPage = () => {
  const [selectedDates, setSelectedDates] = useState<Record<string, Date | undefined>>({})
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [dateSelectionCollapsed, setDateSelectionCollapsed] = useState(false)

  const [ticketQuantities, setTicketQuantities] = useState({
    adult: 0,
    discount: 0,
    senior: 0,
    love: 0,
    child: 0,
  })
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [pickupLocations, setPickupLocations] = useState<Record<string, Record<string, string>>>({})
  const [formData, setFormData] = useState<
    Array<{
      ticketType: string
      name: string
      email: string
      phone: string
      countryCode: string
      id: string
      needsAccessibility: string
      sameAsPassenger1: boolean
    }>
  >([])
  const [termsAccepted, setTermsAccepted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialMount = useRef(true)

  const ticketId = searchParams.get("ticketId") || ""

  const getTicketRoutes = (ticketId: string): string[] => {
    if (ticketId.includes("north-xihu")) {
      return ["north", "xihu"]
    } else if (ticketId.includes("north-south")) {
      return ["north", "south"]
    } else if (ticketId.includes("xihu-south")) {
      return ["xihu", "south"]
    } else if (ticketId.includes("penghu-3")) {
      return ["north", "xihu", "south"]
    } else if (ticketId.includes("north") || ticketId === "magong-north-1" || ticketId === "north-airport-combo") {
      return ["north"]
    } else if (ticketId.includes("xihu") || ticketId === "magong-xihu-1" || ticketId === "xihu-airport-combo") {
      return ["xihu"]
    } else if (ticketId.includes("south") || ticketId === "magong-south-1" || ticketId === "south-airport-combo") {
      return ["south"]
    }
    return ["north"] // fallback
  }

  const ticketRoutes = getTicketRoutes(ticketId)

  const getTicketInfo = (ticketId: string) => {
    const ticketData: Record<string, any> = {
      "magong-north-1": {
        name: "媽宮・北環線 一日券",
        price: "NT$ 150~300",
        type: "一日券",
        image: "/images/ticket-north-ring-premium.png",
      },
      "magong-xihu-1": {
        name: "媽宮・湖西線 一日券",
        price: "NT$ 125~250",
        type: "一日券",
        image: "/images/ticket-xihu.png",
      },
      "magong-south-1": {
        name: "媽宮・澎南線 一日券",
        price: "NT$ 100~200",
        type: "一日券",
        image: "/images/ticket-south-premium.png",
      },
      "north-xihu-2": {
        name: "台灣好行 二日券 北環・湖西線",
        price: "NT$ 250~500",
        type: "二日券",
        image: "/images/ticket-north-xihu-2day.png",
      },
      "north-south-2": {
        name: "台灣好行 二日券 北環・澎南線",
        price: "NT$ 225~450",
        type: "二日券",
        image: "/images/ticket-north-south-2day.png",
      },
      "xihu-south-2": {
        name: "台灣好行 二日券 湖西・澎南線",
        price: "NT$ 200~400",
        type: "二日券",
        image: "/images/ticket-xihu-south-2day.png",
      },
      "penghu-3-600": {
        name: "台灣好行 三日券 北環・湖西・澎南線",
        price: "NT$ 600~1200",
        type: "三日券",
        image: "/images/ticket-3day-600.png",
      },
      "penghu-3-300": {
        name: "台灣好行 三日券 北環・湖西・澎南線",
        price: "NT$ 300~600",
        type: "三日券",
        image: "/images/ticket-3day-300.png",
      },
      "north-airport-combo": {
        name: "媽宮・暢遊北環線一日券+空港快線",
        price: "NT$ 300~600",
        type: "其他票券",
        image: "/images/ticket-magong-north-300.png",
      },
      "xihu-airport-combo": {
        name: "媽宮・湖西慢旅趣一日券+空港快線",
        price: "NT$ 250~500",
        type: "其他票券",
        image: "/images/ticket-magong-xihu-250.png",
      },
      "south-airport-combo": {
        name: "媽宮・澎南輕旅行一日券+空港快線",
        price: "NT$ 200~400",
        type: "其他票券",
        image: "/images/ticket-magong-south-200.png",
      },
    }

    return (
      ticketData[ticketId] || {
        name: "媽宮・北環線 一日券",
        price: "NT$ 150~300",
        type: "一日券",
        image: "/images/ticket-north-ring-premium.png",
      }
    )
  }

  const selectedTicket = getTicketInfo(ticketId)

  const getInitialTicketQuantities = () => {
    return {
      adult: Number.parseInt(searchParams.get("adult") || "0"),
      discount: Number.parseInt(searchParams.get("discount") || "0"),
      senior: Number.parseInt(searchParams.get("senior") || "0"),
      love: Number.parseInt(searchParams.get("love") || "0"),
      child: Number.parseInt(searchParams.get("child") || "0"),
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      const quantities = getInitialTicketQuantities()
      setTicketQuantities(quantities)

      const totalCount = Object.values(quantities).reduce((sum, count) => sum + count, 0)
      if (totalCount > 0) {
        initializeFormData(quantities, totalCount)
      }

      isInitialMount.current = false
    }
  }, []) // Remove searchParams from dependencies to prevent infinite loop

  const initializeFormData = (quantities: typeof ticketQuantities, totalCount: number) => {
    const initialData: typeof formData = []
    const initialLocations: Record<string, Record<string, string>> = {}

    let passengerIndex = 0

    // Create form entries for each ticket type
    Object.entries(quantities).forEach(([ticketType, count]) => {
      for (let i = 0; i < count; i++) {
        initialData.push({
          ticketType,
          name: "",
          email: "",
          phone: "",
          countryCode: "+886",
          id: "",
          needsAccessibility: "no",
          sameAsPassenger1: false,
        })

        initialLocations[passengerIndex.toString()] = {}
        ticketRoutes.forEach((routeId) => {
          initialLocations[passengerIndex.toString()][routeId] = ""
        })

        passengerIndex++
      }
    })

    setFormData(initialData)
    setPickupLocations(initialLocations)
  }

  const passengerCount = Object.values(ticketQuantities).reduce((sum, count) => sum + count, 0)

  const handleTicketQuantityChange = (type: keyof typeof ticketQuantities, delta: number) => {
    setTicketQuantities((prev) => {
      const newValue = Math.max(0, Math.min(26, prev[type] + delta))
      return { ...prev, [type]: newValue }
    })
  }

  const handleDrawerComplete = () => {
    const totalCount = Object.values(ticketQuantities).reduce((sum, count) => sum + count, 0)

    if (totalCount > 0) {
      initializeFormData(ticketQuantities, totalCount)
    }

    setDrawerOpen(false)
  }

  const getTicketSummary = () => {
    const ticketLabels = {
      adult: "全票",
      discount: "澎湖籍",
      senior: "長者",
      love: "愛心",
      child: "兒童",
    }

    return Object.entries(ticketQuantities)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => `${ticketLabels[type as keyof typeof ticketLabels]}*${count}`)
      .join(", ")
  }

  const routes = [
    {
      id: "north",
      name: "北環線",
      color: "bg-[#6FA650]",
      primaryColor: "#6FA650",
      secondaryColor: "#EAF4EE",
      alertColor: "#598348",
    },
    {
      id: "south",
      name: "澎南線",
      color: "bg-[#D96B3E]",
      primaryColor: "#D96B3E",
      secondaryColor: "#FFFBE4",
      alertColor: "#C66239",
    },
    {
      id: "xihu",
      name: "湖西線",
      color: "bg-[#63A0B5]",
      primaryColor: "#63A0B5",
      secondaryColor: "#E8F5FC",
      alertColor: "#3D8098",
    },
  ]

  const getRouteStations = (routeId: string) => {
    const stationsByRoute = {
      north: [
        { value: "", label: "請選擇上車地點" },
        { value: "xiweidong-0828", label: "08:28 西衛東站" },
        { value: "magonggang-0836", label: "08:36 馬公港站" },
        { value: "gongchezong-0840", label: "08:40 公車總站" },
        { value: "ziyouta-0845", label: "08:45 自由塔（勝國）站" },
        { value: "disanyu-0849", label: "08:49 第三漁港（雅霖）站" },
        { value: "wenao-0855", label: "08:55 文澳（元泰.百世多麗）站" },
        { value: "dongwei-0907", label: "09:07 東衛站" },
        { value: "kuahaidaqiao-0930", label: "09:30 跨海大橋（西嶼端）" },
        { value: "sanxianta-1005", label: "10:05 三仙塔" },
        { value: "dacaiye-1035", label: "10:35 大菓葉玄武岩柱" },
        { value: "erkanjuluo-1100", label: "11:00 二崁聚落" },
        { value: "tongliangguta-1150", label: "11:50 通梁古榕" },
      ],
      xihu: [
        { value: "", label: "請選擇上車地點" },
        { value: "magonggang-0830", label: "08:30 馬公港站" },
        { value: "gongchezong-0834", label: "08:34 公車總站" },
        { value: "ziyouta-0839", label: "08:39 自由塔（勝國）站" },
        { value: "disanyu-0843", label: "08:43 第三漁港（雅霖）站" },
        { value: "wenao-0847", label: "08:47 文澳（元泰.百世多麗）站" },
        { value: "airport-0900", label: "09:00 澎湖機場站" },
        { value: "beiliao-0910", label: "09:10 北寮奎壁山" },
        { value: "nanliao-0950", label: "09:50 南寮社區" },
        { value: "longmen-1035", label: "10:35 龍門閉鎖陣地" },
        { value: "museum-1135", label: "11:35 澎湖生活博物館" },
      ],
      south: [
        { value: "", label: "請選擇上車地點" },
        { value: "magonggang-0828", label: "08:28 馬公港站" },
        { value: "gongchezong-0832", label: "08:32 公車總站" },
        { value: "ziyouta-0836", label: "08:36 自由塔（勝國）站" },
        { value: "disanyu-0840", label: "08:40 第三漁港（雅霖）站" },
        { value: "wenao-0844", label: "08:44 文澳（元泰.百世多麗）站" },
        { value: "fengkui-0905", label: "09:05 風櫃洞" },
        { value: "fishery-0945", label: "09:45 澎湖縣水產種苗繁殖場" },
        { value: "shanshui-1050", label: "10:50 山水沙灘" },
        { value: "suogang-1130", label: "11:30 鎖港子午塔" },
      ],
    }
    return stationsByRoute[routeId as keyof typeof stationsByRoute] || []
  }

  const getTicketAvailability = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]

    const generateRandomCount = () => Math.floor(Math.random() * 27) // 0-26

    // Use date string as seed for consistent random numbers per date
    const seed = dateStr.split("-").reduce((acc, val) => acc + Number.parseInt(val), 0)
    const seededRandom = (seed * 9301 + 49297) % 233280
    const count = Math.floor((seededRandom / 233280) * 27) // 0-26

    let status: "available" | "limited" | "soldout"
    if (count === 0) {
      status = "soldout"
    } else if (count < 5) {
      status = "limited"
    } else {
      status = "available"
    }

    return { status, count }
  }

  const CustomCalendar = ({ routeId, routeInfo }: { routeId: string; routeInfo: any }) => {
    const today = new Date()
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const calendarDays = []

    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(year, month, day))
    }

    const monthNames = [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ]

    const dayNames = ["日", "一", "二", "三", "四", "五", "六"]

    const goToPreviousMonth = () => {
      setCurrentMonth(new Date(year, month - 1, 1))
    }

    const goToNextMonth = () => {
      setCurrentMonth(new Date(year, month + 1, 1))
    }

    const handleDateClick = (date: Date) => {
      const availability = getTicketAvailability(date)
      const isPastDate = date < today

      if (!isPastDate && availability.status !== "soldout") {
        setSelectedDates((prev) => ({
          ...prev,
          [routeId]: date,
        }))
      }
    }

    const isDateSelected = (date: Date) => {
      const selectedDate = selectedDates[routeId]
      return (
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      )
    }

    return (
      <div className="w-full">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: routeInfo?.primaryColor }} />
          <h4 className="font-medium text-foreground">{routeInfo?.name}</h4>
          <span className="text-xs text-muted-foreground">選擇使用日期</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold text-lg">
            {monthNames[month]} {year}
          </h3>
          <Button variant="ghost" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((dayName) => (
            <div key={dayName} className="text-center text-sm font-medium text-muted-foreground py-2">
              {dayName}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={index} className="h-16"></div>
            }

            const availability = getTicketAvailability(date)
            const isPastDate = date < today
            const isSoldOut = availability.status === "soldout"
            const isSelected = isDateSelected(date)
            const isToday = date.toDateString() === today.toDateString()

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={isPastDate || isSoldOut}
                className={`
                  h-16 border rounded-lg flex flex-col items-center justify-center p-1 transition-colors
                  ${
                    isSelected
                      ? `border-2 text-white`
                      : isToday
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-background border-border hover:bg-muted"
                  }
                  ${isPastDate || isSoldOut ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
                style={
                  isSelected
                    ? {
                        backgroundColor: routeInfo.primaryColor,
                        borderColor: routeInfo.primaryColor,
                      }
                    : {}
                }
              >
                <span className={`text-sm font-medium ${isSelected ? "text-white" : ""}`}>{date.getDate()}</span>

                <div className="mt-1">
                  {isSoldOut ? (
                    <span className="text-xs font-medium text-red-600 bg-red-100 py-0.5 rounded px-0">售完</span>
                  ) : (
                    <span
                      className={`text-xs font-bold py-0.5 rounded px-0 ${
                        availability.count < 5
                          ? "text-red-700 bg-red-100"
                          : availability.count <= 10
                            ? "text-yellow-700 bg-yellow-100"
                            : "text-green-700 bg-green-100"
                      } ${isSelected ? "bg-white/20 text-white" : ""}`}
                    >
                      {availability.count}位
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const handleInputChange = (passengerIndex: number, field: string, value: string | boolean) => {
    setFormData((prev) => {
      const newData = [...prev]
      newData[passengerIndex] = { ...newData[passengerIndex], [field]: value }
      return newData
    })
  }

  const handleSameAsPassenger1 = (index: number, checked: boolean) => {
    setFormData((prev) => {
      const newData = [...prev]
      newData[index] = {
        ...newData[index],
        sameAsPassenger1: checked,
        ...(checked && prev[0]
          ? {
              name: prev[0].name,
              email: prev[0].email,
              phone: prev[0].phone,
              countryCode: prev[0].countryCode,
              id: prev[0].id,
              needsAccessibility: prev[0].needsAccessibility,
            }
          : {}),
      }
      return newData
    })

    if (checked && pickupLocations["0"]) {
      setPickupLocations((prev) => {
        const newLocations = { ...prev }
        newLocations[index.toString()] = { ...prev["0"] }
        return newLocations
      })
    }
  }

  const handlePickupLocationChange = (passengerIndex: number, routeId: string, value: string) => {
    setPickupLocations((prev) => {
      const newLocations = { ...prev }
      if (!newLocations[passengerIndex.toString()]) {
        newLocations[passengerIndex.toString()] = {}
      }
      newLocations[passengerIndex.toString()][routeId] = value
      return newLocations
    })
  }

  const isFormValid = () => {
    if (passengerCount === 0) return false

    const allDatesSelected = ticketRoutes.every((routeId) => selectedDates[routeId])

    const allPickupLocationsFilled = Array.from({ length: passengerCount }, (_, i) => i).every((passengerIndex) =>
      ticketRoutes.every(
        (routeId) =>
          pickupLocations[passengerIndex.toString()]?.[routeId] &&
          pickupLocations[passengerIndex.toString()][routeId] !== "",
      ),
    )

    const allPassengerDataFilled = formData.every(
      (passenger) => passenger.ticketType && passenger.name && passenger.phone,
    )

    return allDatesSelected && allPickupLocationsFilled && allPassengerDataFilled && termsAccepted
  }

  const handleNext = () => {
    if (isFormValid()) {
      const ticketBreakdown = formData.reduce(
        (acc, passenger) => {
          const ticketPrice = passenger.ticketType === "adult" ? pricing.adultPrice : pricing.otherPrice
          const ticketTypeLabel =
            ticketTypeOptions.find((option) => option.value === passenger.ticketType)?.label || "未知票種"

          if (acc[passenger.ticketType]) {
            acc[passenger.ticketType].count += 1
            acc[passenger.ticketType].subtotal += ticketPrice
          } else {
            acc[passenger.ticketType] = {
              label: ticketTypeLabel,
              count: 1,
              price: ticketPrice,
              subtotal: ticketPrice,
            }
          }
          return acc
        },
        {} as Record<string, { label: string; count: number; price: number; subtotal: number }>,
      )

      const totalAmount = Object.values(ticketBreakdown).reduce((sum, item) => sum + item.subtotal, 0)

      const passengers = formData.map((passenger, index) => ({
        ticketType: passenger.ticketType,
        name: passenger.name,
        email: passenger.email,
        phone: passenger.phone,
        countryCode: passenger.countryCode,
        id: passenger.id,
        needsAccessibility: passenger.needsAccessibility,
        pickupLocations: pickupLocations[index.toString()] || {},
      }))

      const orderData = {
        ticketName: selectedTicket.name,
        ticketType: selectedTicket.type,
        passengerCount,
        totalAmount,
        ticketBreakdown,
        selectedDates: Object.entries(selectedDates).map(([routeId, date]) => ({
          routeId,
          routeName: routes.find((r) => r.id === routeId)?.name || "",
          date: date
            ? `${String(date.getFullYear())}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`
            : "",
        })),
        passengers,
      }

      const queryParams = new URLSearchParams({
        orderData: JSON.stringify(orderData),
      })

      router.push(`/purchase/payment?${queryParams.toString()}`)
    }
  }

  const getTicketPricing = () => {
    const priceString = selectedTicket.price
    const priceMatch = priceString.match(/NT\$ (\d+)~(\d+)/)

    if (priceMatch) {
      const lowerPrice = Number.parseInt(priceMatch[1])
      const higherPrice = Number.parseInt(priceMatch[2])

      return {
        adultPrice: higherPrice,
        otherPrice: lowerPrice,
      }
    }

    return {
      adultPrice: 300,
      otherPrice: 150,
    }
  }

  const pricing = getTicketPricing()

  const ticketTypeOptions = [
    { value: "adult", label: "全票（非澎湖籍）", price: `NT$ ${pricing.adultPrice}`, description: "一般成人票" },
    { value: "discount", label: "澎湖籍居民票", price: `NT$ ${pricing.otherPrice}`, description: "設籍澎湖縣之居民" },
    { value: "senior", label: "長者票", price: `NT$ ${pricing.otherPrice}`, description: "65歲以上長者" },
    { value: "love", label: "愛心票", price: `NT$ ${pricing.otherPrice}`, description: "持身心障礙證明者及必要陪伴者" },
    { value: "child", label: "兒童票", price: `NT$ ${pricing.otherPrice}`, description: "6-11歲兒童" },
  ]

  const allDatesSelected = ticketRoutes.every((routeId) => selectedDates[routeId])

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-primary px-4 py-4 z-50">
        <div className="max-w-md mx-auto flex items-center">
          <Link href="/purchase/tickets" className="text-primary-foreground">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="flex-1 font-bold text-xl text-primary-foreground text-center">購票 - 填寫資料</h1>
        </div>
      </header>

      <ScrollArea className="flex-1 pt-16 pb-20">
        <div className="px-4 py-6 max-w-md mx-auto space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-foreground mb-4">已選擇票券</h2>
            <Card className="shadow-sm border border-border bg-card">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={selectedTicket.image || "/placeholder.svg"}
                        alt={selectedTicket.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">{selectedTicket.name}</h3>
                      <p className="font-bold text-primary">{selectedTicket.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{selectedTicket.type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-foreground mb-4">乘客人數</h2>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Card className="shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">乘客人數</div>
                          <div className="font-medium text-foreground">
                            {passengerCount > 0 ? getTicketSummary() : "請選擇票種"}
                          </div>
                        </div>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>選擇乘客人數</DrawerTitle>
                  <DrawerDescription>請選擇各票種的數量</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 py-2 space-y-2 max-h-[60vh] overflow-y-auto">
                  {ticketTypeOptions.map((type) => (
                    <div key={type.value} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{type.label}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-transparent"
                          onClick={() => handleTicketQuantityChange(type.value as keyof typeof ticketQuantities, -1)}
                          disabled={ticketQuantities[type.value as keyof typeof ticketQuantities] === 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {ticketQuantities[type.value as keyof typeof ticketQuantities]}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-transparent"
                          onClick={() => handleTicketQuantityChange(type.value as keyof typeof ticketQuantities, 1)}
                          disabled={Object.values(ticketQuantities).reduce((sum, count) => sum + count, 0) >= 26}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <DrawerFooter>
                  <Button
                    onClick={handleDrawerComplete}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={passengerCount === 0}
                  >
                    完成
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h2 className="font-semibold text-lg text-foreground">選擇日期</h2>
                <span className="text-xs text-red-500">日期下方數字表示尚有空位數</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDateSelectionCollapsed(!dateSelectionCollapsed)}
                className="text-muted-foreground"
              >
                {dateSelectionCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                {allDatesSelected && dateSelectionCollapsed ? "已完成" : ""}
              </Button>
            </div>

            {!dateSelectionCollapsed && (
              <div className="space-y-4">
                {ticketRoutes.map((routeId) => {
                  const routeInfo = routes.find((r) => r.id === routeId)
                  if (!routeInfo) return null

                  return (
                    <Card key={routeId} className="shadow-sm border border-border bg-card">
                      <CardContent className="p-4">
                        <CustomCalendar routeId={routeId} routeInfo={routeInfo} />
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {passengerCount > 0 && (
            <div>
              <h2 className="font-semibold text-lg text-foreground mb-4">乘客資料</h2>
              <div className="space-y-4">
                {Array.from({ length: passengerCount }, (_, index) => (
                  <Card key={index} className="shadow-sm">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between border-b pb-2">
                        <h3 className="font-medium text-foreground">
                          {passengerCount > 1 ? `乘客 ${index + 1}` : "乘客資料"}
                        </h3>
                        {index > 0 && (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`same-as-passenger-1-${index}`}
                              checked={formData[index]?.sameAsPassenger1 || false}
                              onCheckedChange={(checked) => handleSameAsPassenger1(index, checked as boolean)}
                            />
                            <Label htmlFor={`same-as-passenger-1-${index}`} className="text-sm cursor-pointer">
                              <div>
                                同乘客1
                                <br />
                                <span className="text-red-500 text-xs">一起同行可由一人代表</span>
                              </div>
                            </Label>
                          </div>
                        )}
                      </div>

                      <div
                        className={`${index > 0 && formData[index]?.sameAsPassenger1 ? "ring-2 ring-primary/50 bg-primary/5 rounded-lg p-2" : ""}`}
                      >
                        <Label htmlFor={`ticket-type-${index}`} className="text-sm font-bold text-foreground">
                          <span className="text-red-500">*</span> 票種
                        </Label>
                        <select
                          id={`ticket-type-${index}`}
                          className="mt-2 w-full p-3 border-2 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/40 transition-colors"
                          value={formData[index]?.ticketType || "adult"}
                          onChange={(e) => handleInputChange(index, "ticketType", e.target.value)}
                        >
                          {ticketTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label} - {option.price}
                            </option>
                          ))}
                        </select>
                      </div>

                      {ticketRoutes.map((routeId) => {
                        const routeInfo = routes.find((r) => r.id === routeId)
                        const routeStations = getRouteStations(routeId)
                        if (!routeInfo) return null

                        const selectedDate = selectedDates[routeId]
                        const formattedDate = selectedDate
                          ? `${String(selectedDate.getFullYear())}/${String(selectedDate.getMonth() + 1).padStart(2, "0")}/${String(selectedDate.getDate()).padStart(2, "0")}`
                          : ""

                        return (
                          <div key={routeId}>
                            <Label className="text-sm font-bold text-foreground flex items-center space-x-2">
                              <span className="text-red-500">*</span>
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: routeInfo.primaryColor }}
                              />
                              <span>{routeInfo.name} 上車地點</span>
                              {formattedDate && (
                                <span className="text-xs text-muted-foreground font-normal">
                                  已選擇日期：{formattedDate}
                                </span>
                              )}
                            </Label>
                            <select
                              className="mt-2 w-full p-3 border-2 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                              value={pickupLocations[index.toString()]?.[routeId] || ""}
                              onChange={(e) => handlePickupLocationChange(index, routeId, e.target.value)}
                            >
                              {routeStations.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        )
                      })}

                      <div>
                        <Label htmlFor={`name-${index}`} className="text-sm font-bold text-foreground">
                          <span className="text-red-500">*</span> 姓名
                        </Label>
                        <Input
                          id={`name-${index}`}
                          placeholder="請輸入姓名"
                          className="mt-2 border-2 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/40 transition-colors"
                          value={formData[index]?.name || ""}
                          onChange={(e) => handleInputChange(index, "name", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor={`phone-${index}`} className="text-sm font-bold text-foreground">
                          <span className="text-red-500">*</span> 手機號碼
                        </Label>
                        <div className="flex gap-2 mt-2">
                          <select
                            value={formData[index]?.countryCode || "+886"}
                            onChange={(e) => handleInputChange(index, "countryCode", e.target.value)}
                            className="w-32 p-3 border-2 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors py-1"
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
                            id={`phone-${index}`}
                            placeholder="請輸入手機號碼"
                            className="flex-1 border-2 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/40 transition-colors"
                            value={formData[index]?.phone || ""}
                            onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor={`email-${index}`} className="text-sm font-bold text-foreground">
                          Email
                        </Label>
                        <Input
                          id={`email-${index}`}
                          type="email"
                          placeholder="請輸入電子郵件"
                          className="mt-2 border-2 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/40 transition-colors"
                          value={formData[index]?.email || ""}
                          onChange={(e) => handleInputChange(index, "email", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor={`id-${index}`} className="text-sm font-bold text-foreground">
                          身分證/護照號碼
                        </Label>
                        <Input
                          id={`id-${index}`}
                          placeholder="請輸入身分證或護照號碼"
                          className="mt-2 border-2 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/40 transition-colors"
                          value={formData[index]?.id || ""}
                          onChange={(e) => handleInputChange(index, "id", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-bold text-foreground">
                          <span className="text-red-500">*</span> 是否需要低地板公車
                        </Label>
                        <p className="text-xs text-red-500 mt-1">▲行動不便及使用輪椅者、孕婦、娃娃車的乘客請選擇"是"</p>
                        <div className="mt-2 flex space-x-4">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`lowFloor-${index}`}
                              value="yes"
                              className="w-5 h-5 text-primary bg-white border-2 border-gray-600 focus:ring-2 focus:ring-primary cursor-pointer"
                              checked={formData[index]?.needsAccessibility === "yes"}
                              onChange={(e) => handleInputChange(index, "needsAccessibility", e.target.value)}
                            />
                            <span className="text-foreground">是</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`lowFloor-${index}`}
                              value="no"
                              className="w-5 h-5 text-primary bg-white border-2 border-gray-600 focus:ring-2 focus:ring-primary cursor-pointer"
                              checked={formData[index]?.needsAccessibility === "no"}
                              onChange={(e) => handleInputChange(index, "needsAccessibility", e.target.value)}
                            />
                            <span className="text-foreground">否</span>
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {passengerCount > 0 && (
            <div className="pb-8">
              <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 text-primary bg-white border-black border-2 rounded focus:ring-primary cursor-pointer"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm text-foreground cursor-pointer leading-relaxed">
                  我已閱讀並同意
                  <button
                    type="button"
                    className="text-primary underline hover:text-primary/80 transition-colors mx-1"
                    onClick={(e) => {
                      e.preventDefault()
                      // TODO: Add link to terms page
                      console.log("[v0] Terms link clicked")
                    }}
                  >
                    購票&劃位條款
                  </button>
                  *
                </label>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {passengerCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 px-4 bg-background/95 backdrop-blur-sm border-t z-40">
          <div className="max-w-md mx-auto py-4">
            <Button
              className={`w-full h-12 rounded-xl font-medium transition-all duration-200 ${
                isFormValid()
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
              }`}
              onClick={handleNext}
              disabled={!isFormValid()}
            >
              {(() => {
                const datesMissing = !ticketRoutes.every((routeId) => selectedDates[routeId])
                const pickupMissing = !Array.from({ length: passengerCount }, (_, i) => i).every((passengerIndex) =>
                  ticketRoutes.every(
                    (routeId) =>
                      pickupLocations[passengerIndex.toString()]?.[routeId] &&
                      pickupLocations[passengerIndex.toString()][routeId] !== "",
                  ),
                )
                const dataMissing = !formData.every(
                  (passenger) => passenger.ticketType && passenger.name && passenger.phone,
                )
                const termsMissing = !termsAccepted

                if (datesMissing) return "請選擇使用日期"
                if (pickupMissing) return "請選擇上車地點"
                if (dataMissing) return "請完成乘客資料"
                if (termsMissing) return "請同意功利條款"
                return "下一步"
              })()}
            </Button>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <MobileNavigation activeTab="passes" />
      </div>
    </div>
  )
}

export default PassengerInfoPage
