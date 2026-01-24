/**
 * Moment.js German (de) locale configuration
 * Provides German language support for date/time formatting and relative time expressions
 */

/**
 * Configuration options for moment.js locale
 */
interface LocaleConfig {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to use exact parsing for month names */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to use exact parsing for weekday names */
  weekdaysParseExact: boolean;
  /** Long date format patterns */
  longDateFormat: LongDateFormat;
  /** Calendar-specific format strings */
  calendar: CalendarFormat;
  /** Relative time format configuration */
  relativeTime: RelativeTimeFormat;
  /** Regular expression for parsing day of month ordinals */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: string;
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Long date format patterns
 */
interface LongDateFormat {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time */
  LLL: string;
  /** Full date with weekday and time */
  LLLL: string;
}

/**
 * Calendar-specific format strings
 */
interface CalendarFormat {
  /** Format for today */
  sameDay: string;
  /** Format for other dates */
  sameElse: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for yesterday */
  lastDay: string;
  /** Format for last week */
  lastWeek: string;
}

/**
 * Relative time format configuration
 */
interface RelativeTimeFormat {
  /** Future time prefix */
  future: string;
  /** Past time prefix */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** Minute (singular) - can be string or function */
  m: string | RelativeTimeFunction;
  /** Minutes (plural) */
  mm: string;
  /** Hour (singular) - can be string or function */
  h: string | RelativeTimeFunction;
  /** Hours (plural) */
  hh: string;
  /** Day (singular) - can be string or function */
  d: string | RelativeTimeFunction;
  /** Days (plural) - can be string or function */
  dd: string | RelativeTimeFunction;
  /** Week (singular) - can be string or function */
  w: string | RelativeTimeFunction;
  /** Weeks (plural) */
  ww: string;
  /** Month (singular) - can be string or function */
  M: string | RelativeTimeFunction;
  /** Months (plural) - can be string or function */
  MM: string | RelativeTimeFunction;
  /** Year (singular) - can be string or function */
  y: string | RelativeTimeFunction;
  /** Years (plural) - can be string or function */
  yy: string | RelativeTimeFunction;
}

/**
 * Week configuration
 */
interface WeekConfig {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year for first week */
  doy: number;
}

/**
 * Moment.js instance interface
 */
interface Moment {
  /**
   * Define a locale configuration
   * @param localeName - The locale identifier (e.g., "de")
   * @param config - The locale configuration object
   * @returns The configured locale
   */
  defineLocale(localeName: string, config: LocaleConfig): unknown;
}

/**
 * Function type for relative time formatting
 * @param value - The numeric value (e.g., number of days)
 * @param withoutSuffix - Whether to include suffix/prefix
 * @param key - The time unit key (e.g., "d" for day)
 * @param isFuture - Whether this is a future time
 * @returns The formatted relative time string
 */
type RelativeTimeFunction = (
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

/**
 * Returns the appropriate German relative time string based on context
 * @param value - The numeric value for the time unit
 * @param withoutSuffix - True if used without "in" or "vor" (e.g., in standalone context)
 * @param key - The time unit identifier (m, h, d, dd, w, M, MM, y, yy)
 * @param isFuture - Whether this represents a future time
 * @returns The formatted German time string (nominative or dative case)
 */
declare function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string;

/**
 * German locale configuration for moment.js
 * Exports the complete locale definition including months, weekdays, and relative time formatting
 */
declare const deLocale: LocaleConfig;

export { deLocale, formatRelativeTime, LocaleConfig, Moment, RelativeTimeFunction };
export type {
  CalendarFormat,
  LongDateFormat,
  RelativeTimeFormat,
  WeekConfig
};