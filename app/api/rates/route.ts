import { NextResponse } from 'next/server';
import { CURRENCIES, FALLBACK_RATES_TO_GHS } from '@/lib/currencies';

export const revalidate = 60; // cache rates for 60s

// Returns: { base: 'GHS', rates: { USD: <usd_per_ghs>, ... }, ratesToGhs: { USD: <ghs_per_usd>, ... }, fetchedAt }
export async function GET() {
  const symbols = CURRENCIES.map((c) => c.code).join(',');

  try {
    const res = await fetch(
      `https://api.exchangerate.host/latest?base=GHS&symbols=${symbols}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error('upstream ' + res.status);
    const data = (await res.json()) as { rates?: Record<string, number> };

    const ratesToGhs: Record<string, number> = { ...FALLBACK_RATES_TO_GHS };
    if (data.rates) {
      for (const [code, ghsPerUnit] of Object.entries(data.rates)) {
        if (ghsPerUnit > 0) ratesToGhs[code] = 1 / ghsPerUnit;
      }
    }

    return NextResponse.json({
      base: 'GHS',
      ratesToGhs,
      fetchedAt: new Date().toISOString(),
      source: 'exchangerate.host',
    });
  } catch {
    return NextResponse.json({
      base: 'GHS',
      ratesToGhs: FALLBACK_RATES_TO_GHS,
      fetchedAt: new Date().toISOString(),
      source: 'fallback',
    });
  }
}
