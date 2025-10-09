"use client"

import { useRouter } from "next/navigation"
import { HeaderWithMenu } from "@/components/header-with-menu"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Star, Heart } from "lucide-react"
import Link from "next/link"
import { useFavorites } from "@/contexts/favorites-context"
import { attractionsByRoute } from "@/data/attractions"

export default function FavoritesPage() {
  const router = useRouter()
  const { favorites, toggleFavorite } = useFavorites()

  // Get all attractions from all routes
  const allAttractions = [
    ...attractionsByRoute["湖西線"],
    ...attractionsByRoute["北環線"],
    ...attractionsByRoute["澎南線"],
  ]

  // Filter attractions that are in favorites
  const favoriteAttractions = allAttractions.filter((attraction) => favorites.includes(attraction.id))

  const getRouteColor = (route: string) => {
    if (route === "湖西線") return "bg-blue-500/10 text-blue-700 border-blue-200"
    if (route === "北環線") return "bg-emerald-500/10 text-emerald-700 border-emerald-200"
    if (route === "澎南線") return "bg-orange-500/10 text-orange-700 border-orange-200"
    return "bg-gray-500/10 text-gray-700 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderWithMenu title="景點收藏" showBack onBack={() => router.back()} />

      <main className="px-4 pt-20 pb-20 max-w-md mx-auto">
        {favoriteAttractions.length > 0 ? (
          <div className="space-y-6">
            {favoriteAttractions.map((attraction) => (
              <div
                key={attraction.id}
                className="group relative bg-surface-elevated rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/attractions/${attraction.id}`}>
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={attraction.image || "/placeholder.svg?height=300&width=400&query=penghu attraction"}
                      alt={attraction.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Route Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={getRouteColor(attraction.route)}>{attraction.route}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {attraction.category.slice(0, 3).map((cat) => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className="text-xs font-medium px-2 py-1 rounded-md bg-muted/50"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                      {attraction.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">{attraction.description}</p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{attraction.location.address.split("澎湖縣")[1]}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{attraction.visitInfo.recommendedDuration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">4.{Math.floor(Math.random() * 4) + 5}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Remove from Favorites Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(attraction.id)
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
                >
                  <Heart className="w-5 h-5 text-white fill-white" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center mb-2">尚無收藏的景點</p>
            <p className="text-sm text-muted-foreground text-center mb-6">探索澎湖美麗景點，將喜歡的地方加入收藏</p>
            <Button onClick={() => router.push("/attractions")} className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              探索景點
            </Button>
          </div>
        )}
      </main>

      <MobileNavigation activeTab="more" />
    </div>
  )
}
