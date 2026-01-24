import { Locale, LocaleSpecification } from 'moment';

/**
 * Catalan (Catalonia) locale configuration for Moment.js
 * 
 * This module provides localization for the Catalan language, including:
 * - Month names (standalone and formatted variants)
 * - Weekday names (full, short, and minimal forms)
 * - Date/time formatting patterns
 * - Relative time expressions
 * - Calendar expressions with grammatical variations
 * - Ordinal number formatting
 * 
 * @see https://momentjs.com/docs/#/i18n/
 */

/**
 * Month names configuration with context-aware formatting
 */
interface MonthsConfiguration {
  /** Month names when used standalone (e.g., "gener", "febrer") */
  standalone: string[];
  
  /** Month names when used in formatted dates with prepositions (e.g., "de gener", "d'abril") */
  format: string[];
  
  /** Regular expression to detect when to use the 'format' variant */
  isFormat: RegExp;
}

/**
 * Configuration object for long date format tokens
 */
interface LongDateFormatConfiguration {
  /** Time format (e.g., "14:30") */
  LT: string;
  
  /** Time format with seconds (e.g., "14:30:45") */
  LTS: string;
  
  /** Short date format (DD/MM/YYYY) */
  L: string;
  
  /** Long date format with month name */
  LL: string;
  
  /** Abbreviated long date format */
  ll: string;
  
  /** Long date and time format */
  LLL: string;
  
  /** Abbreviated long date and time format */
  lll: string;
  
  /** Full date and time format with weekday */
  LLLL: string;
  
  /** Abbreviated full date and time format with weekday */
  llll: string;
}

/**
 * Calendar expressions with dynamic article selection based on hour
 */
interface CalendarConfiguration {
  /** Expression for today (uses "les" for multiple hours, "la" for 1 o'clock) */
  sameDay: () => string;
  
  /** Expression for tomorrow */
  nextDay: () => string;
  
  /** Expression for next week */
  nextWeek: () => string;
  
  /** Expression for yesterday */
  lastDay: () => string;
  
  /** Expression for last week */
  lastWeek: () => string;
  
  /** Fallback format for other dates */
  sameElse: string;
}

/**
 * Relative time expressions
 */
interface RelativeTimeConfiguration {
  /** Future time prefix template */
  future: string;
  
  /** Past time prefix template */
  past: string;
  
  /** A few seconds */
  s: string;
  
  /** N seconds (plural) */
  ss: string;
  
  /** One minute */
  m: string;
  
  /** N minutes (plural) */
  mm: string;
  
  /** One hour */
  h: string;
  
  /** N hours (plural) */
  hh: string;
  
  /** One day */
  d: string;
  
  /** N days (plural) */
  dd: string;
  
  /** One month */
  M: string;
  
  /** N months (plural) */
  MM: string;
  
  /** One year */
  y: string;
  
  /** N years (plural) */
  yy: string;
}

/**
 * Week configuration
 */
interface WeekConfiguration {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Complete Catalan locale specification
 */
interface CatalanLocaleSpecification extends LocaleSpecification {
  months: MonthsConfiguration;
  monthsShort: string[];
  monthsParseExact: boolean;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: boolean;
  longDateFormat: LongDateFormatConfiguration;
  calendar: CalendarConfiguration;
  relativeTime: RelativeTimeConfiguration;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (dayOfMonth: number, token: string) => string;
  week: WeekConfiguration;
}

/**
 * Defines the Catalan locale for Moment.js
 * 
 * @param moment - The Moment.js instance to configure
 * @returns The configured Catalan locale
 */
declare function defineCatalanLocale(moment: typeof import('moment')): Locale;

export default defineCatalanLocale;
export { CatalanLocaleSpecification, MonthsConfiguration, CalendarConfiguration, RelativeTimeConfiguration };