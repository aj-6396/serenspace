import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  // Explicitly setting base to root for Vercel
  base: '/',
  build: {
    // Explicitly naming the output directory
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    // Ensure the index.html is correctly placed
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
