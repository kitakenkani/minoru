import type { MetadataRoute } from "next";
import { getNewsList } from "@/lib/sanity/fetchers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/menu`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/access`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/news`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const newsList = await getNewsList();
  const newsRoutes: MetadataRoute.Sitemap = newsList.map((item) => ({
    url: `${base}/news/${item.slug.current}`,
    lastModified: item.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}
