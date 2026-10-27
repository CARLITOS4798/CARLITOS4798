import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Rutas relativas: la página funciona en cualquier dirección o subcarpeta
  // (GitHub Pages, Netlify, etc.). Es posible porque la navegación usa el "#".
  base: './',
})
