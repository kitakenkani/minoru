import { urlFor } from "@/lib/sanity/image";
import { siteUrl } from "@/lib/seo/site";
import type { MediaMention } from "@/types";

export const defaultMediaMentions: MediaMention[] = [
  {
    _id: "default-kitakan-navi-2026-03-26",
    title:
      "こだわりワッフル＆コーヒー 地元出身の兄弟が営む「MINORU cafe」オープン 群馬・高崎市",
    publisher: "きたかんナビ / 上毛新聞",
    publishedAt: "2026-03-26",
    url: "https://kitakan-navi.jp/archives/244361",
    category: "メディア掲載",
    thumbnailUrl:
      "https://kitakan-navi.jp/wp-content/uploads/2026/03/img_51c41a7ff00f1916e95d4962b3eebdfd96992.jpg",
    description:
      "群馬県高崎市吉井町にオープンした、地元出身の兄弟が営むワッフルとコーヒーのお店として紹介されました。",
  },
  {
    _id: "default-gunlabo-2026-05-21",
    title: "ワッフルスタンド MINORU cafe",
    publisher: "ぐんラボ！",
    publishedAt: "2026-05-21",
    url: "https://www.gunlabo.net/shop/shop.shtml?s=9848",
    category: "店舗紹介",
    thumbnailUrl: "https://www.gunlabo.net/images/A00009848.jpg?1778814052",
    description:
      "住所、営業時間、駐車場、オススメメニュー、口コミなどを掲載いただいています。",
  },
  {
    _id: "default-gcarat-2026-05-21",
    title:
      "倉庫を素敵にリノベしたカフェ！高崎市吉井町に2026年2月オープンしたよ！",
    publisher: "gCarat",
    publishedAt: "2026-05-21",
    url: "https://www.carat-gunma.jp/2026/05/21/20260520/",
    category: "メディア掲載",
    thumbnailUrl:
      "https://www.carat-gunma.jp/cms/wp-content/uploads/2026/05/20260515_105204-884x600.jpg",
    description:
      "リノベーションした店舗空間、店内のアート、ワッフルやコーヒーについて紹介されました。",
  },
  {
    _id: "default-saikura-2026-02-08",
    title:
      "高崎市吉井町にワッフルスタンド『MINORU cafe』が2026年2月オープン予定！",
    publisher: "さいほくらし",
    publishedAt: "2026-02-08",
    url: "https://saikura.info/open-minoru-cafe-takasaki-202602/",
    category: "開店情報",
    description:
      "オープン前の新店情報として、店舗の場所やワッフルとコーヒーのお店であることを紹介いただきました。",
  },
  {
    _id: "default-tabelog-2026-02-15",
    title: "MINORU cafe（ミノル カフェ）",
    publisher: "食べログ",
    publishedAt: "2026-02-15",
    url: "https://tabelog.com/gunma/A1001/A100102/10026712/",
    category: "外部レビュー",
    description:
      "店舗情報、写真、口コミが掲載されている外部グルメサイトのページです。",
  },
  {
    _id: "default-tabelog-review-2026-02",
    title: "高崎市吉井町にワッフルとコーヒーのお店がオープン",
    publisher: "食べログ 口コミ",
    publishedAt: "2026-02",
    url: "https://tabelog.com/gunma/A1001/A100102/10026712/dtlrvwlst/B522580413/",
    category: "外部レビュー",
    description:
      "来店された方による口コミとして、MINORU cafeについて紹介されています。",
  },
  {
    _id: "default-kaiten-heiten-2026-02-15",
    title: "MINORU cafe 開店情報",
    publisher: "開店閉店.com",
    publishedAt: "2026-02-15",
    url: "https://kaiten-heiten-24.com/minoru-cafe/",
    category: "開店情報",
    description:
      "群馬県高崎市のカフェ・レストラン開店情報として掲載されました。",
  },
  {
    _id: "default-lemon8-2026",
    title: "MINORU cafe 関連投稿",
    publisher: "Lemon8",
    publishedAt: "2026",
    url: "https://www.lemon8-app.com/discover/minoru?region=jp&pid=website_seo_from_sug",
    category: "SNS紹介",
    description:
      "Lemon8上で、MINORU cafeに関連する投稿や紹介が見つかるページです。",
  },
  {
    _id: "default-instagram-miyasan-gunma-gourmet-2026",
    title: "Instagramで紹介されました",
    publisher: "Instagram / 宮さん｜群馬グルメ・スポット",
    publishedAt: "2026",
    url: "https://www.instagram.com/reel/DYD-9h_z0zP/",
    category: "SNS紹介",
    description:
      "群馬グルメ・スポット紹介のInstagram Reelで、MINORU cafeを紹介いただきました。",
  },
  {
    _id: "default-instagram-dxjxojfkqeq-2026",
    title: "Instagram Reelで紹介されました",
    publisher: "Instagram / 群馬もぐもぐ【群馬グルメ】",
    publishedAt: "2026",
    url: "https://www.instagram.com/reel/DXjXOjfkqeq/",
    category: "SNS紹介",
    description:
      "群馬グルメ紹介のInstagram Reelで、MINORU cafeを紹介いただきました。",
  },
  {
    _id: "default-instagram-dwfsqkxawfc-2026",
    title: "Instagram投稿で紹介されました",
    publisher: "Instagram / だるがん君【群馬グルメ】",
    publishedAt: "2026",
    url: "https://www.instagram.com/p/DWfSQkXAWfC/",
    category: "SNS紹介",
    description:
      "群馬グルメ紹介のInstagram投稿で、MINORU cafeを紹介いただきました。",
  },
  {
    _id: "default-instagram-dvoneu2ewd9-2026",
    title: "Instagram投稿で紹介されました",
    publisher: "Instagram / URON（うーろん）",
    publishedAt: "2026",
    url: "https://www.instagram.com/p/DVONEu2EWd9/",
    category: "SNS紹介",
    description:
      "群馬カフェ・グルメ紹介のInstagram投稿で、MINORU cafeを紹介いただきました。",
  },
  {
    _id: "default-instagram-du7-sg0eech-2026",
    title: "Instagram Reelで紹介されました",
    publisher: "Instagram / URON（うーろん）",
    publishedAt: "2026",
    url: "https://www.instagram.com/reel/DU7_sg0EeCH/",
    category: "SNS紹介",
    description:
      "群馬カフェ・グルメ紹介のInstagram Reelで、MINORU cafeを紹介いただきました。",
  },
  {
    _id: "default-instagram-dvgkz1pkotk-2026",
    title: "Instagram Reelで紹介されました",
    publisher: "Instagram / さと 群馬パン屋・カフェ日記",
    publishedAt: "2026",
    url: "https://www.instagram.com/reel/DVGKZ1PkoTK/",
    category: "SNS紹介",
    description:
      "群馬のパン屋・カフェ紹介のInstagram Reelで、MINORU cafeを紹介いただきました。",
  },
];

export function resolveMediaMentions(mentions: MediaMention[]) {
  return mentions.length > 0 ? mentions : defaultMediaMentions;
}

export function getMediaMentionThumbnailUrl(mention: MediaMention) {
  if (mention.thumbnailImage) {
    return urlFor(mention.thumbnailImage).width(360).height(270).fit("crop").url();
  }

  return mention.thumbnailUrl;
}

export function buildMediaMentionsJsonLd(mentions: MediaMention[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/media#mentions`,
    name: "MINORU cafeの掲載・紹介",
    itemListElement: mentions.map((mention, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: mention.title,
        url: mention.url,
        image: getMediaMentionThumbnailUrl(mention),
        datePublished: mention.publishedAt,
        publisher: {
          "@type": "Organization",
          name: mention.publisher,
        },
        about: {
          "@id": `${siteUrl}/#localbusiness`,
        },
      },
    })),
  };
}
