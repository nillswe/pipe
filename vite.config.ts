import {defineConfig} from 'vitest/config'
// import react from '@vitejs/plugin-react-swc'
import react from '@vitejs/plugin-react'
import {crx} from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import eslint from 'vite-plugin-eslint'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint(), react(), crx({manifest})],
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
