// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@vueuse/nuxt',
    'nuxt-socket-io',
    '@pinia/nuxt',
  ],
  ssr: false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  io: {
    sockets: [
      {
        name: 'bomberpix',
        url: 'ws://localhost:3003'
      }
    ]
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
