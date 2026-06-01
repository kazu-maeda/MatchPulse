import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',

        manifest: {
          name: 'MatchPulse',
          short_name: 'MatchPulse',
          description: '2026 FIFA World Cup Match Tracker',
          theme_color: '#111111',
          background_color: '#111111',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },

        workbox: {
          // 静的アセットをすべてプリキャッシュ
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
          // SPA: オフライン時のナビゲーションは index.html にフォールバック
          navigateFallback: 'index.html',
          runtimeCaching: [
            {
              // API: 常に最新を取得し、失敗時はキャッシュから返す（最大5分）
              urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 5,
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 5,
                },
              },
            },
            {
              // 画像: キャッシュ優先（30日）
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },

        // 開発中は SW を無効化（キャッシュでデバッグが困難になるため）
        devOptions: {
          enabled: false,
        },
      }),
    ],

    server: {
      proxy: {
        '/api/football-data': {
          target: 'https://api.football-data.org/v4',
          changeOrigin: true,
          rewrite: () => '/competitions/WC/matches',
          headers: env.FOOTBALL_API_KEY
            ? { 'X-Auth-Token': env.FOOTBALL_API_KEY }
            : {},
        },
      },
    },
  }
})
