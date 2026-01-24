/**
 * Moment.js Kazakh (kk) locale configuration
 * Provides localization for dates, times, and relative time formatting in Kazakh language
 */

/**
 * Ordinal suffix mapping for Kazakh numbers
 * Maps specific numbers to their appropriate ordinal suffixes ("-ші" or "-шы")
 */
interface OrdinalSuffixMap {
  [key: number]: string;
}

/**
 * Configuration object for long date formats
 */
interface LongDateFormatConfig {
  /** Time format (hours:minutes) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date format with time */
  LLL: string;
  /** Full date format with day name and time */
  LLLL: string;
}

/**
 * Calendar formatting configuration for relative dates
 */
interface CalendarConfig {
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
 * Relative time formatting configuration
 */
interface RelativeTimeConfig {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Seconds (few) */
  s: string;
  /** Seconds (multiple) */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (multiple) */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (multiple) */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (multiple) */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (multiple) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (multiple) */
  yy: string;
}

/**
 * Week configuration
 */
interface WeekConfig {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year that defines the first week */
  doy: number;
}

/**
 * Complete locale configuration for Kazakh language
 */
interface KazakhLocaleConfig {
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
  /** Long date format configurations */
  longDateFormat: LongDateFormatConfig;
  /** Calendar format configurations */
  calendar: CalendarConfig;
  /** Relative time format configurations */
  relativeTime: RelativeTimeConfig;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to generate ordinal representation of a number */
  ordinal: (dayOfMonth: number) => string;
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Moment.js instance interface
 */
interface Moment {
  /**
   * Defines a new locale for moment.js
   * @param localeKey - The locale identifier (e.g., "kk" for Kazakh)
   * @param config - The locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeKey: string, config: KazakhLocaleConfig): unknown;
}

/**
 * Configures Kazakh locale for moment.js
 * @param momentInstance - The moment.js instance to configure
 */
declare function configureKazakhLocale(momentInstance: Moment): void;

/**
 * Ordinal suffix lookup table for Kazakh numbers
 */
declare const ordinalSuffixes: OrdinalSuffixMap;

/**
 * Kazakh locale configuration object
 */
declare const kazakhLocale: KazakhLocaleConfig;

export { configureKazakhLocale, kazakhLocale, ordinalSuffixes, KazakhLocaleConfig, Moment };