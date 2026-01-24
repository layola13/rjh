/**
 * Moment.js locale configuration for Northern Sami (se)
 * Northern Sami is a Finno-Ugric language spoken in Norway, Sweden, and Finland
 */

/**
 * Locale configuration object for Northern Sami
 */
export interface NorthernSamiLocaleConfig {
  /** Full month names in Northern Sami */
  months: string[];
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Full weekday names in Northern Sami */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names (single character) */
  weekdaysMin: string[];
  
  /** Date and time format configurations */
  longDateFormat: LongDateFormat;
  
  /** Calendar-relative date display rules */
  calendar: CalendarSpec;
  
  /** Relative time display configurations */
  relativeTime: RelativeTimeSpec;
  
  /** Regex pattern for parsing day-of-month ordinals */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers */
  ordinal: string | ((num: number) => string);
  
  /** Week calculation settings */
  week: WeekSpec;
}

/**
 * Date and time formatting tokens
 */
export interface LongDateFormat {
  /** Time format (HH:mm) */
  LT: string;
  
  /** Time with seconds format (HH:mm:ss) */
  LTS: string;
  
  /** Short date format (DD.MM.YYYY) */
  L: string;
  
  /** Long date format with month name */
  LL: string;
  
  /** Long date format with time */
  LLL: string;
  
  /** Full date and time format with weekday */
  LLLL: string;
}

/**
 * Calendar display specifications for relative dates
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
  
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time formatting rules
 */
export interface RelativeTimeSpec {
  /** Future time prefix/suffix pattern */
  future: string;
  
  /** Past time prefix/suffix pattern */
  past: string;
  
  /** Few seconds */
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
 * Week calculation configuration
 */
export interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  
  /** Day of year used to calculate the first week */
  doy: number;
}

/**
 * Moment.js instance with locale support
 */
export interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "se" for Northern Sami)
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: NorthernSamiLocaleConfig): void;
}

/**
 * Registers the Northern Sami locale with Moment.js
 * @param moment - The Moment.js instance
 */
export declare function registerNorthernSamiLocale(moment: MomentStatic): void;