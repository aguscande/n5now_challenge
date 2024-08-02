import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': "/src",
    },
  },
  build: {
    manifest: true,
    chunkSizeWarningLimit: 1000, // size in KB
  },
  server: {
    host: true,
    port: 4173,
  },
})
