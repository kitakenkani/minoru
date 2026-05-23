import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/types";

const defaultAlt =
  "駐車場案内図。駐車場はcafeの隣に2台、モリ理容様駐車場に4台あります。道路沿いのP看板が目印です。";

interface ParkingGuideProps {
  image?: SanityImage;
  imageAlt?: string;
}

export function ParkingGuide({ image, imageAlt }: ParkingGuideProps) {
  const imageUrl = image?.asset
    ? urlFor(image).width(1162).height(816).fit("max").url()
    : null;

  if (!imageUrl) return null;

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-cream-200">
      <div className="mb-4">
        <h2 className="text-sm font-medium tracking-wider text-brand-600">
          駐車場のご案内
        </h2>
        <p className="mt-0.5 text-xs tracking-wider text-stone-400">Parking</p>
      </div>

      <div className="overflow-hidden rounded-lg border border-cream-200 bg-cream-50">
        <Image
          src={imageUrl}
          alt={imageAlt || defaultAlt}
          width={1162}
          height={816}
          className="h-auto w-full"
          sizes="(min-width: 768px) 672px, calc(100vw - 48px)"
        />
      </div>
    </div>
  );
}
