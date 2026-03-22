import { groq } from "next-sanity";

// サイト設定
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    description,
    heroCatch,
    address,
    businessHours,
    holiday,
    parking,
    googleMapUrl,
    instagramUrl,
    mainVisual,
    contactText
  }
`;

// お知らせ一覧
export const newsListQuery = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    isFeatured,
    category-> {
      title,
      slug
    }
  }
`;

// トップ用お知らせ（最新3件）
export const latestNewsQuery = groq`
  *[_type == "news"] | order(isFeatured desc, publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    category-> {
      title,
      slug
    }
  }
`;

// お知らせ詳細
export const newsDetailQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    body,
    seoTitle,
    seoDescription,
    category-> {
      title,
      slug
    }
  }
`;

// お知らせ全スラッグ（静的生成用）
export const newsSlugsQuery = groq`
  *[_type == "news"] { "slug": slug.current }
`;

// メニュー一覧（公開中のみ）
export const menuItemsQuery = groq`
  *[_type == "menuItem" && isPublished == true] | order(category asc, sortOrder asc) {
    _id,
    name,
    category,
    description,
    price,
    image,
    isSeasonal
  }
`;
