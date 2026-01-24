/**
 * Moment.js Klingon (tlh) locale configuration
 * Provides localization support for the Klingon language
 */

/**
 * Moment.js instance interface
 */
interface Moment {
  defineLocale(locale: string, config: LocaleSpecification): Locale;
}

/**
 * Locale specification configuration object
 */
interface LocaleSpecification {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to use exact month name parsing */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  /** Calendar format configuration */
  calendar: CalendarSpec;
  /** Relative time format configuration */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing day of month ordinals */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: string | ((num: number) => string);
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Long date format tokens configuration
 */
interface LongDateFormat {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  /** Time with seconds format (e.g., "HH:mm:ss") */
  LTS: string;
  /** Short date format (e.g., "DD.MM.YYYY") */
  L: string;
  /** Long date format (e.g., "D MMMM YYYY") */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with time and weekday format */
  LLLL: string;
}

/**
 * Calendar format specification
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
 * Relative time format specification
 */
interface RelativeTimeSpec {
  /** Function to format future times */
  future: (timeString: string) => string;
  /** Function to format past times */
  past: (timeString: string) => string;
  /** Format for seconds */
  s: string;
  /** Format for multiple seconds */
  ss: string | RelativeTimeFormatFunction;
  /** Format for one minute */
  m: string;
  /** Format for multiple minutes */
  mm: string | RelativeTimeFormatFunction;
  /** Format for one hour */
  h: string;
  /** Format for multiple hours */
  hh: string | RelativeTimeFormatFunction;
  /** Format for one day */
  d: string;
  /** Format for multiple days */
  dd: string | RelativeTimeFormatFunction;
  /** Format for one month */
  M: string;
  /** Format for multiple months */
  MM: string | RelativeTimeFormatFunction;
  /** Format for one year */
  y: string;
  /** Format for multiple years */
  yy: string | RelativeTimeFormatFunction;
}

/**
 * Relative time format function signature
 */
type RelativeTimeFormatFunction = (
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

/**
 * Week configuration specification
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year for week 1 */
  doy: number;
}

/**
 * Locale object returned by defineLocale
 */
interface Locale {
  name: string;
  config: LocaleSpecification;
}

/**
 * Klingon number words (0-9)
 */
declare const KLINGON_NUMBERS: readonly [
  "pagh",
  "wa'",
  "cha'",
  "wej",
  "loS",
  "vagh",
  "jav",
  "Soch",
  "chorgh",
  "Hut"
];

/**
 * Converts a time string to future tense in Klingon
 * @param timeString - The time string to convert
 * @returns The time string in future tense
 */
declare function translateFuture(timeString: string): string;

/**
 * Converts a time string to past tense in Klingon
 * @param timeString - The time string to convert
 * @returns The time string in past tense
 */
declare function translatePast(timeString: string): string;

/**
 * Formats a relative time value with appropriate Klingon unit
 * @param value - The numeric value
 * @param withoutSuffix - Whether to exclude suffix
 * @param key - The unit key (ss, mm, hh, dd, MM, yy)
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string
 */
declare function relativeTimeWithPlural(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string;

/**
 * Converts a number to Klingon number words
 * @param value - The number to convert (0-999)
 * @returns The Klingon representation of the number
 */
declare function toKlingonNumber(value: number): string;

/**
 * Initializes and registers the Klingon locale with moment.js
 * @param moment - The moment.js instance
 */
declare function initializeKlingonLocale(moment: Moment): void;

export {
  Moment,
  LocaleSpecification,
  LongDateFormat,
  CalendarSpec,
  RelativeTimeSpec,
  RelativeTimeFormatFunction,
  WeekSpec,
  Locale,
  KLINGON_NUMBERS,
  translateFuture,
  translatePast,
  relativeTimeWithPlural,
  toKlingonNumber,
  initializeKlingonLocale,
};