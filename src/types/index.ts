import type { PortableTextBlock } from "next-sanity";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface CategoryRef {
  title: string;
  slug: { current: string };
}

export interface NewsSummary {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: SanityImage;
  isFeatured?: boolean;
  category?: CategoryRef;
}

export interface NewsDetail extends NewsSummary {
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  description?: string;
  price?: number;
  image?: SanityImage;
  isSeasonal?: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  description: string;
  heroCatch?: string;
  address: string;
  businessHours: string;
  holiday?: string;
  parking?: string;
  googleMapUrl?: string;
  instagramUrl?: string;
  mainVisual?: SanityImage;
  contactText?: string;
}
