'use client';
import { motion } from 'framer-motion';
import { Award, Calendar, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const MONTHLY = [
  { m: 'Dec', sent: 320 }, { m: 'Jan', sent: 480 }, { m: 'Feb', sent: 410 },
  { m: 'Mar', sent: 560 }, { m: 'Apr', sent: 620 }, { m: 'May', sent: 475 },
];

const BY_RECIPIENT = [
  { name: 'Ama Owusu',     ghs: 6800,  pct: 27 },
  { name: 'Kwame Boateng', ghs: 12400, pct: 49 },
  { name: 'Akosua Nyarko', ghs: 2100,  pct: 8  },
  { name: 'Yaw Mensah',    ghs: 1500,  pct: 6  },
  { name: 'Kojo Twum',     ghs: 4200,  pct: 17 },
];

const BY_NETWORK = [
  { net: 'MTN MoMo',      pct: 52, color: '#ffd86b' },
  { net: 'Vodafone Cash', pct: 28, color: '#ff5d6c' },
  { net: 'AirtelTigo',    pct: 12, color: '#38bdf8' },
  { net: 'Bank',          pct:  8, color: '#c45cff' },
];

export function DashboardInsights() {
  const [period, setPeriod] = useState<'6M' | '1Y' | 'YTD'>('6M');

  const max = Math.max(...MONTHLY.map(d => d.sent));
  const totalThisMonth = 475.62;
  const savedVsBanks = 38.47;
  const avgPerMonth = MONTHLY.reduce((a, d) => a + d.sent, 0) / MONTHLY.length;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold">Insights</h1>
          <p className="text-ink-dim mt-1">Patterns in how you support family back home.</p>
        </div>
        <div className="flex gap-1.5 bg-white/5 border border-white/10 rounded-full p-1">
          {(['6M', '1Y', 'YTD'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                period === p ? 'btn-grad text-moon-950' : 'text-ink-dim hover:text-white'
              }`}>{p}</button>
          ))}
        </div>
      </header>

      {/* KPIs */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Kpi icon={<TrendingUp size={16} />} label="This month"     value={`$${totalThisMonth.toFixed(2)}`} delta="+18% vs Apr"   tone="moon" />
        <Kpi icon={<Award      size={16} />} label="Saved vs banks" value={`$${savedVsBanks.toFixed(2)}`}    delta="≈ 1 month groceries" tone="emerald" />
        <Kpi icon={<Calendar   size={16} />} label="Avg/month"      value={`$${avgPerMonth.toFixed(0)}`}    delta="last 6 months"    tone="default" />
        <Kpi icon={<Target     size={16} />} label="Goal progress"  value="65%"                              delta="of $1k monthly goal" tone="rose" />
      </div>

      {/* Bar chart */}
      <section className="glass rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold">Sent over time</h3>
            <p className="text-xs text-ink-dim">USD equivalent, by month</p>
          </div>
          <div className="text-right">
            <div className="font-display text-2xl font-bold">${MONTHLY.reduce((a, d) => a + d.sent, 0)}</div>
            <div className="text-xs text-ink-dim">total {period}</div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 items-end h-48">
          {MONTHLY.map((d, i) => {
            const h = (d.sent / max) * 100;
            const isLatest = i === MONTHLY.length - 1;
            return (
              <div key={d.m} className="flex flex-col items-center gap-2 h-full">
                <div className="flex-1 w-full flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.7, delay: i * 0.07, ease: 'easeOut' }}
                    className={`w-full rounded-t-lg relative group ${isLatest ? '' : 'bg-white/10 hover:bg-white/15'}`}
                    style={isLatest ? { background: 'linear-gradient(180deg, #ffd86b, #ff8a3d, #c45cff)' } : undefined}
                  >
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition">${d.sent}</span>
                  </motion.div>
                </div>
                <span className={`text-xs ${isLatest ? 'text-moon-300 font-bold' : 'text-ink-dim'}`}>{d.m}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4">
        {/* Top recipients */}
        <section className="glass rounded-3xl p-6">
          <h3 className="font-bold mb-1">Top recipients</h3>
          <p className="text-xs text-ink-dim mb-5">Where your cedis go most</p>
          <div className="space-y-3">
            {BY_RECIPIENT.sort((a, b) => b.ghs - a.ghs).map((r, i) => (
              <div key={r.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold">{i + 1}. {r.name}</span>
                  <span className="text-ink-dim">GH₵ {r.ghs.toLocaleString()} <span className="text-moon-300 font-bold ml-1">{r.pct}%</span></span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08 }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #ffd86b, #ff8a3d)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Network donut */}
        <section className="glass rounded-3xl p-6">
          <h3 className="font-bold mb-1">By payout method</h3>
          <p className="text-xs text-ink-dim mb-5">How recipients receive money</p>
          <Donut data={BY_NETWORK} />
          <ul className="mt-5 space-y-2">
            {BY_NETWORK.map(n => (
              <li key={n.net} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: n.color }} />
                  {n.net}
                </span>
                <span className="font-bold">{n.pct}%</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Kpi({ icon, label, value, delta, tone }: {
  icon: React.ReactNode; label: string; value: string; delta: string;
  tone: 'moon' | 'emerald' | 'rose' | 'default';
}) {
  const cls = tone === 'moon' ? 'text-moon-300' : tone === 'emerald' ? 'text-emerald-300' : tone === 'rose' ? 'text-rose-300' : 'text-ink-dim';
  return (
    <div className="glass rounded-2xl p-5">
      <div className={`flex items-center gap-1.5 text-xs uppercase tracking-wider ${cls} mb-1`}>{icon}{label}</div>
      <div className="font-display text-2xl font-bold">{value}</div>
      <div className="text-xs text-ink-dim mt-0.5">{delta}</div>
    </div>
  );
}

function Donut({ data }: { data: typeof BY_NETWORK }) {
  // SVG donut with stacked stroke-dasharray segments.
  const R = 60, C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 160 160" width="160" height="160" className="-rotate-90">
        <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="20" />
        {data.map((d, i) => {
          const len = (d.pct / 100) * C;
          const dash = `${len} ${C - len}`;
          const dashOffset = -offset;
          offset += len;
          return (
            <motion.circle
              key={d.net}
              cx="80" cy="80" r={R}
              fill="none" stroke={d.color} strokeWidth="20"
              strokeDasharray={dash} strokeDashoffset={dashOffset}
              initial={{ strokeDasharray: `0 ${C}` }}
              animate={{ strokeDasharray: dash }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: 'easeOut' }}
              strokeLinecap="butt"
            />
          );
        })}
        <text x="80" y="78" textAnchor="middle" className="rotate-90" fill="white" fontWeight="800" fontSize="20" transform="rotate(90 80 80)">$2.4k</text>
        <text x="80" y="98" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" transform="rotate(90 80 80)">total {`6M`}</text>
      </svg>
    </div>
  );
}
