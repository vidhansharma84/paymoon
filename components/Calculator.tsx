'use client';
import { motion } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CURRENCIES, FALLBACK_RATES_TO_GHS, FEE_GHS, type Currency } from '@/lib/currencies';
import { CurrencyPicker } from './CurrencyPicker';

const fmt = (n: number, dp = 2) =>
  n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });

export function Calculator() {
  const [from, setFrom] = useState<Currency>(CURRENCIES[0]);
  const [amount, setAmount] = useState('100');
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES_TO_GHS);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  // Fetch live rates from our API route, refresh every 60s
  useEffect(() => {
    let dead = false;
    async function pull() {
      try {
        const res = await fetch('/api/rates', { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) as { ratesToGhs: Record<string, number>; fetchedAt: string };
        if (dead) return;
        setRates((prev) => ({ ...prev, ...data.ratesToGhs }));
        setFetchedAt(data.fetchedAt);
        setPulse(true);
        setTimeout(() => setPulse(false), 800);
      } catch {/* keep fallback */}
    }
    pull();
    const id = setInterval(pull, 60_000);
    return () => { dead = true; clearInterval(id); };
  }, []);

  const rate = rates[from.code] ?? FALLBACK_RATES_TO_GHS[from.code] ?? 1;
  const amt = parseFloat(amount) || 0;
  const grossGhs = amt * rate;
  const netGhs = useMemo(() => Math.max(0, grossGhs - FEE_GHS), [grossGhs]);

  return (
    <motion.aside
      id="send"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative glass rounded-3xl p-6 shadow-card w-full max-w-md mx-auto"
    >
      {/* Border halo */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-3xl -z-10 blur-[2px] opacity-50"
        style={{ background: 'linear-gradient(135deg, rgba(255,216,107,.5), transparent 40%, transparent 60%, rgba(196,92,255,.4))' }}
      />

      <header className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-lg">You send, they receive</h3>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
          <motion.i
            className="w-2 h-2 rounded-full bg-emerald-400"
            style={{ boxShadow: '0 0 10px #00d68f' }}
            animate={{ opacity: pulse ? [1, 0.3, 1] : [1, 0.35, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          Live rate
        </span>
      </header>

      {/* Send field */}
      <label className="block bg-black/40 border border-white/10 rounded-2xl px-4 py-3 transition focus-within:border-moon-300">
        <span className="block text-[11px] uppercase tracking-wider text-ink-dim mb-1">You send</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="decimal"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 min-w-0 bg-transparent outline-none font-display font-bold text-3xl"
          />
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full px-3.5 py-2 font-bold text-sm transition"
          >
            <span className="text-lg leading-none">{from.flag}</span>
            <span>{from.code}</span>
            <ChevronDown size={14} className="opacity-70" />
          </button>
        </div>
      </label>

      {/* Meta */}
      <div className="my-4 border border-dashed border-white/10 rounded-xl px-4 py-3 space-y-1.5 text-sm">
        <Row label="Conversion fee" value={<span><b>GH₵ 0.20</b> <span className="text-emerald-400 text-xs ml-1">cheapest in Ghana</span></span>} />
        <Row
          label="Exchange rate"
          value={
            <motion.span
              key={rate}
              initial={{ opacity: 0.4, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-moon-300"
            >
              1 {from.code} = {fmt(rate, 4)} GHS
            </motion.span>
          }
        />
        <Row label="Delivery" value={<span className="inline-flex items-center gap-1"><Zap size={13} className="text-moon-300" /> ≈ 30 seconds</span>} />
      </div>

      {/* Receive field */}
      <div className="block bg-emerald-500/[.06] border border-emerald-500/20 rounded-2xl px-4 py-3">
        <span className="block text-[11px] uppercase tracking-wider text-ink-dim mb-1">They receive</span>
        <div className="flex items-center gap-2">
          <motion.div
            key={netGhs.toFixed(2)}
            initial={{ opacity: 0.5, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 min-w-0 font-display font-bold text-3xl"
          >
            {fmt(netGhs)}
          </motion.div>
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full px-3.5 py-2 font-bold text-sm">
            <span className="text-lg leading-none">🇬🇭</span>
            <span>GHS</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 w-full py-3.5 rounded-full font-bold btn-grad hover:scale-[1.02] active:scale-[0.99] transition"
      >
        Send now →
      </button>
      <p className="mt-3 text-xs text-center text-ink-dim">
        Recipient gets MTN MoMo, Vodafone Cash, AirtelTigo, or bank deposit.
        {fetchedAt && <span className="block opacity-60 mt-1">Rate updated {new Date(fetchedAt).toLocaleTimeString()}</span>}
      </p>

      <CurrencyPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={setFrom}
        rates={rates}
        selected={from.code}
      />
    </motion.aside>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-dim">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}
