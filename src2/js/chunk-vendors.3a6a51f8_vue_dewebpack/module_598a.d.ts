/**
 * Moment.js locale configuration for Dhivehi (Maldivian) language
 * @module moment/locale/dv
 */

/**
 * Moment.js static instance interface
 */
interface Moment {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., 'dv' for Dhivehi)
   * @param config - Locale configuration object
   */
  defineLocale(localeName: string, config: LocaleConfiguration): void;
}

/**
 * Locale-specific configuration for moment.js
 */
interface LocaleConfiguration {
  /**
   * Full month names in the target language
   */
  months: string[];

  /**
   * Abbreviated month names (can be same as full names for some locales)
   */
  monthsShort: string[];

  /**
   * Full weekday names
   */
  weekdays: string[];

  /**
   * Abbreviated weekday names (can be same as full names)
   */
  weekdaysShort: string[];

  /**
   * Minimal weekday names (typically 2-3 characters)
   */
  weekdaysMin: string[];

  /**
   * Date and time format patterns
   */
  longDateFormat: LongDateFormat;

  /**
   * Regular expression to parse AM/PM indicators
   */
  meridiemParse: RegExp;

  /**
   * Determines if a meridiem string represents PM
   * @param meridiemString - The meridiem indicator string
   * @returns True if PM, false if AM
   */
  isPM(meridiemString: string): boolean;

  /**
   * Returns the appropriate meridiem string
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase variant
   * @returns The meridiem string (AM/PM equivalent)
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;

  /**
   * Calendar-specific date formats for relative dates
   */
  calendar: CalendarSpec;

  /**
   * Relative time strings and formats
   */
  relativeTime: RelativeTimeSpec;

  /**
   * Pre-processes input strings before parsing
   * @param input - The input string to preprocess
   * @returns The preprocessed string
   */
  preparse(input: string): string;

  /**
   * Post-processes output strings after formatting
   * @param output - The output string to postprocess
   * @returns The postprocessed string
   */
  postformat(output: string): string;

  /**
   * Week-related configuration
   */
  week: WeekSpec;
}

/**
 * Long date format tokens and their patterns
 */
interface LongDateFormat {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  /** Time with seconds format (e.g., "HH:mm:ss") */
  LTS: string;
  /** Short date format (e.g., "D/M/YYYY") */
  L: string;
  /** Long date format (e.g., "D MMMM YYYY") */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with weekday and time format */
  LLLL: string;
}

/**
 * Calendar format specifications for different relative time periods
 */
interface CalendarSpec {
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
 * Relative time format strings
 * %s or %d placeholders will be replaced with the actual time value
 */
interface RelativeTimeSpec {
  /** Future time prefix/suffix pattern */
  future: string;
  /** Past time prefix/suffix pattern */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural) - %d placeholder for number */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural) - %d placeholder for number */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural) - %d placeholder for number */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural) - %d placeholder for number */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (plural) - %d placeholder for number */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) - %d placeholder for number */
  yy: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /**
   * Day of week (0 = Sunday, 1 = Monday, ..., 7 = Sunday in some locales)
   */
  dow: number;

  /**
   * Day of year for the first week of the year
   * Used to calculate week numbers
   */
  doy: number;
}

declare const moment: Moment;

export default moment;