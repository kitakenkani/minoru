import Link from "next/link";

const navItems = [
  { label: "お知らせ", href: "/news" },
  { label: "カフェについて", href: "/about" },
  { label: "メニュー", href: "/menu" },
  { label: "アクセス", href: "/access" },
];

export function Header() {
  return (
    <header className="border-b border-brand-100 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-medium tracking-widest text-brand-600">
          MINORU cafe
        </Link>
        <nav>
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
      </div>
    </header>
  );
}
