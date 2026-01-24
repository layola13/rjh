/**
 * Moment.js locale configuration for Gujarati (gu)
 * Provides localization for dates, times, and relative time formatting in Gujarati language
 */

/**
 * Mapping of Western digits to Gujarati numerals
 */
type WesternToGujaratiDigitMap = {
  [key: string]: string;
};

/**
 * Mapping of Gujarati numerals to Western digits
 */
type GujaratiToWesternDigitMap = {
  [key: string]: string;
};

/**
 * Long date format configuration
 */
interface LongDateFormat {
  /** Time format with meridiem */
  LT: string;
  /** Time format with seconds and meridiem */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date and time format */
  LLL: string;
  /** Full date and time format with day of week */
  LLLL: string;
}

/**
 * Calendar format configuration for relative dates
 */
interface CalendarFormat {
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
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time format configuration
 */
interface RelativeTimeFormat {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural) */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (plural) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Week configuration
 */
interface WeekConfig {
  /** Day of week (0 = Sunday) */
  dow: number;
  /** Day of year that starts the first week */
  doy: number;
}

/**
 * Complete locale configuration for Gujarati
 */
interface GujaratiLocaleConfig {
  /** Full month names */
  months: string[];
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
  /** Long date format patterns */
  longDateFormat: LongDateFormat;
  /** Calendar format patterns */
  calendar: CalendarFormat;
  /** Relative time format patterns */
  relativeTime: RelativeTimeFormat;
  /** Pre-parse function to convert Gujarati numerals to Western digits */
  preparse: (text: string) => string;
  /** Post-format function to convert Western digits to Gujarati numerals */
  postformat: (text: string) => string;
  /** Regex pattern to parse meridiem (AM/PM equivalent) */
  meridiemParse: RegExp;
  /** Function to get hour from 12-hour format with meridiem */
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  /** Function to get meridiem string based on hour and minute */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Moment.js instance interface (minimal definition)
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier
   * @param config - The locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeName: string, config: GujaratiLocaleConfig): unknown;
}

/**
 * Defines the Gujarati locale configuration for moment.js
 * @param moment - The moment.js instance
 * @returns The configured Gujarati locale
 */
declare function defineGujaratiLocale(moment: MomentStatic): unknown;

export default defineGujaratiLocale;