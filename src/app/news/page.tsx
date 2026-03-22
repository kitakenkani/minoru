import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { NewsCard } from "@/components/news/NewsCard";
import { getNewsList } from "@/lib/sanity/fetchers";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "お知らせ",
  description: "MINORU cafe からのお知らせ・プレス情報",
};

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
