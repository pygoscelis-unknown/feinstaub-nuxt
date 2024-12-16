// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      // eslint-disable-next-line node/prefer-global/process
      apiBaseUrl: process.env.NUXT_API_BASE_URL,
      // eslint-disable-next-line node/prefer-global/process
      availableSensorTypes: process.env.AVAILABLE_SENSOR_TYPES!.split(', ').map(s => s.trim()),
    },
  },

  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt3-leaflet', '@nuxt/test-utils/module', ['@nuxtjs/google-fonts', {
    families: {
      'Titillium+Web': [200, 400, 600, 800],
    },
  }], '@vueuse/nuxt'],
  ui: {
    global: true,
  },
  nitro: {
    runtimeConfig: {
      public: {
        // eslint-disable-next-line node/prefer-global/process
        apiBaseUrl: process.env.NUXT_API_BASE_URL,
      },
    },
    routeRules: {
      '/*': {
        cors: true,
      },
    },
  },
})