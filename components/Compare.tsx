'use client';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

type Row = { label: string; us: string | true; banks: string | false; others: string };

const ROWS: Row[] = [
  { label: 'Conversion fee',         us: 'GH₵ 0.20',  banks: 'GH₵ 25–80', others: 'GH₵ 8–20' },
  { label: 'Exchange-rate markup',   us: '0%',        banks: '3–5%',      others: '1–3%' },
  { label: 'Delivery time',          us: '< 60 sec',  banks: '1–3 days',  others: '10 min – hours' },
  { label: 'Mobile money support',   us: true,        banks: false,       others: 'Some' },
  { label: 'Live rate displayed',    us: true,        banks: false,       others: 'Sometimes' },
  { label: '24/7 customer support',  us: true,        banks: false,       others: 'Email only' },
];

function Cell({ value, hero }: { value: string | true | false; hero?: boolean }) {
  if (value === true)
    return <span className={`inline-flex items-center gap-1 ${hero ? 'text-moon-300' : 'text-emerald-400'} font-bold`}><Check size={16} /> Yes</span>;
  if (value === false)
    return <span className="inline-flex items-center gap-1 text-rose-400/80"><X size={16} /> No</span>;
  return <span className={hero ? 'text-moon-300 font-bold' : ''}>{value}</span>;
}

export function Compare() {
  return (
    <section className="relative max-w-7xl mx-auto px-[4vw] py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-display text-4xl sm:text-5xl font-extrabold mb-10"
      >
        The <span className="text-grad">PayMoon</span> difference.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="glass rounded-3xl overflow-hidden"
      >
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] px-5 py-4 bg-white/[.04] border-b border-white/10 text-xs uppercase tracking-wider text-ink-dim font-bold">
          <div></div>
          <div className="text-moon-300">PayMoon</div>
          <div>Banks</div>
          <div>Other apps</div>
        </div>
        {ROWS.map((r, i) => (
          <div
            key={r.label}
            className={`grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center px-5 py-4 text-sm sm:text-base ${
              i !== ROWS.length - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            <div className="text-ink-dim">{r.label}</div>
            <div><Cell value={r.us} hero /></div>
            <div className="text-ink-dim"><Cell value={r.banks} /></div>
            <div className="text-ink-dim"><Cell value={r.others} /></div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
