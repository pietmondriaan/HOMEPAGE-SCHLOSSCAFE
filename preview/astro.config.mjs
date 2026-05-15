import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://www.cafemitherz.at',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
})
