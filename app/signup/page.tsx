'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Background } from '@/components/Background';
import { Logo } from '@/components/Logo';
import { setSession } from '@/lib/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    if (!name.trim()) return setErr('Tell us your name.');
    if (!email.includes('@')) return setErr('Enter a valid email.');
    if (password.length < 6) return setErr('Password must be at least 6 characters.');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setSession({ email, name: name.trim(), joinedAt: new Date().toISOString() });
    router.push('/dashboard');
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-[4vw] py-12">
      <Background />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative glass rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-card"
      >
        <Link href="/" className="inline-flex items-center gap-2 mb-8 font-extrabold text-xl">
          <Logo />
          <span>Pay<em className="not-italic text-grad">Moon</em></span>
        </Link>

        <h1 className="font-display text-3xl font-extrabold mb-2">Create your account.</h1>
        <p className="text-ink-dim mb-8">Start sending in under 2 minutes.</p>

        <form onSubmit={submit} className="space-y-4">
          <Field icon={<User size={16} />} label="Full name">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ama Owusu"
              className="w-full bg-transparent outline-none placeholder:text-ink-dim/60" />
          </Field>
          <Field icon={<Mail size={16} />} label="Email">
            <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent outline-none placeholder:text-ink-dim/60" />
          </Field>
          <Field icon={<Lock size={16} />} label="Password">
            <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full bg-transparent outline-none placeholder:text-ink-dim/60" />
          </Field>

          {err && <p className="text-rose-400 text-sm">{err}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-full font-bold btn-grad hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? 'Creating account…' : (<span className="inline-flex items-center gap-2">Get started <ArrowRight size={16} /></span>)}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-ink-dim">
          Already have an account?{' '}
          <Link href="/signin" className="text-moon-300 font-semibold hover:underline">Sign in</Link>
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
