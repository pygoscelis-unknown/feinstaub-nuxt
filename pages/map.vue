<script setup lang='ts'>
import { ref } from 'vue'
import type { LatLngExpression } from 'leaflet'

const zoom = ref(6)
const config = useRuntimeConfig()
const { data, pending } = useFetch<ApiResponse<Marker>>(`${config.public.apiBaseUrl}/pms1003/?format=json`)

function getCoordinates(marker: Marker): LatLngExpression {
  return { lat: marker.lat, lng: marker.lon }
}
function updateLatLng(event: any) {
  // eslint-disable-next-line no-console
  console.info('updateLatLng', event)
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const selectedMonth = ref('')
</script>

<template>
  <section>
    <BaseContainer v-if="!pending && data">
      <div class="py-10">
        <BaseLabel class="mb-2" text="Month" />
        <USelect v-model="selectedMonth" placeholder="Select a month" :options="months" />
      </div>
      <div style="height:66vh; width:100%">
        <LMap
          :zoom="zoom"
          :center="[47.21322, -1.559482]"
          @update:center="updateLatLng($event)"
        >
          <LMarker v-for="marker in data.results" :key="marker?.sensor_id" :lat-lng="getCoordinates(marker)" draggable />
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
