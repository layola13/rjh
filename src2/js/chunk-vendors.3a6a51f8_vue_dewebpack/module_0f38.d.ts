/**
 * Moment.js locale configuration for Tagalog (Philippines)
 * @module moment/locale/tl-ph
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for specific time contexts
 */
interface CalendarSpec {
  /** Format for times today */
  sameDay: string;
  /** Format for times tomorrow */
  nextDay: string;
  /** Format for times next week */
  nextWeek: string;
  /** Format for times yesterday */
  lastDay: string;
  /** Format for times last week */
  lastWeek: string;
  /** Format for all other times */
  sameElse: string;
}

/**
 * Relative time configuration for duration display
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
 * Long date format tokens
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
  /** Full date with time format */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year for week numbering */
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
  ordinal: (num: number) => string;
  week: WeekSpec;
}

/**
 * Tagalog (Philippines) locale configuration for Moment.js
 */
export declare const localeConfig: TagalogLocaleSpec;

/**
 * Defines the Tagalog (Philippines) locale in Moment.js
 * @param moment - The Moment.js instance
 * @returns The defined locale
 */
export declare function defineTagalogLocale(moment: typeof import('moment')): Locale;