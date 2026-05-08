'use client';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTI = [
  { quote: 'Sent 200 cedis to my mum in Kumasi from London — landed on her MoMo before I closed the app.', who: 'Ama O.', where: 'London 🇬🇧' },
  { quote: '20 pesewas? I thought it was a typo. It\'s not. PayMoon is the future of remittance.',           who: 'Kwame B.', where: 'Toronto 🇨🇦' },
  { quote: 'Western Union charged me $14. PayMoon charged me 2 cents. Same money home, in less time.',     who: 'Akosua N.', where: 'New York 🇺🇸' },
];

export function Testimonials() {
  return (
    <section className="relative max-w-7xl mx-auto px-[4vw] py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-display text-4xl sm:text-5xl font-extrabold mb-12"
      >
        Loved across the diaspora.
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-5">
        {TESTI.map((t, i) => (
          <motion.figure
            key={t.who}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="glass rounded-3xl p-7 m-0 relative"
          >
            <Quote size={20} className="text-moon-300 mb-3 opacity-70" />
            <blockquote className="text-lg leading-relaxed mb-4">"{t.quote}"</blockquote>
            <figcaption className="text-moon-300 font-semibold text-sm">— {t.who}, {t.where}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
