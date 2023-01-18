// https://nuxt.com/docs/api/configuration/nuxt-config

import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt'],
  css: [
    '@unocss/reset/tailwind.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    transformers: [transformerAttributifyJsx()]
  },
  runtimeConfig: {
    token: process.env.TOKEN ?? '114514'
  },
  nitro: {
    storage: {
      fs: {
        driver: 'fs',
        base: './data/db'
      }
    }
  }
});
