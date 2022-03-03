const customColor = {
  'ls-blue-100': 'rgb(165,198,243)',
  'ls-blue-200': 'rgb(148,179,221)',
  'ls-blue-300': 'rgb(70, 138, 211)',
  'ls-blue-400': 'rgb(20, 115, 188)',
  'ls-blue-500': 'rgb(15, 49, 99)',
  'ls-blue-550': 'rgb(0, 49, 103)',
  'ls-blue-600': 'rgb(0, 95, 178)',
  'ls-blue-700': 'rgb(22, 40, 76)',
  'ls-blue-800': 'rgb(11, 22, 53)',
  'ls-blue-900': 'rgb(2, 12, 42)',
  'ls-gray-100': 'rgb(208,211,218)'
}

const generateRotateBy45Deg = () => {
  return Array.from({ length: 8 }, (_, index) => {
    return 'rotate-' + (index + 1) * 45
  })
}

module.exports = {
  attributify: true,
  safelist: [
    generateRotateBy45Deg(),
    ['rotate-585']
  ],
  extract: {
    include: [
      'src/**/*.{vue,jsx,tsx,svelte}',
      'shared/**/*.{vue,ts}'
    ]
  },
  theme: {
    extend: {
      colors: customColor,
      backgroundColor: theme => ({
        ...theme('colors'),
        'header': '#0f4c81',
        ...customColor
      }),
      screens: {
        'ls': { min: '2560px' }
      },
      fontFamily: {
      }
    }
  }
}
