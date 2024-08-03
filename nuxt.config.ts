// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL,
    },
  },

  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt3-leaflet', '@nuxt/test-utils/module'],
  ui: {
    global: true,
  },
  nitro: {
    runtimeConfig: {
      public: {
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
