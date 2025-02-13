<script setup lang="ts">
const props = defineProps<{
  url: string
  sensor_id: number
  sensor_type: 'PMS1003'
  location: number
  lat: number
  lon: number
  timestamp: string
  P1: number
  P2: number
  P0: number | null
}>()
</script>

<template>
  <BaseSensor v-bind="props" />
</template>
