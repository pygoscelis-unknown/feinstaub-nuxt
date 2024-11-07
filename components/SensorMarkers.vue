<script setup lang="ts">
import { getCoordinates, getCountOfDaysOfMonth, getMarkerRadius, getTemperatureColor } from '~/utils/utils'
import { useTimeRangeSelector } from '~/composables/timeRangeSelector'

const { selectedSensorType, selectedDate, selectedYear, isPlaying, selectedMonth, selectedDay } = useTimeRangeSelector()
const { sensorsDisplayedCount, sensorsTotalCount, fetchingSensors } = useSensors()
const pending = ref(true)
const initialData = ref()
const intervalId = ref<number | null>(null)

async function fetchData() {
  try {
    pending.value = true
    fetchingSensors.value = true
    const response = await $fetch<ApiResponse<SensorBmp180 | SensorPms1003>>(`/api/${selectedSensorType.value}`, {
      method: 'POST',
      query: {year: selectedYear.value, month: selectedMonth.value, day: selectedDay.value}
    })
    initialData.value = response
    pending.value = false
    fetchingSensors.value = false
    sensorsDisplayedCount.value = response.results.length
    sensorsTotalCount.value = response.count
  } catch (e) {
    console.error(e)
    pending.value = false
    fetchingSensors.value = false
  }

}

async function fetchPlayData() {
  if (intervalId.value !== null)
    clearInterval(intervalId.value) // Clear any existing interval
  intervalId.value = setInterval(() => {
    if (Number.parseInt(selectedDay.value.replace(/^0+/, '')) <= getCountOfDaysOfMonth(Number.parseInt(selectedMonth.value.replace(/^0+/, '')), Number.parseInt(selectedYear.value)) - 1) {
      selectedDay.value = (Number.parseInt(selectedDay.value) + 1).toString().padStart(2, '0')
      selectedDate.value = `${selectedYear.value}-${selectedMonth.value}-${selectedDay.value}`
      fetchData()
    }
    else {
      clearInterval(intervalId.value)
      isPlaying.value = false
    }
  }, 1000) as unknown as number
}

watch([selectedYear, selectedMonth, selectedDay, selectedSensorType], () => {
  fetchData()
}, { immediate: true })

watch(isPlaying, (newValue) => {
  if (newValue) {
    fetchPlayData()
  }
  else {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
  }
})
</script>

<template>
  <div v-if="!pending && initialData">
    <div v-if="selectedSensorType === 'pms1003'">
      <SensorPms1003 v-for="marker in initialData.results" v-bind="marker" />
    </div>
    <div v-else-if="selectedSensorType === 'pms5003'">
      <SensorPms5003 v-for="marker in initialData.results" v-bind="marker" />
    </div>
    <div v-else>
      <LCircle
          v-for="marker in initialData.results"
          :key="marker?.sensor_id"
          :opacity="1"
          :fill-color="getTemperatureColor(marker.temperature)"
          :color="getTemperatureColor(marker.temperature)"
          :radius="getMarkerRadius(marker.pressure)"
          :weight="2"
          :lat-lng="getCoordinates(marker)"
          draggable
      />
    </div>
  </div>
  <div v-else class="absolute top-0 h-full w-full z-[998] backdrop-blur-sm">
    <div class="flex justify-center items-center h-full">
      <div class="bg-green-500 rounded-full flex justify-center items-center p-2">
        <UIcon name="i-heroicons-arrow-path" class="bg-green-950 h-6 w-6 animate-spin" />
      </div>
    </div>
  </div>
</template>
