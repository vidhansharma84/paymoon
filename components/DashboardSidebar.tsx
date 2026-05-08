'use client';
import { motion } from 'framer-motion';
import { ArrowLeftRight, BarChart3, Home, LogOut, Send, Settings, Users, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from './Logo';
import { clearSession, type Session } from '@/lib/auth';

const NAV = [
  { icon: Home,           label: 'Overview',      key: 'overview' },
  { icon: Send,           label: 'Send money',    key: 'send' },
  { icon: ArrowLeftRight, label: 'Transactions',  key: 'transactions' },
  { icon: Users,          label: 'Recipients',    key: 'recipients' },
  { icon: Wallet,         label: 'Cards',         key: 'cards' },
  { icon: BarChart3,      label: 'Insights',      key: 'insights' },
];

type Props = { active: string; onSelect: (k: string) => void; user: Session };

export function DashboardSidebar({ active, onSelect, user }: Props) {
  const router = useRouter();
  function logout() {
    clearSession();
    router.push('/');
  }
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 glass border-r border-white/10 px-5 py-6 sticky top-0 h-screen">
      <Link href="/" className="flex items-center gap-2 mb-8 font-extrabold text-xl">
        <Logo />
        <span>Pay<em className="not-italic text-grad">Moon</em></span>
      </Link>

      <nav className="flex-1 space-y-1">
        {NAV.map((n) => (
          <button
            key={n.key}
            onClick={() => onSelect(n.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              active === n.key
                ? 'bg-white/10 text-white border border-white/10'
                : 'text-ink-dim hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {active === n.key && (
              <motion.span layoutId="sidebar-pill" className="absolute inset-0 -z-10" />
            )}
            <n.icon size={17} className={active === n.key ? 'text-moon-300' : ''} />
            {n.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 border-t border-white/10 pt-4 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-dim hover:text-white hover:bg-white/5 transition">
          <Settings size={17} /> Settings
        </button>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-dim hover:text-rose-300 hover:bg-rose-500/10 transition">
          <LogOut size={17} /> Sign out
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3 px-2 py-2 rounded-xl bg-white/5">
        <div className="w-9 h-9 rounded-full bg-grad-moon flex items-center justify-center font-bold text-moon-950 shrink-0">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{user.name}</div>
          <div className="text-xs text-ink-dim truncate">{user.email}</div>
        </div>
      </div>
    </aside>
  );
}
