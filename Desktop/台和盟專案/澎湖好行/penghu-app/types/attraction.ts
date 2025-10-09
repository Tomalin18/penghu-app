export interface Attraction {
  id: string
  title: string
  description: string
  detailedDescription: string
  image: string
  images?: string[]
  category: string[]
  location: {
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  contact: {
    phone?: string
    website?: string
  }
  visitInfo: {
    openingHours: string
    recommendedDuration: string
    admission: string
    accessibility?: string[]
  }
  transportation: {
    fromMagong: string
    parking?: string
    publicTransport?: string
  }
  highlights: string[]
  warnings?: string[]
  nearbyAttractions?: {
    name: string
    distance: string
  }[]
  source: string
  route: string
}
