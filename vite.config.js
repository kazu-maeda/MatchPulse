import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // VITE_ プレフィックスなしで全変数を読む（サーバー側のみ）
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/football-data': {
          target: 'https://api.football-data.org/v4',
          changeOrigin: true,
          // パスを WC 試合エンドポイントに固定、クエリ文字列はそのまま転送される
          rewrite: () => '/competitions/WC/matches',
          headers: env.FOOTBALL_API_KEY
            ? { 'X-Auth-Token': env.FOOTBALL_API_KEY }
            : {},
        },
      },
    },
  }
})
