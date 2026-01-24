/**
 * Moment.js French (fr) locale configuration
 * Configures French language support for moment.js date/time library
 * @module moment-locale-fr
 */

/**
 * Moment.js instance interface
 */
interface MomentStatic {
  /**
   * Define a locale configuration for moment.js
   * @param localeName - The locale identifier (e.g., "fr" for French)
   * @param config - Locale configuration object
   */
  defineLocale(localeName: string, config: LocaleConfiguration): void;
}

/**
 * Calendar display configuration for relative dates
 */
interface CalendarSpec {
  /** Format string for dates that are today */
  sameDay: string;
  /** Format string for dates that are tomorrow */
  nextDay: string;
  /** Format string for dates in the next week */
  nextWeek: string;
  /** Format string for dates that are yesterday */
  lastDay: string;
  /** Format string for dates in the last week */
  lastWeek: string;
  /** Format string for all other dates */
  sameElse: string;
}

/**
 * Relative time display configuration
 */
interface RelativeTimeSpec {
  /** Format string for future dates */
  future: string;
  /** Format string for past dates */
  past: string;
  /** Display text for a few seconds */
  s: string;
  /** Format string for seconds (plural) */
  ss: string;
  /** Display text for one minute */
  m: string;
  /** Format string for minutes (plural) */
  mm: string;
  /** Display text for one hour */
  h: string;
  /** Format string for hours (plural) */
  hh: string;
  /** Display text for one day */
  d: string;
  /** Format string for days (plural) */
  dd: string;
  /** Display text for one week */
  w: string;
  /** Format string for weeks (plural) */
  ww: string;
  /** Display text for one month */
  M: string;
  /** Format string for months (plural) */
  MM: string;
  /** Display text for one year */
  y: string;
  /** Format string for years (plural) */
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
  /** Full date and time format */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** First day of year */
  doy: number;
}

/**
 * Ordinal function parameter type
 */
type OrdinalToken = 'D' | 'M' | 'Q' | 'DDD' | 'd' | 'w' | 'W';

/**
 * Complete locale configuration object
 */
interface LocaleConfiguration {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Regular expression to match month names (any format) */
  monthsRegex: RegExp;
  /** Regular expression to match short month names (any format) */
  monthsShortRegex: RegExp;
  /** Regular expression to match full month names (strict) */
  monthsStrictRegex: RegExp;
  /** Regular expression to match short month names (strict) */
  monthsShortStrictRegex: RegExp;
  /** Array of regexes to parse month names */
  monthsParse: RegExp[];
  /** Array of regexes to parse full month names */
  longMonthsParse: RegExp[];
  /** Array of regexes to parse short month names */
  shortMonthsParse: RegExp[];
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to parse weekdays exactly */
  weekdaysParseExact: boolean;
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time display configuration */
  relativeTime: RelativeTimeSpec;
  /** Regular expression to parse ordinal numbers */
  dayOfMonthOrdinalParse: RegExp;
  /**
   * Function to format ordinal numbers
   * @param num - The number to format
   * @param token - The token type (D, M, Q, etc.)
   * @returns The formatted ordinal string
   */
  ordinal(num: number, token: string): string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Initialize French locale configuration for moment.js
 * @param moment - The moment.js instance
 */
declare function initializeFrenchLocale(moment: MomentStatic): void;

export { 
  MomentStatic, 
  LocaleConfiguration, 
  CalendarSpec, 
  RelativeTimeSpec, 
  LongDateFormatSpec,
  WeekSpec,
  OrdinalToken,
  initializeFrenchLocale 
};