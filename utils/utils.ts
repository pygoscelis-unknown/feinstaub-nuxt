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
  console.log(severity)
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
  if (!pressure) return 10
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
  const radius = minRadius + normalizedPressure * (maxRadius - minRadius) * 3000

  return radius
}

/**
 * Get the severity based on the P1 value
 */
export function getSeverity(P1: number): string {
  console.log(P1)
  if (P1 <= 20)
    return 'very low'
  else if (P1 <= 40)
    return 'low'
  else if (P1 <= 60)
    return 'moderate'
  else if (P1 <= 80)
    return 'high'
  else
    return 'very high'
}

export function getCountOfDaysOfMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate()
}

export function getParticulateMatterColor(p1: number) {
  if (p1 <= 12)
    return '#00FF00'; // Green for good air quality
  else if (p1 <= 35.4)
    return '#FFFF00'; // Yellow for moderate air quality
  else if (p1 <= 55.4)
    return '#FF9900'; // Orange for unhealthy for sensitive groups
  else if (p1 <= 150.4)
    return '#FF0000'; // Red for unhealthy
  else if (p1 <= 250.4)
    return '#990066'; // Purple for very unhealthy
  else if (p1 <= 350.4)
    return '#660066'; // Dark purple for hazardous
  else
    return '#7E0023'; // Maroon for very hazardous
}