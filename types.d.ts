interface BaseSensor {
  url: string
  sensor_id: number
  location: number
  lat: number
  lon: number
  timestamp: string
}

interface ParticleSensor extends BaseSensor {
  P1: number
  P2: number
  P0: number | null
}

interface SensorPms1003 extends ParticleSensor {
  sensor_type: 'PMS1003'
}

interface SensorPms3003 extends ParticleSensor {
  sensor_type: 'PMS3003'
}

interface SensorPms5003 extends ParticleSensor {
  sensor_type: 'PMS5003'
}

interface SensorPpd42ns extends ParticleSensor {
  sensor_type: 'PPD42NS'
}

interface SensorBmp180 extends BaseSensor {
  sensor_type: 'BMP180'
  pressure: number
  altitude: null
  pressure_sealevel: null
  temperature: number
}

interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: Array<T>
}

type SensorType = 'PMS1003' | 'PMS3003' | 'PMS5003' | 'PPD42NS' | 'BMP180'
