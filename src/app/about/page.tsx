import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "カフェについて",
  description: "MINORU cafe のコンセプト・空間・地域との関わりについて",
  openGraph: {
    title: "カフェについて | MINORU cafe",
    description: "MINORU cafe のコンセプト・空間・地域との関わりについて",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-10 text-2xl font-medium tracking-wider text-brand-700">
          カフェについて
        </h1>

        <div className="space-y-10 leading-relaxed text-stone-700">
          <section>
            <h2 className="mb-4 text-lg font-medium text-brand-600">
              コンセプト
            </h2>
            <p className="text-sm leading-8">
              MINORU cafe は、地域にひらかれた小さなカフェです。
              日々の暮らしの中に、ほっとできる時間をお届けします。
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-medium text-brand-600">
              空間について
            </h2>
            <p className="text-sm leading-8">
              自然光の入る落ち着いた空間で、ゆっくりとお過ごしいただけます。
              一人での読書にも、友人との会話にも、どちらにもなじむ場所です。
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-medium text-brand-600">
              地域との関わり
            </h2>
            <p className="text-sm leading-8">
              地域の作家や活動と連携したイベント・展示を不定期で開催しています。
              カフェを通じて、人と人、人と表現がつながる場をつくっています。
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
