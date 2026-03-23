import { getSiteSettings } from "@/lib/sanity/fetchers";

export async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="border-t border-brand-100 bg-white py-8">
      <div className="mx-auto max-w-4xl px-6 text-center text-sm text-stone-400 space-y-2">
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
