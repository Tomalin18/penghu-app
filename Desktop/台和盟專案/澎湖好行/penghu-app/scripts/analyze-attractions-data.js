// Script to fetch and analyze the attractions CSV data
const csvUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%BE%8E%E6%B9%96%E5%A5%BD%E8%A1%8C%E6%99%AF%E9%BB%9E%E4%BB%8B%E7%B4%B9%20-%20%E5%B7%A5%E4%BD%9C%E8%A1%A81-Bzx0FORnf8Ho1GRzU08qG1j57eMJmO.csv"

async function analyzeAttractionsData() {
  try {
    console.log("[v0] Fetching CSV data...")
    const response = await fetch(csvUrl)
    const csvText = await response.text()

    console.log("[v0] CSV content preview:")
    console.log(csvText.substring(0, 500) + "...")

    // Split by lines and analyze structure
    const lines = csvText.split("\n")
    console.log("[v0] Total lines:", lines.length)

    // Parse CSV manually since it might have complex content
    const attractions = []
    for (let i = 1; i < lines.length; i++) {
      // Skip header
      const line = lines[i].trim()
      if (line) {
        // Since the CSV seems to have complex content with newlines,
        // let's extract key information
        attractions.push({
          content: line,
          hasVisitTime: line.includes("建議停留時間"),
          hasSource: line.includes("資料來源"),
        })
      }
    }

    console.log("[v0] Parsed attractions count:", attractions.length)
    console.log("[v0] Sample attraction data:")
    if (attractions.length > 0) {
      console.log(attractions[0])
    }

    // Analyze what information is available
    const withVisitTime = attractions.filter((a) => a.hasVisitTime).length
    const withSource = attractions.filter((a) => a.hasSource).length

    console.log("[v0] Attractions with visit time:", withVisitTime)
    console.log("[v0] Attractions with source:", withSource)
  } catch (error) {
    console.error("[v0] Error analyzing CSV:", error)
  }
}

analyzeAttractionsData()
