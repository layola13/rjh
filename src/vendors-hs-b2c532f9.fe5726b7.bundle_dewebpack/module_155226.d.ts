/**
 * Moment.js locale configuration for Malay (Malaysia)
 * @module MomentLocale_MS_MY
 */

import { Locale, MomentInput } from 'moment';

/**
 * Meridiem period type for Malay locale
 */
type MeridiemPeriod = 'pagi' | 'tengahari' | 'petang' | 'malam';

/**
 * Calendar specification for relative date display
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
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 */
interface RelativeTimeSpec {
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
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Long date format tokens
 */
interface LongDateFormat {
  /** Time format */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with time format */
  LLLL: string;
}

/**
 * Malay (Malaysia) locale configuration
 */
interface MsMyLocaleConfig {
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
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  /** Meridiem parsing pattern */
  meridiemParse: RegExp;
  /** Convert 12-hour format to 24-hour based on meridiem */
  meridiemHour: (hour: number, meridiem: MeridiemPeriod) => number | undefined;
  /** Get meridiem string based on hour */
  meridiem: (hour: number, minute: number, isLower: boolean) => MeridiemPeriod;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time display configuration */
  relativeTime: RelativeTimeSpec;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Defines the Malay (Malaysia) locale for moment.js
 * @param momentInstance - The moment.js instance
 * @returns The configured locale
 */
export declare function defineLocale(momentInstance: MomentInput): Locale;

/**
 * Default export: Malay (Malaysia) locale configuration
 */
declare const msMy: Locale;
export default msMy;