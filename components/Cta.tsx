'use client';
import { motion } from 'framer-motion';

export function Cta() {
  return (
    <section className="relative max-w-7xl mx-auto px-[4vw] py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl p-12 sm:p-16 text-center border border-white/10 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(255,216,107,.10), rgba(196,92,255,.08))' }}
      >
        <div
          aria-hidden
          className="absolute -inset-px rounded-3xl pointer-events-none opacity-40"
          style={{ background: 'linear-gradient(135deg, rgba(255,216,107,.4), transparent 60%)' }}
        />
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-4">
          Your family deserves <span className="text-grad">the moon.</span>
        </h2>
        <p className="text-ink-dim max-w-md mx-auto mb-8">
          Start sending in under two minutes. No subscription, no minimum, no nonsense.
        </p>
        <a
          href="#send"
          className="inline-block px-8 py-4 rounded-full font-bold btn-grad hover:scale-[1.04] transition-transform"
        >
          Send money now →
        </a>
      </motion.div>
    </section>
  );
}
