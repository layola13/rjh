/**
 * Moment.js Japanese locale configuration
 * Defines Japanese language settings for date/time formatting
 */

/**
 * Represents a Japanese era period
 */
interface JapaneseEra {
  /** ISO date string when this era begins (inclusive) */
  since: string;
  /** ISO date string when this era ends (inclusive), optional */
  until?: string | number;
  /** Year offset for era year calculation */
  offset: number;
  /** Full Japanese name of the era */
  name: string;
  /** Single character abbreviation (often using combined characters) */
  narrow: string;
  /** Latin alphabet abbreviation */
  abbr: string;
}

/**
 * Calendar display configuration for relative dates
 */
interface CalendarSpec {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format or function for next week */
  nextWeek: string | ((this: Moment, now: Moment) => string);
  /** Format for yesterday */
  lastDay: string;
  /** Format or function for last week */
  lastWeek: string | ((this: Moment, now: Moment) => string);
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Date/time format configuration
 */
interface LongDateFormat {
  /** Time format (short) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Date format (numeric) */
  L: string;
  /** Date format (long) */
  LL: string;
  /** Date and time format */
  LLL: string;
  /** Date, weekday and time format (full) */
  LLLL: string;
  /** Date format (numeric, lowercase) */
  l: string;
  /** Date format (long, lowercase) */
  ll: string;
  /** Date and time format (lowercase) */
  lll: string;
  /** Date, weekday and time format (lowercase) */
  llll: string;
}

/**
 * Relative time display configuration
 */
interface RelativeTimeSpec {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Seconds (few) */
  s: string;
  /** Seconds (multiple) */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (multiple) */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (multiple) */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (multiple) */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (multiple) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (multiple) */
  yy: string;
}

/**
 * Moment.js instance interface (minimal required properties)
 */
interface Moment {
  /** Get the week number of the year */
  week(): number;
}

/**
 * Japanese locale configuration object
 */
interface JapaneseLocaleConfig {
  /** Array of Japanese era definitions from newest to oldest */
  eras: JapaneseEra[];
  /** Regular expression to match era year ordinals */
  eraYearOrdinalRegex: RegExp;
  /** Parse era year from matched string */
  eraYearOrdinalParse(input: string, match: RegExpMatchArray): number;
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
  /** Long date format configurations */
  longDateFormat: LongDateFormat;
  /** Regular expression to parse meridiem (AM/PM) */
  meridiemParse: RegExp;
  /** Determine if given string represents PM */
  isPM(input: string): boolean;
  /** Get meridiem string for given hour */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
  /** Calendar display specifications */
  calendar: CalendarSpec;
  /** Regular expression to parse day of month ordinal */
  dayOfMonthOrdinalParse: RegExp;
  /** Format ordinal number based on token type */
  ordinal(num: number, token: string): string;
  /** Relative time format specifications */
  relativeTime: RelativeTimeSpec;
}

/**
 * Moment.js static interface with locale definition method
 */
interface MomentStatic {
  /**
   * Define a new locale for moment.js
   * @param localeName - Locale identifier (e.g., "ja")
   * @param config - Locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeName: string, config: JapaneseLocaleConfig): unknown;
}

/**
 * Configures Japanese locale for moment.js
 * @param moment - Moment.js static instance
 * @returns Configured locale object
 */
export default function configureJapaneseLocale(moment: MomentStatic): unknown;