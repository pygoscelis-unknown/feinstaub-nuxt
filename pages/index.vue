<script setup lang='ts'>
const { availableSensorTypes } = useSensors()

const sensorContent
  = [
    {
      title: 'HPM (Honeywell Particle Sensor)',
      text: 'The HPM series is a high-accuracy particulate matter sensor that uses laser-based light scattering to measure PM2.5 and PM10 concentrations in the air. It is widely used in air quality monitoring systems due to its reliability and long lifespan.',
    },
    {
      title: 'PMS3003',
      text: 'The PMS3003 is a laser-based particulate matter sensor from Plantower that measures PM1.0, PM2.5, and PM10. It\'s commonly used in consumer-grade air purifiers, IoT devices, and air quality monitoring stations.',
    },
    {
      title: 'PMS6003',
      text: 'The PMS6003, also from Plantower, is an upgraded version of the PMS3003 with improved measurement stability and accuracy for PM1.0, PM2.5, and PM10. It is used in environmental monitoring and smart home applications.',
    },
    {
      title: 'PPD42NS',
      text: 'The PPD42NS is an optical dust sensor by Sharp that detects particulate matter (particularly PM2.5) using infrared light scattering. It is a low-cost option for basic air quality applications like DIY projects and simple air monitors.',
    },
  ]
</script>

<template>
  <section id="start" class="bg-slate-100 dark:bg-zinc-900 py-20">
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
  <section id="available-sensor-types" class="dark:bg-zinc-900 py-20">
    <BaseContainer>
      <div class="flex items-center mb-4 gap-2">
        <h2 class="font-bold text-3xl">
          Available sensor types
        </h2>
      </div>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(sensorType, index) in availableSensorTypes" :key="`sensor-type-${index}-${sensorType}`"
          class="text-xs text-slate-950 bg-slate-300 dark:bg-green-950 dark:text-green-200 flex p-1.5 px-2 rounded flex items-center"
        >
          {{ sensorType }}
        </span>
      </div>
    </BaseContainer>
  </section>
  <section id="recent-imports" class="bg-slate-100 dark:bg-zinc-900 py-20">
    <BaseContainer class="mb-6 flex flex-col items-start">
      <div class="flex items-center mb-4 gap-2">
        <h2 class="font-bold text-3xl">
          Recent imports
        </h2>
      </div>
      <div class="w-full">
        <div class="grid grid-cols-4 gap-10 font-bold border-b">
          <span>Date</span>
          <span>Sensor type</span>
          <span>Rows</span>
          <span>Status</span>
        </div>
        <div class="grid grid-cols-4 gap-10 border-b py-2">
          <span>2024-08-04 6:00 PM</span>
          <span>BMP180</span>
          <span>24298</span>
          <div>
            <span
              class="animate-pulse text-xs text-yellow-950 bg-yellow-300 dark:bg-green-950 dark:text-green-200 p-1.5 px-2 rounded inline"
            >
              In progress
            </span>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-10 border-b py-2">
          <span>2024-08-04 6:00 PM</span>
          <span>BME280</span>
          <span>24298</span>
          <div>
            <span
              class="text-xs text-green-950 bg-green-300 dark:bg-green-950 dark:text-green-200 p-1.5 px-2 rounded"
            >
              Done
            </span>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
  <section id="sensor-types" class="py-20">
    <BaseContainer>
      <h2 class="text-3xl mb-6 font-bold">
        Sensor types
      </h2>
      <div class="grid md:grid-cols-3 gap-4">
        <UCard v-for="(sensor, index) in sensorContent" :key="`${sensor.title}-${index}`">
          <h3 class="font-bold mb-4">
            {{ sensor.title }}
          </h3>
          <p>
            {{ sensor.text }}
          </p>
        </UCard>
      </div>
    </BaseContainer>
  </section>
</template>
