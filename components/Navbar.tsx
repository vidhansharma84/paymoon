'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const LINKS = [
  { href: '#how',   label: 'How it works' },
  { href: '#rates', label: 'Live rates' },
  { href: '#why',   label: 'Why PayMoon' },
  { href: '#faq',   label: 'FAQ' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? 'backdrop-blur-xl bg-moon-950/70 border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-[4vw] py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 font-extrabold text-xl">
          <Logo />
          <span>Pay<em className="not-italic text-grad">Moon</em></span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-dim">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors relative group">
              {l.label}
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-grad-moon scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href="/signin" className="px-4 py-2 rounded-full text-sm font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition">
            Sign in
          </a>
          <a href="/signup" className="px-4 py-2 rounded-full text-sm font-semibold btn-grad hover:scale-[1.03] transition-transform">
            Get started
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-moon-950/90 backdrop-blur-xl"
          >
            <div className="px-[4vw] py-4 flex flex-col gap-3">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-ink-dim hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="/signin" onClick={() => setOpen(false)} className="px-4 py-3 rounded-full text-sm font-semibold bg-white/5 border border-white/10 text-center">Sign in</a>
                <a href="/signup" onClick={() => setOpen(false)} className="px-4 py-3 rounded-full text-sm font-semibold btn-grad text-center">Get started</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
