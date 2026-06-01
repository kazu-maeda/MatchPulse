# MatchPulse

**2026 FIFA World Cup — Match Tracker PWA**

> Track every match. Never miss kickoff.

本番URL: **https://matchpulse-omega.vercel.app**  
GitHub: **https://github.com/kazu-maeda/MatchPulse**

---

## 概要

2026 FIFA ワールドカップ（USA・Canada・Mexico 共催、全48チーム・104試合）の観戦サポート PWA。

[football-data.org](https://www.football-data.org/) の API からリアルタイムにデータを取得。APIキーは Vercel Serverless Function のみが保持し、フロントエンドのバンドルには一切含まれません。グループ順位表・決勝トーナメント表はどちらも API データを自動反映し、API 失敗時はダミーデータにフォールバックして白画面を防ぎます。

スマートフォンのホーム画面にインストール可能な PWA として実装しており、オフラインでもアプリシェルが表示されます。

---

## 使用技術

| カテゴリ | 技術 |
|---|---|
| UI | React 18 |
| ビルド | Vite 6 |
| ルーティング | React Router v6 |
| スタイリング | Vanilla CSS（CSS カスタムプロパティ） |
| PWA | vite-plugin-pwa / Workbox |
| 状態管理 | React Hooks（useState / useEffect / useRef / useMemo） |
| データ永続化 | localStorage（お気に入りチーム） |
| API | football-data.org v4 |
| サーバーレス | Vercel Serverless Functions（API プロキシ） |
| デプロイ | Vercel |

外部 UI ライブラリ・CSS フレームワークは使用していません。

---

## 主な機能

### データ取得・表示

| 機能 | 説明 |
|---|---|
| リアルタイム試合データ | football-data.org API から WC 2026 全 104 試合を取得 |
| グレースフルデグレード | API 失敗時はダミーデータへ自動フォールバック、全画面継続表示 |
| モジュールキャッシュ | API リクエストを 1 回に抑制（10req/分の無料プラン制限に対応） |
| 開幕カウントダウン | WC 開幕・次のキックオフまでをリアルタイム更新（1 秒間隔） |

### 試合スケジュール・結果

| 機能 | 説明 |
|---|---|
| 試合スケジュール | 日付タブで絞り込み（JST 換算） |
| 試合結果 | 終了した試合を日付別に一覧表示 |
| 注目試合 | 日本戦・ライバルカードを自動ピックアップして優先表示 |

### グループ順位表

| 機能 | 説明 |
|---|---|
| 自動集計 | FINISHED 試合のスコアから勝点・得失点差をリアルタイム計算 |
| フォールバック | API 失敗時は静的ダミーデータで表示 |
| 決勝進出ハイライト | 上位 2 チームの順位番号をゴールドで強調 |

### 決勝トーナメント表

| 機能 | 説明 |
|---|---|
| ブラケット表示 | Round of 32 → Final まで横スクロールで全ラウンドを表示 |
| SVG ブラケット線 | ラウンド間の接続線を数学的計算で正確に描画 |
| API 自動反映 | グループステージ終了後、チームが確定次第ブラケットに表示 |
| 未確定表示 | チーム未確定の枠はプレースホルダーとして薄色表示 |
| 勝者ハイライト | `winnerId` セットでゴールドカラーによる勝者強調表示 |

### お気に入り・通知

| 機能 | 説明 |
|---|---|
| お気に入りチーム | 全 48 チームから登録、関連試合をホーム画面に集約（localStorage 永続化） |
| 通知ボタン | Web Notification API によるキックオフ前通知の導線 |

### PWA・デザイン

| 機能 | 説明 |
|---|---|
| PWA インストール | Android: バナーからワンタップ / iOS: Safari 共有メニュー経由 |
| オフライン対応 | Service Worker がアプリシェルをキャッシュ |
| PC レイアウト | スタジアム背景 + フロート UI のデスクトップビュー |

---

## 設計の工夫

### APIキーをフロントに露出しない構成

Vercel Serverless Function（`api/football-data.js`）をプロキシとして挟み、APIキーはサーバー側の環境変数（`FOOTBALL_API_KEY`）としてのみ保持しています。`VITE_` プレフィックスを付けないことで、Vite のビルド時にキーがバンドルへ注入されることを防いでいます。

```
ブラウザ
  └→ /api/football-data?season=2026   （キーなし）
      └→ Vercel Serverless Function    （process.env.FOOTBALL_API_KEY を使用）
           └→ football-data.org API    （X-Auth-Token ヘッダーで認証）
```

ローカル開発では Vite の `server.proxy` が同じプロキシ役を担い、フロントのコードを変えずに動作します。

### モジュールレベルキャッシュによる重複リクエスト防止

`useMatches.js` では取得済みデータと進行中 Promise をモジュールスコープに保持します。React Strict Mode の二重レンダリングや複数コンポーネントからの同時利用でも、API リクエストは 1 回のみ発行されます。

```js
let _cache   = null  // 取得済みデータ
let _pending = null  // 進行中 Promise（重複リクエスト防止）
```

### ブラケット線の数学的配置

決勝トーナメント表のブラケット線は SVG で描画。各ラウンドのカード top 座標を `getCardTop(roundIdx, matchIdx)` で算出し、CSS の固定高さと完全に一致させることで線がズレません。

```js
function getCardTop(roundIdx, matchIdx) {
  const slots = Math.pow(2, roundIdx)  // R32=1, R16=2, QF=4, SF=8, Final=16
  return matchIdx * slots * SLOT_H + (slots - 1) / 2 * SLOT_H
}
```

### PWA キャッシュ戦略の分離

| 対象 | 戦略 | 理由 |
|---|---|---|
| `/api/*` | NetworkFirst（5 秒タイムアウト） | 常に最新データを優先、オフライン時はキャッシュ |
| 画像 | CacheFirst（30 日） | 変更頻度が低い |
| JS / CSS / HTML | Precache | ビルド時に全ファイルをリスト化して確実にキャッシュ |

---

## ローカル開発

[football-data.org](https://www.football-data.org/client/register) で無料 API キーを取得してください。

```bash
git clone https://github.com/kazu-maeda/MatchPulse.git
cd MatchPulse
npm install
```

`.env.local` を作成（`VITE_` プレフィックスは付けないこと）:

```
FOOTBALL_API_KEY=your_api_key_here
```

```bash
npm run dev        # 開発サーバー → http://localhost:5173
npm run build      # 本番ビルド
npm run preview    # ビルド結果の確認
npm run generate-icons  # public/icons/icon-source.svg からアイコン再生成
```

API キーがなくてもダミーデータにフォールバックするため、全画面を確認できます。

---

## ディレクトリ構成

```
├── api/
│   └── football-data.js          # Vercel Serverless Function（API プロキシ）
├── public/
│   ├── icons/
│   │   ├── icon-source.svg       # アイコン差し替え用ソース
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── images/                   # スタジアム背景・トロフィー
├── scripts/
│   └── generate-icons.js         # npm run generate-icons
└── src/
    ├── components/
    │   ├── WcHero.jsx             # 開幕ヒーロー + カウントダウン
    │   ├── Countdown.jsx          # 次の試合ヒーローカード
    │   ├── MatchCard.jsx          # 試合カード
    │   ├── FeaturedCard.jsx       # 注目試合カード
    │   ├── KnockoutBracket.jsx    # 決勝トーナメントブラケット + SVG 線
    │   ├── StatsBar.jsx           # ダッシュボードバー
    │   ├── BottomNav.jsx
    │   ├── InstallBanner.jsx      # PWA インストールバナー（Android）
    │   └── NotificationButton.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Matches.jsx            # スケジュール / 結果 タブ
    │   ├── Favorites.jsx          # お気に入りチーム管理
    │   └── Standings.jsx          # グループ順位表 / トーナメント タブ
    ├── hooks/
    │   ├── useMatches.js          # API 取得 + モジュールキャッシュ + フォールバック
    │   ├── useKnockout.js         # ノックアウトデータ（useMatches キャッシュ再利用）
    │   ├── useFavorites.js        # localStorage お気に入り管理
    │   ├── useCountdown.js        # リアルタイムカウントダウン
    │   └── useInstallPrompt.js    # PWA インストールプロンプト
    ├── services/
    │   └── footballApi.js         # API レスポンス → 内部フォーマット変換
    ├── data/
    │   ├── matches.js             # フォールバック用ダミーデータ + ヘルパー
    │   ├── teams.js               # 全 48 チーム（TLA / 国旗 / 日本語名）
    │   ├── groups.js              # グループ順位フォールバックデータ
    │   └── knockout.js            # ノックアウト 31 試合データ + ラウンド定義
    └── styles/
        └── globals.css            # CSS カスタムプロパティベースのデザインシステム
```

---

## 今後の改善予定

| 優先度 | 内容 |
|---|---|
| 高 | LIVE スコア更新（試合中の 1 分間隔ポーリング） |
| 高 | 3位決定戦の表示（ブラケットへの追加） |
| 中 | プッシュ通知の本実装（Service Worker + Web Push API） |
| 中 | OGP / 試合カードの SNS シェア機能 |
| 中 | トーナメントブラケット接続線の強化（ラウンド間をさらに視覚的に） |
| 低 | Capacitor によるネイティブ化（App Store / Google Play 申請） |
| 低 | 選手スタッツ・ハイライト動画リンク |

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
