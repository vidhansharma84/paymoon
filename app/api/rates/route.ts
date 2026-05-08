import { NextResponse } from 'next/server';
import { FALLBACK_RATES_TO_GHS } from '@/lib/currencies';

export const revalidate = 60; // cache rates for 60s
export const dynamic = 'force-dynamic';

// open.er-api.com base GHS returns: 1 GHS = X foreign units.
// So GHS_per_unit = 1 / X. Free, no API key.
export async function GET() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/GHS', {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('upstream ' + res.status);
    const data = (await res.json()) as {
      result?: string;
      rates?: Record<string, number>;
      time_last_update_utc?: string;
    };
    if (data.result !== 'success' || !data.rates) throw new Error('bad payload');

    const ratesToGhs: Record<string, number> = { ...FALLBACK_RATES_TO_GHS };
    for (const [code, foreignPerGhs] of Object.entries(data.rates)) {
      if (foreignPerGhs > 0) ratesToGhs[code] = 1 / foreignPerGhs;
    }

    return NextResponse.json({
      base: 'GHS',
      ratesToGhs,
      fetchedAt: new Date().toISOString(),
      sourceUpdatedUtc: data.time_last_update_utc ?? null,
      source: 'open.er-api.com',
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
