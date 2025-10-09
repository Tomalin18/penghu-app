"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface FavoritesContextType {
  favorites: string[]
  toggleFavorite: (attractionId: string) => void
  isFavorite: (attractionId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("penghu-favorites")
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (e) {
        console.error("[v0] Failed to parse favorites from localStorage", e)
      }
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("penghu-favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (attractionId: string) => {
    setFavorites((prev) => {
      if (prev.includes(attractionId)) {
        return prev.filter((id) => id !== attractionId)
      } else {
        return [...prev, attractionId]
      }
    })
  }

  const isFavorite = (attractionId: string) => {
    return favorites.includes(attractionId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>{children}</FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
