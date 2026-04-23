@AGENTS.md

# プロジェクト概要：MINORU cafe サイト

Next.js (App Router) + Sanity CMS で構築されたカフェの公式サイト。

---

## ディレクトリ構造

```
src/
├── app/
│   ├── layout.tsx          # 共通レイアウト・グローバルmetadata・フォント設定
│   ├── page.tsx            # トップページ（ヒーロー・最新お知らせ・導線）
│   ├── sitemap.ts          # /sitemap.xml（動的生成・news記事を含む）
│   ├── robots.ts           # /robots.txt
│   ├── about/page.tsx      # カフェについて（静的コンテンツ）
│   ├── menu/page.tsx       # メニュー一覧（Sanityからカテゴリ別取得）
│   ├── access/page.tsx     # アクセス・営業情報（Sanityから取得）
│   ├── news/
│   │   ├── page.tsx        # お知らせ一覧
│   │   └── [slug]/page.tsx # お知らせ詳細（動的ルート）
│   ├── studio/             # Sanity Studio（管理画面、/studio でアクセス）
│   └── api/revalidate/     # ISRの手動revalidate用APIルート
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # ナビゲーション（モバイル対応ハンバーガーメニュー）
│   │   ├── Footer.tsx      # フッター
│   │   └── Container.tsx   # 最大幅・padding共通ラッパー
│   ├── news/
│   │   ├── NewsCard.tsx    # お知らせカード（一覧・トップページ共用）
│   │   └── PortableTextRenderer.tsx  # Sanity Portable Text → HTML
│   └── common/
│       └── Badge.tsx       # カテゴリ・季節限定などのバッジ
├── lib/sanity/
│   ├── client.ts           # Sanityクライアント設定
│   ├── fetchers.ts         # データ取得関数（各ページから呼ぶ）
│   ├── queries.ts          # GROQクエリ定義
│   └── image.ts            # Sanity画像URLビルダー
└── types/index.ts          # 型定義（SiteSettings, NewsDetail, MenuItem など）
```

---

## データフロー（Sanity CMS）

| データ | 取得関数 | 使用箇所 |
|---|---|---|
| サイト設定（住所・営業時間・メインビジュアル等） | `getSiteSettings()` | トップ・アクセスページ |
| 最新お知らせ（3件） | `getLatestNews()` | トップページ |
| お知らせ一覧（全件） | `getNewsList()` | お知らせ一覧・sitemap |
| お知らせ詳細 | `getNewsDetail(slug)` | お知らせ詳細 |
| お知らせスラッグ一覧 | `getNewsSlugs()` | `generateStaticParams` |
| メニュー一覧 | `getMenuItems()` | メニューページ |

全ページ `revalidate = 300`（5分ISR）。

---

## SEO関連ファイル

| ファイル | 役割 |
|---|---|
| `src/app/layout.tsx` | グローバルmetadata（title template・OGP・Twitter Card） |
| `src/app/sitemap.ts` | 動的サイトマップ（静的ページ＋全news記事） |
| `src/app/robots.ts` | クローラー制御（/studio /api は disallow） |
| 各 `page.tsx` | ページ固有のtitle・description・OGP |
| `news/[slug]/page.tsx` | `generateMetadata` で動的メタデータ＋Article JSON-LD |
| `page.tsx`（トップ） | LocalBusiness JSON-LD（schema.org） |

---

## 追加要求の修正箇所ガイド

| やりたいこと | 修正するファイル |
|---|---|
| ナビにページを追加する | `src/components/layout/Header.tsx` の `navItems` |
| トップページのキャッチコピー変更 | Sanity Studio → siteSettings の `heroCatch` フィールド |
| 営業時間・住所・SNSリンク変更 | Sanity Studio → siteSettings |
| メニュー項目の追加・変更 | Sanity Studio → menuItem |
| お知らせの投稿 | Sanity Studio → news |
| 各ページのSEO文言変更 | 各ページの `metadata` export |
| グローバルなtitleテンプレート変更 | `src/app/layout.tsx` の `metadata.title.template` |
| サイトマップに新ページ追加 | `src/app/sitemap.ts` の `staticRoutes` |
| OGP画像を設定したい（静的） | `src/app/opengraph-image.png` を置く（またはルートに `.tsx` で生成） |
| フォントを変更したい | `src/app/layout.tsx` の `next/font/google` 設定 |
| フッターの内容変更 | `src/components/layout/Footer.tsx` |
| Sanityのデータ取得クエリ変更 | `src/lib/sanity/queries.ts` → `src/lib/sanity/fetchers.ts` |
| 新しいデータ型を追加したい | `src/types/index.ts` に型追加 → `queries.ts` → `fetchers.ts` の順で追加 |
