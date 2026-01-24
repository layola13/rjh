/**
 * Moment.js locale configuration for English (India)
 * @module en-in-locale
 */

/**
 * Moment.js instance with locale configuration methods
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "en-in")
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: LocaleConfiguration): void;
}

/**
 * Calendar display configuration for relative dates
 */
interface CalendarSpec {
  /** Format for dates occurring today */
  sameDay: string;
  /** Format for dates occurring tomorrow */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates that occurred yesterday */
  lastDay: string;
  /** Format for dates in the last week */
  lastWeek: string;
  /** Default format for all other dates */
  sameElse: string;
}

/**
 * Relative time formatting configuration
 */
interface RelativeTimeSpec {
  /** Format for future dates (e.g., "in 5 minutes") */
  future: string;
  /** Format for past dates (e.g., "5 minutes ago") */
  past: string;
  /** Label for a few seconds */
  s: string;
  /** Format for multiple seconds */
  ss: string;
  /** Label for one minute */
  m: string;
  /** Format for multiple minutes */
  mm: string;
  /** Label for one hour */
  h: string;
  /** Format for multiple hours */
  hh: string;
  /** Label for one day */
  d: string;
  /** Format for multiple days */
  dd: string;
  /** Label for one month */
  M: string;
  /** Format for multiple months */
  MM: string;
  /** Label for one year */
  y: string;
  /** Format for multiple years */
  yy: string;
}

/**
 * Long date format tokens and their corresponding formats
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "3:25 PM") */
  LT: string;
  /** Time with seconds format (e.g., "3:25:50 PM") */
  LTS: string;
  /** Short date format (e.g., "25/12/2023") */
  L: string;
  /** Long date format (e.g., "25 December 2023") */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with day name and time format */
  LLLL: string;
}

/**
 * Week configuration settings
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year used to determine first week of year */
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
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time formatting */
  relativeTime: RelativeTimeSpec;
  /** Regular expression for parsing ordinal numbers */
  dayOfMonthOrdinalParse: RegExp;
  /**
   * Function to format a number with its ordinal suffix
   * @param dayOfMonth - The day of the month (1-31)
   * @returns The day with ordinal suffix (e.g., "1st", "2nd", "3rd", "4th")
   */
  ordinal: (dayOfMonth: number) => string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Initialize the English (India) locale configuration for Moment.js
 * @param moment - The Moment.js instance
 */
declare function initializeEnInLocale(moment: MomentStatic): void;

export type {
  MomentStatic,
  LocaleConfiguration,
  CalendarSpec,
  RelativeTimeSpec,
  LongDateFormatSpec,
  WeekSpec
};

export { initializeEnInLocale };