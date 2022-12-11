import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, './src'),
    }
  },

  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'sass:math';
          @use "./src/styles/index" as *;
        `,
      },
    },
  },
})
