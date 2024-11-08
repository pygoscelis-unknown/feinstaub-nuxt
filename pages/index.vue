<script setup lang='ts'>
const { data, pending, error } = await useFetch<ApiResponse<SensorBme280>>(`/api/bmp180`, { method: 'POST' })

interface SensorBme280 {
  sensor_id: string
  sensor_type: string
  lat: number
  lon: number
  timestamp: string
}

function formatDate(timestamp: string) {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('de', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

const { availableSensorTypes } = useSensors()
</script>

<template>
  <section class="bg-slate-100 dark:bg-black  py-20">
    <BaseContainer>
      <div class="sm:w-2/3 md:w-1/2">
        <h1 class="text-5xl font-bold mb-6">
          feinstaub.app
        </h1>
        <p class="text-xl">
          This is a project inspired by <a class="text-green-500 font-semibold" href="https://sensor.community">sensor.community</a>. We import data from
          their archive and display them to try to bring them into different contexts to make the data even more
          useful.
        </p>
        <div class="flex gap-2">
          <UButton to="/map" type="" class="mt-6">
            Show Map
          </UButton>
          <UButton target="_blank" to="https://sensor.community" variant="outline" class="mt-6">
            Go to sensor.community
          </UButton>
        </div>
      </div>
    </BaseContainer>
  </section>
  <section class="py-20">
    <BaseContainer>
      <div class="flex items-center mb-4 gap-2">
        <h2 class="font-bold text-3xl">
          Available sensor types
        </h2>
      </div>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(sensorType, index) in availableSensorTypes" :key="`sensor-type-${index}-${sensorType}`"
          class="text-xs text-slate-950 bg-slate-300 flex p-1.5 px-2 rounded flex items-center"
        >
          {{ sensorType }}
        </span>
      </div>
    </BaseContainer>
  </section>
<!--  <section class="pb-20">-->
<!--    <BaseContainer class="mb-6 flex flex-col items-start">-->
<!--      <div class="flex items-center mb-4 gap-2">-->
<!--        <h2 class="font-bold text-3xl">-->
<!--          Imports-->
<!--        </h2>-->
<!--        <p class="text-xs text-slate-950 bg-slate-300 flex p-1.5 px-2 rounded flex items-center">-->
<!--          <span class="inline-block h-2 w-2 bg-red-500 rounded-full animate-pulse mr-2" />Currently importing-->
<!--        </p>-->
<!--      </div>-->
<!--      <div class="w-full">-->
<!--        <div class="grid grid-cols-3 gap-10 font-bold border-b">-->
<!--          <span>Sensor type</span>-->
<!--          <span>Date</span>-->
<!--          <span>Rows</span>-->
<!--        </div>-->
<!--        <div class="grid grid-cols-3 gap-10 border-b py-2">-->
<!--          <span>BMP180</span>-->
<!--          <span>2024-08-04 6:00 PM</span>-->
<!--          <span>24298</span>-->
<!--        </div>-->
<!--        <div class="grid grid-cols-3 gap-10 border-b py-2">-->
<!--          <span>BME280</span>-->
<!--          <span>2024-08-04 6:00 PM</span>-->
<!--          <span>24298</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </BaseContainer>-->
<!--  </section>-->
  <section class="pb-20">
    <BaseContainer>
      <h2 class="text-3xl mb-6 font-bold">
        Sensor types
      </h2>
      <div class="grid md:grid-cols-3 gap-4">
        <UCard>
          <h3 class="font-bold mb-4">BMP180 Barometric pressure and temperature sensor</h3>
          <p>
            The BMP180 is a high precision, ultra-low power barometric pressure sensor for use in advanced mobile
            applications. It offers superior performance with an absolute accuracy of down to 0.03 hPa.
          </p>
        </UCard>
        <UCard>
          <h3>BME280 Humidity, temperature and pressure sensor</h3>
          <p>
            The BME280 is a humidity sensor especially developed for mobile applications and wearables where size and
            low power consumption are key design constraints.
          </p>
        </UCard>
        <UCard>
          <h3>SDS011 Particulate matter sensor</h3>
          <p>
            The SDS011 is a professional laser dust sensor. It uses laser scattering to ensure high accuracy and
            consistency.
          </p>
        </Ucard>
      </div>
    </BaseContainer>
  </section>
<!--  <section>-->
<!--    <BaseContainer v-if="pending">-->
<!--      <p>Data loading...</p>-->
<!--    </BaseContainer>-->
<!--    <BaseContainer v-else-if="data">-->
<!--      <h2 class="font-bold mb-6 text-3xl">-->
<!--        Sensor data-->
<!--      </h2>-->
<!--      <div class="grid md:grid-cols-3 gap-4">-->
<!--        <div v-for="(item, index) in data.results" :key="`sensor-${item.sensor_id}-${index}`">-->
<!--          <UCard>-->
<!--            <template #header>-->
<!--              <p>Sensor ID: {{ item.sensor_id }}</p>-->
<!--            </template>-->
<!--            <div class="mb-4">-->
<!--              <p>sensor_type: {{ item.sensor_type }}</p>-->
<!--              <p>Latitude: {{ item.lat }}</p>-->
<!--              <p>Longitude: {{ item.lon }}</p>-->
<!--              <p>Longitude: {{ item.lon }}</p>-->
<!--              <p>timestamp: {{ formatDate(item.timestamp) }}</p>-->
<!--            </div>-->
<!--            <code class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-4 pl-6">-->
<!--              {{ item }}-->
<!--            </code>-->
<!--          </UCard>-->
<!--        </div>-->
<!--      </div>-->
<!--    </BaseContainer>-->
<!--    <div v-else-if="error">-->
<!--      <UAlert-->
<!--        icon="i-heroicons-command-line"-->
<!--        color="red"-->
<!--        variant="subtle"-->
<!--        title="An error occurred"-->
<!--        :description="error"-->
<!--      />-->
<!--    </div>-->
<!--  </section>-->
</template>
