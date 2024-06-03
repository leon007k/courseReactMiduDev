import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Entorno donde se ejecutaran los test
  test: {
    environment: 'happy-dom'
  }
})
