interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: Array<T>
}
interface SensorPms1003 {
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
interface SensorBmp180 {
  url: string
  sensor_id: number
  sensor_type: 'BMP180'
  location: number
  lat: number
  lon: number
  timestamp: string
  pressure: number
  altitude: null
  pressure_sealevel: null
  temperature: number
}

interface SensorPms1003 {
  url: string
  sensor_id: number
  sensor_type: 'PMS1003'
  location: number
  lat: number
  lon: number
  timestamp: string
  P1: number
  P2: number
  P0: number | null
}
