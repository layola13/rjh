/**
 * Moment.js locale configuration for Spanish (Mexico)
 * @module es-mx-locale
 */

import { Moment, LocaleSpecification } from 'moment';

/**
 * Month abbreviations with periods
 */
declare const MONTH_ABBREVIATIONS_WITH_PERIOD: readonly [
  'ene.',
  'feb.',
  'mar.',
  'abr.',
  'may.',
  'jun.',
  'jul.',
  'ago.',
  'sep.',
  'oct.',
  'nov.',
  'dic.'
];

/**
 * Month abbreviations without periods
 */
declare const MONTH_ABBREVIATIONS: readonly [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic'
];

/**
 * Regular expressions for parsing month names
 */
declare const MONTH_PARSE_REGEX: readonly [
  RegExp, // /^ene/i
  RegExp, // /^feb/i
  RegExp, // /^mar/i
  RegExp, // /^abr/i
  RegExp, // /^may/i
  RegExp, // /^jun/i
  RegExp, // /^jul/i
  RegExp, // /^ago/i
  RegExp, // /^sep/i
  RegExp, // /^oct/i
  RegExp, // /^nov/i
  RegExp  // /^dic/i
];

/**
 * Comprehensive regex for matching month names in various formats
 */
declare const MONTH_MATCH_REGEX: RegExp;

/**
 * Date format configuration for Spanish (Mexico) locale
 */
interface DateFormatConfig {
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
  /** Full date format with day of week and time */
  LLLL: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeConfig {
  /** Future tense prefix */
  future: string;
  /** Past tense prefix */
  past: string;
  /** A few seconds */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** One minute */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** One hour */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** One day */
  d: string;
  /** Days (plural) */
  dd: string;
  /** One week */
  w: string;
  /** Weeks (plural) */
  ww: string;
  /** One month */
  M: string;
  /** Months (plural) */
  MM: string;
  /** One year */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Calendar format functions for relative dates
 */
interface CalendarConfig {
  /** Format for today */
  sameDay(): string;
  /** Format for tomorrow */
  nextDay(): string;
  /** Format for next week */
  nextWeek(): string;
  /** Format for yesterday */
  lastDay(): string;
  /** Format for last week */
  lastWeek(): string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Week configuration settings
 */
interface WeekConfig {
  /** Day of week (0 = Sunday) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Complete Spanish (Mexico) locale configuration for Moment.js
 */
interface SpanishMexicoLocaleConfig extends LocaleSpecification {
  /** Full month names */
  months: readonly string[];
  
  /**
   * Returns appropriate month abbreviation based on format context
   * @param momentInstance - Moment instance containing the date
   * @param format - Format string being used
   * @returns Month abbreviation (with or without period)
   */
  monthsShort(momentInstance: Moment | undefined, format: string): string | readonly string[];
  
  /** General regex for matching month names */
  monthsRegex: RegExp;
  
  /** Regex for matching month abbreviations */
  monthsShortRegex: RegExp;
  
  /** Strict regex for matching full month names */
  monthsStrictRegex: RegExp;
  
  /** Strict regex for matching month abbreviations */
  monthsShortStrictRegex: RegExp;
  
  /** Array of regexes for parsing individual months */
  monthsParse: readonly RegExp[];
  
  /** Array of regexes for parsing full month names */
  longMonthsParse: readonly RegExp[];
  
  /** Array of regexes for parsing short month names */
  shortMonthsParse: readonly RegExp[];
  
  /** Full weekday names */
  weekdays: readonly string[];
  
  /** Short weekday names */
  weekdaysShort: readonly string[];
  
  /** Minimal weekday names */
  weekdaysMin: readonly string[];
  
  /** Whether to parse weekdays exactly */
  weekdaysParseExact: boolean;
  
  /** Date format configurations */
  longDateFormat: DateFormatConfig;
  
  /** Calendar format configurations */
  calendar: CalendarConfig;
  
  /** Relative time format strings */
  relativeTime: RelativeTimeConfig;
  
  /** Regex for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Formats a number with ordinal suffix
   * @param num - Number to format
   * @returns Formatted string with ordinal suffix
   */
  ordinal(num: number): string;
  
  /** Week configuration */
  week: WeekConfig;
  
  /** Text to display for invalid dates */
  invalidDate: string;
}

/**
 * Defines and registers the Spanish (Mexico) locale configuration with Moment.js
 * @param moment - Moment.js instance
 * @returns The configured locale
 */
export default function defineEsMxLocale(moment: typeof import('moment')): LocaleSpecification;