import type { Metadata } from "next";
import { siteUrl } from "@/lib/seo/site";

export const siteKeywords = [
  "MINORU cafe",
  "ミノルカフェ",
  "ワッフルスタンド",
  "高崎カフェ",
  "吉井町カフェ",
  "群馬カフェ",
  "高崎ワッフル",
  "群馬ワッフル",
  "高崎コーヒー",
  "高崎テイクアウト",
  "高崎夜カフェ",
];

export const defaultOpenGraphImage = {
  url: "/icon.png",
  width: 512,
  height: 512,
  alt: "MINORU cafe ロゴ",
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  keywords = [],
}: {
  title: string;
  description: string;
  path: `/${string}`;
  type?: "website" | "article";
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords: [...siteKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | MINORU cafe`,
      description,
      url: path,
      siteName: "MINORU cafe",
      locale: "ja_JP",
      type,
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | MINORU cafe`,
      description,
      images: [defaultOpenGraphImage.url],
    },
  };
}

export const localMetaOther = {
  "geo.region": "JP-10",
  "geo.placename": "群馬県高崎市吉井町",
  "geo.position": "36.2528277;138.9900933",
  ICBM: "36.2528277, 138.9900933",
  "business:contact_data:locality": "高崎市",
  "business:contact_data:region": "群馬県",
  "business:contact_data:country_name": "Japan",
  "business:contact_data:website": siteUrl,
};
