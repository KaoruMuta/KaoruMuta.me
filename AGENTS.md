# AGENTS.md

## プロジェクト概要
Next.js で構築された個人ブログサイト。旅行体験、留学記録、技術書レビューを掲載する。

## 技術スタック
- **フレームワーク**: Next.js 16.2.6 + React 19.2.6
- **言語**: TypeScript 6.0.3
- **スタイリング**: Tailwind CSS 3.4.17
- **コンテンツ**: Markdown ファイル（gray-matter frontmatter）
- **テスト**: Jest 30.4.2 + Testing Library
- **ランタイム**: Node.js 20.10.0（Volta 管理）

## 開発コマンド
- `npm run dev` - 開発サーバー起動（デバッグ付き）
- `npm run build` - 本番用ビルド
- `npm run lint` - ESLint 実行
- `npm run format` - Prettier でコード整形
- `npm run test` - Jest テスト実行（カバレッジ付き）

## プロジェクト構成
- `src/pages/` - Next.js ページ・API ルート
- `src/components/` - 再利用可能な React コンポーネント
- `src/lib/` - ユーティリティ関数・ヘルパー
- `posts/` - 年別整理された Markdown ブログ記事
- `public/posts/` - ブログ記事用静的アセット

## コンテンツ管理
- ブログ記事は frontmatter メタデータ付き Markdown ファイルで管理する
- 画像は `public/posts/` に年別で保存する
- カテゴリは frontmatter タグで管理する

## 開発ガイドライン
- 既存の TypeScript・ESLint 設定に従う
- スタイリングは Tailwind CSS を使用し、既存のユーティリティクラスを優先する
- 新機能や振る舞いを変える修正には、必要に応じて Jest のテストを追加・更新する
- 既存のレスポンシブデザインパターンを維持する
- SEO・パフォーマンスについて Next.js のベストプラクティスに従う
- 既存のユーザー変更を勝手に巻き戻さない

## 主要コンポーネント
- `Layout.tsx` - メインページラッパー
- `BlogPostList.tsx` - 記事一覧表示
- `Header.tsx` / `Footer.tsx` - サイトナビゲーション
- `Share.tsx` - ソーシャル共有機能

## 重要ファイル
- `src/lib/posts.ts` - ブログ記事解析・管理
- `src/lib/date.ts` - 日付フォーマットユーティリティ
- `next.config.js` - Next.js 設定
- `tailwind.config.js` - Tailwind CSS 設定
