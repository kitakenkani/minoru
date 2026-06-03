import { urlFor } from "@/lib/sanity/image";
import { siteUrl } from "@/lib/seo/site";
import type { SiteSettings } from "@/types";

export const cafeDescription =
  "MINORU cafeは、群馬県高崎市吉井町にあるワッフルとコーヒーのお店です。地域にひらかれた小さなカフェとして、日々の暮らしの中にほっとできる時間をお届けします。";

export const defaultFaqItems = [
  {
    question: "MINORU cafeはどこにありますか？",
    answer:
      "MINORU cafeは群馬県高崎市吉井町吉井396-1にあります。旧254号沿い、川内方面からもお越しいただけます。",
  },
  {
    question: "駐車場はありますか？",
    answer:
      "駐車場は2カ所あります。cafeの隣に2台、モリ理容様駐車場に4台分をご用意しています。道路沿いのP看板が目印です。",
  },
  {
    question: "営業時間と定休日を教えてください。",
    answer:
      "営業時間は火曜から日曜の10:00-21:00、ラストオーダーは20:30です。月曜日は定休日です。最新情報はお知らせやInstagramでもご確認ください。",
  },
  {
    question: "どんなメニューがありますか？",
    answer:
      "ワッフル、コーヒー、ドリンク、季節限定メニューなどをご用意しています。季節ごとの新メニューはメニューページやお知らせで紹介しています。",
  },
  {
    question: "最新情報はどこで確認できますか？",
    answer:
      "公式サイトのお知らせとInstagramで、営業案内、季節メニュー、展示やイベント情報を発信しています。",
  },
];

function compactRecord<T extends Record<string, unknown>>(record: T) {
  return Object.fromEntries(
    Object.entries(record).filter(([, value]) => value != null && value !== "")
  );
}

function buildPostalAddress(address?: string) {
  if (!address) return undefined;

  return compactRecord({
    "@type": "PostalAddress",
    addressCountry: "JP",
    addressRegion: address.includes("群馬県") ? "群馬県" : undefined,
    addressLocality: address.includes("高崎市") ? "高崎市" : undefined,
    streetAddress: address.replace(/^群馬県高崎市/, ""),
  });
}

function buildOpeningHoursSpecification(businessHours?: string) {
  if (!businessHours) return undefined;

  const includesTuesdayToSunday =
    businessHours.includes("火曜") && businessHours.includes("日曜");
  const includesTenToTwentyOne =
    businessHours.includes("10:00") && businessHours.includes("21:00");

  if (!includesTuesdayToSunday || !includesTenToTwentyOne) return undefined;

  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "21:00",
    },
  ];
}

export function buildLocalBusinessJsonLd(settings: SiteSettings | null) {
  const image = settings?.mainVisual
    ? urlFor(settings.mainVisual).width(1200).height(630).fit("crop").url()
    : undefined;

  return compactRecord({
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${siteUrl}/#localbusiness`,
    name: "MINORU cafe",
    url: siteUrl,
    description: settings?.description || cafeDescription,
    image,
    address: buildPostalAddress(settings?.address),
    email: settings?.email,
    sameAs: settings?.instagramUrl ? [settings.instagramUrl] : undefined,
    servesCuisine: ["ワッフル", "コーヒー", "カフェメニュー"],
    priceRange: "¥¥",
    hasMenu: `${siteUrl}/menu`,
    mainEntityOfPage: siteUrl,
    openingHours: settings?.businessHours,
    openingHoursSpecification: buildOpeningHoursSpecification(
      settings?.businessHours
    ),
  });
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "MINORU cafe",
    url: siteUrl,
    inLanguage: "ja-JP",
    publisher: {
      "@id": `${siteUrl}/#localbusiness`,
    },
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: defaultFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
