<script setup lang='ts'>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import { useTimeRangeSelector } from '~/composables/timeRangeSelector'
import DebugConsole from '~/components/DebugConsole.vue'

const { availableSensorTypes, sensorsDisplayedCount, sensorsTotalCount } = useSensors()
const { selectedHour, selectedDate, selectedDay, selectedMonth, selectedYear, isPlaying, selectedSensorType } = useTimeRangeSelector()

selectedDate.value = getFirstDayOfPreviousMonth().toISOString().split('T')[0]

const zoom = ref(3)
const center: Ref<[number, number]> = ref([51.0000, 11.0000])

function playMonth() {
  isPlaying.value = true
}

function stopPlaying() {
  isPlaying.value = false
}

/**
 * URL Structure
 * ?sensorType=<SENSORTYPE>&year=<YEAR>&month=<MONTH>&day=<DAY>&lat=<LAT>&long=<LONG>&zoom=<ZOOM>
 */

function getUrlParams() {
  const params = new URLSearchParams(window.location.search)

  return {
    sensorType: params.get('sensorType') || '',
    year: params.get('year') || '',
    month: params.get('month') || '',
    day: params.get('day') || '',
    hour: params.get('hour') || '',
    lat: Number.parseFloat(params.get('lat')) || center.value[0],
    long: Number.parseFloat(params.get('long')) || center.value[1],
    zoom: Number.parseInt(params.get('zoom')) || zoom.value,
  }
}

function setUrlParams({ sensorType, year, month, day, hour, lat, long, zoom }) {
  const params = new URLSearchParams()

  if (sensorType)
    params.set('sensorType', sensorType)
  if (year)
    params.set('year', year)
  if (month)
    params.set('month', month)
  if (day)
    params.set('day', day)
  if(hour)
    params.set('hour', hour)
  if (lat)
    params.set('lat', lat.toString())
  if (long)
    params.set('long', long.toString())
  if (zoom)
    params.set('zoom', zoom.toString())

  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
}

onMounted(() => {
  if (window) {
    const params = getUrlParams()
    selectedSensorType.value = params.sensorType || selectedSensorType.value
    selectedYear.value = params.year || selectedYear.value
    selectedMonth.value = params.month || selectedMonth.value
    selectedDay.value = params.day || selectedDay.value
    selectedHour.value = params.hour || selectedHour.value
    center.value = [params.lat, params.long]
    zoom.value = params.zoom

    setUrlParams({
      sensorType: selectedSensorType.value,
      year: selectedYear.value,
      month: selectedMonth.value,
      day: selectedDay.value,
      hour: selectedHour.value,
      lat: center.value[0],
      long: center.value[1],
      zoom: zoom.value,
    })
  }
})

watch([selectedSensorType, selectedYear, selectedMonth, selectedDay, zoom, center], () => {
  setUrlParams({
    sensorType: selectedSensorType.value,
    year: selectedYear.value,
    month: selectedMonth.value,
    day: selectedDay.value,
    hour: selectedHour.value,
    lat: center.value[0],
    long: center.value[1],
    zoom: zoom.value,
  })
})

function getFirstDayOfPreviousMonth() {
  const date = new Date()
  date.setMonth(date.getMonth() - 2)
  date.setDate(1)
  return date
}

function updateLatLng(event: any) {
  const lat = Math.round(event.lat * 10000) / 10000
  const long = Math.round(event.lng * 10000) / 10000
  center.value = [lat, long]
}

function updateZoom(event: any) {
  zoom.value = event
}

const showDebugConsole = ref(false)

const { shift, space, d } = useMagicKeys()

watchEffect(() => {
  if (shift?.value && space?.value && d?.value)
    showDebugConsole.value = !showDebugConsole.value
})

const attributions = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`

const tileUrl = 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png'
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
              :url="tileUrl"
              :attribution="attributions"
              layer-type="base"
              name="OpenStreetMap DE"
              :maxZoom="18"
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
