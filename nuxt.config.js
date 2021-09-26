export default {
  server: {
    port: 34343, // default: 3000
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tapastinder - Le Tinder des tapas',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Découvrez une part de la gastronomie espagnole avec le Tinder pour les tapas',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'author', name: 'author', content: 'X. Villamuera' },
      {
        hid: 'apple-mobile-web-app-capable',
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'TapasTinder',
      },
      { hid: 'twitter:site', name: 'twitter:site', content: 'tapastinder.com' },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: 'X. Villamuera',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Crypto Ticker - A cryptocurrency comparison tool',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Découvrez une part de la gastronomie espagnole avec le Tinder pour les tapas',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '/crypto-ticker-snapshot',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/crypto-ticker-snapshot.png',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'TapasTinder',
      },
      { hid: 'og:title', name: 'og:title', content: 'TapasTinder' },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          'Découvrez une part de la gastronomie espagnole avec le Tinder pour les tapas',
      },
      { hid: 'og:type', name: 'og:type', content: 'app' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/custom.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'TapasTinder',
      short_name: 'tapastinder',
      lang: 'fr',
      description:
        'Découvrez une part de la gastronomie espagnole avec le Tinder pour les tapas.',
      useWebmanifestExtension: false,
    },
    meta: {
      appleMobileWebAppCapable: true,
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  publicRuntimeConfig: {
    baseAPI: process.env.BASE_API,
  },

  /* privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET,
  }, */
}
