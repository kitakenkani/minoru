import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/common/Badge";
import { getMenuItems } from "@/lib/sanity/fetchers";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "メニュー",
  description:
    "群馬県高崎市吉井町のMINORU cafeのメニュー一覧。ワッフル、コーヒー、ドリンク、季節限定メニューなどをご紹介します。",
  openGraph: {
    title: "メニュー | MINORU cafe",
    description:
      "群馬県高崎市吉井町のMINORU cafeのメニュー一覧。ワッフル、コーヒー、ドリンク、季節限定メニューなどをご紹介します。",
    url: "/menu",
  },
};

const categoryOrder = ["seasonal", "waffle", "drink", "food", "dessert", "other"];

const categoryLabels: Record<string, string> = {
  seasonal: "季節限定",
  waffle: "ワッフル",
  drink: "ドリンク",
  food: "フード",
  dessert: "デザート",
  other: "その他",
};

const categoryDescriptions: Record<string, string> = {
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
        <p className="text-sm leading-8 text-stone-600">
          MINORU cafeでは、ワッフル、コーヒー、ドリンク、季節限定メニューなどを
          ご用意しています。群馬県高崎市吉井町で、日常の休憩やおでかけの途中に
          立ち寄れるカフェとして、店頭のメニューを随時更新しています。
        </p>
      </div>

      {Object.keys(grouped).length === 0 && (
        <p className="text-sm text-stone-400">現在メニュー情報はありません</p>
      )}

      {categoryOrder.filter((cat) => grouped[cat]).map((category) => {
        const categoryItems = grouped[category];
        return (
        <section key={category} className="mb-12">
          <div className="mb-6 border-b border-brand-100 pb-3">
            <h2 className="text-lg font-medium text-brand-600">
              {categoryLabels[category] ?? category}
            </h2>
            {categoryDescriptions[category] && (
              <p className="mt-2 text-xs leading-6 text-stone-500">
                {categoryDescriptions[category]}
              </p>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {categoryItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 rounded-lg bg-white p-4 shadow-sm border border-cream-200"
              >
                {item.image && (
                  <div className="relative w-20 shrink-0 overflow-hidden rounded">
                    <Image
                      src={urlFor(item.image).width(80).height(160).url()}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-2">
                    <p className="flex-1 min-w-0 font-medium text-stone-800">{item.name}</p>
                    {item.isSeasonal && <Badge label="季節限定" />}
                  </div>
                  {item.description && (
                    <p className="text-xs leading-relaxed text-stone-500">
                      {item.description}
                    </p>
                  )}
                  {item.price != null && (
                    <p className="text-sm text-brand-600">
                      ¥{item.price.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        );
      })}
    </Container>
  );
}
