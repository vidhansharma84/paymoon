'use client';
import { motion } from 'framer-motion';
import { Banknote, CreditCard, Send } from 'lucide-react';

const STEPS = [
  { icon: Banknote,   num: '01', title: 'Enter the amount',  text: 'Type how much you want to send. We lock the live rate the moment you tap send.' },
  { icon: CreditCard, num: '02', title: 'Pay your way',      text: 'Card, Apple Pay, Google Pay, bank transfer or crypto. Whatever\'s cheapest for you.' },
  { icon: Send,       num: '03', title: 'Cash hits Ghana',   text: 'Mobile money in seconds, bank deposit in minutes. They get a notification, you get a receipt.' },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative max-w-7xl mx-auto px-[4vw] py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-4xl sm:text-5xl font-extrabold mb-12"
      >
        Three steps to <span className="text-grad">Ghana.</span>
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-5">
        {STEPS.map((s, i) => (
          <motion.article
            key={s.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-7 relative overflow-hidden group"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-moon-300/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="inline-block font-display text-xs font-bold btn-grad px-2 py-1 rounded">
              {s.num}
            </span>
            <s.icon className="my-4 text-moon-300" size={28} />
            <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-ink-dim">{s.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
