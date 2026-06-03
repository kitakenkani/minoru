import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/sanity/fetchers";
import {
  defaultOpenGraphImage,
  localMetaOther,
  siteKeywords,
} from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/seo/site";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-serif-jp",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "MINORU cafe",
  title: {
    default: "MINORU cafe",
    template: "%s | MINORU cafe",
  },
  description:
    "群馬県高崎市吉井町のMINORU cafe公式サイト。ワッフル、コーヒー、季節限定メニュー、テイクアウト、アクセス、駐車場情報をお届けします。",
  keywords: siteKeywords,
  alternates: {
    canonical: "/",
  },
  category: "cafe",
  creator: "MINORU cafe",
  publisher: "MINORU cafe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    siteName: "MINORU cafe",
    locale: "ja_JP",
    type: "website",
    title: "MINORU cafe",
    description:
      "群馬県高崎市吉井町のMINORU cafe公式サイト。ワッフル、コーヒー、季節限定メニュー、テイクアウト、アクセス、駐車場情報をお届けします。",
    url: "/",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "MINORU cafe",
    description:
      "群馬県高崎市吉井町のMINORU cafe公式サイト。ワッフル、コーヒー、季節限定メニュー、テイクアウト、アクセス、駐車場情報をお届けします。",
    images: [defaultOpenGraphImage.url],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  other: localMetaOther,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="ja" className={`${notoSerifJP.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-stone-50 font-serif text-stone-800">
        <Header instagramUrl={settings?.instagramUrl} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
