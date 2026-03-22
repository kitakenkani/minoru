import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/common/Badge";
import { PortableTextRenderer } from "@/components/news/PortableTextRenderer";
import { getNewsDetail, getNewsSlugs } from "@/lib/sanity/fetchers";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsDetail(slug);
  if (!news) return {};

  return {
    title: news.seoTitle ?? news.title,
    description: news.seoDescription ?? news.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNewsDetail(slug);

  if (!news) notFound();

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <time className="text-sm text-stone-400">
            {dayjs(news.publishedAt).format("YYYY.MM.DD")}
          </time>
          {news.category && <Badge label={news.category.title} />}
        </div>

        <h1 className="mb-8 text-2xl font-medium leading-relaxed text-stone-800">
          {news.title}
        </h1>

        {news.mainImage && (
          <div className="relative mb-10 h-64 w-full overflow-hidden rounded-lg sm:h-80">
            <Image
              src={urlFor(news.mainImage).width(800).url()}
              alt={news.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        )}

        <PortableTextRenderer value={news.body} />

        <div className="mt-12 border-t border-cream-200 pt-8">
          <Link
            href="/news"
            className="text-sm text-brand-500 underline underline-offset-2 hover:text-brand-700"
          >
            ← お知らせ一覧へ戻る
          </Link>
        </div>
      </div>
    </Container>
  );
}
