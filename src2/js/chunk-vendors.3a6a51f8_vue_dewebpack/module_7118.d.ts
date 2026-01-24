/**
 * Moment.js locale configuration for Frisian (fy)
 * 
 * This module provides localization support for the Frisian language,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module MomentFrisianLocale
 */

/**
 * Moment.js locale definition object
 */
export interface LocaleSpecification {
  /** Full month names (January through December) */
  months: string | string[];
  
  /** 
   * Short month names or function to determine abbreviation based on context
   * @param momentInstance - The moment instance (null if requesting all abbreviations)
   * @param format - The format string being used
   * @returns Short month name(s)
   */
  monthsShort: string | string[] | ((momentInstance: MomentInput | null, format: string) => string | string[]);
  
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Full weekday names (Sunday through Saturday) */
  weekdays: string | string[];
  
  /** Short weekday names */
  weekdaysShort: string | string[];
  
  /** Minimal weekday names (typically 2 letters) */
  weekdaysMin: string | string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  
  /** Calendar format for relative days */
  calendar: CalendarSpec;
  
  /** Relative time format configuration */
  relativeTime: RelativeTimeSpec;
  
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Function to generate ordinal suffix for day of month
   * @param dayOfMonth - The day of the month (1-31)
   * @returns The day with appropriate ordinal suffix
   */
  ordinal: (dayOfMonth: number) => string;
  
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Long date format specification
 */
export interface LongDateFormatSpec {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  
  /** Time with seconds format */
  LTS: string;
  
  /** Short date format */
  L: string;
  
  /** Long date format */
  LL: string;
  
  /** Long date with time format */
  LLL: string;
  
  /** Full date with weekday and time format */
  LLLL: string;
}

/**
 * Calendar format specification for relative day references
 */
export interface CalendarSpec {
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
 * Relative time format specification
 */
export interface RelativeTimeSpec {
  /** Format for future dates (e.g., "in %s") */
  future: string;
  
  /** Format for past dates (e.g., "%s ago") */
  past: string;
  
  /** Format for a few seconds */
  s: string;
  
  /** Format for seconds (plural) */
  ss: string;
  
  /** Format for one minute */
  m: string;
  
  /** Format for minutes (plural) */
  mm: string;
  
  /** Format for one hour */
  h: string;
  
  /** Format for hours (plural) */
  hh: string;
  
  /** Format for one day */
  d: string;
  
  /** Format for days (plural) */
  dd: string;
  
  /** Format for one month */
  M: string;
  
  /** Format for months (plural) */
  MM: string;
  
  /** Format for one year */
  y: string;
  
  /** Format for years (plural) */
  yy: string;
}

/**
 * Week configuration
 */
export interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Moment instance input type
 */
export interface MomentInput {
  /**
   * Get the month index (0-11)
   * @returns Month index
   */
  month(): number;
}

/**
 * Moment.js library interface
 */
export interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeKey - The locale identifier (e.g., "fy" for Frisian)
   * @param config - The locale specification object
   */
  defineLocale(localeKey: string, config: LocaleSpecification): void;
}

/**
 * Configure Frisian locale for Moment.js
 * @param moment - The Moment.js library instance
 */
declare function configureFrisianLocale(moment: MomentStatic): void;

export default configureFrisianLocale;