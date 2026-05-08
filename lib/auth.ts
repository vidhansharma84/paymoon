// Lightweight cookie-based session for the PayMoon demo dashboard.
// NOT production auth — no hashing, no DB, just a signed-ish cookie payload.
// Replace with Auth.js / Clerk / Supabase when you wire real users.
'use client';

const COOKIE = 'pm_session';
const ONE_WEEK = 60 * 60 * 24 * 7;

export type Session = {
  email: string;
  name: string;
  joinedAt: string;
};

export function setSession(s: Session) {
  if (typeof document === 'undefined') return;
  const value = encodeURIComponent(JSON.stringify(s));
  document.cookie = `${COOKIE}=${value}; path=/; max-age=${ONE_WEEK}; samesite=lax`;
}

export function getSession(): Session | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|; )' + COOKIE + '=([^;]+)'));
  if (!m) return null;
  try {
    return JSON.parse(decodeURIComponent(m[1])) as Session;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE}=; path=/; max-age=0`;
}
