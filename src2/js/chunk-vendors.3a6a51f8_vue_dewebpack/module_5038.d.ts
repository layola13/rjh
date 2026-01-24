/**
 * Moment.js locale configuration for Indonesian (id)
 * 
 * This module configures Indonesian locale settings for moment.js,
 * including month names, weekday names, date formats, and relative time expressions.
 */

/**
 * Meridiem periods in Indonesian
 * - pagi: morning (before 11 AM)
 * - siang: midday/afternoon (11 AM - 3 PM)
 * - sore: late afternoon/evening (3 PM - 7 PM)
 * - malam: night (after 7 PM)
 */
type MeridiemPeriod = 'pagi' | 'siang' | 'sore' | 'malam';

/**
 * Locale configuration interface for moment.js
 */
interface LocaleConfig {
  /** Full month names in Indonesian */
  months: string[];
  
  /** Abbreviated month names in Indonesian */
  monthsShort: string[];
  
  /** Full weekday names in Indonesian */
  weekdays: string[];
  
  /** Abbreviated weekday names in Indonesian */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Indonesian */
  weekdaysMin: string[];
  
  /** Long date format tokens and their corresponding formats */
  longDateFormat: LongDateFormat;
  
  /** Regular expression to parse meridiem periods */
  meridiemParse: RegExp;
  
  /**
   * Converts meridiem period and hour to 24-hour format
   * @param hour - Hour in 12-hour format (0-12)
   * @param meridiem - Meridiem period (pagi/siang/sore/malam)
   * @returns Hour in 24-hour format, or undefined for invalid input
   */
  meridiemHour: (hour: number, meridiem: MeridiemPeriod) => number | undefined;
  
  /**
   * Determines the meridiem period based on hour and minute
   * @param hour - Hour in 24-hour format (0-23)
   * @param minute - Minute (0-59)
   * @param isLowercase - Whether to return lowercase string
   * @returns Meridiem period in Indonesian
   */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => MeridiemPeriod;
  
  /** Calendar format strings for relative dates */
  calendar: CalendarFormat;
  
  /** Relative time format strings */
  relativeTime: RelativeTimeFormat;
  
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Long date format configuration
 */
interface LongDateFormat {
  /** Time format (e.g., "HH.mm") */
  LT: string;
  
  /** Time with seconds format (e.g., "HH.mm.ss") */
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
  /** Future time prefix (e.g., "dalam %s" = "in %s") */
  future: string;
  
  /** Past time suffix (e.g., "%s yang lalu" = "%s ago") */
  past: string;
  
  /** Seconds (singular) */
  s: string;
  
  /** Seconds (plural, %d replaced with number) */
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
  
  /** Day of year (first week contains January 6th) */
  doy: number;
}

/**
 * Moment.js instance interface (minimal definition)
 */
interface Moment {
  /**
   * Define a new locale configuration
   * @param localeName - Locale identifier (e.g., "id" for Indonesian)
   * @param config - Locale configuration object
   */
  defineLocale(localeName: string, config: LocaleConfig): void;
}

/**
 * Defines Indonesian locale configuration for moment.js
 * @param moment - Moment.js instance
 */
declare function defineIndonesianLocale(moment: Moment): void;

export { LocaleConfig, LongDateFormat, CalendarFormat, RelativeTimeFormat, WeekConfig, MeridiemPeriod, Moment };