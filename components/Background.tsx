'use client';
import { motion } from 'framer-motion';

const STARS = [
  { top: '12%',  left: '8%',  delay: 0 },
  { top: '22%',  left: '38%', delay: 0.8 },
  { top: '8%',   left: '72%', delay: 1.6 },
  { top: '60%',  left: '14%', delay: 0.3 },
  { top: '78%',  left: '88%', delay: 2.1 },
  { top: '40%',  left: '92%', delay: 1.2 },
  { top: '90%',  left: '40%', delay: 0.6 },
  { top: '50%',  left: '55%', delay: 1.9 },
];

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Top-right moon glow */}
      <motion.div
        className="absolute -right-48 -top-48 w-[600px] h-[600px] rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(255,216,107,.18), transparent 60%)' }}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bottom-left purple glow */}
      <motion.div
        className="absolute -left-40 bottom-[-200px] w-[520px] h-[520px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(196,92,255,.14), transparent 65%)' }}
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Stars */}
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute w-[3px] h-[3px] rounded-full bg-white"
          style={{ top: s.top, left: s.left, boxShadow: '0 0 8px #fff' }}
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.9, 1.4, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
