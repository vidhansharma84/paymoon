export type Currency = {
  code: string;
  flag: string;
  name: string;
  symbol: string;
};

export const CURRENCIES: Currency[] = [
  { code: 'USD', flag: '🇺🇸', name: 'US Dollar', symbol: '$' },
  { code: 'GBP', flag: '🇬🇧', name: 'British Pound', symbol: '£' },
  { code: 'EUR', flag: '🇪🇺', name: 'Euro', symbol: '€' },
  { code: 'CAD', flag: '🇨🇦', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', flag: '🇦🇺', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'AED', flag: '🇦🇪', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'CHF', flag: '🇨🇭', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'JPY', flag: '🇯🇵', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', flag: '🇨🇳', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', flag: '🇮🇳', name: 'Indian Rupee', symbol: '₹' },
  { code: 'NGN', flag: '🇳🇬', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'ZAR', flag: '🇿🇦', name: 'South African Rand', symbol: 'R' },
  { code: 'KES', flag: '🇰🇪', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'SAR', flag: '🇸🇦', name: 'Saudi Riyal', symbol: 'ر.س' },
  { code: 'SEK', flag: '🇸🇪', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', flag: '🇳🇴', name: 'Norwegian Krone', symbol: 'kr' },
];

// Mid-market fallback rates: 1 unit FROM-currency = X GHS
// (Used when the live API is unreachable — keeps the calculator usable.)
export const FALLBACK_RATES_TO_GHS: Record<string, number> = {
  USD: 12.4500,
  GBP: 15.8200,
  EUR: 13.5400,
  CAD:  9.1300,
  AUD:  8.2100,
  AED:  3.3900,
  CHF: 14.0500,
  JPY:  0.0830,
  CNY:  1.7200,
  INR:  0.1490,
  NGN:  0.0083,
  ZAR:  0.6900,
  KES:  0.0960,
  SAR:  3.3200,
  SEK:  1.1700,
  NOK:  1.1300,
};

export const FEE_GHS = 0.20; // The legendary 20-pesewa flat fee
