/**
 * Moment.js locale configuration for Bengali (Bangladesh)
 * @module bn-bd
 */

/**
 * Mapping from Western digits to Bengali digits
 */
type WesternToBengaliDigitMap = {
  readonly [K in 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9]: string;
};

/**
 * Mapping from Bengali digits to Western digits
 */
type BengaliToWesternDigitMap = {
  readonly [key: string]: string;
};

/**
 * Long date format configuration
 */
interface LongDateFormat {
  /** Time format (e.g., "A h:mm সময়") */
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
  /** Future time prefix/suffix format */
  future: string;
  /** Past time prefix/suffix format */
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
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year that defines the first week */
  doy: number;
}

/**
 * Locale configuration object for moment.js
 */
interface LocaleConfiguration {
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
  /** Long date format patterns */
  longDateFormat: LongDateFormat;
  /** Calendar format patterns */
  calendar: CalendarFormat;
  /** Relative time format patterns */
  relativeTime: RelativeTimeFormat;
  /** Pre-parse function to convert Bengali digits to Western */
  preparse: (text: string) => string;
  /** Post-format function to convert Western digits to Bengali */
  postformat: (text: string) => string;
  /** Regular expression to parse meridiem (AM/PM equivalent) */
  meridiemParse: RegExp;
  /** Function to determine hour based on meridiem */
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  /** Function to determine meridiem based on hour and minute */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Moment.js instance interface
 */
interface Moment {
  /**
   * Define a new locale configuration
   * @param localeKey - The locale identifier (e.g., "bn-bd")
   * @param config - The locale configuration object
   */
  defineLocale(localeKey: string, config: LocaleConfiguration): void;
}

/**
 * Bengali (Bangladesh) locale configuration constants
 */
declare const WESTERN_TO_BENGALI_DIGITS: WesternToBengaliDigitMap;
declare const BENGALI_TO_WESTERN_DIGITS: BengaliToWesternDigitMap;

/**
 * Initialize Bengali (Bangladesh) locale for moment.js
 * @param moment - The moment.js instance
 */
export default function initBengaliBangladeshLocale(moment: Moment): void;