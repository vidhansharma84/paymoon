'use client';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CURRENCIES, FALLBACK_RATES_TO_GHS } from '@/lib/currencies';

const fmt = (n: number, dp = 4) =>
  n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });

export function LiveRates() {
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES_TO_GHS);

  useEffect(() => {
    let dead = false;
    const pull = async () => {
      try {
        const res = await fetch('/api/rates', { cache: 'no-store' });
        const data = await res.json();
        if (!dead && data?.ratesToGhs) setRates((p) => ({ ...p, ...data.ratesToGhs }));
      } catch {}
    };
    pull();
    const id = setInterval(pull, 60_000);
    return () => { dead = true; clearInterval(id); };
  }, []);

  return (
    <section id="rates" className="relative max-w-7xl mx-auto px-[4vw] py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-3">Live conversion rates</h2>
        <p className="text-ink-dim max-w-xl mx-auto">
          Real mid-market rates, refreshed every 60 seconds. The same rate you see on Google.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {CURRENCIES.slice(0, 12).map((c, i) => {
          const r = rates[c.code] ?? FALLBACK_RATES_TO_GHS[c.code] ?? 0;
          const base = FALLBACK_RATES_TO_GHS[c.code] ?? r;
          const deltaPct = base ? ((r - base) / base) * 100 : 0;
          const up = deltaPct >= 0;
          return (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 hover:border-moon-300/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <span className="text-2xl">{c.flag}</span>
                  <span>{c.code} → GHS</span>
                </div>
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                    up ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'
                  }`}
                >
                  {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(deltaPct).toFixed(2)}%
                </span>
              </div>
              <motion.div
                key={r}
                initial={{ opacity: 0.5, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-2xl font-bold text-moon-300"
              >
                {fmt(r)}
              </motion.div>
              <div className="text-xs text-ink-dim mt-1">1 {c.code} → GH₵ {r.toFixed(2)}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
