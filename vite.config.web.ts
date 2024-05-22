import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'
// @ts-ignore
import eslint from 'vite-plugin-eslint'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
  },
})
