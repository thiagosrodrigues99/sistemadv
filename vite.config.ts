import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'novo.png'],
      manifest: {
        name: 'JSS Advocacia',
        short_name: 'JSS Advocacia',
        description: 'Sistema de Gestão de Leads e Fichas Jurídicas',
        theme_color: '#111234',
        start_url: '/painel',
        display: 'standalone',
        icons: [
          {
            src: 'app-icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'app-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
  },
});
