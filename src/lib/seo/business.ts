import { urlFor } from "@/lib/sanity/image";
import { siteUrl } from "@/lib/seo/site";
import type { MediaMention, SiteSettings } from "@/types";

export const cafeDescription =
  "MINORU cafeは、群馬県高崎市吉井町にあるワッフルとコーヒーのお店です。地域にひらかれた小さなカフェとして、日々の暮らしの中にほっとできる時間をお届けします。";

export const acceptedPaymentMethods = [
  "現金",
  "Visa",
  "Mastercard",
  "UnionPay",
  "JCB",
  "American Express",
  "Diners Club",
  "Discover",
  "交通系電子マネー",
  "iD",
  "QUICPay",
  "Alipay+",
  "WeChat Pay",
  "UnionPay QRコード",
  "COIN+",
  "d払い",
  "PayPay",
  "au PAY",
  "楽天ペイ",
  "J-Coin Pay",
  "Smart Code",
];

export const defaultFaqItems = [
  {
    question: "MINORU cafeはどこにありますか？",
    answer:
      "MINORU cafeは群馬県高崎市吉井町吉井396-1にあります。旧254号沿い、川内方面からもお越しいただけます。",
  },
  {
    question: "駐車場はありますか？",
    answer:
      "駐車場は2カ所あります。店舗近くに2台、旧254号沿いのもり理容様駐車場に4台分をご用意しています。道路沿いのP看板が目印です。",
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
    question: "予約や取り置きはできますか？",
    answer:
      "現在、席の予約、商品の予約、取り置きはいずれも承っていません。ご来店順でのご案内となります。",
  },
  {
    question: "テイクアウトはできますか？",
    answer:
      "テイクアウトもご利用いただけます。対象メニューや提供状況は、店頭でお気軽にお声がけください。",
  },
  {
    question: "支払い方法は何が使えますか？",
    answer: `現金のほか、${acceptedPaymentMethods
      .filter((method) => method !== "現金")
      .join("、")}をご利用いただけます。`,
  },
  {
    question: "子ども連れやベビーカー、車いすで利用できますか？",
    answer:
      "お子さま連れ、ベビーカーでのご来店も問題ありません。店内は車いすも通れるようにしています。",
  },
  {
    question: "電話で問い合わせできますか？",
    answer:
      "電話番号は公開していません。お問い合わせはメールアドレス、またはInstagramのDMからお願いします。",
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

export function buildLocalBusinessJsonLd(
  settings: SiteSettings | null,
  mediaMentions: MediaMention[] = []
) {
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
    paymentAccepted: acceptedPaymentMethods,
    priceRange: "¥¥",
    hasMenu: `${siteUrl}/menu`,
    hasMap: settings?.googleMapUrl,
    mainEntityOfPage: siteUrl,
    subjectOf: mediaMentions.map((mention) => ({
      "@type": "CreativeWork",
      name: mention.title,
      url: mention.url,
      publisher: mention.publisher,
    })),
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "ベビーカー・車いすで通りやすい店内動線",
        value: true,
      },
    ],
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
