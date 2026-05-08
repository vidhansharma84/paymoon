# PayMoon — Next.js

Beautiful Ghana-remittance landing page. Live rates, framer-motion animations, glassmorphic calculator with currency picker.

## Run

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3 (custom moon palette)
- framer-motion (scroll, stagger, hover, modal animations)
- lucide-react icons
- Live rates via internal `/api/rates` route, sourced from `exchangerate.host` (free, cached 60s) with baked-in fallback.

## Structure

- `app/page.tsx` — composes the page
- `app/api/rates/route.ts` — proxies live FX rates → GHS
- `components/Calculator.tsx` — the hero conversion widget (with currency picker, animated rate)
- `components/CurrencyPicker.tsx` — searchable bottom-sheet / modal
- `components/Navbar.tsx` — sticky, blurs on scroll, mobile drawer
- `components/Background.tsx` — orbiting moon glow + twinkling stars
- `components/LiveRates.tsx` — auto-refreshing rate cards
- `lib/currencies.ts` — 16 source currencies + GH₵ 0.20 flat fee constant
