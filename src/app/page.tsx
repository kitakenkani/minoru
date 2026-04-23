import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NewsCard } from "@/components/news/NewsCard";
import { getSiteSettings, getLatestNews } from "@/lib/sanity/fetchers";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "MINORU cafe",
  description: "地域にひらかれた小さなカフェ。ワッフルやドリンクをゆっくりお楽しみください。",
  openGraph: {
    title: "MINORU cafe",
    description: "地域にひらかれた小さなカフェ。ワッフルやドリンクをゆっくりお楽しみください。",
    url: "/",
  },
};

export default async function HomePage() {
  const [settings, latestNews] = await Promise.all([
    getSiteSettings(),
    getLatestNews(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "MINORU cafe",
    url: siteUrl,
    ...(settings?.address && { address: { "@type": "PostalAddress", streetAddress: settings.address } }),
    ...(settings?.businessHours && { openingHours: settings.businessHours }),
    ...(settings?.instagramUrl && { sameAs: [settings.instagramUrl] }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {/* ヒーローセクション */}
      <section className="relative bg-brand-500">
        {settings?.mainVisual ? (
          <div className="relative h-[60vh] min-h-80 w-full">
            <Image
              src={urlFor(settings.mainVisual).width(800).url()}
              alt="MINORU cafe"
              fill
              priority
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-900/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
              <h1 className="text-4xl font-medium tracking-widest">
                MINORU cafe
              </h1>
              {settings.heroCatch && (
                <p className="text-sm tracking-wider opacity-90">{settings.heroCatch}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-[50vh] min-h-64 flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-medium tracking-widest text-white">
              MINORU cafe
            </h1>
            {settings?.heroCatch && (
              <p className="text-sm tracking-wider text-brand-100">
                {settings.heroCatch}
              </p>
            )}
          </div>
        )}
      </section>

      {/* お知らせセクション */}
      <section className="py-16">
        <Container>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-lg font-medium tracking-wider text-stone-800">
              お知らせ
            </h2>
            <Link
              href="/news"
              className="text-sm text-brand-500 hover:text-brand-700"
            >
              一覧を見る →
            </Link>
          </div>
          {latestNews.length > 0 ? (
            <div>
              {latestNews.map((item) => (
                <NewsCard key={item._id} news={item} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-400">現在お知らせはありません</p>
          )}
        </Container>
      </section>

      {/* 導線セクション */}
      <section className="border-t border-cream-200 py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            <Link
              href="/about"
              className="rounded-lg bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:border-brand-200 border border-transparent"
            >
              <p className="mb-2 text-lg font-medium tracking-wider text-brand-700">
                カフェについて
              </p>
              <p className="text-sm text-stone-500">コンセプト・空間</p>
            </Link>
            <Link
              href="/menu"
              className="rounded-lg bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:border-brand-200 border border-transparent"
            >
              <p className="mb-2 text-lg font-medium tracking-wider text-brand-700">
                メニュー
              </p>
              <p className="text-sm text-stone-500">ワッフル・ドリンク</p>
            </Link>
            <Link
              href="/access"
              className="rounded-lg bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:border-brand-200 border border-transparent"
            >
              <p className="mb-2 text-lg font-medium tracking-wider text-brand-700">
                アクセス
              </p>
              <p className="text-sm text-stone-500">
                {settings?.address ?? "営業時間・場所"}
              </p>
            </Link>
          </div>
        </Container>
      </section>

      {/* アクセス要約 */}
      {settings && (
        <section className="py-12">
          <Container>
            <div className="rounded-lg bg-white p-8 shadow-sm border border-cream-200">
              <h2 className="mb-4 text-sm font-medium tracking-wider text-brand-600">
                営業案内
              </h2>
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-stone-400">住所</dt>
                  <dd className="text-sm text-stone-700">{settings.address}</dd>
                </div>
                {settings.businessHours && (
                  <div>
                    <dt className="text-xs text-stone-400">営業時間</dt>
                    <dd className="whitespace-pre-line text-sm text-stone-700">
                      {settings.businessHours}
                    </dd>
                  </div>
                )}
                {settings.holiday && (
                  <div>
                    <dt className="text-xs text-stone-400">定休日</dt>
                    <dd className="text-sm text-stone-700">{settings.holiday}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-6">
                <Link
                  href="/access"
                  className="text-sm text-brand-500 underline underline-offset-2 hover:text-brand-700"
                >
                  アクセス詳細を見る
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
