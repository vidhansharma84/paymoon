'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Check, ChevronDown, Phone, Search, Smartphone, User } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CURRENCIES, FALLBACK_RATES_TO_GHS, FEE_GHS, type Currency } from '@/lib/currencies';

const NETWORKS = [
  { id: 'mtn',    name: 'MTN MoMo',       color: 'bg-amber-400/20 text-amber-300',  icon: Smartphone, eta: '< 30 sec' },
  { id: 'voda',   name: 'Vodafone Cash',  color: 'bg-rose-500/20 text-rose-300',    icon: Smartphone, eta: '< 1 min'  },
  { id: 'at',     name: 'AirtelTigo',     color: 'bg-sky-500/20 text-sky-300',      icon: Smartphone, eta: '< 2 min'  },
  { id: 'bank',   name: 'Bank deposit',   color: 'bg-violet-500/20 text-violet-300',icon: Building2,  eta: '5–10 min' },
];

const SAVED = [
  { name: 'Ama Owusu',    phone: '+233 24 *** 4172', net: 'mtn',  emoji: '👩🏾'      },
  { name: 'Kwame Boateng',phone: '+233 50 *** 9981', net: 'voda', emoji: '👨🏾'      },
  { name: 'Akosua Nyarko',phone: '+233 27 *** 0044', net: 'at',   emoji: '👩🏾‍🦱'    },
  { name: 'Yaw Mensah',   phone: '+233 24 *** 7783', net: 'mtn',  emoji: '🧑🏾'      },
  { name: 'GCB Bank',     phone: '****-2271',        net: 'bank', emoji: '🏦'       },
];

const fmt = (n: number, dp = 2) => n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });

export function DashboardSend() {
  const [step, setStep] = useState(0);
  const [from, setFrom] = useState<Currency>(CURRENCIES[0]);
  const [amount, setAmount] = useState('250');
  const [recipient, setRecipient] = useState<typeof SAVED[number] | null>(null);
  const [network, setNetwork] = useState(NETWORKS[0]);
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES_TO_GHS);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch('/api/rates').then(r => r.json()).then(d => d?.ratesToGhs && setRates(p => ({ ...p, ...d.ratesToGhs }))).catch(() => {});
  }, []);

  const rate = rates[from.code] ?? 1;
  const amt = parseFloat(amount) || 0;
  const grossGhs = amt * rate;
  const netGhs = Math.max(0, grossGhs - FEE_GHS);

  const STEPS = ['Amount', 'Recipient', 'Method', 'Review'];

  function next() { setStep(s => Math.min(s + 1, STEPS.length - 1)); }
  function back() { setStep(s => Math.max(s - 1, 0)); }
  function confirm() { setDone(true); }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-10 text-center max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
          className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-5"
        >
          <Check size={40} className="text-emerald-400" />
        </motion.div>
        <h2 className="font-display text-3xl font-extrabold mb-2">Money on its way 🌙</h2>
        <p className="text-ink-dim mb-6">
          <strong className="text-white">GH₵ {fmt(netGhs)}</strong> arriving on{' '}
          <strong className="text-white">{recipient?.name ?? 'your recipient'}</strong>'s {network.name} in {network.eta}.
        </p>
        <div className="text-left bg-black/30 border border-white/10 rounded-2xl p-4 text-sm space-y-1 mb-6">
          <Row label="Reference" value={`PMN-${Date.now().toString(36).toUpperCase()}`} />
          <Row label="You sent" value={`${from.symbol}${fmt(amt)} ${from.code}`} />
          <Row label="Fee" value="GH₵ 0.20" />
          <Row label="Rate" value={`1 ${from.code} = ${fmt(rate, 4)} GHS`} />
        </div>
        <button onClick={() => { setDone(false); setStep(0); setRecipient(null); }}
          className="px-6 py-3 rounded-full btn-grad font-bold hover:scale-[1.02] transition">
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-1">Send money</h1>
      <p className="text-ink-dim mb-6">Fast, fair, flat 20-pesewa fee.</p>

      {/* Stepper */}
      <ol className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2 shrink-0">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              i < step ? 'bg-emerald-500 text-emerald-950'
              : i === step ? 'bg-grad-moon text-moon-950'
              : 'bg-white/5 text-ink-dim border border-white/10'
            }`}>
              {i < step ? <Check size={14} /> : i + 1}
            </span>
            <span className={`text-sm font-semibold ${i === step ? 'text-white' : 'text-ink-dim'}`}>{s}</span>
            {i < STEPS.length - 1 && <span className="w-8 h-px bg-white/10" />}
          </li>
        ))}
      </ol>

      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        {step === 0 && (
          <section className="glass rounded-3xl p-6 space-y-4">
            <Row2 label="You send">
              <div className="flex items-center gap-2">
                <input type="number" min={1} value={amount} onChange={e => setAmount(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent outline-none font-display font-bold text-3xl" />
                <CcySelect value={from} onChange={setFrom} />
              </div>
            </Row2>
            <div className="border border-dashed border-white/10 rounded-xl px-4 py-3 space-y-1 text-sm">
              <Row label="Conversion fee" value={<b>GH₵ 0.20</b>} />
              <Row label="Rate"           value={<span className="font-display text-moon-300">1 {from.code} = {fmt(rate, 4)} GHS</span>} />
            </div>
            <Row2 label="They receive" highlight>
              <div className="flex items-center gap-2">
                <span className="flex-1 font-display font-bold text-3xl">{fmt(netGhs)}</span>
                <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1.5 font-bold text-sm">🇬🇭 GHS</span>
              </div>
            </Row2>
          </section>
        )}

        {step === 1 && <RecipientPicker recipient={recipient} setRecipient={setRecipient} />}

        {step === 2 && (
          <section className="glass rounded-3xl p-6">
            <h3 className="font-bold mb-4">Choose payout method</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {NETWORKS.map(n => (
                <button key={n.id} onClick={() => setNetwork(n)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition ${
                    network.id === n.id ? 'border-moon-300 bg-moon-300/5' : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${n.color}`}>
                    <n.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{n.name}</div>
                    <div className="text-xs text-ink-dim">Delivery {n.eta}</div>
                  </div>
                  {network.id === n.id && <Check size={16} className="text-moon-300" />}
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="glass rounded-3xl p-6 space-y-4">
            <h3 className="font-bold">Review &amp; confirm</h3>
            <div className="bg-black/30 border border-white/10 rounded-2xl p-5 space-y-2">
              <Row label="You send" value={<b className="text-white">{from.symbol}{fmt(amt)} {from.code}</b>} />
              <Row label="They receive" value={<b className="text-emerald-400">GH₵ {fmt(netGhs)}</b>} />
              <Row label="Conversion fee" value="GH₵ 0.20" />
              <Row label="Exchange rate" value={`1 ${from.code} = ${fmt(rate, 4)} GHS`} />
              <hr className="border-white/10 my-2" />
              <Row label="Recipient" value={recipient?.name ?? '—'} />
              <Row label="Number"    value={recipient?.phone ?? '—'} />
              <Row label="Method"    value={network.name} />
              <Row label="Delivery"  value={network.eta} />
            </div>
            <p className="text-xs text-ink-dim text-center">By confirming you agree to PayMoon's terms. Rate locks for 30 seconds.</p>
          </section>
        )}
      </motion.div>

      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <button onClick={back} className="px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition font-semibold">
            Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            onClick={next}
            disabled={(step === 1 && !recipient) || (step === 0 && amt <= 0)}
            className="flex-1 px-5 py-3 rounded-full btn-grad font-bold hover:scale-[1.01] transition inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            Continue <ArrowRight size={16} />
          </button>
        ) : (
          <button onClick={confirm} className="flex-1 px-5 py-3 rounded-full btn-grad font-bold hover:scale-[1.01] transition">
            Confirm &amp; send GH₵ {fmt(netGhs)}
          </button>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="flex justify-between"><span className="text-ink-dim">{label}</span><span>{value}</span></div>;
}

