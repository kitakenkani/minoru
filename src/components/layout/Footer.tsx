import { getSiteSettings } from "@/lib/sanity/fetchers";
import Link from "next/link";

export async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="border-t border-brand-100 bg-white py-8">
      <div className="mx-auto max-w-4xl px-6 text-center text-sm text-stone-400 space-y-2">
        <nav aria-label="フッターナビゲーション">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs">
            <li>
              <Link href="/access" className="hover:text-brand-500">
                アクセス
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-brand-500">
                メニュー
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-brand-500">
                よくある質問
              </Link>
            </li>
            <li>
              <Link href="/media" className="hover:text-brand-500">
                掲載・紹介
              </Link>
            </li>
            {settings?.instagramUrl && (
              <li>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-500"
                >
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </nav>
        {settings?.email && (
          <p>
            お問い合わせ:{" "}
            <a
              href={`mailto:${settings.email}`}
              className="text-brand-400 underline underline-offset-2 hover:text-brand-600"
            >
              {settings.email}
            </a>
          </p>
        )}
        <p>© 2025 MINORU cafe</p>
      </div>
    </footer>
  );
}
