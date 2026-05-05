import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel and most modern hosts prefer '/' as the base.
  base: '/', 
  build: {
    // Ensuring chunks are handled correctly for Vercel's edge network
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
