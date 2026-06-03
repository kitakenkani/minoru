import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/sanity/fetchers";
import { siteUrl } from "@/lib/seo/site";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-serif-jp",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MINORU cafe",
    template: "%s | MINORU cafe",
  },
  description: "MINORU cafe の公式サイト",
  openGraph: {
    siteName: "MINORU cafe",
    locale: "ja_JP",
    type: "website",
    title: "MINORU cafe",
    description: "MINORU cafe の公式サイト",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
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
