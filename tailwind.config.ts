import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "dark": "#363A43",
        "bd-grey": '#D9DEE3',
        "grey-200": '#5A6170',
        "gray-300": '#CBCFD6',
        "grey-400": '#9BA0A4',
        "blue": '#0066DF', 
        "grey": '#6a7383'
      }
    },
  },
  plugins: [],
}
export default config
