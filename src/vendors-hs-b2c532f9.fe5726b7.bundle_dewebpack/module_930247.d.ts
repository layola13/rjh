/**
 * Moment.js locale configuration for Lithuanian (lt)
 * Provides localized date/time formatting, relative time, and calendar strings
 */

/**
 * Locale-specific word forms configuration
 * Maps time units to their grammatical forms (nominative_genitive_accusative)
 */
interface LocaleWordForms {
  /** Second forms: sekundė_sekundžių_sekundes */
  ss: string;
  /** Minute forms: minutė_minutės_minutę */
  m: string;
  /** Minutes forms: minutės_minučių_minutes */
  mm: string;
  /** Hour forms: valanda_valandos_valandą */
  h: string;
  /** Hours forms: valandos_valandų_valandas */
  hh: string;
  /** Day forms: diena_dienos_dieną */
  d: string;
  /** Days forms: dienos_dienų_dienas */
  dd: string;
  /** Month forms: mėnuo_mėnesio_mėnesį */
  M: string;
  /** Months forms: mėnesiai_mėnesių_mėnesius */
  MM: string;
  /** Year forms: metai_metų_metus */
  y: string;
  /** Years forms: metai_metų_metus */
  yy: string;
}

/**
 * Moment.js locale specification interface
 */
interface MomentLocaleSpecification {
  /** Month names configuration */
  months: {
    /** Month names in various grammatical forms */
    format: string[];
    /** Standalone month names */
    standalone: string[];
    /** Regex to determine which format to use */
    isFormat: RegExp;
  };
  /** Abbreviated month names */
  monthsShort: string[];
  /** Weekday names configuration */
  weekdays: {
    /** Weekday names in various grammatical forms */
    format: string[];
    /** Standalone weekday names */
    standalone: string[];
    /** Regex to determine which format to use */
    isFormat: RegExp;
  };
  /** Short weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format tokens */
  longDateFormat: Record<string, string>;
  /** Calendar-specific relative time strings */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  /** Relative time configuration */
  relativeTime: {
    future: string;
    past: string;
    s: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    ss: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    m: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    mm: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    h: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    hh: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    d: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    dd: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    M: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    MM: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    y: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    yy: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
  };
  /** Regex for parsing ordinal numbers */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: (num: number) => string;
  /** Week configuration */
  week: {
    /** First day of week (1 = Monday) */
    dow: number;
    /** First day of year */
    doy: number;
  };
}

/**
 * Moment.js instance interface
 */
interface Moment {
  /**
   * Define a new locale configuration
   * @param localeName - Locale identifier (e.g., "lt")
   * @param config - Locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeName: string, config: MomentLocaleSpecification): unknown;
}

/**
 * Get the appropriate word form based on context
 * @param count - The numeric value
 * @param withoutSuffix - Whether to omit suffix
 * @param key - The time unit key
 * @param isFuture - Whether this is future tense
 * @returns Formatted string with appropriate word form
 */
declare function getWordForm(
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string;

/**
 * Determine if a number requires special plural form (multiples of 10 or 11-19)
 * @param count - The number to check
 * @returns True if special plural form should be used
 */
declare function requiresSpecialPluralForm(count: number): boolean;

/**
 * Split word forms string into array of forms
 * @param key - The time unit key
 * @returns Array of word forms [nominative, genitive, accusative]
 */
declare function splitWordForms(key: string): string[];

/**
 * Format relative time with appropriate Lithuanian grammatical forms
 * @param count - The numeric value
 * @param withoutSuffix - Whether to omit suffix
 * @param key - Array of time unit word forms
 * @param isFuture - Whether this is future tense
 * @returns Formatted relative time string
 */
declare function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  key: string[],
  isFuture: boolean
): string;

/**
 * Initialize Lithuanian locale configuration for Moment.js
 * @param momentInstance - Moment.js instance to configure
 * @returns Configured locale
 */
declare function initializeLithuanianLocale(momentInstance: Moment): unknown;

export type { LocaleWordForms, MomentLocaleSpecification, Moment };
export { initializeLithuanianLocale };