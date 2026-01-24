/**
 * Moment.js Arabic (Kuwait) locale configuration
 * Configures date/time formatting, relative time expressions, and calendar display for the ar-kw locale
 */

/**
 * Locale-specific configuration for Arabic (Kuwait)
 */
interface ArKwLocaleConfig {
  /**
   * Full month names in Arabic (Kuwait dialect)
   * Format: January through December
   */
  months: string[];

  /**
   * Abbreviated month names in Arabic (Kuwait dialect)
   * In this locale, short forms are identical to full month names
   */
  monthsShort: string[];

  /**
   * Full weekday names in Arabic
   * Order: Sunday through Saturday
   */
  weekdays: string[];

  /**
   * Abbreviated weekday names in Arabic
   */
  weekdaysShort: string[];

  /**
   * Minimal weekday names (single characters) in Arabic
   */
  weekdaysMin: string[];

  /**
   * When true, enables strict parsing of weekday names
   */
  weekdaysParseExact: boolean;

  /**
   * Date and time format tokens
   */
  longDateFormat: LongDateFormat;

  /**
   * Calendar display strings for relative dates
   */
  calendar: CalendarSpec;

  /**
   * Relative time expressions (e.g., "in 5 minutes", "2 hours ago")
   */
  relativeTime: RelativeTimeSpec;

  /**
   * Week configuration settings
   */
  week: WeekSpec;
}

/**
 * Long date format tokens for various display formats
 */
interface LongDateFormat {
  /** Time format (24-hour) - e.g., "14:30" */
  LT: string;

  /** Time format with seconds - e.g., "14:30:45" */
  LTS: string;

  /** Short date format - e.g., "25/12/2023" */
  L: string;

  /** Long date format without time - e.g., "25 December 2023" */
  LL: string;

  /** Long date format with time - e.g., "25 December 2023 14:30" */
  LLL: string;

  /** Full date format with weekday and time - e.g., "Monday 25 December 2023 14:30" */
  LLLL: string;
}

/**
 * Calendar display specifications for relative dates
 * Each string can contain format tokens (e.g., LT for time)
 */
interface CalendarSpec {
  /** Format for today - e.g., "Today at 2:30 PM" */
  sameDay: string;

  /** Format for tomorrow - e.g., "Tomorrow at 2:30 PM" */
  nextDay: string;

  /** Format for next week - e.g., "Monday at 2:30 PM" */
  nextWeek: string;

  /** Format for yesterday - e.g., "Yesterday at 2:30 PM" */
  lastDay: string;

  /** Format for last week - e.g., "Last Monday at 2:30 PM" */
  lastWeek: string;

  /** Fallback format for all other dates */
  sameElse: string;
}

/**
 * Relative time expressions
 * %s and %d are placeholders for duration values
 */
interface RelativeTimeSpec {
  /** Future time prefix - e.g., "in" for "in 5 minutes" */
  future: string;

  /** Past time prefix - e.g., "ago" for "5 minutes ago" */
  past: string;

  /** Singular: a few seconds */
  s: string;

  /** Plural: X seconds (%d is replaced with number) */
  ss: string;

  /** Singular: one minute */
  m: string;

  /** Plural: X minutes */
  mm: string;

  /** Singular: one hour */
  h: string;

  /** Plural: X hours */
  hh: string;

  /** Singular: one day */
  d: string;

  /** Plural: X days */
  dd: string;

  /** Singular: one month */
  M: string;

  /** Plural: X months */
  MM: string;

  /** Singular: one year */
  y: string;

  /** Plural: X years */
  yy: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /**
   * Day of week (0 = Sunday, 1 = Monday, etc.)
   * Defines the first day of the week
   */
  dow: number;

  /**
   * Day of year
   * Defines which day of year is in the first week
   */
  doy: number;
}

/**
 * Moment.js instance with locale definition capability
 */
interface MomentStatic {
  /**
   * Defines a new locale configuration
   * @param localeName - Locale identifier (e.g., "ar-kw")
   * @param config - Locale-specific configuration object
   */
  defineLocale(localeName: string, config: ArKwLocaleConfig): void;
}

/**
 * Initializes the Arabic (Kuwait) locale configuration for Moment.js
 * @param moment - The Moment.js instance to configure
 */
declare function initializeArKwLocale(moment: MomentStatic): void;

export { ArKwLocaleConfig, LongDateFormat, CalendarSpec, RelativeTimeSpec, WeekSpec, MomentStatic, initializeArKwLocale };