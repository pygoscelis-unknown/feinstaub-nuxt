// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {

      apiBaseUrl: '',
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt3-leaflet'],
  ui: {
    global: true,
  },
})
