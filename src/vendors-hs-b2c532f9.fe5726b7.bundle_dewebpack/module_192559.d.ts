/**
 * Albanian (sq) locale configuration for moment.js
 * @module moment/locale/sq
 */

/**
 * Meridiem indicator (AM/PM equivalent in Albanian)
 */
type MeridiemIndicator = 'PD' | 'MD';

/**
 * Configuration object for moment.js locale
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
  
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Regular expression to parse meridiem */
  meridiemParse: RegExp;
  
  /**
   * Determines if the given meridiem string represents PM
   * @param meridiemString - The meridiem string to check
   * @returns True if PM (MD), false if AM (PD)
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns the appropriate meridiem indicator for the given time
   * @param hours - Hour of the day (0-23)
   * @param minutes - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase format
   * @returns 'PD' for AM (before 12), 'MD' for PM (12 and after)
   */
  meridiem(hours: number, minutes: number, isLowercase: boolean): MeridiemIndicator;
  
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  
  /** Calendar format strings for relative dates */
  calendar: CalendarSpec;
  
  /** Relative time format strings */
  relativeTime: RelativeTimeSpec;
  
  /** Regular expression to parse ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Formats a number as an ordinal
   * @param num - The number to format
   * @returns The formatted ordinal string
   */
  ordinal(num: number): string;
  
  /** Week configuration */
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
  
  /** Long date with time format */
  LLL: string;
  
  /** Full date with weekday and time format */
  LLLL: string;
}

/**
 * Calendar format specification for relative dates
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
 * Relative time format specification
 */
interface RelativeTimeSpec {
  /** Future time prefix format */
  future: string;
  
  /** Past time format */
  past: string;
  
  /** Seconds (singular/few) */
  s: string;
  
  /** Seconds (plural) with placeholder */
  ss: string;
  
  /** Minute (singular) */
  m: string;
  
  /** Minutes (plural) with placeholder */
  mm: string;
  
  /** Hour (singular) */
  h: string;
  
  /** Hours (plural) with placeholder */
  hh: string;
  
  /** Day (singular) */
  d: string;
  
  /** Days (plural) with placeholder */
  dd: string;
  
  /** Month (singular) */
  M: string;
  
  /** Months (plural) with placeholder */
  MM: string;
  
  /** Year (singular) */
  y: string;
  
  /** Years (plural) with placeholder */
  yy: string;
}

/**
 * Week specification
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Moment.js instance with locale methods
 */
interface Moment {
  /**
   * Defines a new locale or updates an existing one
   * @param localeName - The locale identifier (e.g., "sq" for Albanian)
   * @param config - The locale configuration object
   * @returns The locale instance
   */
  defineLocale(localeName: string, config: LocaleSpecification): unknown;
}

/**
 * Defines the Albanian (sq) locale configuration for moment.js
 * @param momentInstance - The moment.js instance
 * @returns The configured locale
 */
export default function defineAlbanianLocale(momentInstance: Moment): unknown;