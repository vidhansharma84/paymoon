'use client';
import { motion } from 'framer-motion';
import { Calculator } from './Calculator';

const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const TRUST = ['🇺🇸 USA', '🇬🇧 UK', '🇨🇦 Canada', '🇪🇺 EU', '🇦🇪 UAE', '🇦🇺 Australia'];

export function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-[4vw] pt-12 sm:pt-16 pb-24 grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold text-moon-300 bg-moon-300/10 border border-moon-300/25"
        >
          🇬🇭 Live mid-market rates · GH₵0.20 flat fee
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold tracking-tight my-6 text-[clamp(2.5rem,5.5vw,4.4rem)] leading-[1.05]"
        >
          Send money to Ghana <span className="text-grad">at the speed of moonlight.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg text-ink-dim max-w-xl mb-8">
          PayMoon delivers cash from anywhere in the world to mobile money &amp; bank accounts in Ghana — at the real exchange
          rate, with a flat <strong className="text-moon-300">GH₵0.20</strong> conversion fee. No hidden margins. No surprises.
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-10 mb-8">
          <Stat n="20p" label="Flat fee" />
          <Stat n="0%"  label="Rate markup" />
          <Stat n="<60s" label="Avg delivery" />
        </motion.div>

        <motion.div variants={fadeUp} className="flex gap-3 flex-wrap mb-10">
          <a href="#send" className="px-7 py-3.5 rounded-full font-bold btn-grad hover:scale-[1.03] transition-transform">
            Start sending
          </a>
          <a
            href="#how"
            className="px-7 py-3.5 rounded-full font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            See how it works →
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap text-sm text-ink-dim">
          <span>Trusted by senders in</span>
          <div className="flex gap-3 flex-wrap">
            {TRUST.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{t}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <Calculator />
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-3xl font-bold">{n}</span>
      <span className="text-xs uppercase tracking-wider text-ink-dim">{label}</span>
    </div>
  );
}
