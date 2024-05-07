/** @type {import('tailwindcss').Config} */
export default {
  // content: [
  //   "./index.html",
  //   "./src/**/*.{js,ts,jsx,tsx}",
  // ],
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  safelist: [
    {
      pattern: /bg-+/,
    },
    {
      pattern: /w-+/,
    },
    {
      pattern: /h-+/,
    },
    {
      pattern: /basis-+/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

