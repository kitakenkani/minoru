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

  const title = news.seoTitle ?? news.title;
  const description = news.seoDescription ?? news.excerpt;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | MINORU cafe`,
      description: description ?? undefined,
      type: "article",
      url: `/news/${slug}`,
      ...(news.mainImage && {
        images: [
          {
            url: urlFor(news.mainImage).width(1200).height(630).url(),
            width: 1200,
            height: 630,
          },
        ],
      }),
    },
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: news.title,
    datePublished: news.publishedAt,
    publisher: { "@type": "Organization", name: "MINORU cafe", url: siteUrl },
    ...(news.excerpt && { description: news.excerpt }),
    ...(news.mainImage && {
      image: urlFor(news.mainImage).width(1200).height(630).url(),
    }),
  };

  return (
    <Container className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
