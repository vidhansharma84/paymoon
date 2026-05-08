import { Background } from '@/components/Background';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { LiveRates } from '@/components/LiveRates';
import { HowItWorks } from '@/components/HowItWorks';
import { Why } from '@/components/Why';
import { Compare } from '@/components/Compare';
import { Testimonials } from '@/components/Testimonials';
import { Faq } from '@/components/Faq';
import { Cta } from '@/components/Cta';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <LiveRates />
        <HowItWorks />
        <Why />
        <Compare />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
