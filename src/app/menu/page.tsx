import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/common/Badge";
import { getMenuItems } from "@/lib/sanity/fetchers";
import { urlFor } from "@/lib/sanity/image";
import { createPageMetadata } from "@/lib/seo/metadata";
import { menuImageFallbacks } from "@/lib/menu/images";

export const revalidate = 300;

export const metadata: Metadata = createPageMetadata({
  title: "メニュー",
  description:
    "群馬県高崎市吉井町のMINORU cafeのメニュー一覧。ワッフル、コーヒー、ドリンク、季節限定メニュー、テイクアウトをご紹介します。",
  path: "/menu",
  keywords: ["ワッフルメニュー", "カフェメニュー", "テイクアウト"],
});

const categoryOrder = ["morning", "seasonal", "food", "waffle", "drink", "dessert", "takeout", "other"];

const categoryLabels: Record<string, string> = {
  morning: "モーニング",
  seasonal: "季節限定",
  waffle: "スイーツワッフル",
  drink: "ドリンク",
  food: "お食事ワッフル",
  dessert: "デザート",
  other: "その他",
  takeout: "テイクアウト",
};

const categoryDescriptions: Record<string, string> = {
  morning: "朝のひとときに楽しむモーニングプレート。単品とセットをご用意しています。",
  takeout: "ワッフルやドリンクをご自宅でも。お持ち帰りの商品はこちらからお選びいただけます。",
  seasonal:
    "旬の素材や季節の気分に合わせて楽しめる、期間限定のメニューです。新しい味はお知らせやInstagramでも紹介しています。",
  waffle:
    "MINORU cafeの中心メニューです。カフェ時間のおともに、甘いワッフルをゆっくりお楽しみください。",
  drink:
    "コーヒーをはじめ、ワッフルや軽食に合わせやすいドリンクをご用意しています。",
  food:
    "カフェで過ごす時間に添えたいフードメニューです。ランチや小腹が空いたときにもご利用ください。",
  dessert:
    "食後や休憩時間に楽しめるデザートメニューです。ドリンクとの組み合わせもおすすめです。",
  other:
    "店頭でのご案内や季節に合わせて変わるメニューです。",
};

export default async function MenuPage() {
  const items = await getMenuItems();

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    const key = item.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <Container className="py-16">
      <div className="mb-10 max-w-2xl">
        <h1 className="mb-4 text-2xl font-medium tracking-wider text-brand-700">
          メニュー
        </h1>
        <p className="text-base leading-8 text-stone-600">
          朝のモーニングから、お食事や甘いワッフル、季節の一皿まで。
          お好みのドリンクと一緒に、ゆっくりお楽しみください。
        </p>
        <p className="mt-4 text-sm text-stone-600">価格はすべて税込です。セット内容・提供時間は店頭でご案内します。</p>
      </div>

      {items.length > 0 && (
        <nav aria-label="メニューのカテゴリ" className="mb-10 flex flex-wrap gap-2">
          {categoryOrder.filter((category) => grouped[category]).map((category) => (
            <a key={category} href={`#${category}`} className="rounded-full border border-brand-100 bg-white px-4 py-2 text-sm text-brand-700 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
              {categoryLabels[category]}
            </a>
          ))}
        </nav>
      )}

      {Object.keys(grouped).length === 0 && (
        <p className="text-sm text-stone-400">現在メニュー情報はありません</p>
      )}

      {categoryOrder.filter((cat) => grouped[cat]).map((category) => {
        const categoryItems = grouped[category];
        return (
        <section key={category} id={category} aria-labelledby={`${category}-heading`} className="mb-12 scroll-mt-24">
          <div className="mb-6 border-b border-brand-100 pb-3">
            <h2 id={`${category}-heading`} className="text-lg font-medium text-brand-600">
              {categoryLabels[category] ?? category}
            </h2>
            {categoryDescriptions[category] && (
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {categoryDescriptions[category]}
              </p>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {categoryItems.map((item) => {
              const imageSrc = item.image
                ? urlFor(item.image).width(320).height(320).fit("max").url()
                : menuImageFallbacks[item._id];
              return (
              <div
                key={item._id}
                className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm border border-cream-200 sm:flex-row"
              >
                {imageSrc && (
                  <div className="relative aspect-square w-full shrink-0 self-start overflow-hidden rounded sm:w-32">
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      fill
                      unoptimized
                      sizes="(max-width: 639px) 100vw, 128px"
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <h3 className="flex-1 min-w-0 font-medium text-stone-800">{item.name}</h3>
                    {item.isSeasonal && <Badge label="季節限定" />}
                  </div>
                  {item.description && (
                    <p className="text-sm leading-relaxed text-stone-600">
                      {item.description}
                    </p>
                  )}
                  {item.price != null && (
                    <dl className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-brand-700">
                      <div className="flex gap-2"><dt>{item.setPrice != null ? "単品" : "価格"}</dt><dd className="font-medium tabular-nums">¥{item.price.toLocaleString("ja-JP")}</dd></div>
                      {item.setPrice != null && <div className="flex gap-2"><dt>セット</dt><dd className="font-medium tabular-nums">¥{item.setPrice.toLocaleString("ja-JP")}</dd></div>}
                    </dl>
                  )}
                  {item.priceNote && <p className="whitespace-pre-line text-sm leading-6 text-stone-600">{item.priceNote}</p>}
                </div>
              </div>
              );
            })}
          </div>
        </section>
        );
      })}
    </Container>
  );
}
