import fs from 'node:fs/promises'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Netlify liefert für unbekannte Adressen 404.html mit Status 404 aus (netlify.toml). Die Datei ist
// die App selbst; sie zeigt an jeder unbekannten Adresse die Seite «Diese Seite gibt es nicht».
function notFoundPage() {
  let outDir
  return {
    name: 'puk-404-page',
    apply: 'build',
    configResolved(config) { outDir = path.resolve(config.root, config.build.outDir) },
    async closeBundle() { await fs.copyFile(path.join(outDir, 'index.html'), path.join(outDir, '404.html')) },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), notFoundPage()],
  // Generated filenames contain a content hash. Fixed public assets stay outside
  // this namespace, so deployment headers can safely cache only these forever.
  build: { assetsDir: 'assets/build' },
  test: {
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      all: true,
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/styles.css', 'src/illustrations.jsx'],
      thresholds: {
        lines: 70,
        functions: 60,
        branches: 55,
        statements: 60,
      },
    },
  },
})
