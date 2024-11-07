export function useSensors() {
  const config = useRuntimeConfig()
  const availableSensorTypes = config.public.availableSensorTypes
  const sensorsDisplayedCount = useState<number>('sensorsDisplayedCount', () => 0)
  const sensorsTotalCount = useState<number>('sensorsTotalCount', () => 0)
  const fetchingSensors = useState<boolean>('fetchingSensors', () => false)

  return {
    availableSensorTypes,
    sensorsDisplayedCount,
    sensorsTotalCount,
    fetchingSensors
  }
}
