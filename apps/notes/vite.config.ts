import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { appBasePath } from '@portfolio/config/routes-config'

export default defineConfig({
  base: appBasePath('notes', process.env.VITE_SITE_BASE),
  plugins: [react()],
})
