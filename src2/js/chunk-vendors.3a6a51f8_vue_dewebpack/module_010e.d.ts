/**
 * Moment.js locale configuration for Uzbek (Latin script)
 * @module uz-latn
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for Uzbek locale
 * Defines how dates are displayed relative to the current time
 */
interface CalendarSpec {
  /** Format for dates that are today */
  sameDay: string;
  /** Format for dates that are tomorrow */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates that were yesterday */
  lastDay: string;
  /** Format for dates in the last week */
  lastWeek: string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration for Uzbek locale
 * Defines how relative time periods are formatted
 */
interface RelativeTimeSpec {
  /** Format for future times */
  future: string;
  /** Format for past times */
  past: string;
  /** Format for seconds (singular) */
  s: string;
  /** Format for seconds (plural, %d = number) */
  ss: string;
  /** Format for minute (singular) */
  m: string;
  /** Format for minutes (plural, %d = number) */
  mm: string;
  /** Format for hour (singular) */
  h: string;
  /** Format for hours (plural, %d = number) */
  hh: string;
  /** Format for day (singular) */
  d: string;
  /** Format for days (plural, %d = number) */
  dd: string;
  /** Format for month (singular) */
  M: string;
  /** Format for months (plural, %d = number) */
  MM: string;
  /** Format for year (singular) */
  y: string;
  /** Format for years (plural, %d = number) */
  yy: string;
}

/**
 * Week configuration for Uzbek locale
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year that defines week 1 */
  doy: number;
}

/**
 * Long date format configuration for Uzbek locale
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date and time with weekday format */
  LLLL: string;
}

/**
 * Complete locale specification for Uzbek (Latin)
 */
interface UzLatnLocaleSpec extends LocaleSpecification {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format configurations */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configurations */
  calendar: CalendarSpec;
  /** Relative time configurations */
  relativeTime: RelativeTimeSpec;
  /** Week configurations */
  week: WeekSpec;
}

/**
 * Defines the Uzbek (Latin script) locale for moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured locale
 */
export function defineUzLatnLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Uzbek (Latin) locale configuration object
 */
export const uzLatnLocaleConfig: UzLatnLocaleSpec;

export default defineUzLatnLocale;