/**
 * Moment.js locale configuration for Malay (ms)
 * Provides localized date/time formatting, calendar expressions, and relative time strings
 */

import { Locale, MomentInput } from 'moment';

/**
 * Meridiem period type for Malay locale
 */
type MeridiemPeriod = 'pagi' | 'tengahari' | 'petang' | 'malam';

/**
 * Calendar specification format keys
 */
interface CalendarSpec {
  /** Format for dates on the same day */
  sameDay: string;
  /** Format for dates on the next day */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates on the previous day */
  lastDay: string;
  /** Format for dates in the previous week */
  lastWeek: string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 */
interface RelativeTimeSpec {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural, %d placeholder) */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural, %d placeholder) */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural, %d placeholder) */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural, %d placeholder) */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (plural, %d placeholder) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural, %d placeholder) */
  yy: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday) */
  dow: number;
  /** Day of year for the first week */
  doy: number;
}

/**
 * Long date format configuration
 */
interface LongDateFormatSpec {
  /** Time format (hours and minutes) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format (day, month, year) */
  LL: string;
  /** Long date and time format */
  LLL: string;
  /** Full date and time format with day name */
  LLLL: string;
}

/**
 * Complete Malay locale configuration
 */
export interface MalayLocaleConfig {
  /** Full month names */
  months: readonly string[];
  /** Abbreviated month names */
  monthsShort: readonly string[];
  /** Full weekday names */
  weekdays: readonly string[];
  /** Abbreviated weekday names */
  weekdaysShort: readonly string[];
  /** Minimal weekday names */
  weekdaysMin: readonly string[];
  /** Long date format configuration */
  longDateFormat: LongDateFormatSpec;
  /** Regular expression to parse meridiem periods */
  meridiemParse: RegExp;
  /** Convert 12-hour time to 24-hour based on meridiem period */
  meridiemHour: (hour: number, meridiem: MeridiemPeriod) => number | undefined;
  /** Get meridiem period for given hour and minute */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => MeridiemPeriod;
  /** Calendar display formats */
  calendar: CalendarSpec;
  /** Relative time expressions */
  relativeTime: RelativeTimeSpec;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Defines and registers the Malay (ms) locale configuration for Moment.js
 * 
 * @param moment - The Moment.js instance
 * @returns The registered Malay locale
 */
export declare function defineLocale(moment: MomentInput): Locale;

/**
 * Default export of the Malay locale configuration
 */
declare const malayLocale: MalayLocaleConfig;
export default malayLocale;