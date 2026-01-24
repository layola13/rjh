/**
 * Moment.js locale configuration for Māori (mi)
 * Provides localized date/time formats, month names, weekday names, and relative time strings
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Month names pattern regex
 * Matches Māori month names with optional macrons (ā, ō, ū) and hyphens
 */
type MonthRegexPattern = RegExp;

/**
 * Long date format keys supported by the locale
 */
interface LongDateFormatSpec {
  /** Time format (hours:minutes) */
  LT: string;
  /** Time format with seconds (hours:minutes:seconds) */
  LTS: string;
  /** Short date format (day/month/year) */
  L: string;
  /** Long date format (day month year) */
  LL: string;
  /** Long date format with time */
  LLL: string;
  /** Full date format with weekday and time */
  LLLL: string;
}

/**
 * Calendar format strings for relative dates
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
 * Relative time format strings
 */
interface RelativeTimeSpec {
  /** Future time prefix */
  future: string;
  /** Past time suffix */
  past: string;
  /** Seconds (singular/few) */
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
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Complete Māori locale configuration
 */
interface MaoriLocaleSpecification extends LocaleSpecification {
  /** Full month names in Māori */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Regex for parsing month names (lenient) */
  monthsRegex: MonthRegexPattern;
  /** Regex for parsing month names (strict) */
  monthsStrictRegex: MonthRegexPattern;
  /** Regex for parsing short month names (lenient) */
  monthsShortRegex: MonthRegexPattern;
  /** Regex for parsing short month names (strict) */
  monthsShortStrictRegex: MonthRegexPattern;
  /** Full weekday names in Māori */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format specifications */
  longDateFormat: LongDateFormatSpec;
  /** Calendar format specifications */
  calendar: CalendarSpec;
  /** Relative time format specifications */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: string;
  /** Week calculation configuration */
  week: WeekSpec;
}

/**
 * Defines and registers the Māori locale for Moment.js
 * 
 * @param momentInstance - The Moment.js instance to register the locale with
 * @returns The registered Māori locale object
 * 
 * @example
 *