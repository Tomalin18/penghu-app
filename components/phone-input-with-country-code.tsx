"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PhoneInputWithCountryCodeProps {
  id: string
  label?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  countryCode: string
  onCountryCodeChange: (code: string) => void
  placeholder?: string
  className?: string
}

const countryCodes = [
  { code: "+886", name: "台灣 Taiwan", flag: "🇹🇼" },
  { code: "+86", name: "中國 China", flag: "🇨🇳" },
  { code: "+852", name: "香港 Hong Kong", flag: "🇭🇰" },
  { code: "+853", name: "澳門 Macau", flag: "🇲🇴" },
  { code: "+65", name: "新加坡 Singapore", flag: "🇸🇬" },
  { code: "+60", name: "馬來西亞 Malaysia", flag: "🇲🇾" },
  { code: "+81", name: "日本 Japan", flag: "🇯🇵" },
  { code: "+82", name: "韓國 South Korea", flag: "🇰🇷" },
  { code: "+1", name: "美國/加拿大 USA/Canada", flag: "🇺🇸" },
  { code: "+44", name: "英國 UK", flag: "🇬🇧" },
]

export function PhoneInputWithCountryCode({
  id,
  label = "手機號碼",
  required = false,
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  placeholder = "請輸入手機號碼",
  className = "",
}: PhoneInputWithCountryCodeProps) {
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={id} className="text-sm font-bold text-foreground">
          {required && <span className="text-red-500">*</span>} {label}
        </Label>
      )}
      <div className="flex gap-2 mt-2">
        <select
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value)}
          className="w-32 p-3 border-2 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.code}
            </option>
          ))}
        </select>
        <Input
          id={id}
          type="tel"
          placeholder={placeholder}
          className="flex-1 border-2 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/40 transition-colors"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}
