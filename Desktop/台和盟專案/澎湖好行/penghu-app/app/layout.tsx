import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { FavoritesProvider } from "@/contexts/favorites-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Penghu Easy Go | 澎湖好行",
  description: "Official Penghu tourism and transportation app",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <FavoritesProvider>
            <div className="min-h-screen bg-background">{children}</div>
          </FavoritesProvider>
        </Suspense>
      </body>
    </html>
  )
}
