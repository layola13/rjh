/**
 * Moment.js locale configuration for Czech (cs)
 * @module MomentCzechLocale
 */

/**
 * Moment.js library instance
 */
interface Moment {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "cs" for Czech)
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: LocaleConfiguration): void;
  
  /**
   * Get the day of the week (0-6, where 0 is Sunday)
   */
  day(): number;
}

/**
 * Locale configuration object for Moment.js
 */
interface LocaleConfiguration {
  /** Full month names */
  months: string[];
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Regular expression for parsing month names (both full and short) */
  monthsRegex: RegExp;
  
  /** Regular expression for parsing short month names */
  monthsShortRegex: RegExp;
  
  /** Strict regular expression for parsing full month names */
  monthsStrictRegex: RegExp;
  
  /** Strict regular expression for parsing short month names */
  monthsShortStrictRegex: RegExp;
  
  /** Array of regular expressions for parsing individual months */
  monthsParse: RegExp[];
  
  /** Array of regular expressions for parsing full month names */
  longMonthsParse: RegExp[];
  
  /** Array of regular expressions for parsing short month names */
  shortMonthsParse: RegExp[];
  
  /** Full weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names */
  weekdaysMin: string[];
  
  /** Date and time format configurations */
  longDateFormat: LongDateFormat;
  
  /** Calendar-specific date formatting */
  calendar: CalendarSpec;
  
  /** Relative time formatting configuration */
  relativeTime: RelativeTimeSpec;
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function or string to format ordinal numbers */
  ordinal: string | ((num: number) => string);
  
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Long date format configuration
 */
interface LongDateFormat {
  /** Time format (e.g., "H:mm") */
  LT: string;
  
  /** Time with seconds format (e.g., "H:mm:ss") */
  LTS: string;
  
  /** Short date format (e.g., "DD.MM.YYYY") */
  L: string;
  
  /** Long date format (e.g., "D. MMMM YYYY") */
  LL: string;
  
  /** Long date with time format (e.g., "D. MMMM YYYY H:mm") */
  LLL: string;
  
  /** Full date with weekday and time format */
  LLLL: string;
  
  /** Alternative short date format */
  l: string;
}

/**
 * Calendar-specific date formatting specification
 */
interface CalendarSpec {
  /** Format for today */
  sameDay: string;
  
  /** Format for tomorrow */
  nextDay: string;
  
  /** Format for next week (can be a function) */
  nextWeek: string | (() => string);
  
  /** Format for yesterday */
  lastDay: string;
  
  /** Format for last week (can be a function) */
  lastWeek: string | (() => string);
  
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time formatting specification
 */
interface RelativeTimeSpec {
  /** Future time format template */
  future: string;
  
  /** Past time format template */
  past: string;
  
  /** Seconds formatter */
  s: RelativeTimeFormatter;
  
  /** Multiple seconds formatter */
  ss: RelativeTimeFormatter;
  
  /** Minute formatter */
  m: RelativeTimeFormatter;
  
  /** Multiple minutes formatter */
  mm: RelativeTimeFormatter;
  
  /** Hour formatter */
  h: RelativeTimeFormatter;
  
  /** Multiple hours formatter */
  hh: RelativeTimeFormatter;
  
  /** Day formatter */
  d: RelativeTimeFormatter;
  
  /** Multiple days formatter */
  dd: RelativeTimeFormatter;
  
  /** Month formatter */
  M: RelativeTimeFormatter;
  
  /** Multiple months formatter */
  MM: RelativeTimeFormatter;
  
  /** Year formatter */
  y: RelativeTimeFormatter;
  
  /** Multiple years formatter */
  yy: RelativeTimeFormatter;
}

/**
 * Function type for formatting relative time
 * @param value - The numeric value
 * @param withoutSuffix - Whether to format without suffix
 * @param key - The format key (e.g., "s", "m", "h")
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string
 */
type RelativeTimeFormatter = (
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

/**
 * Week configuration specification
 */
interface WeekSpec {
  /** Day of week (0-6, where 0 is Sunday, 1 is Monday) */
  dow: number;
  
  /** Day of year for the first week */
  doy: number;
}

/**
 * Checks if a number should use plural form for Czech language
 * Czech uses special plural form for numbers 2-4 (excluding X1X)
 * @param num - The number to check
 * @returns True if the number should use the 2-4 plural form
 */
declare function shouldUsePluralForm(num: number): boolean;

/**
 * Formats relative time in Czech with proper grammatical cases
 * @param value - The numeric value
 * @param withoutSuffix - Whether to format without suffix (nominative case)
 * @param formatKey - The format key (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string with proper Czech declension
 */
declare function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  formatKey: string,
  isFuture: boolean
): string;

/**
 * Full month names in Czech (nominative case)
 */
declare const MONTHS_FULL: readonly string[];

/**
 * Abbreviated month names in Czech
 */
declare const MONTHS_SHORT: readonly string[];

/**
 * Regular expressions for parsing individual months
 */
declare const MONTHS_PARSE_REGEX: readonly RegExp[];

/**
 * Combined regular expression for parsing any month name
 */
declare const MONTHS_COMBINED_REGEX: RegExp;

/**
 * Initialize Czech locale for Moment.js
 * @param moment - The Moment.js instance
 */
declare function initializeCzechLocale(moment: Moment): void;