'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CURRENCIES, type Currency } from '@/lib/currencies';

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (c: Currency) => void;
  rates: Record<string, number>;
  selected: string;
};

export function CurrencyPicker({ open, onClose, onSelect, rates, selected }: Props) {
  const [q, setQ] = useState('');

  useEffect(() => { if (!open) setQ(''); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return CURRENCIES;
    return CURRENCIES.filter(
      (c) => c.code.toLowerCase().includes(term) || c.name.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-moon-950/70 backdrop-blur-md p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md max-h-[78vh] flex flex-col glass rounded-t-3xl sm:rounded-3xl overflow-hidden"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          >
            <header className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-bold text-lg">Choose currency</h3>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="Close">
                <X size={18} />
              </button>
            </header>

            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 focus-within:border-moon-300">
                <Search size={16} className="text-ink-dim" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search USD, Pound, Naira…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-dim"
                />
              </div>
            </div>

            <ul className="overflow-y-auto scroll-soft">
              {filtered.length === 0 && (
                <li className="p-6 text-center text-ink-dim text-sm">No currencies match “{q}”.</li>
              )}
              {filtered.map((c) => {
                const r = rates[c.code] ?? 0;
                const active = c.code === selected;
                return (
                  <li
                    key={c.code}
                    onClick={() => { onSelect(c); onClose(); }}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition ${
                      active ? 'bg-moon-300/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="text-2xl">{c.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold">{c.code}</div>
                      <div className="text-xs text-ink-dim truncate">{c.name}</div>
                    </div>
                    <div className="font-display text-sm text-moon-300">
                      {r ? r.toFixed(3) : '—'}
                      <span className="text-[10px] text-ink-dim ml-1">→ GHS</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
