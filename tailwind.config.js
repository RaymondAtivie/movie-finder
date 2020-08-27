module.exports = {
  theme: {
    extend: {
      screens: {
        'light-mode': { raw: '(prefers-color-scheme: light)' }
      },
      colors: {
        white: "var(--white)",
        dark: {
          '100': "var(--dark-100)",
          '200': 'var(--dark-200)',
          '300': 'var(--dark-300)',
          '500': "var(--dark-500)",
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
