import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { appBasePath } from '@portfolio/routes/config'

export default defineConfig({
  base: appBasePath('gateway', process.env.VITE_SITE_BASE),
  plugins: [react()],
})
