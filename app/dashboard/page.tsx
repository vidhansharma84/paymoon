'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Background } from '@/components/Background';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { DashboardOverview } from '@/components/DashboardOverview';
import { DashboardSend } from '@/components/DashboardSend';
import { DashboardTransactions } from '@/components/DashboardTransactions';
import { DashboardRecipients } from '@/components/DashboardRecipients';
import { DashboardCards } from '@/components/DashboardCards';
import { DashboardInsights } from '@/components/DashboardInsights';
import { Logo } from '@/components/Logo';
import { getSession, type Session } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<Session | null>(null);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    const s = getSession();
    if (!s) router.replace('/signin?next=/dashboard');
    else setUser(s);
  }, [router]);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Background />
        <div className="text-ink-dim animate-pulse">Loading dashboard…</div>
      </main>
    );
  }

  return (
    <div className="relative min-h-screen flex">
      <Background />
      <DashboardSidebar active={tab} onSelect={setTab} user={user} />
      <main className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between px-[4vw] py-4 border-b border-white/10 backdrop-blur-xl bg-moon-950/70 sticky top-0 z-30">
          <a href="/" className="flex items-center gap-2 font-extrabold text-lg">
            <Logo />
            <span>Pay<em className="not-italic text-grad">Moon</em></span>
          </a>
          <button className="p-2 rounded-lg bg-white/5 border border-white/10"><Menu size={18} /></button>
        </header>

        <div className="px-[4vw] lg:px-8 py-6 lg:py-10 max-w-6xl mx-auto">
          {tab === 'overview'     && <DashboardOverview user={user} />}
          {tab === 'send'         && <DashboardSend />}
          {tab === 'transactions' && <DashboardTransactions />}
          {tab === 'recipients'   && <DashboardRecipients />}
          {tab === 'cards'        && <DashboardCards />}
          {tab === 'insights'     && <DashboardInsights />}
        </div>
      </main>
    </div>
  );
}
