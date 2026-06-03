import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { getMediaMentions } from "@/lib/sanity/fetchers";
import {
  buildMediaMentionsJsonLd,
  getMediaMentionThumbnailUrl,
  resolveMediaMentions,
} from "@/lib/seo/media";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "掲載・紹介",
  description:
    "MINORU cafeが紹介されたメディア記事、ローカルメディア、グルメサイト、SNS投稿のリンクをまとめています。",
  openGraph: {
    title: "掲載・紹介 | MINORU cafe",
    description:
      "MINORU cafeが紹介されたメディア記事、ローカルメディア、グルメサイト、SNS投稿のリンクをまとめています。",
    url: "/media",
  },
};

export default async function MediaPage() {
  const mediaMentions = resolveMediaMentions(await getMediaMentions());
  const mediaJsonLd = buildMediaMentionsJsonLd(mediaMentions);

  return (
    <Container className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaJsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <div className="mb-10 max-w-2xl">
          <h1 className="mb-4 text-2xl font-medium tracking-wider text-brand-700">
            掲載・紹介
          </h1>
          <p className="text-sm leading-8 text-stone-600">
            MINORU cafeを紹介していただいたメディア記事、地域情報サイト、
            グルメサイト、SNS投稿をまとめました。記事本文の転載ではなく、
            掲載元へのリンクとしてご案内しています。
          </p>
        </div>

        <div className="space-y-5">
          {mediaMentions.map((mention) => {
            const thumbnailUrl = getMediaMentionThumbnailUrl(mention);

            return (
              <article
                key={mention._id}
                className="overflow-hidden rounded-lg border border-cream-200 bg-white shadow-sm"
              >
                <div
                  className={
                    thumbnailUrl
                      ? "grid gap-0 sm:grid-cols-[160px_minmax(0,1fr)]"
                      : ""
                  }
                >
                  {thumbnailUrl && (
                    <a
                      href={mention.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block h-40 overflow-hidden bg-cream-100 sm:h-full sm:min-h-44"
                      aria-label={`${mention.publisher}の記事を開く`}
                    >
                      {mention.thumbnailImage ? (
                        <Image
                          src={thumbnailUrl}
                          alt={`${mention.publisher}の掲載サムネイル`}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <span
                          role="img"
                          aria-label={`${mention.publisher}の掲載サムネイル`}
                          className="absolute inset-0 block bg-cover bg-center transition-transform duration-300 hover:scale-105"
                          style={{ backgroundImage: `url("${thumbnailUrl}")` }}
                        />
                      )}
                    </a>
                  )}
                  <div className="min-w-0 p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-600">
                        {mention.category}
                      </span>
                      <span className="text-xs text-stone-400">
                        {mention.publisher}
                      </span>
                      <span className="text-xs text-stone-400">
                        {mention.publishedAt}
                      </span>
                    </div>
                    <h2 className="break-words text-base font-medium leading-7 text-stone-800">
                      {mention.title}
                    </h2>
                    <p className="mt-3 break-words text-sm leading-7 text-stone-600">
                      {mention.description}
                    </p>
                    <a
                      href={mention.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-sm text-brand-500 underline underline-offset-2 hover:text-brand-700"
                    >
                      掲載元を見る
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
