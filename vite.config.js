import { defineConfig } from 'vite'
import sass from 'sass';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
})
