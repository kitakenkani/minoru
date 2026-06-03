import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ParkingGuide } from "@/components/access/ParkingGuide";
import { getSiteSettings } from "@/lib/sanity/fetchers";
import { createPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 300;

export const metadata: Metadata = createPageMetadata({
  title: "アクセス",
  description:
    "群馬県高崎市吉井町吉井396-1のMINORU cafeへのアクセス、営業時間、定休日、駐車場、Googleマップのご案内です。",
  path: "/access",
  keywords: ["MINORU cafe アクセス", "吉井町 駐車場 カフェ", "旧254号"],
});

export default async function AccessPage() {
  const settings = await getSiteSettings();

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-10 text-2xl font-medium tracking-wider text-brand-700">
          アクセス
        </h1>

        {settings ? (
          <div className="space-y-8">
            <p className="text-sm leading-8 text-stone-600">
              MINORU cafeは、群馬県高崎市吉井町吉井396-1にある小さなカフェです。
              旧254号沿いにあり、吉井町周辺でのおでかけや日常の休憩にも立ち寄りやすい
              場所にあります。ご来店前に営業時間、定休日、駐車場の場所をご確認ください。
            </p>

            <dl className="divide-y divide-cream-200 rounded-lg bg-white p-6 shadow-sm border border-cream-200">
              <div className="grid grid-cols-[6rem_1fr] gap-2 py-4">
                <dt className="text-sm text-stone-400">住所</dt>
                <dd className="text-sm text-stone-700">{settings.address}</dd>
              </div>
              {settings.businessHours && (
                <div className="grid grid-cols-[6rem_1fr] gap-2 py-4">
                  <dt className="text-sm text-stone-400">営業時間</dt>
                  <dd className="whitespace-pre-line text-sm text-stone-700">
                    {settings.businessHours}
                  </dd>
                </div>
              )}
              {settings.holiday && (
                <div className="grid grid-cols-[6rem_1fr] gap-2 py-4">
                  <dt className="text-sm text-stone-400">定休日</dt>
                  <dd className="text-sm text-stone-700">{settings.holiday}</dd>
                </div>
              )}
              {settings.parking && (
                <div className="grid grid-cols-[6rem_1fr] gap-2 py-4">
                  <dt className="text-sm text-stone-400">駐車場</dt>
                  <dd className="whitespace-pre-line text-sm text-stone-700">
                    {settings.parking}
                  </dd>
                </div>
              )}
              {settings.contactText && (
                <div className="grid grid-cols-[6rem_1fr] gap-2 py-4">
                  <dt className="text-sm text-stone-400">お問い合わせ</dt>
                  <dd className="text-sm text-stone-700">{settings.contactText}</dd>
                </div>
              )}
              {settings.instagramUrl && (
                <div className="grid grid-cols-[6rem_1fr] gap-2 py-4">
                  <dt className="text-sm text-stone-400">Instagram</dt>
                  <dd className="text-sm">
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-500 underline underline-offset-2 hover:text-brand-700"
                    >
                      @minoru_cafe
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            {settings.googleMapUrl && (
              <div className="overflow-hidden rounded-lg shadow-sm border border-cream-200">
                <iframe
                  src={settings.googleMapUrl}
                  width="100%"
                  height="360"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                />
              </div>
            )}

            <section className="rounded-lg bg-white p-6 shadow-sm border border-cream-200">
              <h2 className="mb-3 text-sm font-medium tracking-wider text-brand-600">
                駐車場について
              </h2>
              <div className="space-y-3 text-sm leading-7 text-stone-600">
                <p>
                  駐車場は2カ所あります。店舗近くに2台、旧254号沿いのもり理容様駐車場に
                  4台分をご用意しています。
                </p>
                <p>
                  道路沿いのP看板を目印にお越しください。駐車位置は下の案内画像でも
                  確認できます。
                </p>
              </div>
            </section>

            <ParkingGuide
              image={settings.parkingGuideImage}
              imageAlt={settings.parkingGuideImageAlt}
            />

            {(settings.contactText || settings.email) && (
              <div className="rounded-lg bg-white p-6 shadow-sm border border-cream-200 text-center">
                <h2 className="mb-3 text-sm font-medium tracking-wider text-brand-600">
                  お問い合わせ
                </h2>
                {settings.contactText && (
                  <p className="mb-3 text-sm text-stone-600">{settings.contactText}</p>
                )}
                {settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm text-brand-500 underline underline-offset-2 hover:text-brand-700"
                  >
                    {settings.email}
                  </a>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-stone-400">情報を取得できませんでした</p>
        )}
      </div>
    </Container>
  );
}
