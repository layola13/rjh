/**
 * Moment.js locale configuration for Occitan (oc-lnc)
 * Provides localization data for date/time formatting in the Occitan language
 */

declare module 'moment' {
  interface Locale {}
  
  interface MomentInput {}
  
  interface CalendarSpec {}
  
  interface RelativeTimeSpec {}

  /**
   * Defines a new locale configuration
   * @param localeName - The locale identifier (e.g., "oc-lnc")
   * @param config - The locale configuration object
   */
  function defineLocale(localeName: string, config: LocaleSpecification): Locale;
}

/**
 * Configuration for month names with context-dependent forms
 */
interface MonthsConfig {
  /** Standalone month names (used without context) */
  standalone: string[];
  /** Month names in formatted context (e.g., "de genièr" = "of January") */
  format: string[];
  /** Regular expression to detect when format variant should be used */
  isFormat: RegExp;
}

/**
 * Configuration for long date/time formats
 */
interface LongDateFormatConfig {
  /** Time format (e.g., "14:30") */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Short long date format */
  ll: string;
  /** Long date and time format */
  LLL: string;
  /** Short long date and time format */
  lll: string;
  /** Full date and time format with weekday */
  LLLL: string;
  /** Short full date and time format with weekday */
  llll: string;
}

/**
 * Configuration for calendar-relative date displays
 */
interface CalendarConfig {
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
 * Configuration for relative time displays (e.g., "2 hours ago")
 */
interface RelativeTimeConfig {
  /** Format for future times (e.g., "in 5 minutes") */
  future: string;
  /** Format for past times (e.g., "5 minutes ago") */
  past: string;
  /** Less than a minute */
  s: string;
  /** Seconds */
  ss: string;
  /** A minute */
  m: string;
  /** Minutes */
  mm: string;
  /** An hour */
  h: string;
  /** Hours */
  hh: string;
  /** A day */
  d: string;
  /** Days */
  dd: string;
  /** A month */
  M: string;
  /** Months */
  MM: string;
  /** A year */
  y: string;
  /** Years */
  yy: string;
}

/**
 * Configuration for week numbering
 */
interface WeekConfig {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year for week 1 */
  doy: number;
}

/**
 * Complete locale specification for Moment.js
 */
interface LocaleSpecification {
  /** Month names configuration */
  months: MonthsConfig;
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format configurations */
  longDateFormat: LongDateFormatConfig;
  /** Calendar-relative date configurations */
  calendar: CalendarConfig;
  /** Relative time configurations */
  relativeTime: RelativeTimeConfig;
  /** Regular expression for parsing ordinal numbers */
  dayOfMonthOrdinalParse: RegExp;
  /**
   * Returns the ordinal suffix for a given number
   * @param num - The number to get ordinal suffix for
   * @param token - The format token (e.g., 'w' for week, 'W' for ISO week)
   * @returns The number with its ordinal suffix
   */
  ordinal(num: number, token: string): string;
  /** Week numbering configuration */
  week: WeekConfig;
}

/**
 * Occitan (oc-lnc) locale configuration
 * Configures Moment.js to format dates and times in Occitan
 */
export declare const ocLncLocale: LocaleSpecification;