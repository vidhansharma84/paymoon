'use client';
import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Download, Filter, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

type Tx = {
  id: string;
  name: string;
  phone: string;
  amount: number;
  ccy: 'GHS' | 'USD';
  usd: number;
  kind: 'sent' | 'received';
  status: 'delivered' | 'pending' | 'failed';
  when: string;
  method: string;
};

const TXNS: Tx[] = [
  { id: 'PMN-Q4F1', name: 'Ama Owusu',     phone: '+233 24 *** 4172', amount: 500.00,  ccy: 'GHS', usd: 44.46,  kind: 'sent',     status: 'delivered', when: 'May 8, 2:14 PM',   method: 'MTN MoMo' },
  { id: 'PMN-Q4F0', name: 'Kwame Boateng', phone: '+233 50 *** 9981', amount: 1200.00, ccy: 'GHS', usd: 106.71, kind: 'sent',     status: 'delivered', when: 'May 8, 11:02 AM',  method: 'Vodafone Cash' },
  { id: 'PMN-Q4EZ', name: 'GCB Bank',      phone: '****-2271',        amount: 2500.00, ccy: 'GHS', usd: 222.30, kind: 'sent',     status: 'pending',   when: 'May 7, 6:48 PM',   method: 'Bank deposit' },
  { id: 'PMN-Q4EY', name: 'Akosua Nyarko', phone: '+233 27 *** 0044', amount: 350.00,  ccy: 'GHS', usd: 31.12,  kind: 'sent',     status: 'delivered', when: 'May 6, 10:21 AM',  method: 'AirtelTigo' },
  { id: 'PMN-Q4EX', name: 'Wallet top-up', phone: 'Visa **** 4242',   amount: 250.00,  ccy: 'USD', usd: 250.00, kind: 'received', status: 'delivered', when: 'May 5, 8:00 AM',   method: 'Card' },
  { id: 'PMN-Q4EW', name: 'Yaw Mensah',    phone: '+233 24 *** 7783', amount: 800.00,  ccy: 'GHS', usd: 71.13,  kind: 'sent',     status: 'delivered', when: 'May 4, 3:55 PM',   method: 'MTN MoMo' },
  { id: 'PMN-Q4EV', name: 'Esi Asante',    phone: '+233 50 *** 4411', amount: 1000.00, ccy: 'GHS', usd: 88.92,  kind: 'sent',     status: 'failed',    when: 'May 3, 9:12 AM',   method: 'Vodafone Cash' },
  { id: 'PMN-Q4EU', name: 'Kojo Twum',     phone: '+233 24 *** 6620', amount: 600.00,  ccy: 'GHS', usd: 53.36,  kind: 'sent',     status: 'delivered', when: 'May 2, 7:40 PM',   method: 'MTN MoMo' },
  { id: 'PMN-Q4ET', name: 'Wallet top-up', phone: 'ACH **** 1199',    amount: 1500.00, ccy: 'USD', usd: 1500.00, kind: 'received', status: 'delivered', when: 'May 1, 12:00 PM',  method: 'Bank transfer' },
  { id: 'PMN-Q4ES', name: 'Abena Mensah',  phone: '+233 27 *** 8181', amount: 250.00,  ccy: 'GHS', usd: 22.23,  kind: 'sent',     status: 'delivered', when: 'Apr 30, 4:30 PM',  method: 'AirtelTigo' },
];

const FILTERS = ['All', 'Sent', 'Received', 'Pending', 'Failed'] as const;
type FilterKey = typeof FILTERS[number];

const fmt = (n: number, dp = 2) => n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });

export function DashboardTransactions() {
  const [filter, setFilter] = useState<FilterKey>('All');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    return TXNS.filter(t => {
      if (filter === 'Sent' && t.kind !== 'sent') return false;
      if (filter === 'Received' && t.kind !== 'received') return false;
      if (filter === 'Pending' && t.status !== 'pending') return false;
      if (filter === 'Failed' && t.status !== 'failed') return false;
      const term = q.trim().toLowerCase();
      if (term && !t.name.toLowerCase().includes(term) && !t.id.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [filter, q]);

  const totalSentUsd = TXNS.filter(t => t.kind === 'sent').reduce((a, t) => a + t.usd, 0);
  const totalRecvUsd = TXNS.filter(t => t.kind === 'received').reduce((a, t) => a + t.usd, 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold">Transactions</h1>
          <p className="text-ink-dim mt-1">Every cedi, every dollar. Searchable, filterable, downloadable.</p>
        </div>
        <button className="px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm font-semibold inline-flex items-center gap-2">
          <Download size={15} /> Export CSV
        </button>
      </header>

      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Total sent (USD)"     value={`$${fmt(totalSentUsd)}`} delta="+12% vs last month" tone="rose" />
        <Stat label="Total received (USD)" value={`$${fmt(totalRecvUsd)}`} delta="+3 top-ups"          tone="emerald" />
        <Stat label="Avg fee saved"        value="$11.42"                  delta="vs traditional banks" tone="moon" />
      </div>

      <section className="glass rounded-3xl p-5 sm:p-6">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-5">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 focus-within:border-moon-300 flex-1 min-w-[200px]">
            <Search size={15} className="text-ink-dim" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or reference"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-dim/60" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  filter === f ? 'bg-grad-moon text-moon-950' : 'bg-white/5 border border-white/10 text-ink-dim hover:text-white'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-ink-dim">
            <Filter size={28} className="mx-auto mb-2 opacity-50" />
            No transactions match.
          </div>
        )}

        <div className="divide-y divide-white/5">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="grid grid-cols-[auto_1fr_auto] gap-3 sm:gap-4 py-4 items-center"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                t.kind === 'sent' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
              }`}>
                {t.kind === 'sent' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
              </div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{t.name}</div>
                <div className="text-xs text-ink-dim truncate">
                  {t.id} · {t.method} · {t.phone}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className={`font-display font-bold ${t.kind === 'sent' ? '' : 'text-emerald-400'}`}>
                  {t.kind === 'sent' ? '−' : '+'}{t.ccy === 'GHS' ? 'GH₵ ' : '$'}{fmt(t.amount)}
                </div>
                <div className="text-[11px] text-ink-dim">
                  {t.when} ·{' '}
                  <span className={
                    t.status === 'delivered' ? 'text-emerald-400'
                    : t.status === 'pending' ? 'text-amber-300' : 'text-rose-400'
                  }>
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

function Stat({ label, value, delta, tone }: { label: string; value: string; delta: string; tone: 'rose' | 'emerald' | 'moon' }) {
  const cls = tone === 'rose' ? 'text-rose-300' : tone === 'emerald' ? 'text-emerald-300' : 'text-moon-300';
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs text-ink-dim uppercase tracking-wider">{label}</div>
      <div className="font-display text-2xl font-bold mt-1">{value}</div>
      <div className={`text-xs mt-1 ${cls}`}>{delta}</div>
    </div>
  );
}
