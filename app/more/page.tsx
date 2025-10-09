import { MobileNavigation } from "@/components/mobile-navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { Bus, Headphones, MapPin, Calendar, ChevronRight } from "lucide-react"

export default function MorePage() {
  const transportationItems = [
    { id: "north", label: "北環線時刻表", icon: Bus },
    { id: "west", label: "湖西線時刻表", icon: Bus },
    { id: "south", label: "湖南線時刻表", icon: Bus },
  ]

  const searchItems = [
    { id: "audio", label: "語音導覽", icon: Headphones },
    { id: "attractions", label: "景點導覽", icon: MapPin },
    { id: "itinerary", label: "推薦行程", icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu title="其他" />

      {/* Transportation Information Section */}
      <main className="px-4 pt-16 pb-20 max-w-md mx-auto space-y-6">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">交通資訊</h2>
          <div className="space-y-3">
            {transportationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className="w-full bg-card rounded-xl p-4 shadow-sm border border-border flex items-center justify-between hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-foreground font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Easy Go Search Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">好行好搜</h2>
          <div className="space-y-3">
            {searchItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className="w-full bg-card rounded-xl p-4 shadow-sm border border-border flex items-center justify-between hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-foreground font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              )
            })}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <MobileNavigation activeTab="more" />
    </div>
  )
}
