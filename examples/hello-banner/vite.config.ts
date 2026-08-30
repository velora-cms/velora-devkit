import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'com_example_hello_banner',
      filename: 'remoteEntry.js',
      exposes: {
        './plugin': './src/plugin.tsx',
      },
      // Mirror of the Velora admin host's singletons: at runtime the
      // plugin's react/SDK imports resolve to the HOST's copies — same
      // registry, same context hooks. Never remove these.
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@velora-cms/plugin-sdk': { singleton: true, requiredVersion: '*' },
      },
    }),
  ],
  build: {
    target: 'chrome89',
  },
  server: {
    // velora-dev's dev-mode hot reload (Session 79) fetches
    // remoteEntry.js cross-origin from this dev server — needs its own
    // CORS flag, same reason preview.cors exists below for the
    // build+preview path.
    cors: true,
  },
  preview: {
    port: 5175,
    // The Velora admin fetches remoteEntry.js cross-origin — Vite 6's
    // tightened default CORS would block it.
    cors: true,
  },
})