function Row2({ label, children, highlight }: { label: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 ${highlight ? 'bg-emerald-500/[.06] border-emerald-500/20' : 'bg-black/40 border-white/10'}`}>
      <div className="text-[11px] uppercase tracking-wider text-ink-dim mb-1">{label}</div>
      {children}
    </div>
  );
}

function CcySelect({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full px-3.5 py-2 font-bold text-sm">
        <span className="text-lg leading-none">{value.flag}</span>
        <span>{value.code}</span>
        <ChevronDown size={14} className="opacity-70" />
      </button>
      {open && (
        <ul className="absolute right-0 top-full mt-2 w-56 max-h-72 overflow-auto bg-moon-900 border border-white/10 rounded-2xl py-1 z-30 shadow-card scroll-soft">
          {CURRENCIES.map(c => (
            <li key={c.code} onClick={() => { onChange(c); setOpen(false); }}
              className="px-3 py-2 hover:bg-white/10 cursor-pointer flex items-center gap-2 text-sm">
              <span className="text-lg">{c.flag}</span><b>{c.code}</b>
              <span className="text-ink-dim text-xs ml-auto truncate">{c.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RecipientPicker({
  recipient, setRecipient,
}: { recipient: typeof SAVED[number] | null; setRecipient: (r: typeof SAVED[number]) => void }) {
  const [q, setQ] = useState('');
  const list = useMemo(() => SAVED.filter(r => r.name.toLowerCase().includes(q.toLowerCase()) || r.phone.includes(q)), [q]);
  return (
    <section className="glass rounded-3xl p-6">
      <h3 className="font-bold mb-4">Send to</h3>
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 focus-within:border-moon-300 mb-4">
        <Search size={15} className="text-ink-dim" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search saved or paste new number"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-dim/60" />
      </div>
      <ul className="space-y-1.5">
        {list.map(r => {
          const active = recipient?.name === r.name;
          return (
            <li key={r.name} onClick={() => setRecipient(r)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition ${
                active ? 'border-moon-300 bg-moon-300/5' : 'border-transparent bg-white/5 hover:bg-white/10'
              }`}>
              <div className="w-10 h-10 rounded-full bg-moon-300/10 flex items-center justify-center text-lg shrink-0">{r.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{r.name}</div>
                <div className="text-xs text-ink-dim">{r.phone} · {NETWORKS.find(n => n.id === r.net)?.name}</div>
              </div>
              {active && <Check size={16} className="text-moon-300" />}
            </li>
          );
        })}
        <li className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-white/15 text-sm text-ink-dim cursor-pointer hover:bg-white/5 transition">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><User size={16} /></div>
          <div>+ Add a new recipient (we'll text them a confirmation)</div>
        </li>
      </ul>
    </section>
  );
}
