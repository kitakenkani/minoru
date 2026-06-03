import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { NewsCard } from "@/components/news/NewsCard";
import { getNewsList } from "@/lib/sanity/fetchers";
import { createPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 300;

export const metadata: Metadata = createPageMetadata({
  title: "お知らせ",
  description:
    "MINORU cafeからの営業案内、季節限定メニュー、イベント、展示、カフェのお知らせをお届けします。",
  path: "/news",
  keywords: ["営業案内", "季節限定メニュー", "イベント", "展示"],
});

export default async function NewsPage() {
  const newsList = await getNewsList();

  return (
    <Container className="py-16">
      <h1 className="mb-10 text-2xl font-medium tracking-wider text-brand-700">
        お知らせ
      </h1>
      {newsList.length > 0 ? (
        <div>
          {newsList.map((item) => (
            <NewsCard key={item._id} news={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-stone-400">現在お知らせはありません</p>
      )}
    </Container>
  );
}
