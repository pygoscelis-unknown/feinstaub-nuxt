interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
interface Marker {
  P0?: number | null
  P1: number
  P2: number
  lat: number
  location: number
  lon: number
  sensor_id: number
  sensor_type: string
  timestamp: string
  url: string
}
