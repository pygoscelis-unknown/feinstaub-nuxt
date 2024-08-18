<script setup lang='ts'>
import { ref } from 'vue'

import { useTimeRangeSelector } from '~/composables/timeRangeSelector'

const SENSOR_TYPES = ['bmp180', 'bmp280']
const { selectedDate, selectedDay, selectedMonth, isPlaying, selectedSensorType } = useTimeRangeSelector()

const months = ref([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
])
const selectedMonthToPlay = ref('January')

const zoom = ref(6)

function playMonth() {
  selectedDay.value = '01'
  selectedMonth.value = (months.value.indexOf(selectedMonthToPlay.value) + 1).toString().padStart(2, '0')
  selectedDate.value = `2024-${selectedMonth.value}-${selectedDay.value}`
  isPlaying.value = true
}

function stopPlaying() {
  isPlaying.value = false
}

const center: Ref<[number, number]> = ref([21.1657, 10.4515])

if (window) {
  const urlParams = new URLSearchParams(window.location.search)
  const lat = urlParams.get('lat')
  const long = urlParams.get('long')
  const zoomParam = urlParams.get('zoom')

  if (zoomParam)
    zoom.value = Number.parseInt(zoomParam)
  if (lat && long)
    center.value = [Number.parseFloat(lat), Number.parseFloat(long)]

  else
    window.history.pushState({}, '', `?lat=${center.value[0]}&long=${center.value[1]}`)
}

function updateLatLng(event: any) {
  // Parse lat and long and update URL query params
  const lat = event.lat
  const long = event.lng
  window.history.pushState({}, '', `?lat=${lat}&long=${long}&zoom=${zoom.value}`)
}

function updateZoom(event: any) {
  zoom.value = event
  window.history.pushState({}, '', `?lat=${center.value[0]}&long=${center.value[1]}&zoom=${event}`)
}
</script>

<template>
  <section>
    <BaseContainer>
      <section class="shadow-2xl rounded-2xl overflow-hidden my-20">
        <div class="p-5 rounded-t-2xl flex gap-8 bg-slate-100 ">
          <div class="flex flex-col items-start gap-2">
            <BaseLabel text="Select a sensor type" />
            <USelect v-model="selectedSensorType" :options="SENSOR_TYPES" />
          </div>
          <div class="flex flex-col items-start gap-2">
            <BaseLabel text="Select a date" />
            <UInput v-model="selectedDate" type="date" />
          </div>
          <div class="flex flex-col items-start gap-2">
            <BaseLabel text="Select a month" />
            <div class="flex gap-2">
              <USelect v-model="selectedMonthToPlay" :options="months" />
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
          <LMap
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
  </section>
</template>

<style>
body {
  margin: 0;
}
</style>
