/**
 * Moment.js locale configuration for Armenian (Armenia)
 * @module hy-am-locale
 */

/**
 * Month names in different formats
 */
interface MonthsConfig {
  /** Month names used in date formatting (genitive case) */
  format: string[];
  /** Standalone month names (nominative case) */
  standalone: string[];
}

/**
 * Long date format tokens
 */
interface LongDateFormat {
  /** Time format (hours:minutes) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date format with time */
  LLL: string;
  /** Full date format with weekday and time */
  LLLL: string;
}

/**
 * Calendar format configuration
 */
interface CalendarConfig {
  /** Format for same day */
  sameDay: string;
  /** Format for next day */
  nextDay: string;
  /** Format for last day */
  lastDay: string;
  /** Format function for next week */
  nextWeek: () => string;
  /** Format function for last week */
  lastWeek: () => string;
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 */
interface RelativeTimeConfig {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Seconds (few) */
  s: string;
  /** Seconds */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years */
  yy: string;
}

/**
 * Week configuration
 */
interface WeekConfig {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year that starts the first week */
  doy: number;
}

/**
 * Complete locale configuration for Armenian
 */
interface ArmenianLocaleConfig {
  /** Month names configuration */
  months: MonthsConfig;
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names */
  weekdays: string[];
  /** Short weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format patterns */
  longDateFormat: LongDateFormat;
  /** Calendar display configuration */
  calendar: CalendarConfig;
  /** Relative time formatting */
  relativeTime: RelativeTimeConfig;
  /** Regex pattern for parsing meridiem (AM/PM) */
  meridiemParse: RegExp;
  /** Function to determine if time is PM */
  isPM: (input: string) => boolean;
  /** Function to get meridiem string for given hour */
  meridiem: (hour: number) => string;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: (number: number, token: string) => string | number;
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Moment.js instance interface
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeId - Locale identifier (e.g., "hy-am")
   * @param config - Locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeId: string, config: ArmenianLocaleConfig): unknown;
}

/**
 * Initialize and register Armenian (Armenia) locale for moment.js
 * @param momentInstance - Moment.js instance to configure
 * @returns The configured locale
 */
declare function initializeArmenianLocale(momentInstance: MomentStatic): unknown;

export { ArmenianLocaleConfig, CalendarConfig, LongDateFormat, MomentStatic, MonthsConfig, RelativeTimeConfig, WeekConfig, initializeArmenianLocale };