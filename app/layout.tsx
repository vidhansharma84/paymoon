import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  title: 'PayMoon — Send money to Ghana at the speed of moonlight',
  description:
    'Live mid-market exchange rates and a flat GH₵0.20 fee. The cheapest, fastest way to send remittance to Ghana from anywhere in the world.',
  keywords: ['remittance', 'Ghana', 'send money', 'mobile money', 'cedi', 'GHS', 'PayMoon'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${grotesk.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
