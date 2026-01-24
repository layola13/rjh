/**
 * Moment.js Breton (br) locale configuration
 * Provides localization support for the Breton language including:
 * - Month and weekday names
 * - Date formatting patterns
 * - Relative time expressions
 * - Ordinal number formatting
 */

/**
 * Represents the structure for time unit names in Breton
 */
interface BretonTimeUnitNames {
  mm: string; // Minutes
  MM: string; // Months
  dd: string; // Days
}

/**
 * Represents the structure for character mutations in Breton
 */
interface BretonMutationMap {
  m: string;
  b: string;
  d: string;
}

/**
 * Moment.js locale configuration object
 */
interface LocaleConfiguration {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParse: RegExp[];
  fullWeekdaysParse: RegExp[];
  shortWeekdaysParse: RegExp[];
  minWeekdaysParse: RegExp[];
  monthsRegex: RegExp;
  monthsShortRegex: RegExp;
  monthsStrictRegex: RegExp;
  monthsShortStrictRegex: RegExp;
  monthsParse: RegExp[];
  longMonthsParse: RegExp[];
  shortMonthsParse: RegExp[];
  longDateFormat: LongDateFormat;
  calendar: CalendarFormat;
  relativeTime: RelativeTimeFormat;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
  week: WeekConfiguration;
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
}

/**
 * Long date format patterns
 */
interface LongDateFormat {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
}

/**
 * Calendar format configuration for relative dates
 */
interface CalendarFormat {
  sameDay: string;
  nextDay: string;
  nextWeek: string;
  lastDay: string;
  lastWeek: string;
  sameElse: string;
}

/**
 * Relative time format configuration
 */
interface RelativeTimeFormat {
  future: string;
  past: string;
  s: string;
  ss: string;
  m: string;
  mm: (num: number, withoutSuffix: boolean, key: string) => string;
  h: string;
  hh: string;
  d: string;
  dd: (num: number, withoutSuffix: boolean, key: string) => string;
  M: string;
  MM: (num: number, withoutSuffix: boolean, key: string) => string;
  y: string;
  yy: (num: number) => string;
}

/**
 * Week configuration (first day of week and first week of year)
 */
interface WeekConfiguration {
  dow: number; // Day of week (0-6, Sunday-Saturday)
  doy: number; // Day of year for week calculation
}

/**
 * Moment.js instance interface
 */
interface MomentStatic {
  defineLocale(locale: string, config: LocaleConfiguration): void;
}

/**
 * Formats time units (minutes, months, days) with proper Breton pluralization
 * @param num - The numeric value
 * @param withoutSuffix - Whether to include suffix
 * @param key - The time unit key ('mm', 'MM', 'dd')
 * @returns Formatted string with time unit in Breton
 */
export declare function formatTimeUnit(
  num: number,
  withoutSuffix: boolean,
  key: string
): string;

/**
 * Formats years in Breton with proper mutations based on number
 * @param num - The number of years
 * @returns Formatted string with "bloaz" or "vloaz"
 */
export declare function formatYears(num: number): string;

/**
 * Gets the last digit of a number for Breton grammar rules
 * @param num - The input number
 * @returns The last digit (0-9)
 */
export declare function getLastDigit(num: number): number;

/**
 * Applies Breton lenition (soft mutation) to words
 * @param word - The word to mutate
 * @param count - The count that determines if mutation is needed
 * @returns Mutated or original word
 */
export declare function applyLenition(word: string, count: number): string;

/**
 * Applies soft mutation to initial consonants in Breton
 * @param word - The word to mutate
 * @returns Mutated word with changed initial consonant
 */
export declare function mutateSoftConsonant(word: string): string;

/**
 * Regular expressions for parsing Breton month names
 */
export declare const MONTH_PARSE_PATTERNS: RegExp[];
export declare const MONTH_REGEX_PATTERN: RegExp;
export declare const MONTH_STRICT_REGEX_PATTERN: RegExp;
export declare const MONTH_SHORT_STRICT_REGEX_PATTERN: RegExp;

/**
 * Regular expressions for parsing Breton weekday names
 */
export declare const WEEKDAY_FULL_PARSE_PATTERNS: RegExp[];
export declare const WEEKDAY_SHORT_PARSE_PATTERNS: RegExp[];
export declare const WEEKDAY_MIN_PARSE_PATTERNS: RegExp[];

/**
 * The complete Breton locale configuration for Moment.js
 */
export declare const bretonLocaleConfig: LocaleConfiguration;