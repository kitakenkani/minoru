export function ParkingGuide() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-cream-200">
      <div className="mb-4">
        <h2 className="text-sm font-medium tracking-wider text-brand-600">
          駐車場のご案内
        </h2>
        <p className="mt-0.5 text-xs tracking-wider text-stone-400">Parking</p>
      </div>

      <p className="mb-5 text-sm text-stone-600">
        駐車場は2か所ございます。いずれも無料でご利用いただけます。
      </p>

      <div
        className="w-full overflow-x-auto overflow-y-hidden rounded-lg border border-cream-200"
        role="img"
        aria-label="駐車場案内図。県道254号沿い、川内方面。MINORUcafeの隣に2台、モリ理容様駐車場に4台の駐車スペースがあります。道路沿いにP看板が目印です。"
      >
        <div className="min-w-[340px]">
          <svg
            viewBox="0 0 500 260"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-full"
          >
            {/* Ground */}
            <rect width="500" height="170" fill="#fafaf7" />

            {/* MINORU cafe */}
            <rect x="10" y="15" width="140" height="155" rx="5" fill="#d0f2f0" stroke="#009B8D" strokeWidth="2" />
            <text x="80" y="80" textAnchor="middle" fontSize="12" fontWeight="600" fill="#006d63">MINORU</text>
            <text x="80" y="96" textAnchor="middle" fontSize="12" fontWeight="600" fill="#006d63">cafe</text>
            <line x1="52" y1="103" x2="108" y2="103" stroke="#2ab8b0" strokeWidth="1" opacity="0.5" />
            <text x="80" y="140" textAnchor="middle" fontSize="9" fill="#00877a" opacity="0.8">店舗</text>

            {/* P1 — cafe隣 2台 */}
            <rect x="157" y="40" width="88" height="130" rx="5" fill="#edfafa" stroke="#2ab8b0" strokeWidth="1.5" strokeDasharray="5,4" />
            <circle cx="201" cy="86" r="20" fill="#009B8D" />
            <text x="201" y="94" textAnchor="middle" fontSize="22" fontWeight="700" fill="white">P</text>
            <text x="201" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="#006d63">2台</text>
            <text x="201" y="135" textAnchor="middle" fontSize="10" fill="#00877a">cafe隣</text>
            <rect x="163" y="150" width="76" height="13" rx="3" fill="#009B8D" opacity="0.1" />
            <text x="201" y="160" textAnchor="middle" fontSize="9" fill="#006d63">P看板が目印</text>

            {/* モリ理容 */}
            <rect x="268" y="25" width="124" height="145" rx="5" fill="#f4f4ef" stroke="#d4d4ca" strokeWidth="2" />
            <text x="330" y="96" textAnchor="middle" fontSize="12" fontWeight="500" fill="#78716c">モリ理容</text>
            <text x="330" y="112" textAnchor="middle" fontSize="10" fill="#a8a29e">様</text>

            {/* P2 — モリ理容 4台 */}
            <rect x="397" y="25" width="90" height="145" rx="5" fill="#edfafa" stroke="#2ab8b0" strokeWidth="1.5" strokeDasharray="5,4" />
            <circle cx="442" cy="73" r="20" fill="#009B8D" />
            <text x="442" y="81" textAnchor="middle" fontSize="22" fontWeight="700" fill="white">P</text>
            <text x="442" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#006d63">4台</text>
            <text x="442" y="126" textAnchor="middle" fontSize="10" fill="#00877a">モリ理容様</text>
            <text x="442" y="141" textAnchor="middle" fontSize="10" fill="#00877a">駐車場</text>

            {/* Sidewalk */}
            <rect x="0" y="170" width="500" height="12" fill="#d4d4ca" />

            {/* Road */}
            <rect x="0" y="182" width="500" height="78" fill="#adb5a8" />

            {/* Road center dashed line */}
            <line x1="0" y1="215" x2="500" y2="215" stroke="white" strokeWidth="2" strokeDasharray="20,13" opacity="0.55" />

            {/* Road name */}
            <text x="250" y="238" textAnchor="middle" fontSize="11" fill="white" opacity="0.8" letterSpacing="1">県道254号</text>

            {/* ← 川内 direction */}
            <polygon points="14,211 26,205 26,217" fill="white" opacity="0.6" />
            <text x="31" y="215" fontSize="10" fill="white" opacity="0.6" dominantBaseline="middle">川内方面</text>
          </svg>
        </div>
      </div>

      <ul className="mt-4 space-y-2" aria-label="駐車場一覧">
        <li className="flex items-center gap-2 text-sm text-stone-600">
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white"
            aria-hidden="true"
          >
            P
          </span>
          cafeの隣（2台）
        </li>
        <li className="flex items-center gap-2 text-sm text-stone-600">
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white"
            aria-hidden="true"
          >
            P
          </span>
          モリ理容 様 駐車場（4台）
        </li>
      </ul>

      <p className="mt-3 rounded bg-brand-50 px-3 py-2 text-xs text-brand-700">
        道路沿いに「P」の看板がございます。目印にしてください。
      </p>
    </div>
  );
}
