export function useSensors() {
  const availableSensorTypes = useState<Array<{ value: string, label: string }>>('availableSensorTypes', () => [])
  const sensorsDisplayedCount = useState<number>('sensorsDisplayedCount', () => 0)
  const sensorsTotalCount = useState<number>('sensorsTotalCount', () => 0)
  const fetchingSensors = useState<boolean>('fetchingSensors', () => false)
  const fetchingSensorTypes = useState<boolean>('fetchingSensorTypes', () => false)

  async function fetchSensorTypes() {
    try {
      fetchingSensorTypes.value = true
      const types = await $fetch('/api/sensors')
      availableSensorTypes.value = types
    }
    catch (error) {
      console.error('Error fetching sensor types:', error)
    }
    finally {
      fetchingSensorTypes.value = false
    }
  }

  // Fetch sensor types on component creation
  onMounted(() => {
    fetchSensorTypes()
  })

  return {
    availableSensorTypes,
    sensorsDisplayedCount,
    sensorsTotalCount,
    fetchingSensors,
    fetchingSensorTypes,
    fetchSensorTypes
  }
}
