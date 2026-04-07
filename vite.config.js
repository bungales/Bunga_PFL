import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pertemuan2: resolve(__dirname, 'pertemuan-2.html'),
        pertemuan3: resolve(__dirname, 'pertemuan-3.html'),
      },
    },
  },
})
