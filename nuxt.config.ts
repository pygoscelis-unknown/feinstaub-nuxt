// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://127.0.0.1:8000',
    },
  },

  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt3-leaflet'],
  ui: {
    global: true,
  },
  nitro: {
    runtimeConfig: {
      public: {
        apiBaseUrl: 'http://127.0.0.1:8000',
      },
    },
    routeRules: {
      '/*': {
        cors: true,
      },
    },
  },
})
