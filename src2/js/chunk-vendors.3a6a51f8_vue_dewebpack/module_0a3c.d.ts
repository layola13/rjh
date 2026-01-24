/**
 * Moment.js Locale Configuration for Spanish (Dominican Republic)
 * 
 * This module provides locale-specific configuration for moment.js
 * to support Spanish language formatting as used in the Dominican Republic.
 */

/**
 * Moment.js instance interface with locale definition capabilities
 */
interface MomentStatic {
  /**
   * Defines a new locale or updates an existing one
   * @param localeName - The locale identifier (e.g., "es-do")
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: LocaleSpecification): Locale;
}

/**
 * Moment.js Locale object returned after defining a locale
 */
interface Locale {
  /** The locale identifier */
  _abbr: string;
  /** Parent locale if this locale extends another */
  _parent?: Locale;
  /** Locale configuration */
  _config: LocaleSpecification;
}

/**
 * Moment instance representing a specific point in time
 */
interface Moment {
  /**
   * Gets or sets the month (0-11)
   * @returns The month index when called without arguments
   */
  month(): number;
  
  /**
   * Gets the hour of the day (0-23)
   * @returns The hour value
   */
  hours(): number;
}

/**
 * Function type for dynamic calendar format strings
 */
type CalendarSpecFunction = (this: Moment) => string;

/**
 * Calendar format specification for relative dates
 */
interface CalendarSpec {
  /** Format for today's date */
  sameDay: CalendarSpecFunction | string;
  /** Format for tomorrow's date */
  nextDay: CalendarSpecFunction | string;
  /** Format for dates in the next week */
  nextWeek: CalendarSpecFunction | string;
  /** Format for yesterday's date */
  lastDay: CalendarSpecFunction | string;
  /** Format for dates in the last week */
  lastWeek: CalendarSpecFunction | string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time format specification
 */
interface RelativeTimeSpec {
  /** Format for future dates */
  future: string;
  /** Format for past dates */
  past: string;
  /** Format for seconds */
  s: string;
  /** Format for multiple seconds (%d is replaced with the number) */
  ss: string;
  /** Format for a minute */
  m: string;
  /** Format for multiple minutes */
  mm: string;
  /** Format for an hour */
  h: string;
  /** Format for multiple hours */
  hh: string;
  /** Format for a day */
  d: string;
  /** Format for multiple days */
  dd: string;
  /** Format for a week */
  w: string;
  /** Format for multiple weeks */
  ww: string;
  /** Format for a month */
  M: string;
  /** Format for multiple months */
  MM: string;
  /** Format for a year */
  y: string;
  /** Format for multiple years */
  yy: string;
}

/**
 * Long date format tokens and their corresponding format strings
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "h:mm A") */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format without time */
  LL: string;
  /** Long date format with time */
  LLL: string;
  /** Full date format with day name */
  LLLL: string;
}

/**
 * Week configuration specification
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year that starts week 1 */
  doy: number;
}

/**
 * Function type for dynamic month name selection
 */
type MonthsShortFunction = (momentInstance: Moment | undefined, format: string) => string | string[];

/**
 * Complete locale specification for moment.js
 */
interface LocaleSpecification {
  /** Array of full month names */
  months: string[];
  
  /**
   * Short month names or function to determine short month name based on context
   * Function receives moment instance and format string, returns appropriate abbreviation
   */
  monthsShort: string[] | MonthsShortFunction;
  
  /** Regular expression for parsing month names (both full and abbreviated) */
  monthsRegex: RegExp;
  
  /** Regular expression for parsing short month names */
  monthsShortRegex: RegExp;
  
  /** Strict regular expression for parsing full month names */
  monthsStrictRegex: RegExp;
  
  /** Strict regular expression for parsing abbreviated month names */
  monthsShortStrictRegex: RegExp;
  
  /** Array of regular expressions for parsing individual months */
  monthsParse: RegExp[];
  
  /** Array of regular expressions for parsing full month names */
  longMonthsParse: RegExp[];
  
  /** Array of regular expressions for parsing short month names */
  shortMonthsParse: RegExp[];
  
  /** Array of full weekday names */
  weekdays: string[];
  
  /** Array of short weekday names */
  weekdaysShort: string[];
  
  /** Array of minimal weekday names */
  weekdaysMin: string[];
  
  /** Whether weekday parsing should be exact */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  
  /** Calendar format specifications for relative dates */
  calendar: CalendarSpec;
  
  /** Relative time format specifications */
  relativeTime: RelativeTimeSpec;
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Function or string format for ordinal numbers
   * %d is replaced with the number
   */
  ordinal: string | ((num: number) => string);
  
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Spanish (Dominican Republic) locale configuration
 * Locale code: es-do
 */
declare module 'moment/locale/es-do' {
  const locale: Locale;
  export = locale;
}