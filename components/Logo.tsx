export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden>
      <defs>
        <radialGradient id="moonGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff7d6" />
          <stop offset="55%" stopColor="#ffd86b" />
          <stop offset="100%" stopColor="#c98a1b" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="16" fill="url(#moonGrad)" />
      <circle cx="26" cy="16" r="14" fill="#0b0f1f" />
    </svg>
  );
}
