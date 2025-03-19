import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_API_BASE_URL,
  server: {
    proxy: {
      '/api': {
        target: 'process.env.VITE_API_BASE_URL', // Change this to your backend URL
        changeOrigin: true,
      }
    }
  }
})
