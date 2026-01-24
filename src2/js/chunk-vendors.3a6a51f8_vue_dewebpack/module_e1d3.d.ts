/**
 * Moment.js locale configuration for English (Ireland)
 * @module en-ie-locale
 */

/**
 * Calendar specification for relative date formatting
 */
interface CalendarSpec {
  /** Format for dates that fall on the same day */
  sameDay: string;
  /** Format for dates that fall on the next day */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates that fell on the previous day */
  lastDay: string;
  /** Format for dates in the previous week */
  lastWeek: string;
  /** Default format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration for duration formatting
 */
interface RelativeTimeSpec {
  /** Format for future dates */
  future: string;
  /** Format for past dates */
  past: string;
  /** Format for seconds */
  s: string;
  /** Format for multiple seconds (%d is placeholder) */
  ss: string;
  /** Format for a minute */
  m: string;
  /** Format for multiple minutes */
  mm: string;
  /** Format for an hour */
  h: string;
  /** Format for multiple hours */
  hh: string;
  /** Format for a day */
  d: string;
  /** Format for multiple days */
  dd: string;
  /** Format for a month */
  M: string;
  /** Format for multiple months */
  MM: string;
  /** Format for a year */
  y: string;
  /** Format for multiple years */
  yy: string;
}

/**
 * Long date format tokens
 */
interface LongDateFormat {
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
  /** Full date with time format */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Locale configuration object
 */
interface LocaleSpecification {
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
  longDateFormat: LongDateFormat;
  /** Calendar relative date formats */
  calendar: CalendarSpec;
  /** Relative time formats */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: (dayOfMonth: number) => string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Moment.js instance interface
 */
interface Moment {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "en-ie")
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: LocaleSpecification): void;
}

/**
 * Initialize the English (Ireland) locale for Moment.js
 * @param moment - The Moment.js instance
 */
declare function initializeEnglishIrelandLocale(moment: Moment): void;

export {
  CalendarSpec,
  RelativeTimeSpec,
  LongDateFormat,
  WeekSpec,
  LocaleSpecification,
  Moment,
  initializeEnglishIrelandLocale
};