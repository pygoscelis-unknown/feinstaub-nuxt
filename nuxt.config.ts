// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: 'https://feinstaub.pygoscelis.net',
    name: 'feinstaub.pygoscelis.net',
  },

  seo: {
    meta: {
      title: 'feinstaub.pygoscelis.net',
      description: 'This is a project inspired by sensor.community. We import data from their archive and display them to try to bring them into different contexts to make the data even more useful.',
    }
  },

  runtimeConfig: {
    public: {
      // eslint-disable-next-line node/prefer-global/process
      apiBaseUrl: process.env.NUXT_API_BASE_URL,
      // eslint-disable-next-line node/prefer-global/process
      availableSensorTypes: process.env.AVAILABLE_SENSOR_TYPES?.split(', ').map(s => s.trim()) || [],
    },
  },

  devtools: { enabled: true },

  modules: ['@nuxt/ui', 'nuxt3-leaflet', '@nuxt/test-utils/module', ['@nuxtjs/google-fonts', {
    families: {
      'Titillium+Web': [200, 400, 600, 800],
    },
  }], '@vueuse/nuxt', '@nuxtjs/seo'],

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

  compatibilityDate: '2025-01-27',
})