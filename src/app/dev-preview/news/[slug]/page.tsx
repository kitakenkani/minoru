import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { Badge } from "@/components/common/Badge";
import { Container } from "@/components/layout/Container";
import { PortableTextRenderer } from "@/components/news/PortableTextRenderer";
import { urlFor } from "@/lib/sanity/image";
import type { NewsDetail } from "@/types";
import draft from "../../../../../draft-previews/news/fruit-on-the-hill-blueberry-collab-2026.json";

export const metadata = {
  title: "下書きレビュー | MINORU cafe",
};

const draftNews = draft as NewsDetail;

export default async function DevNewsPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (process.env.VERCEL_ENV === "production") {
    notFound();
  }

  const { slug } = await params;
  if (slug !== draftNews.slug.current) {
    notFound();
  }

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 rounded border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-800">
          ローカル開発用の下書きプレビューです。本番公開ページには表示されません。
        </div>

        <div className="mb-4 flex items-center gap-3">
          <time className="text-sm text-stone-400">
            {dayjs(draftNews.publishedAt).format("YYYY.MM.DD")}
          </time>
          {draftNews.category && <Badge label={draftNews.category.title} />}
        </div>

        <h1 className="mb-8 text-2xl font-medium leading-relaxed text-stone-800">
          {draftNews.title}
        </h1>

        {draftNews.mainImage && (
          <div className="relative mb-10 h-64 w-full overflow-hidden rounded-lg sm:h-80">
            <Image
              src={urlFor(draftNews.mainImage).width(800).url()}
              alt={draftNews.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        )}

        <PortableTextRenderer value={draftNews.body} />

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
