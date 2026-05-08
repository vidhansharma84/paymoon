'use client';
import { motion } from 'framer-motion';
import { DollarSign, Globe, Lock, PhoneCall, TrendingUp, Zap } from 'lucide-react';

const ITEMS = [
  { icon: DollarSign,  title: 'Flat 20 pesewas fee',  text: 'One of the cheapest cross-border fees in the world. Period.' },
  { icon: TrendingUp,  title: 'Real exchange rate',   text: 'We use the live mid-market rate — the real one — with zero markup.' },
  { icon: Zap,         title: 'Seconds, not days',    text: 'Direct rails into MTN MoMo, Vodafone Cash, AirtelTigo & GhIPSS banks.' },
  { icon: Lock,        title: 'Bank-grade security',  text: 'Licensed PSP, end-to-end encrypted, 2FA on every transfer.' },
  { icon: Globe,       title: 'Send from anywhere',   text: '40+ source countries. One app, one wallet, every corridor into Ghana.' },
  { icon: PhoneCall,   title: 'Track in real time',   text: 'See exactly when your money lands. Share the receipt with one tap.' },
];

export function Why() {
  return (
    <section id="why" className="relative max-w-7xl mx-auto px-[4vw] py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-3">
          Why senders pick <em className="not-italic text-grad">PayMoon</em>.
        </h2>
        <p className="text-ink-dim">Built by Ghanaians abroad, for families back home.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {ITEMS.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -5 }}
            className="glass rounded-3xl p-7 hover:border-moon-300/40 transition-colors"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-grad-moon shadow-glow">
              <it.icon size={20} className="text-moon-950" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">{it.title}</h3>
            <p className="text-ink-dim">{it.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
