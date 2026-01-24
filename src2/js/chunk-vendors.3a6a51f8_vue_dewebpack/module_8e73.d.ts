/**
 * Moment.js Arabic (ar) locale configuration
 * Provides localization support for Arabic language including:
 * - Number conversion between Western and Eastern Arabic numerals
 * - Pluralization rules for Arabic grammar
 * - Month and weekday names
 * - Relative time formatting
 */

import { Moment } from 'moment';

/**
 * Mapping from Western Arabic numerals to Eastern Arabic-Indic numerals
 */
declare const WESTERN_TO_EASTERN_NUMERALS: {
  readonly '1': '١';
  readonly '2': '٢';
  readonly '3': '٣';
  readonly '4': '٤';
  readonly '5': '٥';
  readonly '6': '٦';
  readonly '7': '٧';
  readonly '8': '٨';
  readonly '9': '٩';
  readonly '0': '٠';
};

/**
 * Mapping from Eastern Arabic-Indic numerals to Western Arabic numerals
 */
declare const EASTERN_TO_WESTERN_NUMERALS: {
  readonly '١': '1';
  readonly '٢': '2';
  readonly '٣': '3';
  readonly '٤': '4';
  readonly '٥': '5';
  readonly '٦': '6';
  readonly '٧': '7';
  readonly '٨': '8';
  readonly '٩': '9';
  readonly '٠': '0';
};

/**
 * Arabic plural forms for different time units
 * Each key represents a time unit with 6 plural forms following Arabic grammar rules
 */
interface ArabicPluralForms {
  /** Plural forms for seconds */
  readonly s: readonly [string, string, readonly [string, string], string, string, string];
  /** Plural forms for minutes */
  readonly m: readonly [string, string, readonly [string, string], string, string, string];
  /** Plural forms for hours */
  readonly h: readonly [string, string, readonly [string, string], string, string, string];
  /** Plural forms for days */
  readonly d: readonly [string, string, readonly [string, string], string, string, string];
  /** Plural forms for months */
  readonly M: readonly [string, string, readonly [string, string], string, string, string];
  /** Plural forms for years */
  readonly y: readonly [string, string, readonly [string, string], string, string, string];
}

/**
 * Determines the Arabic plural form index based on the number
 * Arabic has 6 plural forms:
 * 0: zero
 * 1: singular (one)
 * 2: dual (two)
 * 3: plural (3-10)
 * 4: plural (11-99)
 * 5: plural (100+)
 * 
 * @param count - The number to determine plural form for
 * @returns Index (0-5) representing which plural form to use
 */
declare function getPluralFormIndex(count: number): 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Creates a function that formats relative time strings in Arabic
 * 
 * @param unit - The time unit key (s, m, h, d, M, y)
 * @returns A function that formats the relative time string
 */
declare function createRelativeTimeFormatter(
  unit: keyof ArabicPluralForms
): (
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

/**
 * Arabic month names (same for full and abbreviated forms)
 */
declare const ARABIC_MONTHS: readonly [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر'
];

/**
 * Arabic locale configuration for moment.js
 */
export interface ArabicLocaleConfig {
  /** Full month names */
  readonly months: typeof ARABIC_MONTHS;
  /** Abbreviated month names */
  readonly monthsShort: typeof ARABIC_MONTHS;
  /** Full weekday names */
  readonly weekdays: readonly string[];
  /** Short weekday names */
  readonly weekdaysShort: readonly string[];
  /** Minimal weekday names (single character) */
  readonly weekdaysMin: readonly string[];
  /** Whether weekday parsing should be exact */
  readonly weekdaysParseExact: true;
  /** Long date format tokens */
  readonly longDateFormat: {
    readonly LT: 'HH:mm';
    readonly LTS: 'HH:mm:ss';
    readonly L: 'D/‏M/‏YYYY';
    readonly LL: 'D MMMM YYYY';
    readonly LLL: 'D MMMM YYYY HH:mm';
    readonly LLLL: 'dddd D MMMM YYYY HH:mm';
  };
  /** Regular expression to parse AM/PM markers */
  readonly meridiemParse: RegExp;
  /**
   * Determines if the given meridiem string represents PM
   * @param meridiemString - The meridiem string (ص for AM, م for PM)
   */
  isPM(meridiemString: string): boolean;
  /**
   * Returns the appropriate meridiem string for the given time
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour
   * @param isLowercase - Whether to return lowercase (not used in Arabic)
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
  /** Calendar format strings for different relative days */
  readonly calendar: {
    readonly sameDay: '[اليوم عند الساعة] LT';
    readonly nextDay: '[غدًا عند الساعة] LT';
    readonly nextWeek: 'dddd [عند الساعة] LT';
    readonly lastDay: '[أمس عند الساعة] LT';
    readonly lastWeek: 'dddd [عند الساعة] LT';
    readonly sameElse: 'L';
  };
  /** Relative time format configuration */
  readonly relativeTime: {
    readonly future: 'بعد %s';
    readonly past: 'منذ %s';
    readonly s: ReturnType<typeof createRelativeTimeFormatter>;
    readonly ss: ReturnType<typeof createRelativeTimeFormatter>;
    readonly m: ReturnType<typeof createRelativeTimeFormatter>;
    readonly mm: ReturnType<typeof createRelativeTimeFormatter>;
    readonly h: ReturnType<typeof createRelativeTimeFormatter>;
    readonly hh: ReturnType<typeof createRelativeTimeFormatter>;
    readonly d: ReturnType<typeof createRelativeTimeFormatter>;
    readonly dd: ReturnType<typeof createRelativeTimeFormatter>;
    readonly M: ReturnType<typeof createRelativeTimeFormatter>;
    readonly MM: ReturnType<typeof createRelativeTimeFormatter>;
    readonly y: ReturnType<typeof createRelativeTimeFormatter>;
    readonly yy: ReturnType<typeof createRelativeTimeFormatter>;
  };
  /**
   * Converts Eastern Arabic-Indic numerals to Western Arabic numerals
   * Also replaces Arabic comma with Western comma
   * @param text - Input string with Eastern Arabic numerals
   */
  preparse(text: string): string;
  /**
   * Converts Western Arabic numerals to Eastern Arabic-Indic numerals
   * Also replaces Western comma with Arabic comma
   * @param text - Input string with Western Arabic numerals
   */
  postformat(text: string): string;
  /** Week configuration */
  readonly week: {
    /** Day of week (Saturday = 6) */
    readonly dow: 6;
    /** Day of year for week calculation */
    readonly doy: 12;
  };
}

/**
 * Registers the Arabic locale with moment.js
 * @param moment - The moment.js instance
 */
export function defineArabicLocale(moment: typeof Moment): void;

export default defineArabicLocale;