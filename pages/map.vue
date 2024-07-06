<script setup lang='ts'>
import { ref } from 'vue'
import type { LatLngExpression } from 'leaflet'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const selectedMonth = ref(months[0])

const zoom = ref(6)
const { data, pending } = await useFetch<SensorPms1003>(`/api/pms1003`, { method: 'POST', query: { month: selectedMonth } })

function getCoordinates(marker: SensorPms1003): LatLngExpression {
  return { lat: marker.lat, lng: marker.lon }
}
function updateLatLng(event: any) {
  // eslint-disable-next-line no-console
  console.info('updateLatLng', event)
}
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
          :center="[51.1657, 10.4515]"
          @update:center="updateLatLng($event)"
        >
          <LMarker v-for="marker in data" :key="marker?.sensor_id" :lat-lng="getCoordinates(marker)" draggable />
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
