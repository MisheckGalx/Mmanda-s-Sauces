import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false,
    // Remove HMR (Hot Module Replacement) for production-like behavior
    hmr: process.env.NODE_ENV === 'production' ? false : true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
  publicDir: 'public',
})

