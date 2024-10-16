export default defineNuxtConfig({
  modules: [],

  plugins: ['~/plugins/pinia.js'],

  compatibilityDate: '2024-10-16',

  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap',
      },
    ],
  },
});
