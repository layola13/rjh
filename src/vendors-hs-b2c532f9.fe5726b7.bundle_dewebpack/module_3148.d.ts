/**
 * Moment.js locale configuration for Tagalog (Philippines)
 * @module tl-ph
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for specific time references
 */
interface CalendarSpec {
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
 * Relative time formatting configuration
 */
interface RelativeTimeSpec {
  /** Future time prefix format */
  future: string;
  /** Past time suffix format */
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
 * Long date format tokens configuration
 */
interface LongDateFormatSpec {
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
  /** Full date with day and time format */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year */
  doy: number;
}

/**
 * Complete locale specification for Tagalog (Philippines)
 */
interface TagalogLocaleSpec extends LocaleSpecification {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormatSpec;
  calendar: CalendarSpec;
  relativeTime: RelativeTimeSpec;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => number;
  week: WeekSpec;
}

/**
 * Defines the Tagalog (Philippines) locale for moment.js
 * 
 * @param momentInstance - The moment.js instance
 * @returns The configured locale object
 */
export declare function defineTagalogLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Default export of the Tagalog locale configuration
 */
declare const tagalogLocale: Locale;
export default tagalogLocale;