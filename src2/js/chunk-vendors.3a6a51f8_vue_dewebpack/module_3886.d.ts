/**
 * Moment.js locale configuration for English (Canada)
 * @module en-ca-locale
 */

/**
 * Locale configuration object for Canadian English
 */
export interface LocaleConfiguration {
  /**
   * Full month names
   */
  months: string[];

  /**
   * Abbreviated month names
   */
  monthsShort: string[];

  /**
   * Full weekday names
   */
  weekdays: string[];

  /**
   * Abbreviated weekday names
   */
  weekdaysShort: string[];

  /**
   * Minimal weekday names
   */
  weekdaysMin: string[];

  /**
   * Long date format tokens and their corresponding formats
   */
  longDateFormat: LongDateFormat;

  /**
   * Calendar date display configuration
   */
  calendar: CalendarSpec;

  /**
   * Relative time display configuration
   */
  relativeTime: RelativeTimeSpec;

  /**
   * Regular expression for parsing ordinal day of month
   */
  dayOfMonthOrdinalParse: RegExp;

  /**
   * Function to format ordinal numbers (1st, 2nd, 3rd, etc.)
   * @param dayOfMonth - The day of month number
   * @returns The day with ordinal suffix (e.g., "1st", "2nd")
   */
  ordinal: (dayOfMonth: number) => string;
}

/**
 * Long date format configuration
 */
export interface LongDateFormat {
  /** Time format (e.g., "h:mm A") */
  LT: string;
  /** Time with seconds format (e.g., "h:mm:ss A") */
  LTS: string;
  /** Short date format (e.g., "YYYY-MM-DD") */
  L: string;
  /** Long date format (e.g., "MMMM D, YYYY") */
  LL: string;
  /** Long date with time format (e.g., "MMMM D, YYYY h:mm A") */
  LLL: string;
  /** Full date with time format (e.g., "dddd, MMMM D, YYYY h:mm A") */
  LLLL: string;
}

/**
 * Calendar date display specification
 */
export interface CalendarSpec {
  /** Format for today's date */
  sameDay: string;
  /** Format for tomorrow's date */
  nextDay: string;
  /** Format for next week's date */
  nextWeek: string;
  /** Format for yesterday's date */
  lastDay: string;
  /** Format for last week's date */
  lastWeek: string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time display specification
 */
export interface RelativeTimeSpec {
  /** Format for future time */
  future: string;
  /** Format for past time */
  past: string;
  /** Text for a few seconds */
  s: string;
  /** Format for seconds (%d = number) */
  ss: string;
  /** Text for a minute */
  m: string;
  /** Format for minutes (%d = number) */
  mm: string;
  /** Text for an hour */
  h: string;
  /** Format for hours (%d = number) */
  hh: string;
  /** Text for a day */
  d: string;
  /** Format for days (%d = number) */
  dd: string;
  /** Text for a month */
  M: string;
  /** Format for months (%d = number) */
  MM: string;
  /** Text for a year */
  y: string;
  /** Format for years (%d = number) */
  yy: string;
}

/**
 * Moment.js instance with locale methods
 */
export interface Moment {
  /**
   * Define a new locale configuration
   * @param localeKey - The locale identifier (e.g., "en-ca")
   * @param config - The locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeKey: string, config: LocaleConfiguration): string;
}

/**
 * Initializes the Canadian English locale for moment.js
 * @param moment - The moment.js instance
 */
export declare function initializeEnCaLocale(moment: Moment): void;

/**
 * Gets the ordinal suffix for a given day of month
 * @param dayOfMonth - The day of month number (1-31)
 * @returns The ordinal suffix ("st", "nd", "rd", or "th")
 */
export declare function getOrdinalSuffix(dayOfMonth: number): string;

/**
 * Default Canadian English locale configuration
 */
export declare const enCaLocaleConfig: LocaleConfiguration;