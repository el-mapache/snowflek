const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  theme: {
    extend: {
      colors: {
        offwhite: '#F0EDDC',
        yellow: {
          ...defaultTheme.colors.yellow,
          droplet: '#f7E2B3',
          'droplet-dark': '#F7D894',
          'droplet-light': '#F7E9CA',
        },
        green: {
          ...defaultTheme.colors.green,
          droplet: '#97B5A8',
          'droplet-light': '#76DDA5',
          'droplet-dark': '#0cd37d'
        },
        gray: {
          ...defaultTheme.colors.gray,
          droplet: '#BAACA4',
        },
        purple: {
          ...defaultTheme.colors.purple,
          droplet: '#846085',
          'droplet-light': '#c099c2'
        },
        midnight: '#2B4682',
        orange: {
          ...defaultTheme.colors.orange,
          droplet: '#F6A067',
          'droplet-dark': "#d34612"
        },
        peach: '#FCD5B8',
        black: {
          ...defaultTheme.colors.black,
          droplet: '#24263d',
          'droplet-light': '#41435c'
        },
        blue: {
          ...defaultTheme.colors.blue,
          droplet: '#7ebcf5',
          'droplet-dark': '#3897f0'
        },
        steelblue: '#2f3D58'
      }
    }
  },
  variants: {
    margin: ['last']
  }
};
