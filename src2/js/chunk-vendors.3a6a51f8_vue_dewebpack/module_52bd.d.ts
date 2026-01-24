/**
 * Moment.js locale configuration for Swazi (Siswati) language
 * Locale code: ss
 */

/**
 * Locale configuration object for Swazi (Siswati)
 */
export interface SwatiLocaleConfig {
  /** Full month names in Siswati */
  months: string[];
  
  /** Abbreviated month names in Siswati */
  monthsShort: string[];
  
  /** Full weekday names in Siswati */
  weekdays: string[];
  
  /** Abbreviated weekday names in Siswati */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Siswati */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens and their patterns */
  longDateFormat: LongDateFormat;
  
  /** Calendar-specific relative time strings */
  calendar: CalendarSpec;
  
  /** Relative time format strings */
  relativeTime: RelativeTimeSpec;
  
  /** Regular expression to parse meridiem (time of day) */
  meridiemParse: RegExp;
  
  /** Function to determine meridiem string based on hour */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  
  /** Function to convert 12-hour format to 24-hour format based on meridiem */
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  
  /** Regular expression to parse ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Format string for ordinal numbers */
  ordinal: string;
  
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Long date format configuration
 */
export interface LongDateFormat {
  /** Time format (e.g., "h:mm A") */
  LT: string;
  
  /** Time with seconds format (e.g., "h:mm:ss A") */
  LTS: string;
  
  /** Short date format (e.g., "DD/MM/YYYY") */
  L: string;
  
  /** Long date format (e.g., "D MMMM YYYY") */
  LL: string;
  
  /** Long date with time format (e.g., "D MMMM YYYY h:mm A") */
  LLL: string;
  
  /** Full date with time and weekday (e.g., "dddd, D MMMM YYYY h:mm A") */
  LLLL: string;
}

/**
 * Calendar specification for relative dates
 */
export interface CalendarSpec {
  /** Format for dates on the same day */
  sameDay: string;
  
  /** Format for dates on the next day */
  nextDay: string;
  
  /** Format for dates in the next week */
  nextWeek: string;
  
  /** Format for dates on the previous day */
  lastDay: string;
  
  /** Format for dates in the previous week */
  lastWeek: string;
  
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time specification
 */
export interface RelativeTimeSpec {
  /** Format for future dates (e.g., "in %s") */
  future: string;
  
  /** Format for past dates (e.g., "%s ago") */
  past: string;
  
  /** Format for a few seconds */
  s: string;
  
  /** Format for seconds */
  ss: string;
  
  /** Format for a minute */
  m: string;
  
  /** Format for minutes */
  mm: string;
  
  /** Format for an hour */
  h: string;
  
  /** Format for hours */
  hh: string;
  
  /** Format for a day */
  d: string;
  
  /** Format for days */
  dd: string;
  
  /** Format for a month */
  M: string;
  
  /** Format for months */
  MM: string;
  
  /** Format for a year */
  y: string;
  
  /** Format for years */
  yy: string;
}

/**
 * Week configuration specification
 */
export interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  
  /** Day of year used to calculate first week */
  doy: number;
}

/**
 * Defines the Swazi (Siswati) locale for moment.js
 * @param moment - The moment.js instance
 */
export function defineSwatiLocale(moment: MomentStatic): void;

/**
 * Moment.js static interface
 */
export interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeCode - The locale code (e.g., "ss")
   * @param config - The locale configuration object
   */
  defineLocale(localeCode: string, config: SwatiLocaleConfig): void;
}