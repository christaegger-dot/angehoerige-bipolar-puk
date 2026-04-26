import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      all: true,
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/styles.css', 'src/illustrations.jsx'],
    },
  },
})
