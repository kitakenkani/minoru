import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/common/Badge";
import { getMenuItems } from "@/lib/sanity/fetchers";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "メニュー",
  description: "MINORU cafe のメニュー一覧。ワッフル・ドリンク・フードなど。",
  openGraph: {
    title: "メニュー | MINORU cafe",
    description: "MINORU cafe のメニュー一覧。ワッフル・ドリンク・フードなど。",
    url: "/menu",
  },
};

const categoryLabels: Record<string, string> = {
  waffle: "ワッフル",
  drink: "ドリンク",
  food: "フード",
  dessert: "デザート",
  other: "その他",
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
      <h1 className="mb-10 text-2xl font-medium tracking-wider text-brand-700">
        メニュー
      </h1>

      {Object.keys(grouped).length === 0 && (
        <p className="text-sm text-stone-400">現在メニュー情報はありません</p>
      )}

      {Object.entries(grouped).map(([category, categoryItems]) => (
        <section key={category} className="mb-12">
          <h2 className="mb-6 border-b border-brand-100 pb-2 text-lg font-medium text-brand-600">
            {categoryLabels[category] ?? category}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {categoryItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 rounded-lg bg-white p-4 shadow-sm border border-cream-200"
              >
                {item.image && (
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded">
                    <Image
                      src={urlFor(item.image).width(80).height(80).url()}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-stone-800">{item.name}</p>
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
      ))}
    </Container>
  );
}
