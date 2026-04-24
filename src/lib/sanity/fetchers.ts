import { client } from "./client";
import {
  latestNewsQuery,
  menuItemsQuery,
  newsDetailQuery,
  newsListQuery,
  newsSlugsQuery,
  relatedNewsQuery,
  siteSettingsQuery,
} from "./queries";
import type { MenuItem, NewsDetail, NewsSummary, SiteSettings } from "@/types";

const revalidate = 300; // 5分

function isSanityConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isSanityConfigured()) return null;
  return client.fetch(siteSettingsQuery, {}, { next: { revalidate } });
}

export async function getLatestNews(): Promise<NewsSummary[]> {
  if (!isSanityConfigured()) return [];
  return client.fetch(latestNewsQuery, {}, { next: { revalidate } });
}

export async function getNewsList(): Promise<NewsSummary[]> {
  if (!isSanityConfigured()) return [];
  return client.fetch(newsListQuery, {}, { next: { revalidate } });
}

export async function getNewsDetail(slug: string): Promise<NewsDetail | null> {
  if (!isSanityConfigured()) return null;
  return client.fetch(newsDetailQuery, { slug }, { next: { revalidate } });
}

export async function getNewsSlugs(): Promise<{ slug: string }[]> {
  if (!isSanityConfigured()) return [];
  return client.fetch(newsSlugsQuery, {}, { next: { revalidate } });
}

export async function getRelatedNews(
  slug: string,
  categorySlug: string
): Promise<NewsSummary[]> {
  if (!isSanityConfigured()) return [];
  return client.fetch(
    relatedNewsQuery,
    { slug, categorySlug },
    { next: { revalidate } }
  );
}

export async function getMenuItems(): Promise<MenuItem[]> {
  if (!isSanityConfigured()) return [];
  return client.fetch(menuItemsQuery, {}, { next: { revalidate } });
}
