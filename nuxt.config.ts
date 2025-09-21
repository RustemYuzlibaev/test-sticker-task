// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      consultService: process.env.NUXT_PUBLIC_CONSULT_SERVICE,
    },
  },
  devtools: { enabled: true },
  ssr: false,
  css: [
    "/assets/css/main.css",
    "normalize.css/normalize.css",
    "~/assets/scss/main.scss",
  ],
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
  ],
  ui: {
    colorMode: false,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables.scss" as *;',
        },
      },
    },
  },
});
