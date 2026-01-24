/**
 * Moment.js locale configuration for Serbian (Cyrillic script)
 * @module moment/locale/sr-cyrl
 */

/**
 * Translation words for different time units in Serbian Cyrillic
 * Each array contains grammatical cases: [nominative, genitive, plural]
 */
interface LocaleWords {
  /** Seconds: singular, dual/paucal, plural forms */
  ss: [string, string, string];
  /** One minute: nominative, genitive forms */
  m: [string, string];
  /** Minutes: singular, dual/paucal, plural forms */
  mm: [string, string, string];
  /** One hour: nominative, genitive forms */
  h: [string, string];
  /** Hours: singular, dual/paucal, plural forms */
  hh: [string, string, string];
  /** Days: singular, dual/paucal, plural forms */
  dd: [string, string, string];
  /** Months: singular, dual/paucal, plural forms */
  MM: [string, string, string];
  /** Years: singular, dual/paucal, plural forms */
  yy: [string, string, string];
}

/**
 * Locale translation helper for Serbian Cyrillic
 */
interface LocaleTranslator {
  /** Dictionary of time unit translations */
  words: LocaleWords;
  
  /**
   * Selects correct grammatical case based on number
   * @param count - The numeric value
   * @param forms - Array of word forms [singular, dual/paucal, plural]
   * @returns The correctly inflected word form
   */
  correctGrammaticalCase(count: number, forms: [string, string, string] | [string, string]): string;
  
  /**
   * Translates time duration to Serbian Cyrillic
   * @param count - The numeric value
   * @param withoutSuffix - Whether to include suffix
   * @param key - The time unit key (e.g., 'mm', 'hh', 'dd')
   * @returns Formatted time string
   */
  translate(count: number, withoutSuffix: boolean, key: keyof LocaleWords): string;
}

/**
 * Moment.js instance with locale configuration methods
 */
interface MomentStatic {
  /**
   * Defines a new locale configuration
   * @param localeName - The locale identifier
   * @param config - Locale configuration object
   */
  defineLocale(localeName: string, config: LocaleConfiguration): void;
}

/**
 * Calendar display configuration for specific time references
 */
interface CalendarSpec {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Function returning format for next week */
  nextWeek(this: MomentInstance): string;
  /** Format for yesterday */
  lastDay: string;
  /** Function returning format for last week */
  lastWeek(this: MomentInstance): string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 */
interface RelativeTimeSpec {
  /** Future time prefix format */
  future: string;
  /** Past time prefix format */
  past: string;
  /** Seconds (less than threshold) */
  s: string;
  /** Seconds (above threshold) */
  ss: (count: number, withoutSuffix: boolean, key: string) => string;
  /** Single minute */
  m: (count: number, withoutSuffix: boolean, key: string) => string;
  /** Multiple minutes */
  mm: (count: number, withoutSuffix: boolean, key: string) => string;
  /** Single hour */
  h: (count: number, withoutSuffix: boolean, key: string) => string;
  /** Multiple hours */
  hh: (count: number, withoutSuffix: boolean, key: string) => string;
  /** Single day */
  d: string;
  /** Multiple days */
  dd: (count: number, withoutSuffix: boolean, key: string) => string;
  /** Single month */
  M: string;
  /** Multiple months */
  MM: (count: number, withoutSuffix: boolean, key: string) => string;
  /** Single year */
  y: string;
  /** Multiple years */
  yy: (count: number, withoutSuffix: boolean, key: string) => string;
}

/**
 * Long date format tokens
 */
interface LongDateFormatSpec {
  /** Time only */
  LT: string;
  /** Time with seconds */
  LTS: string;
  /** Short date */
  L: string;
  /** Long date */
  LL: string;
  /** Long date with time */
  LLL: string;
  /** Full date with weekday and time */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday) */
  dow: number;
  /** Day of year for first week */
  doy: number;
}

/**
 * Complete locale configuration object
 */
interface LocaleConfiguration {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to parse month names exactly */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to parse weekday names exactly */
  weekdaysParseExact: boolean;
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time configuration */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for ordinal day of month parsing */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number formatter */
  ordinal: string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Moment instance with day() method
 */
interface MomentInstance {
  /**
   * Gets the day of the week (0 = Sunday, 6 = Saturday)
   * @returns Day of week as number
   */
  day(): number;
}

/**
 * Serbian Cyrillic locale configuration module
 */
declare module 'moment/locale/sr-cyrl' {
  const locale: void;
  export = locale;
}