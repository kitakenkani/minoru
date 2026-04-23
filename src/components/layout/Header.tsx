"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "お知らせ", href: "/news" },
  { label: "カフェについて", href: "/about" },
  { label: "メニュー", href: "/menu" },
  { label: "アクセス", href: "/access" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-brand-100 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-medium tracking-widest text-brand-600"
          onClick={() => setIsOpen(false)}
        >
          MINORU cafe
        </Link>

        {/* デスクトップ用ナビ */}
        <nav className="hidden sm:block">
          <ul className="flex gap-6">
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
          </ul>
        </nav>

        {/* ハンバーガーボタン（モバイルのみ表示） */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
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
          </ul>
        </nav>
      )}
    </header>
  );
}
