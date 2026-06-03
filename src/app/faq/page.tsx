import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildFaqJsonLd, defaultFaqItems } from "@/lib/seo/business";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "よくある質問",
  description:
    "MINORU cafeの場所、駐車場、営業時間、予約、テイクアウト、支払い方法、子ども連れや車いすでの利用についてのよくある質問。",
  openGraph: {
    title: "よくある質問 | MINORU cafe",
    description:
      "MINORU cafeの場所、駐車場、営業時間、予約、テイクアウト、支払い方法、子ども連れや車いすでの利用についてのよくある質問。",
    url: "/faq",
  },
};

export default function FaqPage() {
  const faqJsonLd = buildFaqJsonLd();

  return (
    <Container className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-2xl font-medium tracking-wider text-brand-700">
          よくある質問
        </h1>
        <p className="mb-10 text-sm leading-7 text-stone-600">
          MINORU cafeの場所、駐車場、営業時間、予約、テイクアウト、支払い方法、
          子ども連れや車いすでの利用についてまとめました。
        </p>

        <div className="divide-y divide-cream-200 rounded-lg border border-cream-200 bg-white px-6 shadow-sm">
          {defaultFaqItems.map((item) => (
            <section key={item.question} className="py-6">
              <h2 className="text-base font-medium leading-7 text-brand-700">
                {item.question}
              </h2>
              <p className="mt-3 text-sm leading-8 text-stone-700">
                {item.answer}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link
            href="/access"
            className="text-brand-500 underline underline-offset-2 hover:text-brand-700"
          >
            アクセスを見る
          </Link>
          <Link
            href="/menu"
            className="text-brand-500 underline underline-offset-2 hover:text-brand-700"
          >
            メニューを見る
          </Link>
        </div>
      </div>
    </Container>
  );
}
