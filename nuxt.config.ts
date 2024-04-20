// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'https://feinstaub-django.onrender.com'
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  ui: {
    global: true,
  },
})
