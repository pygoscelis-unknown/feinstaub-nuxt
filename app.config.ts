export default defineAppConfig({
  ui: {
    primary: 'green-800',
    gray: 'cool',
    strategy: 'merge',
    colors: ['green'],
    button: {
      color: {
        primary: {
          solid: 'bg-green-800 text-white hover:bg-green-900',
          outline: 'border border-green-800 text-green-800 hover:bg-green-50'
        }
      }
    },
    card: {
      background: 'bg-white dark:bg-green-950',
      button: {
        font: 'font-bold',
      },
    },
  },
})
