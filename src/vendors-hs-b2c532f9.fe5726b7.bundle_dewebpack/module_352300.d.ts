/**
 * Moment.js locale configuration for Uzbek (uz)
 * @module UzbekLocale
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Week configuration interface
 */
interface WeekConfiguration {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year for the first week */
  doy: number;
}

/**
 * Long date format configuration
 */
interface LongDateFormatConfiguration {
  /** Time format */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with time format */
  LLLL: string;
}

/**
 * Calendar display configuration
 */
interface CalendarConfiguration {
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
  /** Default format */
  sameElse: string;
}

/**
 * Relative time configuration
 */
interface RelativeTimeConfiguration {
  /** Future time format */
  future: string;
  /** Past time format */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural) */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (plural) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Uzbek locale configuration specification
 */
interface UzbekLocaleSpecification extends LocaleSpecification {
  /** Full month names in Cyrillic */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format configuration */
  longDateFormat: LongDateFormatConfiguration;
  /** Calendar display strings */
  calendar: CalendarConfiguration;
  /** Relative time strings */
  relativeTime: RelativeTimeConfiguration;
  /** Week configuration */
  week: WeekConfiguration;
}

/**
 * Defines the Uzbek locale for moment.js
 * @param momentInstance - The moment.js instance
 * @returns The configured Uzbek locale
 */
export function defineUzbekLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Uzbek locale configuration object
 */
export const uzbekLocale: UzbekLocaleSpecification;

/**
 * Default export of the Uzbek locale
 */
declare const _default: Locale;
export default _default;