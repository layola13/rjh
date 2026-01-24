/**
 * Moment.js locale configuration for Montenegrin (me)
 * Provides localized date/time formatting and relative time translations
 */

/**
 * Grammatical cases for time unit words in Montenegrin language
 */
interface LocaleWords {
  /** Second translations: [nominative singular, genitive singular, genitive plural] */
  ss: [string, string, string];
  /** Minute (singular) translations: [nominative, genitive] */
  m: [string, string];
  /** Minute (plural) translations: [nominative, genitive singular, genitive plural] */
  mm: [string, string, string];
  /** Hour (singular) translations: [nominative, genitive] */
  h: [string, string];
  /** Hour (plural) translations: [nominative, genitive singular, genitive plural] */
  hh: [string, string, string];
  /** Day translations: [nominative, genitive singular, genitive plural] */
  dd: [string, string, string];
  /** Month translations: [nominative, genitive singular, genitive plural] */
  MM: [string, string, string];
  /** Year translations: [nominative, genitive singular, genitive plural] */
  yy: [string, string, string];
}

/**
 * Translation utilities for Montenegrin locale
 */
interface LocaleTranslator {
  /** Time unit word forms for different grammatical cases */
  words: LocaleWords;
  
  /**
   * Selects correct grammatical case based on the number
   * @param count - The numeric value
   * @param choices - Array of word forms [singular, dual/paucal, plural]
   * @returns The correctly declined word form
   */
  correctGrammaticalCase(count: number, choices: [string, string, string] | [string, string]): string;
  
  /**
   * Translates relative time expressions
   * @param count - The numeric value (e.g., 5 for "5 minutes")
   * @param withoutSuffix - Whether to use nominative (true) or genitive (false) case
   * @param key - The time unit key (e.g., 'mm' for minutes)
   * @returns Translated time expression
   */
  translate(count: number, withoutSuffix: boolean, key: string): string;
}

/**
 * Long date format tokens
 */
interface LongDateFormat {
  /** Time format (e.g., "14:30") */
  LT: string;
  /** Time with seconds format (e.g., "14:30:45") */
  LTS: string;
  /** Short date format (e.g., "25.12.2023") */
  L: string;
  /** Long date format (e.g., "25. decembar 2023") */
  LL: string;
  /** Long date with time (e.g., "25. decembar 2023 14:30") */
  LLL: string;
  /** Full date with day name and time (e.g., "ponedjeljak, 25. decembar 2023 14:30") */
  LLLL: string;
}

/**
 * Calendar-specific format strings
 */
interface CalendarSpec {
  /** Format for dates that fall on today */
  sameDay: string;
  /** Format for dates that fall on tomorrow */
  nextDay: string;
  /** Function returning format for dates in the next week */
  nextWeek(this: { day(): number }): string;
  /** Format for dates that fell on yesterday */
  lastDay: string;
  /** Function returning format for dates in the last week */
  lastWeek(this: { day(): number }): string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time format strings or translation functions
 */
interface RelativeTimeSpec {
  /** Future time prefix (e.g., "in %s") */
  future: string;
  /** Past time prefix (e.g., "%s ago") */
  past: string;
  /** Few seconds */
  s: string;
  /** Seconds (plural) - uses translation function */
  ss: (count: number, withoutSuffix: boolean, key: string) => string;
  /** One minute - uses translation function */
  m: (count: number, withoutSuffix: boolean, key: string) => string;
  /** Minutes (plural) - uses translation function */
  mm: (count: number, withoutSuffix: boolean, key: string) => string;
  /** One hour - uses translation function */
  h: (count: number, withoutSuffix: boolean, key: string) => string;
  /** Hours (plural) - uses translation function */
  hh: (count: number, withoutSuffix: boolean, key: string) => string;
  /** One day */
  d: string;
  /** Days (plural) - uses translation function */
  dd: (count: number, withoutSuffix: boolean, key: string) => string;
  /** One month */
  M: string;
  /** Months (plural) - uses translation function */
  MM: (count: number, withoutSuffix: boolean, key: string) => string;
  /** One year */
  y: string;
  /** Years (plural) - uses translation function */
  yy: (count: number, withoutSuffix: boolean, key: string) => string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year that defines week 1 */
  doy: number;
}

/**
 * Complete locale definition for Montenegrin
 */
export interface MontenegrinLocaleDefinition {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to use exact parsing for month names */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to use exact parsing for weekday names */
  weekdaysParseExact: boolean;
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  /** Calendar-specific formats */
  calendar: CalendarSpec;
  /** Relative time formats */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Moment.js instance with locale definition capabilities
 */
export interface MomentWithLocale {
  /**
   * Defines a new locale configuration
   * @param localeName - The locale identifier (e.g., "me" for Montenegrin)
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: MontenegrinLocaleDefinition): void;
}

/**
 * Initializes and registers the Montenegrin locale with moment.js
 * @param moment - The moment.js instance to register the locale with
 */
export default function initMontenegrinLocale(moment: MomentWithLocale): void;