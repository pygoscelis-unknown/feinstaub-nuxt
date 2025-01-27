<script setup lang="ts">
import { getCoordinates, getParticulateMatterColor } from '~/utils/utils'

interface SensorPms5003 {
  url: string
  // eslint-disable-next-line vue/prop-name-casing
  sensor_id: number
  // eslint-disable-next-line vue/prop-name-casing
  sensor_type: 'PMS6003'
  location: number
  lat: number
  lon: number
  timestamp: string
  // eslint-disable-next-line vue/prop-name-casing
  P1: number
  // eslint-disable-next-line vue/prop-name-casing
  P2: number
  // eslint-disable-next-line vue/prop-name-casing
  P0: number | null
}

const props = defineProps<SensorPms5003>()
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
