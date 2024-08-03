export function useTimeRangeSelector() {
  const selectedDate = useState('selectedDate', () => '2024-02-01')
  const isPlaying = useState<boolean>('isPlaying', () => false)

  const selectedSensorType = useState('selectedSensorType', () => 'bmp180')

  const selectedYear = ref<string>(selectedDate.value.split('-')[0])
  const selectedMonth = ref<string>(selectedDate.value.split('-')[1])
  const selectedDay = ref<string>(selectedDate.value.split('-')[2])

  watch(selectedDate, (newVal) => {
    selectedYear.value = newVal.split('-')[0]
    selectedMonth.value = newVal.split('-')[1]
    selectedDay.value = newVal.split('-')[2]
  })

  return {
    selectedDate,
    selectedSensorType,
    isPlaying,
    selectedYear,
    selectedMonth,
    selectedDay,
  }
}
