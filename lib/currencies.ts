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
  USD: 11.2462,
  GBP: 15.3144,
  EUR: 13.2347,
  CAD:  8.2514,
  AUD:  8.1513,
  AED:  3.0623,
  CHF: 14.4672,
  JPY:  0.0720,
  CNY:  1.6500,
  INR:  0.1191,
  NGN:  0.0083,
  ZAR:  0.6886,
  KES:  0.0871,
  SAR:  2.9990,
  SEK:  1.2200,
  NOK:  1.2126,
};

export const FEE_GHS = 0.20; // The legendary 20-pesewa flat fee
