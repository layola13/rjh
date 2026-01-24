/**
 * Danish (da) locale configuration for Moment.js
 * 
 * This module provides localization settings for Danish language,
 * including month names, weekday names, date/time formats, and relative time expressions.
 */

import type { Moment, LocaleSpecification } from 'moment';

/**
 * Day of week configuration
 */
interface WeekConfiguration {
  /** First day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year for first week calculation */
  doy: number;
}

/**
 * Long date format tokens and their corresponding formats
 */
interface LongDateFormat {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  /** Time with seconds format (e.g., "HH:mm:ss") */
  LTS: string;
  /** Short date format (e.g., "DD.MM.YYYY") */
  L: string;
  /** Long date format (e.g., "D. MMMM YYYY") */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with weekday and time format */
  LLLL: string;
}

/**
 * Calendar date display configuration for relative dates
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
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time expressions configuration
 */
interface RelativeTimeSpec {
  /** Future time prefix format (e.g., "in %s") */
  future: string;
  /** Past time suffix format (e.g., "%s ago") */
  past: string;
  /** Seconds (singular, < 1 minute) */
  s: string;
  /** Seconds (plural) with %d placeholder */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural) with %d placeholder */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural) with %d placeholder */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural) with %d placeholder */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (plural) with %d placeholder */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) with %d placeholder */
  yy: string;
}

/**
 * Complete Danish locale specification for Moment.js
 */
export interface DanishLocaleSpecification extends LocaleSpecification {
  /** Full month names in Danish */
  months: string[];
  /** Abbreviated month names in Danish */
  monthsShort: string[];
  /** Full weekday names in Danish */
  weekdays: string[];
  /** Abbreviated weekday names in Danish */
  weekdaysShort: string[];
  /** Minimal weekday names in Danish */
  weekdaysMin: string[];
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time expressions */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing day of month ordinal numbers */
  dayOfMonthOrdinalParse: RegExp;
  /** Function or string to format ordinal numbers */
  ordinal: string | ((num: number) => string);
  /** Week configuration (first day and day of year) */
  week: WeekConfiguration;
}

/**
 * Defines the Danish locale for Moment.js
 * 
 * @param moment - The Moment.js instance to configure
 * @returns The configured Moment.js instance with Danish locale
 */
export function defineDanishLocale(moment: typeof Moment): typeof Moment;

/**
 * Danish locale configuration object
 */
export const danishLocale: DanishLocaleSpecification;