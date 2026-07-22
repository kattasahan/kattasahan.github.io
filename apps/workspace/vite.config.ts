import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { appBasePath } from '@portfolio/config/routes'

export default defineConfig({
  base: appBasePath('workspace', process.env.VITE_SITE_BASE),
  plugins: [react()],
})
