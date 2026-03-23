import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { getSiteSettings } from "@/lib/sanity/fetchers";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "アクセス",
  description: "MINORU cafe へのアクセス・営業時間",
};

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
