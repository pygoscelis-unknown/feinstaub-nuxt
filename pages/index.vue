<script setup lang='ts'>
const config = useRuntimeConfig()
const { data, pending, error } = useFetch<string>(`${config.public.apiBaseUrl}/bme280s/`)

interface SensorBme280 {
  sensor_id: string
  sensor_type: string
  lat: number
  lon: number
  timestamp: string
}
const sanitizedData = ref<Array<SensorBme280> | null>(null)

if (data.value)
  sanitizedData.value = JSON.parse(data.value.replace(/\bNaN\b/g, 'null'))

function formatDate(timestamp: string) {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('de', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}
</script>

<template>
  <section class="py-10">
    <BaseContainer>
      <section>
        <h1 class="text-5xl mb-6">
          feinstaub.app headline für hero section
        </h1>
      </section>
      <section>
        <div v-if="pending">
          <p>Data loading...</p>
        </div>
        <div v-else-if="data" class="grid md:grid-cols-3 gap-4">
          <div v-for="(item, index) in sanitizedData" :key="`sensor-${item.sensor_id}-${index}`">
            <UCard>
              <template #header>
                <p>Sensor ID: {{ item.sensor_id }}</p>
              </template>
              <div class="mb-4">
                <p>sensor_type: {{ item.sensor_type }}</p>
                <p>Latitude: {{ item.lat }}</p>
                <p>Longitude: {{ item.lon }}</p>
                <p>Longitude: {{ item.lon }}</p>
                <p>timestamp: {{ formatDate(item.timestamp) }}</p>
              </div>
              <code class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-4 pl-6">
                {{ item }}
              </code>
            </UCard>
          </div>
        </div>
        <div v-else-if="error">
          <UAlert
            icon="i-heroicons-command-line"
            color="red"
            variant="subtle"
            title="An error occurred"
            :description="error"
          />
        </div>
      </section>
    </BaseContainer>
  </section>
</template>
