"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface AccountInputProps {
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  required?: boolean
  type?: "text" | "email"
}

export function AccountInput({
  id,
  value,
  onChange,
  placeholder = "請輸入帳號",
  className = "",
  required = false,
  type = "text",
}: AccountInputProps) {
  const [showAccount, setShowAccount] = useState(false)

  const toggleAccountVisibility = () => {
    setShowAccount(!showAccount)
  }

  return (
    <div className="relative">
      <Input
        id={id}
        type={showAccount ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`pr-12 ${className}`}
        required={required}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={toggleAccountVisibility}
        tabIndex={-1}
      >
        {showAccount ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  )
}
