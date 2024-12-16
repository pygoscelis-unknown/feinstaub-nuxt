import type { LatLngExpression } from 'leaflet'

/**
 *
 */
export function getCoordinates(marker: SensorPms1003 | SensorBmp180): LatLngExpression {
  return { lat: marker.lat, lng: marker.lon }
}

/**
 * Get the color pair for the severity
 */
export function getColorPair(severity: string) {
  switch (severity) {
    case 'very low':
      return { fill: '#D4E9E2', border: '#4CAF50' }
    case 'low':
      return { fill: '#FFF3CD', border: '#FFEB3B' }
    case 'moderate':
      return { fill: '#FFE7C7', border: '#FF9800' }
    case 'high':
      return { fill: '#FFCDD2', border: '#F44336' }
    case 'very high':
      return { fill: '#F8BBD0', border: '#E91E63' }
    default:
      return { fill: '#D4E9E2', border: '#4CAF50' }
  }
}

/**
 * Get the color based on the temperature in 2 degree steps from 0 to 40
 * @param temperature
 */
export function getTemperatureColor(temperature: number) {
  if (temperature <= 2)
    return '#0000FF' // Blue for very cold temperatures
  else if (temperature <= 4)
    return '#3399FF' // Light blue for cold temperatures
  else if (temperature <= 6)
    return '#66CCFF' // Lighter blue for chilly temperatures
  else if (temperature <= 8)
    return '#99CCFF' // Even lighter blue
  else if (temperature <= 10)
    return '#CCCCFF' // Pale blue
  else if (temperature <= 12)
    return '#FFFFCC' // Light yellow for cool temperatures
  else if (temperature <= 14)
    return '#FFFF99' // Light yellow-green
  else if (temperature <= 16)
    return '#FFFF66' // Yellow-green
  else if (temperature <= 18)
    return '#FFFF33' // Bright yellow
  else if (temperature <= 20)
    return '#FFFF00' // Yellow
  else if (temperature <= 22)
    return '#FFCC00' // Yellow-orange
  else if (temperature <= 24)
    return '#FF9900' // Orange
  else if (temperature <= 26)
    return '#FF6600' // Darker orange
  else if (temperature <= 28)
    return '#FF3300' // Red-orange
  else if (temperature <= 30)
    return '#FF0000' // Red for warm temperatures
  else if (temperature <= 32)
    return '#CC0000' // Darker red
  else if (temperature <= 34)
    return '#990000' // Even darker red
  else if (temperature <= 36)
    return '#660000' // Very dark red
  else if (temperature <= 38)
    return '#330000' // Almost black-red
  else
    return '#000000' // Black for extremely hot temperatures
}

export function getMarkerRadius(pressure: number) {
  if (!pressure)
    return 10
  // Define the expected range of pressure values
  const minPressure = 95000 // Minimum pressure value (e.g., low pressure)
  const maxPressure = 105000 // Maximum pressure value (e.g., high pressure)

  // Define the minimum and maximum radius for markers
  const minRadius = 5 // Minimum marker radius
  const maxRadius = 20 // Maximum marker radius

  // Ensure the pressure value is within the defined range
  if (pressure < minPressure)
    pressure = minPressure
  if (pressure > maxPressure)
    pressure = maxPressure

  // Calculate the radius based on the pressure value
  const normalizedPressure = (pressure - minPressure) / (maxPressure - minPressure)
  return minRadius + normalizedPressure * (maxRadius - minRadius) * 3000
}

export function getCountOfDaysOfMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate()
}

function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = Number.parseInt(color1.slice(1), 16)
  const c2 = Number.parseInt(color2.slice(1), 16)

  const r = Math.round((c1 >> 16) + factor * ((c2 >> 16) - (c1 >> 16)))
  const g = Math.round(((c1 >> 8) & 0xFF) + factor * (((c2 >> 8) & 0xFF) - ((c1 >> 8) & 0xFF)))
  const b = Math.round((c1 & 0xFF) + factor * ((c2 & 0xFF) - (c1 & 0xFF)))

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

export function getParticulateMatterColor(p1: number): string {
  p1 = Number.parseFloat(p1.toFixed(2))

  const thresholds = [
    { value: 0, color: '#A8DADC' }, // Light teal
    { value: 12, color: '#F1FA8C' }, // Pale yellow
    { value: 35.4, color: '#FFB482' }, // Peachy orange
    { value: 55.4, color: '#F76C6C' }, // Soft coral red
    { value: 150.4, color: '#A29BFE' }, // Light lavender
    { value: 250.4, color: '#6C5CE7' }, // Soft purple
    { value: 350.4, color: '#2D3436' }, // Charcoal gray
  ]

  if (p1 <= thresholds[0].value)
    return thresholds[0].color
  if (p1 >= thresholds[thresholds.length - 1].value)
    return thresholds[thresholds.length - 1].color

  for (let i = 0; i < thresholds.length - 1; i++) {
    const { value: v1, color: c1 } = thresholds[i]
    const { value: v2, color: c2 } = thresholds[i + 1]

    if (p1 <= v2) {
      const factor = (p1 - v1) / (v2 - v1) // Normalize within the range
      return interpolateColor(c1, c2, factor)
    }
  }

  return '#000000' // Fallback in case of unexpected input
}
