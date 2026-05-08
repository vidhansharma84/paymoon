'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const FAQS = [
  { q: 'Is the 20-pesewa fee really all I pay?', a: 'Yes. GH₵0.20 flat per transaction, with zero markup on the exchange rate. What you see on the calculator is what your recipient gets.' },
  { q: 'How do you make money then?',            a: 'Volume + tiny FX float spread on our settlement layer. We don\'t need to gouge senders to run a healthy business.' },
  { q: 'Where do the live rates come from?',     a: 'We aggregate the mid-market rate from Reuters, OANDA and ECB feeds and refresh every 60 seconds.' },
  { q: 'Which payout options work in Ghana?',    a: 'MTN Mobile Money, Vodafone Cash, AirtelTigo Money, and direct bank deposit to all GhIPSS-connected banks.' },
  { q: 'Is PayMoon licensed?',                   a: 'PayMoon is a licensed Payment Service Provider (PSP) regulated by the Bank of Ghana, and partners with FCA / FinCEN-licensed entities in source countries.' },
  { q: 'What is the maximum I can send?',        a: 'Up to GH₵100,000 per transaction for verified senders. Higher limits available on request.' },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative max-w-3xl mx-auto px-[4vw] py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-display text-4xl sm:text-5xl font-extrabold mb-12"
      >
        Questions, <span className="text-grad">answered.</span>
      </motion.h2>

      <div className="border-t border-white/10">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-white/10">
              <button
                className="w-full flex items-center justify-between py-5 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-bold text-base sm:text-lg pr-4">{f.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-moon-300 flex-shrink-0"
                >
                  <Plus size={22} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-ink-dim leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
