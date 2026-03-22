import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-serif-jp",
});

export const metadata: Metadata = {
  title: {
    default: "MINORU cafe",
    template: "%s | MINORU cafe",
  },
  description: "MINORU cafe の公式サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSerifJP.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-stone-50 font-serif text-stone-800">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
