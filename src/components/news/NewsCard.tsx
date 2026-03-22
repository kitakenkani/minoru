import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import type { NewsSummary } from "@/types";
import { urlFor } from "@/lib/sanity/image";
import { Badge } from "@/components/common/Badge";

interface NewsCardProps {
  news: NewsSummary;
}

export function NewsCard({ news }: NewsCardProps) {
  const { title, slug, publishedAt, excerpt, mainImage, category } = news;

  return (
    <Link
      href={`/news/${slug.current}`}
      className="group flex gap-4 border-b border-cream-200 py-6 transition-colors hover:bg-brand-50"
    >
      {mainImage && (
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded bg-cream-100">
          <Image
            src={urlFor(mainImage).width(112).height(80).url()}
            alt={title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <time className="text-xs text-stone-400">
            {dayjs(publishedAt).format("YYYY.MM.DD")}
          </time>
          {category && <Badge label={category.title} />}
        </div>
        <p className="text-sm font-medium text-stone-800 group-hover:text-brand-600">
          {title}
        </p>
        {excerpt && (
          <p className="line-clamp-2 text-xs text-stone-500">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}
