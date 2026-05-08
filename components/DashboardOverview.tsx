'use client';
import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff, Plus, Send, TrendingUp, Wallet, Zap } from 'lucide-react';
import { useState } from 'react';
import type { Session } from '@/lib/auth';

const TRANSACTIONS = [
  { id: 1, name: 'Ama Owusu',     phone: '+233 24 *** 4172', amount: 500.00, ccy: 'GHS', usd: 44.46, kind: 'sent',     status: 'delivered', when: 'Today, 2:14 PM',   method: 'MTN MoMo' },
  { id: 2, name: 'Kwame Boateng', phone: '+233 50 *** 9981', amount: 1200.00, ccy: 'GHS', usd: 106.71, kind: 'sent',     status: 'delivered', when: 'Today, 11:02 AM',  method: 'Vodafone Cash' },
  { id: 3, name: 'GCB Bank',      phone: '****-2271',        amount: 2500.00, ccy: 'GHS', usd: 222.30, kind: 'sent',     status: 'pending',   when: 'Yesterday, 6:48 PM', method: 'Bank deposit' },
  { id: 4, name: 'Akosua Nyarko', phone: '+233 27 *** 0044', amount: 350.00, ccy: 'GHS', usd: 31.12, kind: 'sent',     status: 'delivered', when: 'May 6, 10:21 AM',  method: 'AirtelTigo' },
  { id: 5, name: 'Wallet top-up',  phone: 'Visa **** 4242',   amount: 250.00, ccy: 'USD', usd: 250.00, kind: 'received', status: 'delivered', when: 'May 5, 8:00 AM',   method: 'Card' },
  { id: 6, name: 'Yaw Mensah',    phone: '+233 24 *** 7783', amount: 800.00, ccy: 'GHS', usd: 71.13, kind: 'sent',     status: 'delivered', when: 'May 4, 3:55 PM',   method: 'MTN MoMo' },
];

export function DashboardOverview({ user }: { user: Session }) {
  const [showBalance, setShowBalance] = useState(true);
  const balanceUsd = 1842.55;
  const balanceGhs = balanceUsd * 11.2462;
  const monthSpentUsd = 475.62;
  const monthSavedUsd = 38.47;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold">
            Hey, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-ink-dim mt-1">Here's what's moving in your PayMoon wallet.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm font-semibold inline-flex items-center gap-2">
            <Plus size={15} /> Add money
          </button>
          <button className="px-5 py-2.5 rounded-full btn-grad text-sm font-bold inline-flex items-center gap-2 hover:scale-[1.02] transition">
            <Send size={15} /> Send money
          </button>
        </div>
      </header>

      {/* Balance card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative glass rounded-3xl p-6 sm:p-8 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute -right-20 -top-24 w-72 h-72 rounded-full blur-3xl opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(255,216,107,.25), transparent 60%)' }}
        />
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs uppercase tracking-wider text-ink-dim">Available balance</span>
          <button onClick={() => setShowBalance((v) => !v)} className="text-ink-dim hover:text-white transition" aria-label="Toggle balance visibility">
            {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        <div className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight mb-1">
          {showBalance ? `$${balanceUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$ • • • • •'}
        </div>
        <div className="text-ink-dim text-sm">
          ≈ GH₵ {showBalance ? balanceGhs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '• • • • •'}
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          <Stat icon={<TrendingUp size={16} />} label="Sent this month" value={`$${monthSpentUsd.toFixed(2)}`} />
          <Stat icon={<Wallet size={16} />}     label="Saved vs banks"  value={`$${monthSavedUsd.toFixed(2)}`} hint="vs 4% bank fee" />
          <Stat icon={<Zap size={16} />}        label="Avg delivery"    value="42s" hint="last 30 days" />
        </div>
      </motion.section>

      {/* Quick send + recent recipients */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <QuickSendCard />
        <RecentRecipientsCard />
      </div>

      {/* Transaction history */}
      <section className="glass rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold">Recent activity</h2>
          <button className="text-sm text-moon-300 hover:underline font-semibold">View all →</button>
        </div>
        <div className="divide-y divide-white/5">
          {TRANSACTIONS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="flex items-center gap-3 sm:gap-4 py-3.5"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                t.kind === 'sent' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
              }`}>
                {t.kind === 'sent' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{t.name}</div>
                <div className="text-xs text-ink-dim truncate">{t.method} · {t.phone}</div>
              </div>
              <div className="text-right shrink-0">
                <div className={`font-display font-bold ${t.kind === 'sent' ? '' : 'text-emerald-400'}`}>
                  {t.kind === 'sent' ? '−' : '+'}{t.ccy === 'GHS' ? 'GH₵ ' : '$'}{t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] text-ink-dim">
                  {t.when} ·{' '}
                  <span className={t.status === 'delivered' ? 'text-emerald-400' : 'text-amber-300'}>
                    {t.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint?: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <div className="flex items-center gap-1.5 text-ink-dim text-xs uppercase tracking-wider mb-1">
        <span className="text-moon-300">{icon}</span>{label}
      </div>
      <div className="font-display text-xl font-bold">{value}</div>
      {hint && <div className="text-[11px] text-ink-dim mt-0.5">{hint}</div>}
    </div>
  );
}

function QuickSendCard() {
  return (
    <section className="glass rounded-3xl p-6">
      <h2 className="font-display text-xl font-bold mb-4">Quick send</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        <SendField label="You send" value="100.00" right="🇺🇸 USD" />
        <SendField label="They get"  value="1,124.42" right="🇬🇭 GHS" muted />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-ink-dim">Fee · <span className="text-moon-300 font-semibold">GH₵ 0.20</span></div>
        <div className="text-ink-dim">Rate · <span className="font-display text-moon-300">11.2462</span></div>
      </div>
      <button className="w-full mt-5 py-3 rounded-full btn-grad font-bold hover:scale-[1.02] transition">
        Continue →
      </button>
    </section>
  );
}

function SendField({ label, value, right, muted }: { label: string; value: string; right: string; muted?: boolean }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 ${muted ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-black/40 border-white/10'}`}>
      <div className="text-[11px] uppercase tracking-wider text-ink-dim mb-1">{label}</div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-display font-bold text-2xl">{value}</span>
        <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1 text-sm font-bold whitespace-nowrap">{right}</span>
      </div>
    </div>
  );
}

const RECIPIENTS = [
  { name: 'Ama O.',     hint: 'MTN · ***4172',  emoji: '👩🏾' },
  { name: 'Kwame B.',    hint: 'Voda · ***9981', emoji: '👨🏾' },
  { name: 'Akosua N.',   hint: 'AT · ***0044',   emoji: '👩🏾‍🦱' },
  { name: 'Yaw M.',      hint: 'MTN · ***7783',  emoji: '🧑🏾' },
];

function RecentRecipientsCard() {
  return (
    <section className="glass rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold">Recipients</h2>
        <button className="text-xs text-moon-300 hover:underline font-semibold">+ New</button>
      </div>
      <ul className="space-y-2">
        {RECIPIENTS.map((r) => (
          <li key={r.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-moon-300/10 flex items-center justify-center text-lg">{r.emoji}</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{r.name}</div>
              <div className="text-xs text-ink-dim">{r.hint}</div>
            </div>
            <Send size={14} className="text-ink-dim" />
          </li>
        ))}
      </ul>
    </section>
  );
}
