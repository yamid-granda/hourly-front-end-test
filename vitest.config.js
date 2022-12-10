import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    // setupFiles: './tests/setup.js',
    // transformMode: {
    //   web: [/\.[jt]sx$/],
    // },
  },
})