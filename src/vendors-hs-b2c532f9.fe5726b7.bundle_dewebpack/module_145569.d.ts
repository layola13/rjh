/**
 * Moment.js Croatian (hr) locale configuration
 * Provides localization for dates, times, and relative time formatting in Croatian language
 */

/**
 * Type definition for moment.js Locale object
 */
interface MomentLocale {
  /** Month names in different formats */
  months: {
    /** Month names used in date formatting (genitive case) */
    format: string[];
    /** Standalone month names (nominative case) */
    standalone: string[];
  };
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
  /** Long date format templates */
  longDateFormat: LongDateFormat;
  /** Calendar-specific relative time strings */
  calendar: CalendarSpec;
  /** Relative time format strings and functions */
  relativeTime: RelativeTimeSpec;
  /** Regular expression for parsing ordinal day numbers */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: string | ((num: number) => string);
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Long date format token definitions
 */
interface LongDateFormat {
  /** Time format (e.g., "H:mm") */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date format with time */
  LLL: string;
  /** Full date and time format */
  LLLL: string;
}

/**
 * Calendar specification for relative day formatting
 */
interface CalendarSpec {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format function for next week */
  nextWeek: (this: MomentInstance) => string;
  /** Format for yesterday */
  lastDay: string;
  /** Format function for last week */
  lastWeek: (this: MomentInstance) => string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time specification
 */
interface RelativeTimeSpec {
  /** Future time prefix format */
  future: string;
  /** Past time prefix format */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural) - can be string or function */
  ss: string | RelativeTimeFunction;
  /** Minute (singular) */
  m: string | RelativeTimeFunction;
  /** Minutes (plural) */
  mm: string | RelativeTimeFunction;
  /** Hour (singular) */
  h: string | RelativeTimeFunction;
  /** Hours (plural) */
  hh: string | RelativeTimeFunction;
  /** Day (singular) */
  d: string;
  /** Days (plural) */
  dd: string | RelativeTimeFunction;
  /** Month (singular) */
  M: string;
  /** Months (plural) */
  MM: string | RelativeTimeFunction;
  /** Year (singular) */
  y: string;
  /** Years (plural) */
  yy: string | RelativeTimeFunction;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year for the first week */
  doy: number;
}

/**
 * Moment instance interface with day() method
 */
interface MomentInstance {
  /** Returns the day of the week (0-6) */
  day(): number;
}

/**
 * Moment.js main interface
 */
interface Moment {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "hr" for Croatian)
   * @param config - The locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeName: string, config: MomentLocale): unknown;
}

/**
 * Relative time formatting function type
 * @param count - The numeric value to format
 * @param withoutSuffix - Whether to include suffix/prefix
 * @param key - The time unit key (e.g., "ss", "mm", "hh")
 * @returns Formatted relative time string
 */
type RelativeTimeFunction = (
  count: number,
  withoutSuffix: boolean,
  key: string
) => string;

/**
 * Translates numeric values to Croatian grammatical forms based on count
 * Croatian uses different word forms depending on whether the count is 1, 2-4, or 5+
 * 
 * @param count - The numeric value determining the grammatical form
 * @param withoutSuffix - If true, returns nominative case; if false, returns genitive case
 * @param unitKey - The time unit key (ss, m, mm, h, hh, dd, MM, yy)
 * @returns The properly inflected Croatian time unit string
 */
declare function translate(
  count: number,
  withoutSuffix: boolean,
  unitKey: string
): string;

/**
 * Croatian (hr) locale configuration module
 * Configures moment.js to support Croatian language formatting
 * 
 * @param moment - The moment.js instance to configure
 * @returns The configured locale object
 */
declare function configureCroatianLocale(moment: Moment): unknown;

export { 
  configureCroatianLocale,
  translate,
  type MomentLocale,
  type LongDateFormat,
  type CalendarSpec,
  type RelativeTimeSpec,
  type WeekSpec,
  type MomentInstance,
  type Moment,
  type RelativeTimeFunction
};