"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "お知らせ", href: "/news" },
  { label: "カフェについて", href: "/about" },
  { label: "メニュー", href: "/menu" },
  { label: "アクセス", href: "/access" },
  { label: "よくある質問", href: "/faq" },
];

interface HeaderProps {
  instagramUrl?: string;
}

export function Header({ instagramUrl }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-brand-100 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-base font-medium tracking-widest text-brand-600 sm:text-lg"
          onClick={() => setIsOpen(false)}
        >
          MINORU cafe
        </Link>

        {/* デスクトップ用ナビ */}
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-stone-500 transition-colors hover:text-brand-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {instagramUrl && (
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center rounded-full border border-brand-200 px-3 text-xs tracking-wide text-brand-600 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
                >
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3 sm:hidden">
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center rounded-full border border-brand-200 px-3 text-xs tracking-wide text-brand-600"
            >
              Instagram
            </a>
          )}

          {/* ハンバーガーボタン（モバイルのみ表示） */}
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isOpen}
          >
            <span
              className={`block h-0.5 w-5 bg-stone-600 transition-transform duration-200 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-stone-600 transition-opacity duration-200 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-stone-600 transition-transform duration-200 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* モバイル用ナビ */}
      {isOpen && (
        <nav className="sm:hidden border-t border-brand-100">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-6 py-4 text-sm text-stone-600 hover:bg-brand-50 hover:text-brand-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {instagramUrl && (
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-6 py-4 text-sm text-brand-600 hover:bg-brand-50 hover:text-brand-700"
                  onClick={() => setIsOpen(false)}
                >
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
