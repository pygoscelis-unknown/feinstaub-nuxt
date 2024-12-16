<script setup lang="ts">
import { getCoordinates, getParticulateMatterColor } from '~/utils/utils'

interface SensorHpm {
  url: string
  sensor_id: number
  sensor_type: 'HPM'
  location: number
  lat: number
  lon: number
  timestamp: string
  P1: number
  P2: number
}

const props = defineProps<SensorHpm>()
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
