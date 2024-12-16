<script setup lang="ts">
import { getCoordinates, getParticulateMatterColor } from '~/utils/utils'

interface SensorPpd42ns {
  url: string
  sensor_id: number
  sensor_type: 'PPD42NS'
  location: number
  lat: number
  lon: number
  timestamp: string
  P1: number
  P2: number
  P0: number | null
}

const props = defineProps<SensorPpd42ns>()
</script>

<template>
  <LCircle
    :key="props?.sensor_id"
    :opacity="1"
    :fill-color="getParticulateMatterColor(props.P1)"
    :color="getParticulateMatterColor(props.P1)"
    :radius="50000"
    :weight="2"
    :lat-lng="getCoordinates(props)"
    draggable
  />
</template>
