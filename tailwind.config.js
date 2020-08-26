module.exports = {
  theme: {
    extend: {
      colors: {
        dark: {
          '100': "#969696",
          '200': '#585858',
          '300': '#3F3F3F',
          '500': "#1C1C1C",
        }
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
