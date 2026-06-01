# MatchPulse

**2026 FIFA World Cup — Match Tracker PWA**

> Track every match. Never miss kickoff.

本番URL: **https://matchpulse-omega.vercel.app**  
GitHub: **https://github.com/kazu-maeda/MatchPulse**

---

## 概要

2026 FIFA ワールドカップ（アメリカ・カナダ・メキシコ共催）の全試合をフォローするための観戦サポートアプリ。

試合データは [football-data.org](https://www.football-data.org/) の API からリアルタイムに取得。APIキーはサーバーサイド（Vercel Serverless Function）でのみ保持し、フロントエンドには一切露出しない構成を採用しています。

スマートフォンのホーム画面にインストール可能な PWA として実装済み。

---

## スクリーンショット

> スマホファースト設計（390px 基準）。  
> PC（1024px 以上）では夜のスタジアム画像を全画面背景に、アプリ UI が中央にフロートする構成。

---

## 使用技術

| カテゴリ | 技術・ライブラリ |
|---|---|
| UI | React 18 |
| ビルド | Vite 6 |
| ルーティング | React Router v6 |
| スタイリング | Vanilla CSS（CSS カスタムプロパティ） |
| PWA | vite-plugin-pwa / Workbox |
| 状態管理 | React Hooks（useState / useEffect / useRef） |
| データ永続化 | localStorage（お気に入りチーム） |
| API | football-data.org v4 |
| サーバーレス | Vercel Serverless Functions |
| デプロイ | Vercel |

外部 UI ライブラリ・CSS フレームワークは使用していません。

---

## 主な機能

| 機能 | 説明 |
|---|---|
| 試合データ取得 | football-data.org API から WC 2026 全 104 試合を取得 |
| フォールバック | API 失敗時はダミーデータで画面を継続表示 |
| 開幕カウントダウン | WC 開幕・次のキックオフまでをリアルタイム更新（1 秒間隔） |
| 試合スケジュール | 日付タブで絞り込み / 試合結果タブ切り替え |
| 注目試合 | 日本戦・ライバルカードを自動ピックアップして優先表示 |
| お気に入りチーム | 応援チームを登録、関連試合をホーム画面に集約（localStorage 永続化） |
| グループ順位表 | 試合結果から勝点・得失点差を自動集計、API 失敗時はフォールバック |
| PWA インストール | Android: バナーからワンタップインストール / iOS: Safari 共有メニュー経由 |
| オフライン対応 | Service Worker がアプリシェルをキャッシュ、オフラインでも基本画面を表示 |
| PC レイアウト | スタジアム背景 + フロート UI のデスクトップビュー |

---

## 設計の工夫

### APIキーをフロントに露出しない構成

Vercel Serverless Function（`api/football-data.js`）をプロキシとして挟み、APIキーはサーバー側の環境変数（`FOOTBALL_API_KEY`）としてのみ保持しています。

`VITE_` プレフィックスを付けないことで、Vite のビルド時に環境変数がバンドルに注入されないことを保証しています。

```
ブラウザ
  └─→ /api/football-data?season=2026     （APIキー不要）
        └─→ Vercel Function               （process.env.FOOTBALL_API_KEY を使用）
              └─→ football-data.org API   （X-Auth-Token ヘッダーで認証）
```

ローカル開発では Vite の `server.proxy` が同じプロキシ役を担い、本番と同じフロントのコードがそのまま動作します。

### モジュールレベルキャッシュによる API 呼び出しの最適化

`useMatches.js` では Promise と取得済みデータをモジュールスコープに保持しています。React Strict Mode の二重レンダリング・複数コンポーネントからの同時利用でも、API リクエストが一度しか発行されません。

```js
let _cache   = null   // 取得済みデータ
let _pending = null   // 進行中の Promise（重複リクエスト防止）
```

### グレースフルデグレード

API が返すステータスコードに応じて具体的なエラーメッセージを表示しつつ、ダミーデータにフォールバックして全画面を継続表示します。ユーザーが白画面を見ることはありません。

### PWA キャッシュ戦略の分離

API レスポンスと静的アセットでキャッシュ戦略を使い分けています。

| 対象 | 戦略 | 理由 |
|---|---|---|
| `/api/*` | NetworkFirst（5 秒タイムアウト） | 常に最新データを優先、オフライン時はキャッシュ |
| 画像 | CacheFirst（30 日） | 変更頻度が低く、毎回フェッチする必要がない |
| JS / CSS / HTML | Precache | ビルド時に全ファイルをリスト化して確実にキャッシュ |

---

## API セキュリティ構成

```
.env.local（gitignore 済み、ローカル開発用）
  FOOTBALL_API_KEY=xxxx   ← VITE_ プレフィックスなし

Vercel 環境変数（暗号化保存、Production のみ）
  FOOTBALL_API_KEY=xxxx

api/football-data.js（Vercel Serverless Function）
  process.env.FOOTBALL_API_KEY でアクセス
  → キーは絶対にブラウザに届かない
```

**確認方法**: 本番バンドル（`dist/assets/*.js`）を grep してもキー値は検出されません。

---

## PWA 対応

- **manifest.webmanifest** — name / theme_color / display: standalone / orientation: portrait
- **Service Worker** — Workbox による自動生成、precache + runtime cache
- **アイコン** — 192×192 / 512×512 PNG（黒背景×白ラインのサッカーボールデザイン）
- **Apple 対応** — `apple-mobile-web-app-capable` / `apple-touch-icon` meta タグ
- **インストールバナー** — Android Chrome の `beforeinstallprompt` イベントを捕捉して表示

アイコンのデザインを変更する場合は `public/icons/icon-source.svg` を編集後、`npm run generate-icons` で PNG を再生成してください。

---

## ローカル開発

### 事前準備

[football-data.org](https://www.football-data.org/client/register) で無料 API キーを取得してください（無料プランで WC データにアクセス可能）。

```bash
git clone https://github.com/kazu-maeda/MatchPulse.git
cd MatchPulse
npm install
```

`.env.local` を作成（VITE_ プレフィックスは付けないこと）:

```
FOOTBALL_API_KEY=your_api_key_here
```

```bash
npm run dev       # 開発サーバー起動 → http://localhost:5173
npm run build     # 本番ビルド
npm run preview   # ビルド結果の確認
```

API キーがない状態でも、エラーに応じてダミーデータにフォールバックするため全画面を確認できます。

---

## ディレクトリ構成

```
├── api/
│   └── football-data.js      # Vercel Serverless Function（APIプロキシ）
├── public/
│   ├── icons/
│   │   ├── icon-source.svg   # アイコン差し替え用ソース
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── images/               # スタジアム背景・トロフィー
├── scripts/
│   └── generate-icons.js     # npm run generate-icons
└── src/
    ├── components/
    │   ├── WcHero.jsx         # 開幕ヒーロー + カウントダウン
    │   ├── Countdown.jsx      # 次の試合ヒーローカード
    │   ├── MatchCard.jsx      # 試合カード
    │   ├── FeaturedCard.jsx   # 注目試合カード
    │   ├── StatsBar.jsx       # ダッシュボードバー
    │   ├── BottomNav.jsx      # ボトムナビゲーション
    │   ├── InstallBanner.jsx  # PWA インストールバナー
    │   └── NotificationButton.jsx
    ├── pages/
    │   ├── Home.jsx           # トップページ
    │   ├── Matches.jsx        # 試合スケジュール / 結果
    │   ├── Favorites.jsx      # お気に入りチーム管理
    │   └── Standings.jsx      # グループ順位表
    ├── hooks/
    │   ├── useMatches.js      # API 取得 + モジュールキャッシュ + フォールバック
    │   ├── useFavorites.js    # localStorage お気に入り管理
    │   ├── useCountdown.js    # リアルタイムカウントダウン
    │   └── useInstallPrompt.js
    ├── services/
    │   └── footballApi.js     # API レスポンス → 内部フォーマット変換
    ├── data/
    │   ├── matches.js         # フォールバック用ダミーデータ + ヘルパー関数
    │   ├── teams.js           # 全 48 チーム情報（TLA / 国旗）
    │   └── groups.js          # グループ順位フォールバックデータ
    └── styles/
        └── globals.css        # CSS カスタムプロパティベースのデザインシステム
```

---

## 今後の実装予定

- **LIVE スコア更新** — 試合中のポーリングによるリアルタイムスコア反映
- **プッシュ通知** — Service Worker + Web Push API でキックオフ前通知
- **トーナメント表** — ラウンド 16 以降の対戦ブラケット表示
- **OGP / シェア機能** — 試合カードの SNS シェア対応
- **Capacitor によるネイティブ化** — App Store / Google Play への申請対応

---

## デザインシステム

```css
--ink:        #070707   /* 深い黒（ベース背景） */
--off-white:  #f0ebe2   /* アイボリーホワイト（テキスト） */
--gold:       #c8a84b   /* プレステージゴールド（アクセント） */
--live:       #c94040   /* ライブバッジ */
```

Apple / Nike Football / DAZN を参照し、余白・タイポグラフィ・カード設計を統一。ネオン・グロー系エフェクトを意図的に排除し、上質なスポーツブランドの質感を目指しました。

---

## ライセンス

MIT

---

*MatchPulse — Track every match. Never miss kickoff.*
