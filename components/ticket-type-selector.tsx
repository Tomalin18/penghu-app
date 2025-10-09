"use client"

interface TicketTypeSelectorProps {
  selectedType: string
  onTypeChange: (type: string) => void
}

export function TicketTypeSelector({ selectedType, onTypeChange }: TicketTypeSelectorProps) {
  const ticketTypes = ["一日券", "二日券", "三日券", "其他票券"]

  const handleClick = (type: string) => {
    console.log("[v0] TicketTypeSelector clicked:", type)
    console.log("[v0] Current selectedType:", selectedType)
    onTypeChange(type)
  }

  return (
    <div className="sticky top-16 z-30 bg-background flex bg-muted rounded-lg p-1 mb-0 pointer-events-auto">
      {ticketTypes.map((type) => (
        <button
          key={type}
          className={`flex-1 py-2 px-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            selectedType === type ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => handleClick(type)}
        >
          {type}
        </button>
      ))}
    </div>
  )
}
