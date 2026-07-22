import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { appBasePath } from '@portfolio/config/routes'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: appBasePath('notes', process.env.VITE_SITE_BASE),
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        whyThisPortfolio: resolve(root, 'why-this-portfolio/index.html'),
        buildingTheGateway: resolve(root, 'building-the-gateway/index.html'),
        designSystemDecisions: resolve(root, 'design-system-decisions/index.html'),
        sharedComponents: resolve(root, 'shared-components/index.html'),
        routingAndDeployment: resolve(root, 'routing-and-deployment/index.html'),
        whatILearned: resolve(root, 'what-i-learned/index.html'),
      },
    },
  },
})
