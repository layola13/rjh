/**
 * Moment.js locale configuration for English (Singapore)
 * Configures date/time formatting and localization for Singapore English
 */

/**
 * Moment.js instance interface
 */
interface Moment {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "en-sg")
   * @param config - Locale configuration options
   * @returns The configured Moment instance
   */
  defineLocale(localeName: string, config: LocaleSpecification): Moment;
}

/**
 * Locale specification configuration object
 */
interface LocaleSpecification {
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
   * Minimal weekday names (2 characters)
   */
  weekdaysMin: string[];

  /**
   * Long date format tokens
   */
  longDateFormat: LongDateFormatSpec;

  /**
   * Calendar time formats for relative dates
   */
  calendar: CalendarSpec;

  /**
   * Relative time format strings
   */
  relativeTime: RelativeTimeSpec;

  /**
   * Regular expression for parsing ordinal numbers (1st, 2nd, 3rd, etc.)
   */
  dayOfMonthOrdinalParse: RegExp;

  /**
   * Function to format ordinal numbers
   * @param dayOfMonth - The day of the month (1-31)
   * @returns The day with ordinal suffix (e.g., "1st", "2nd", "3rd")
   */
  ordinal(dayOfMonth: number): string;

  /**
   * Week configuration
   */
  week: WeekSpec;
}

/**
 * Long date format specification
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  /** Time with seconds format (e.g., "HH:mm:ss") */
  LTS: string;
  /** Short date format (e.g., "DD/MM/YYYY") */
  L: string;
  /** Long date format (e.g., "D MMMM YYYY") */
  LL: string;
  /** Long date with time format (e.g., "D MMMM YYYY HH:mm") */
  LLL: string;
  /** Full date with weekday and time (e.g., "dddd, D MMMM YYYY HH:mm") */
  LLLL: string;
}

/**
 * Calendar time specification for relative dates
 */
interface CalendarSpec {
  /** Format for today (e.g., "[Today at] LT") */
  sameDay: string;
  /** Format for tomorrow (e.g., "[Tomorrow at] LT") */
  nextDay: string;
  /** Format for next week (e.g., "dddd [at] LT") */
  nextWeek: string;
  /** Format for yesterday (e.g., "[Yesterday at] LT") */
  lastDay: string;
  /** Format for last week (e.g., "[Last] dddd [at] LT") */
  lastWeek: string;
  /** Format for all other dates (e.g., "L") */
  sameElse: string;
}

/**
 * Relative time format specification
 */
interface RelativeTimeSpec {
  /** Future time format template (e.g., "in %s") */
  future: string;
  /** Past time format template (e.g., "%s ago") */
  past: string;
  /** Singular second (e.g., "a few seconds") */
  s: string;
  /** Plural seconds with count (e.g., "%d seconds") */
  ss: string;
  /** Singular minute (e.g., "a minute") */
  m: string;
  /** Plural minutes with count (e.g., "%d minutes") */
  mm: string;
  /** Singular hour (e.g., "an hour") */
  h: string;
  /** Plural hours with count (e.g., "%d hours") */
  hh: string;
  /** Singular day (e.g., "a day") */
  d: string;
  /** Plural days with count (e.g., "%d days") */
  dd: string;
  /** Singular month (e.g., "a month") */
  M: string;
  /** Plural months with count (e.g., "%d months") */
  MM: string;
  /** Singular year (e.g., "a year") */
  y: string;
  /** Plural years with count (e.g., "%d years") */
  yy: string;
}

/**
 * Week configuration specification
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Configure English (Singapore) locale for Moment.js
 * @param moment - The Moment.js instance
 */
export default function configureEnglishSingaporeLocale(moment: Moment): void;