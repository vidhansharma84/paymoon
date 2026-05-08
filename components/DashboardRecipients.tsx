'use client';
import { motion } from 'framer-motion';
import { MoreVertical, Plus, Search, Send, Star } from 'lucide-react';
import { useMemo, useState } from 'react';

type Recipient = {
  name: string;
  phone: string;
  network: 'MTN MoMo' | 'Vodafone Cash' | 'AirtelTigo' | 'Bank';
  emoji: string;
  fav: boolean;
  lastSent: string;
  totalSent: number; // GHS
};

const SEED: Recipient[] = [
  { name: 'Ama Owusu',     phone: '+233 24 *** 4172', network: 'MTN MoMo',      emoji: '👩🏾',    fav: true,  lastSent: 'Today',     totalSent: 6800 },
  { name: 'Kwame Boateng', phone: '+233 50 *** 9981', network: 'Vodafone Cash', emoji: '👨🏾',    fav: true,  lastSent: 'Today',     totalSent: 12400 },
  { name: 'Akosua Nyarko', phone: '+233 27 *** 0044', network: 'AirtelTigo',    emoji: '👩🏾‍🦱', fav: false, lastSent: '2 days ago', totalSent: 2100 },
  { name: 'Yaw Mensah',    phone: '+233 24 *** 7783', network: 'MTN MoMo',      emoji: '🧑🏾',   fav: false, lastSent: '4 days ago', totalSent: 1500 },
  { name: 'Esi Asante',    phone: '+233 50 *** 4411', network: 'Vodafone Cash', emoji: '👩🏾‍🦰', fav: false, lastSent: '5 days ago', totalSent: 3000 },
  { name: 'Kojo Twum',     phone: '+233 24 *** 6620', network: 'MTN MoMo',      emoji: '🧔🏾',   fav: true,  lastSent: '6 days ago', totalSent: 4200 },
  { name: 'GCB Bank',      phone: '****-2271',        network: 'Bank',          emoji: '🏦',     fav: false, lastSent: 'Yesterday',  totalSent: 25000 },
  { name: 'Abena Mensah',  phone: '+233 27 *** 8181', network: 'AirtelTigo',    emoji: '👩🏾',   fav: false, lastSent: '8 days ago', totalSent: 750 },
];

export function DashboardRecipients() {
  const [list, setList] = useState(SEED);
  const [q, setQ] = useState('');
  const [openAdd, setOpenAdd] = useState(false);

  const filtered = useMemo(
    () => list.filter(r => r.name.toLowerCase().includes(q.toLowerCase()) || r.phone.includes(q)),
    [list, q]
  );

  const favs = filtered.filter(r => r.fav);
  const others = filtered.filter(r => !r.fav);

  function toggleFav(name: string) {
    setList(l => l.map(r => r.name === name ? { ...r, fav: !r.fav } : r));
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold">Recipients</h1>
          <p className="text-ink-dim mt-1">{list.length} saved · {list.filter(r => r.fav).length} favourites</p>
        </div>
        <button onClick={() => setOpenAdd(true)} className="px-5 py-2.5 rounded-full btn-grad font-bold text-sm hover:scale-[1.02] transition inline-flex items-center gap-2">
          <Plus size={15} /> Add recipient
        </button>
      </header>

      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 focus-within:border-moon-300 max-w-md">
        <Search size={15} className="text-ink-dim" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or phone"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-dim/60" />
      </div>

      {favs.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-wider text-ink-dim mb-3">⭐ Favourites</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favs.map(r => <Card key={r.name} r={r} onFav={() => toggleFav(r.name)} />)}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-wider text-ink-dim mb-3">All recipients</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {others.map(r => <Card key={r.name} r={r} onFav={() => toggleFav(r.name)} />)}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="glass rounded-2xl p-10 text-center text-ink-dim">No recipients match "{q}"</div>
      )}

      {openAdd && <AddModal onClose={() => setOpenAdd(false)} onSave={r => { setList(l => [r, ...l]); setOpenAdd(false); }} />}
    </div>
  );
}

function Card({ r, onFav }: { r: Recipient; onFav: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -3 }}
      className="glass rounded-2xl p-5 hover:border-moon-300/30 transition-colors"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-moon-300/10 flex items-center justify-center text-2xl shrink-0">{r.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold truncate">{r.name}</div>
          <div className="text-xs text-ink-dim truncate">{r.phone}</div>
          <div className="text-xs text-moon-300 mt-0.5">{r.network}</div>
        </div>
        <button onClick={onFav} className="text-ink-dim hover:text-amber-300 transition" aria-label="Favourite">
          <Star size={16} className={r.fav ? 'fill-amber-300 text-amber-300' : ''} />
        </button>
        <button className="text-ink-dim hover:text-white" aria-label="More"><MoreVertical size={16} /></button>
      </div>
      <div className="flex items-center justify-between text-xs text-ink-dim mb-4">
        <span>Total sent</span>
        <span className="font-display text-white font-bold">GH₵ {r.totalSent.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-ink-dim mb-4">
        <span>Last transfer</span><span>{r.lastSent}</span>
      </div>
      <button className="w-full py-2.5 rounded-full btn-grad font-bold text-sm hover:scale-[1.02] transition inline-flex items-center justify-center gap-1.5">
        <Send size={13} /> Send money
      </button>
    </motion.div>
  );
}

function AddModal({ onClose, onSave }: { onClose: () => void; onSave: (r: Recipient) => void }) {
  const [name, setName]   = useState('');
  const [phone, setPhone] = useState('');
  const [net, setNet]     = useState<Recipient['network']>('MTN MoMo');

  function save() {
    if (!name.trim() || !phone.trim()) return;
    onSave({ name: name.trim(), phone: phone.trim(), network: net, emoji: '🧑🏾',
             fav: false, lastSent: 'Just added', totalSent: 0 });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-moon-950/70 backdrop-blur-md p-0 sm:p-6"
      onClick={onClose}>
      <motion.div
        onClick={e => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="w-full sm:max-w-md glass rounded-t-3xl sm:rounded-3xl p-6"
      >
        <h3 className="font-display text-2xl font-bold mb-4">Add recipient</h3>
        <div className="space-y-3">
          <Input label="Full name"   value={name}  onChange={setName}  placeholder="Ama Owusu" />
          <Input label="Phone number" value={phone} onChange={setPhone} placeholder="+233 24 123 4567" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-ink-dim mb-1.5">Network</div>
            <div className="grid grid-cols-2 gap-2">
              {(['MTN MoMo','Vodafone Cash','AirtelTigo','Bank'] as const).map(n => (
                <button key={n} onClick={() => setNet(n)}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition ${
                    net === n ? 'bg-moon-300/10 border-moon-300' : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}>{n}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-full bg-white/5 border border-white/10 font-semibold">Cancel</button>
          <button onClick={save} className="flex-1 py-3 rounded-full btn-grad font-bold">Save</button>
        </div>
      </motion.div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block bg-black/40 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-moon-300 transition">
      <span className="block text-[11px] uppercase tracking-wider text-ink-dim mb-1">{label}</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-transparent outline-none placeholder:text-ink-dim/60" />
    </label>
  );
}
