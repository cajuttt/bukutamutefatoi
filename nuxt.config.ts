// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
  ],
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  devtools: { enabled: false },
  compatibilityDate: '2024-04-03',
  supabase: {
    redirect: false
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'id',
      },
      script: [
        { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2/dist/js/bootstrap.bundle.min.js" },
      ]
    }
  },
})
