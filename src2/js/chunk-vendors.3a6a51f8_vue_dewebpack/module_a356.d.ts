/**
 * Moment.js locale configuration for Arabic (Algeria) - ar-dz
 * 
 * This module provides localization settings for Algerian Arabic,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module ar-dz-locale
 */

/**
 * Plural form categories used in Arabic language
 * 
 * Arabic has six plural forms based on the number:
 * - 0: zero
 * - 1: one
 * - 2: two
 * - 3: few (3-10)
 * - 4: many (11-99)
 * - 5: other (100+)
 */
type ArabicPluralForm = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Time unit translation templates for different plural forms
 */
interface TimeUnitTranslations {
  /** Seconds translations */
  s: readonly [string, string, readonly [string, string], string, string, string];
  /** Minutes translations */
  m: readonly [string, string, readonly [string, string], string, string, string];
  /** Hours translations */
  h: readonly [string, string, readonly [string, string], string, string, string];
  /** Days translations */
  d: readonly [string, string, readonly [string, string], string, string, string];
  /** Months translations */
  M: readonly [string, string, readonly [string, string], string, string, string];
  /** Years translations */
  y: readonly [string, string, readonly [string, string], string, string, string];
}

/**
 * Locale configuration options for Moment.js
 */
interface LocaleConfiguration {
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
  /** Enable exact weekday parsing */
  weekdaysParseExact: boolean;
  /** Date and time format patterns */
  longDateFormat: LongDateFormat;
  /** Regex pattern for meridiem (AM/PM) parsing */
  meridiemParse: RegExp;
  /** Determines if time is PM */
  isPM: (meridiemToken: string) => boolean;
  /** Returns meridiem token for given time */
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  /** Calendar format strings for relative dates */
  calendar: CalendarFormat;
  /** Relative time format strings */
  relativeTime: RelativeTimeFormat;
  /** Post-processes formatted output */
  postformat: (output: string) => string;
  /** Week calculation settings */
  week: WeekSettings;
}

/**
 * Long date format patterns
 */
interface LongDateFormat {
  /** Time format (e.g., "14:30") */
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
 * Calendar format strings for displaying relative dates
 */
interface CalendarFormat {
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
 * Relative time format configuration
 */
interface RelativeTimeFormat {
  /** Future time prefix template */
  future: string;
  /** Past time prefix template */
  past: string;
  /** Seconds (singular) */
  s: RelativeTimeFunction;
  /** Seconds (plural) */
  ss: RelativeTimeFunction;
  /** Minute (singular) */
  m: RelativeTimeFunction;
  /** Minutes (plural) */
  mm: RelativeTimeFunction;
  /** Hour (singular) */
  h: RelativeTimeFunction;
  /** Hours (plural) */
  hh: RelativeTimeFunction;
  /** Day (singular) */
  d: RelativeTimeFunction;
  /** Days (plural) */
  dd: RelativeTimeFunction;
  /** Month (singular) */
  M: RelativeTimeFunction;
  /** Months (plural) */
  MM: RelativeTimeFunction;
  /** Year (singular) */
  y: RelativeTimeFunction;
  /** Years (plural) */
  yy: RelativeTimeFunction;
}

/**
 * Function type for relative time formatting
 * 
 * @param value - The numeric value
 * @param withoutSuffix - Whether to include suffix
 * @param key - The unit key
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string
 */
type RelativeTimeFunction = (
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

/**
 * Week calculation settings
 */
interface WeekSettings {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Moment.js instance with locale methods
 */
interface MomentStatic {
  /**
   * Defines a new locale configuration
   * 
   * @param localeName - The locale identifier
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: LocaleConfiguration): void;
}

/**
 * Determines the Arabic plural form category for a given number
 * 
 * @param count - The number to categorize
 * @returns The plural form category (0-5)
 */
declare function getPluralForm(count: number): ArabicPluralForm;

/**
 * Creates a relative time formatter for a specific time unit
 * 
 * @param unitKey - The time unit key ('s', 'm', 'h', 'd', 'M', 'y')
 * @returns A function that formats relative time for the given unit
 */
declare function createRelativeTimeFormatter(unitKey: keyof TimeUnitTranslations): RelativeTimeFunction;

/**
 * Registers the Arabic (Algeria) locale configuration with Moment.js
 * 
 * @param moment - The Moment.js instance
 */
declare function registerArDzLocale(moment: MomentStatic): void;

export { 
  ArabicPluralForm,
  TimeUnitTranslations,
  LocaleConfiguration,
  LongDateFormat,
  CalendarFormat,
  RelativeTimeFormat,
  RelativeTimeFunction,
  WeekSettings,
  MomentStatic,
  getPluralForm,
  createRelativeTimeFormatter,
  registerArDzLocale
};