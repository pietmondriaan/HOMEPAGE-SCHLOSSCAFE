import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // Remote-Preview vom ThinkPad über Tailscale-MagicDNS erlauben (nur Dev/Preview, kein Build-Effekt)
  preview: {
    allowedHosts: ['desktop-7v6hgj4.taild7d91a.ts.net'],
  },
  server: {
    allowedHosts: ['desktop-7v6hgj4.taild7d91a.ts.net'],
  },
})
