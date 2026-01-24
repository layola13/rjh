/**
 * Moment.js locale configuration for Spanish (Mexico)
 * @module es-mx-locale
 */

import { Moment, LocaleSpecification } from 'moment';

/**
 * Month abbreviations with periods (used in specific contexts)
 */
declare const MONTHS_SHORT_WITH_PERIODS: readonly [
  'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.',
  'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'
];

/**
 * Month abbreviations without periods
 */
declare const MONTHS_SHORT_NO_PERIODS: readonly [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
];

/**
 * Full month names in Spanish
 */
declare const MONTHS_FULL: readonly [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

/**
 * Weekday names in Spanish
 */
declare const WEEKDAYS: readonly [
  'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
];

/**
 * Abbreviated weekday names with periods
 */
declare const WEEKDAYS_SHORT: readonly [
  'dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'
];

/**
 * Minimum weekday abbreviations
 */
declare const WEEKDAYS_MIN: readonly [
  'do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sá'
];

/**
 * Regular expressions for parsing month names
 */
declare const MONTH_PARSE_PATTERNS: readonly [
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
 * Comprehensive regex for matching month names (full or abbreviated)
 */
declare const MONTH_REGEX: RegExp;

/**
 * Strict regex for matching full month names only
 */
declare const MONTHS_STRICT_REGEX: RegExp;

/**
 * Strict regex for matching abbreviated month names only
 */
declare const MONTHS_SHORT_STRICT_REGEX: RegExp;

/**
 * Context object for calendar formatting functions
 */
interface CalendarContext {
  /**
   * Gets the hour of the day
   * @returns Hour (0-23)
   */
  hours(): number;
}

/**
 * Long date format configurations
 */
interface LongDateFormat {
  /** Time format (e.g., "H:mm") */
  LT: string;
  /** Time with seconds format (e.g., "H:mm:ss") */
  LTS: string;
  /** Short date format (e.g., "DD/MM/YYYY") */
  L: string;
  /** Long date format (e.g., "D [de] MMMM [de] YYYY") */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with weekday and time */
  LLLL: string;
}

/**
 * Calendar configuration with context-aware formatting
 */
interface CalendarSpec {
  /**
   * Format for dates occurring today
   * @returns Formatted string template
   */
  sameDay(this: CalendarContext): string;
  
  /**
   * Format for dates occurring tomorrow
   * @returns Formatted string template
   */
  nextDay(this: CalendarContext): string;
  
  /**
   * Format for dates in the next week
   * @returns Formatted string template
   */
  nextWeek(this: CalendarContext): string;
  
  /**
   * Format for dates occurring yesterday
   * @returns Formatted string template
   */
  lastDay(this: CalendarContext): string;
  
  /**
   * Format for dates in the last week
   * @returns Formatted string template
   */
  lastWeek(this: CalendarContext): string;
  
  /** Fallback format for other dates */
  sameElse: string;
}

/**
 * Relative time formatting configuration
 */
interface RelativeTimeSpec {
  /** Future time prefix (e.g., "en %s") */
  future: string;
  /** Past time prefix (e.g., "hace %s") */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural) */
  dd: string;
  /** Week (singular) */
  w: string;
  /** Weeks (plural) */
  ww: string;
  /** Month (singular) */
  M: string;
  /** Months (plural) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0 = Sunday) */
  dow: number;
  /** Day of year that defines the first week */
  doy: number;
}

/**
 * Spanish (Mexico) locale configuration for Moment.js
 */
export interface EsMxLocaleConfig extends LocaleSpecification {
  /** Full month names */
  months: string[];
  
  /**
   * Returns month abbreviation based on context
   * @param date - Moment instance
   * @param format - Format string
   * @returns Month abbreviation or array of abbreviations
   */
  monthsShort(date: Moment | undefined, format: string): string | string[];
  
  /** General month matching regex */
  monthsRegex: RegExp;
  
  /** Month abbreviation matching regex */
  monthsShortRegex: RegExp;
  
  /** Strict full month name regex */
  monthsStrictRegex: RegExp;
  
  /** Strict abbreviated month name regex */
  monthsShortStrictRegex: RegExp;
  
  /** Month parsing patterns */
  monthsParse: RegExp[];
  
  /** Long month name parsing patterns */
  longMonthsParse: RegExp[];
  
  /** Short month name parsing patterns */
  shortMonthsParse: RegExp[];
  
  /** Weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimum weekday abbreviations */
  weekdaysMin: string[];
  
  /** Use exact weekday parsing */
  weekdaysParseExact: boolean;
  
  /** Long date format templates */
  longDateFormat: LongDateFormat;
  
  /** Calendar formatting rules */
  calendar: CalendarSpec;
  
  /** Relative time formatting */
  relativeTime: RelativeTimeSpec;
  
  /** Ordinal number parsing pattern */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Formats ordinal numbers
   * @param num - Number to format
   * @returns Formatted ordinal string
   */
  ordinal(num: number): string;
  
  /** Week configuration */
  week: WeekSpec;
  
  /** Invalid date message */
  invalidDate: string;
}

/**
 * Defines and registers the es-mx locale with Moment.js
 * @param moment - Moment.js instance
 */
export function defineEsMxLocale(moment: typeof Moment): void;

export default EsMxLocaleConfig;