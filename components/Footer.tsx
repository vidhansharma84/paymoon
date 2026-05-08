import { Logo } from './Logo';

const COLS = [
  { title: 'Product', links: ['Send money', 'Track transfer', 'Business', 'Pricing'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Blog'] },
  { title: 'Legal',   links: ['Terms', 'Privacy', 'Licenses', 'Security'] },
];

export function Footer() {
  return (
    <footer className="relative max-w-7xl mx-auto px-[4vw] pt-16 pb-8 border-t border-white/10 mt-12">
      <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 mb-12">
        <div>
          <a href="#" className="flex items-center gap-2.5 font-extrabold text-xl mb-3">
            <Logo />
            <span>Pay<em className="not-italic text-grad">Moon</em></span>
          </a>
          <p className="text-ink-dim text-sm">Remittance, finally fair.</p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <h4 className="text-xs uppercase tracking-wider text-ink-dim mb-3 font-bold">{c.title}</h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-ink-dim hover:text-moon-300 transition">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-6 border-t border-white/10 flex justify-between flex-wrap gap-4 text-xs text-ink-dim">
        <span>© 2026 PayMoon Financial Ltd. Licensed by Bank of Ghana.</span>
        <span>Made with 🌙 in Accra · London · Toronto</span>
      </div>
    </footer>
  );
}
