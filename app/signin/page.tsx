'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Background } from '@/components/Background';
import { Logo } from '@/components/Logo';
import { setSession } from '@/lib/auth';

function SignInForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get('next') || '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    if (!email.includes('@')) return setErr('Enter a valid email.');
    if (password.length < 4) return setErr('Password must be at least 4 characters.');
    setLoading(true);
    // Simulated: derive a name from email local part. Real auth goes here.
    const name = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    await new Promise((r) => setTimeout(r, 500));
    setSession({ email, name, joinedAt: new Date().toISOString() });
    router.push(next);
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-[4vw] py-12">
      <Background />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative glass rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-card"
      >
        <Link href="/" className="inline-flex items-center gap-2 mb-8 font-extrabold text-xl">
          <Logo />
          <span>Pay<em className="not-italic text-grad">Moon</em></span>
        </Link>

        <h1 className="font-display text-3xl font-extrabold mb-2">Welcome back.</h1>
        <p className="text-ink-dim mb-8">Sign in to send money home.</p>

        <form onSubmit={submit} className="space-y-4">
          <Field icon={<Mail size={16} />} label="Email">
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent outline-none placeholder:text-ink-dim/60"
            />
          </Field>
          <Field icon={<Lock size={16} />} label="Password">
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent outline-none placeholder:text-ink-dim/60"
            />
          </Field>

          {err && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-400 text-sm"
            >
              {err}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-full font-bold btn-grad hover:scale-[1.02] active:scale-[0.99] transition disabled:opacity-60"
          >
            {loading ? 'Signing you in…' : (<span className="inline-flex items-center gap-2">Sign in <ArrowRight size={16} /></span>)}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-ink-dim">
          <span className="flex-1 h-px bg-white/10" />
          <span>OR</span>
          <span className="flex-1 h-px bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialButton label="Google"   icon="🔵" />
          <SocialButton label="Apple"    icon="" />
        </div>

        <p className="mt-8 text-center text-sm text-ink-dim">
          New to PayMoon?{' '}
          <Link href="/signup" className="text-moon-300 font-semibold hover:underline">Create an account</Link>
        </p>
      </motion.div>
    </main>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block bg-black/40 border border-white/10 rounded-2xl px-4 py-3 transition focus-within:border-moon-300">
      <span className="block text-[11px] uppercase tracking-wider text-ink-dim mb-1.5">{label}</span>
      <div className="flex items-center gap-2.5 text-base">
        <span className="text-ink-dim">{icon}</span>
        {children}
      </div>
    </label>
  );
}

function SocialButton({ label, icon }: { label: string; icon: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm font-semibold"
    >
      <span>{icon}</span> {label}
    </button>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
