import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'
// @ts-ignore
import eslint from 'vite-plugin-eslint'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint(), react()],
  build: {
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: {
        // popup page
        index: './index.html',

        // service worker
        background: './src/scripts/background.ts',
        clearPageContent: './src/scripts/clear-page-content.ts',
        reactMain: './src/main.tsx',

        // content scripts
        content: './src/scripts/content.ts',
      },
      output: {
        entryFileNames: `[name].js`,
        assetFileNames: '[name].[ext]',
      },
    },
  },

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
