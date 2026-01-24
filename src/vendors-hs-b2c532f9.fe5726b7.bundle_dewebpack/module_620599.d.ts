/**
 * Moment.js locale configuration for Norwegian Bokmål (nb)
 * 
 * This module defines the locale settings for Norwegian Bokmål,
 * including month names, weekday names, date formats, and relative time strings.
 * 
 * @module MomentLocaleNorwegianBokmal
 */

import { Moment, Locale, LocaleSpecification } from 'moment';

/**
 * Day of week numbering configuration
 */
interface WeekConfig {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year for week numbering */
  doy: number;
}

/**
 * Long date format tokens configuration
 */
interface LongDateFormatConfig {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  /** Time with seconds format (e.g., "HH:mm:ss") */
  LTS: string;
  /** Short date format (e.g., "DD.MM.YYYY") */
  L: string;
  /** Long date format (e.g., "D. MMMM YYYY") */
  LL: string;
  /** Long date and time format */
  LLL: string;
  /** Full date and time with weekday */
  LLLL: string;
}

/**
 * Calendar format strings for relative dates
 */
interface CalendarConfig {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for yesterday */
  lastDay: string;
  /** Format for last week */
  lastWeek: string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeConfig {
  /** Future time prefix (e.g., "in %s") */
  future: string;
  /** Past time suffix (e.g., "%s ago") */
  past: string;
  /** Few seconds */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** One minute */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** One hour */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** One day */
  d: string;
  /** Days (plural) */
  dd: string;
  /** One week */
  w: string;
  /** Weeks (plural) */
  ww: string;
  /** One month */
  M: string;
  /** Months (plural) */
  MM: string;
  /** One year */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Complete locale specification for Norwegian Bokmål
 */
interface NorwegianBokmalLocaleSpec extends LocaleSpecification {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to parse month names exactly */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to parse weekday names exactly */
  weekdaysParseExact: boolean;
  /** Long date format tokens */
  longDateFormat: LongDateFormatConfig;
  /** Calendar format strings */
  calendar: CalendarConfig;
  /** Relative time format strings */
  relativeTime: RelativeTimeConfig;
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number format string */
  ordinal: string;
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Defines the Norwegian Bokmål locale configuration for Moment.js
 * 
 * @param moment - The Moment.js instance
 * @returns The configured locale object
 */
export function defineNorwegianBokmalLocale(moment: typeof Moment): Locale;

/**
 * Norwegian Bokmål locale configuration object
 */
export const norwegianBokmalLocale: NorwegianBokmalLocaleSpec;

/**
 * Locale identifier
 */
export const localeCode: 'nb';

export default defineNorwegianBokmalLocale;