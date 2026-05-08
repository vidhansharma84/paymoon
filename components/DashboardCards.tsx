'use client';
import { motion } from 'framer-motion';
import { Building2, Lock, Plus, Shield, Trash2, Wallet } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';

type Card = {
  id: string;
  brand: 'Visa' | 'Mastercard' | 'Apple Pay';
  last4: string;
  exp: string;
  name: string;
  default: boolean;
};

const SEED: Card[] = [
  { id: 'c1', brand: 'Visa',       last4: '4242', exp: '08/29', name: 'Main card',        default: true  },
  { id: 'c2', brand: 'Mastercard', last4: '7711', exp: '11/27', name: 'Backup',           default: false },
  { id: 'c3', brand: 'Apple Pay',  last4: '8819', exp: '—',     name: 'iPhone 16 wallet', default: false },
];

const BANKS = [
  { name: 'Chase ****1199',     type: 'Checking · ACH', balance: 'Verified' },
  { name: 'Wise USD ****0421',  type: 'Multicurrency',  balance: 'Verified' },
];

export function DashboardCards() {
  const [cards, setCards] = useState(SEED);

  function makeDefault(id: string) {
    setCards(c => c.map(card => ({ ...card, default: card.id === id })));
  }
  function remove(id: string) {
    setCards(c => c.filter(card => card.id !== id));
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold">Cards &amp; banks</h1>
          <p className="text-ink-dim mt-1">Pay-in methods you've linked to your wallet.</p>
        </div>
        <button className="px-5 py-2.5 rounded-full btn-grad font-bold text-sm hover:scale-[1.02] transition inline-flex items-center gap-2">
          <Plus size={15} /> Add method
        </button>
      </header>

      <section>
        <h2 className="text-xs uppercase tracking-wider text-ink-dim mb-3">💳 Cards</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, rotateX: 2 }}
              className="relative aspect-[1.586] rounded-3xl p-5 overflow-hidden"
              style={{
                background: i === 0
                  ? 'linear-gradient(135deg, #ffd86b 0%, #ff8a3d 50%, #c45cff 100%)'
                  : i === 1
                  ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                  : 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
              }}
            >
              <div className="flex justify-between items-start">
                <div className={`flex items-center gap-1.5 font-extrabold ${i === 0 ? 'text-moon-950' : 'text-white'}`}>
                  <Logo size={20} />
                  <span>PayMoon</span>
                </div>
                {c.default && (
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                    i === 0 ? 'bg-moon-950/30 text-moon-950' : 'bg-white/15 text-white'
                  }`}>Default</span>
                )}
              </div>

              {/* Chip */}
              <div className={`mt-6 w-10 h-7 rounded ${i === 0 ? 'bg-moon-950/20' : 'bg-white/10'}`} />

              <div className={`absolute left-5 right-5 bottom-5 ${i === 0 ? 'text-moon-950' : 'text-white'}`}>
                <div className="font-display text-lg tracking-[0.2em] mb-2">•••• {c.last4}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="opacity-80">{c.name}</span>
                  <span className="opacity-80">EXP {c.exp}</span>
                </div>
              </div>

              <div className={`absolute right-5 top-1/2 -translate-y-1/2 font-display text-xl font-bold ${i === 0 ? 'text-moon-950/60' : 'text-white/60'}`}>
                {c.brand}
              </div>
            </motion.article>
          ))}

          {/* Add new card placeholder */}
          <motion.button
            whileHover={{ y: -4 }}
            className="aspect-[1.586] rounded-3xl border-2 border-dashed border-white/15 flex flex-col items-center justify-center text-ink-dim hover:text-moon-300 hover:border-moon-300/40 transition"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2"><Plus size={20} /></div>
            <span className="font-semibold">Add new card</span>
            <span className="text-xs opacity-70 mt-0.5">Visa, Mastercard, Apple Pay</span>
          </motion.button>
        </div>

        {/* Card actions strip */}
        <div className="mt-4 grid sm:grid-cols-3 gap-2 text-sm">
          {cards.map(c => (
            <div key={c.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
              <span className="truncate">{c.brand} •••• {c.last4}</span>
              <div className="flex gap-2 shrink-0">
                {!c.default && (
                  <button onClick={() => makeDefault(c.id)} className="text-xs text-moon-300 hover:underline font-semibold">Make default</button>
                )}
                <button onClick={() => remove(c.id)} className="text-ink-dim hover:text-rose-400" aria-label="Remove">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-wider text-ink-dim mb-3">🏦 Bank accounts</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {BANKS.map(b => (
            <div key={b.name} className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-moon-300/10 flex items-center justify-center"><Building2 size={20} className="text-moon-300" /></div>
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{b.name}</div>
                <div className="text-xs text-ink-dim">{b.type}</div>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">{b.balance}</span>
            </div>
          ))}
          <button className="rounded-2xl border-2 border-dashed border-white/15 p-5 flex items-center gap-3 text-ink-dim hover:text-moon-300 hover:border-moon-300/40 transition">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center"><Plus size={18} /></div>
            <span className="font-semibold">Connect a bank</span>
          </button>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-3">
        <Trust icon={<Shield size={16} />} title="Bank-grade encryption" body="All card data tokenized via PCI-DSS Level 1." />
        <Trust icon={<Lock   size={16} />} title="3D Secure on every charge" body="2FA confirmation by your card issuer." />
        <Trust icon={<Wallet size={16} />} title="Auto-reload"               body="Top up your wallet when balance drops below a threshold." />
      </section>
    </div>
  );
}

function Trust({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="w-9 h-9 rounded-lg bg-grad-moon flex items-center justify-center mb-3 text-moon-950">{icon}</div>
      <div className="font-bold mb-1">{title}</div>
      <div className="text-sm text-ink-dim">{body}</div>
    </div>
  );
}
