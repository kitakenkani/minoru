import type { MetadataRoute } from "next";
import { getNewsList } from "@/lib/sanity/fetchers";
import { siteUrl } from "@/lib/seo/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/menu`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/access`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/media`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/news`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const newsList = await getNewsList();
  const newsRoutes: MetadataRoute.Sitemap = newsList.map((item) => ({
    url: `${siteUrl}/news/${item.slug.current}`,
    lastModified: item.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}
