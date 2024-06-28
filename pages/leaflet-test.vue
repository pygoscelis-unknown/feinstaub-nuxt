<script setup lang='ts'>
import { ref } from 'vue'
import type { LatLngExpression } from 'leaflet'

interface Marker {
  P0?: number | null
  P1: number
  P2: number
  lat: number
  location: number
  lon: number
  sensor_id: number
  sensor_type: string
  timestamp: string
  url: string
}

const zoom = ref(6)
const config = useRuntimeConfig()
const { data } = useFetch<Array<Marker>>(`${config.public.apiBaseUrl}/pms1003/?format=json`)

function getCoordinates(marker: Marker): LatLngExpression {
  return { lat: marker.lat, lng: marker.lon }
}
function updateLatLng(event: any) {
  // eslint-disable-next-line no-console
  console.info('updateLatLng', event)
}
</script>

<template>
  <section>
    <BaseContainer>
      <div class="py-10">
        <UInput type="date" />
      </div>
      <div style="height:100vh; width:100%">
        <LMap
          :zoom="zoom"
          :center="[47.21322, -1.559482]"
          @update:center="updateLatLng($event)"
        >
          <LMarker v-for="marker in data" :key="marker.sensor_id" :lat-lng="getCoordinates(marker)" draggable />
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            layer-type="base"
            name="OpenStreetMap"
          />
        </LMap>
      </div>
    </BaseContainer>
  </section>
</template>

<style>
body {
  margin: 0;
}
</style>
