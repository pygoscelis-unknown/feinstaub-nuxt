<script setup lang='ts'>
import { ref } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import { useTimeRangeSelector } from '~/composables/timeRangeSelector'
import DebugConsole from '~/components/DebugConsole.vue'

const { availableSensorTypes, sensorsDisplayedCount, sensorsTotalCount } = useSensors()
const { selectedDate, selectedDay, selectedMonth, selectedYear, isPlaying, selectedSensorType } = useTimeRangeSelector()

selectedDate.value = getFirstDayOfPreviousMonth().toISOString().split('T')[0]

const zoom = ref(6)

function playMonth() {
  isPlaying.value = true
}

function stopPlaying() {
  isPlaying.value = false
}

/**
 * Get current date and based on that, select the first day of the previous month
 */
function getFirstDayOfPreviousMonth() {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  date.setDate(1)
  return date
}
getFirstDayOfPreviousMonth()

const center: Ref<[number, number]> = ref([51.0000, 11.0000])

if (window) {
  const urlParams = new URLSearchParams(window.location.search)
  const lat = urlParams.get('lat')
  const long = urlParams.get('long')
  const zoomParam = urlParams.get('zoom')

  if (zoomParam)
    zoom.value = Number.parseInt(zoomParam)
  if (lat && long)
    center.value = [Math.round(Number.parseFloat(lat) * 10000) / 10000, Math.round(Number.parseFloat(long) * 10000) / 10000]

  else
    window.history.pushState({}, '', `?lat=${center.value[0]}&long=${center.value[1]}`)
}

function updateLatLng(event: any) {
  const lat = Math.round(event.lat * 10000) / 10000
  const long = Math.round(event.lng * 10000) / 10000
  window.history.pushState({}, '', `?lat=${lat}&long=${long}&zoom=${zoom.value}`)
}

function updateZoom(event: any) {
  zoom.value = event
  window.history.pushState({}, '', `?lat=${center.value[0]}&long=${center.value[1]}&zoom=${event}`)
}

const showDebugConsole = ref(false)

const { shift, space, d } = useMagicKeys()

watchEffect(() => {
  if (shift?.value && space?.value && d?.value)
    showDebugConsole.value = !showDebugConsole.value
})
</script>

<template>
  <section>
    <BaseContainer>
      <section class="shadow-2xl rounded-2xl overflow-hidden my-20">
        <div class="p-5 rounded-t-2xl flex items-end gap-8 bg-slate-100 ">
          <div class="flex flex-col items-start gap-2">
            <BaseLabel text="Select a sensor type" />
            <USelectMenu v-model="selectedSensorType" :options="availableSensorTypes" />
          </div>
          <div class="flex flex-col items-start gap-2">
            <BaseLabel text="Select a date" />
            <UInput v-model="selectedDate" type="date" />
          </div>
          <div class="flex flex-col items-start gap-2">
            <div class="flex gap-2">
              <UButton v-if="!isPlaying" icon="i-heroicons-play" @click="playMonth">
                Play
              </UButton>
              <UButton v-else class="animate-pulse" icon="i-heroicons-pause" @click="playMonth">
                Pause
              </UButton>
              <UButton color="red" icon="i-heroicons-stop" @click="stopPlaying">
                Stop
              </UButton>
            </div>
          </div>
        </div>
        <div class="relative z-10 rounded-b-2xl overflow-hidden " style="height:66vh; width:100%">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-600 text-slate-100 z-[999] p-2 px-4 rounded-b">
            <span class="flex flex-row gap-5 ">
              <span>Sensors displayed: {{ Number(sensorsDisplayedCount).toLocaleString('en') }}</span>
              <span>Sensors total: {{ Number(sensorsTotalCount).toLocaleString('en') }}</span>
            </span>
          </div>
          <LMap
            class="z-50"
            :use-global-leaflet="false"
            :zoom="zoom"
            :center="center"
            @update:center="updateLatLng($event)"
            @update:zoom="updateZoom($event)"
          >
            <SensorMarkers />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
              layer-type="base"
              name="OpenStreetMap"
            />
          </LMap>
        </div>
      </section>
    </BaseContainer>
    <DebugConsole>
      <span>selectedSensorType: {{ selectedSensorType }}</span><br>
      <span>selectedDate: {{ selectedDate }}</span><br>
      <span>selectedDay: {{ selectedDay }}</span><br>
      <span>selectedMonth: {{ selectedMonth }}</span><br>
      <span>selectedYear: {{ selectedYear }}</span><br>
      <span>isPlaying: {{ isPlaying }}</span>
    </DebugConsole>
  </section>
</template>

<style>
body {
  margin: 0;
}
</style>
