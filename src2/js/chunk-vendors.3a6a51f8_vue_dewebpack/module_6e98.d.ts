/**
 * Moment.js Italian locale configuration
 * Provides localization for date/time formatting in Italian language
 */

/**
 * Locale configuration object for Italian (it)
 */
export interface ItalianLocaleConfig {
  /** Full month names in Italian */
  months: string[];
  
  /** Abbreviated month names in Italian */
  monthsShort: string[];
  
  /** Full weekday names in Italian */
  weekdays: string[];
  
  /** Abbreviated weekday names in Italian */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Italian */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  
  /** Calendar format functions for relative dates */
  calendar: CalendarFormat;
  
  /** Relative time format strings */
  relativeTime: RelativeTimeFormat;
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers */
  ordinal: string;
  
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Long date format configuration
 */
export interface LongDateFormat {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  
  /** Time format with seconds (e.g., "HH:mm:ss") */
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
 * Calendar format configuration with dynamic functions
 */
export interface CalendarFormat {
  /** Format for today's date */
  sameDay: () => string;
  
  /** Format for tomorrow's date */
  nextDay: () => string;
  
  /** Format for next week's date */
  nextWeek: () => string;
  
  /** Format for yesterday's date */
  lastDay: () => string;
  
  /** Format for last week's date */
  lastWeek: () => string;
  
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time format strings
 */
export interface RelativeTimeFormat {
  /** Future time prefix format */
  future: string;
  
  /** Past time prefix format */
  past: string;
  
  /** Seconds (singular, approximate) */
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
  
  /** Week (singular) */
  w: string;
  
  /** Weeks (plural) */
  ww: string;
  
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
export interface WeekConfig {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  
  /** Day of year that defines week 1 */
  doy: number;
}

/**
 * Moment.js instance with time methods
 */
export interface MomentInstance {
  /** Get the hour of the day (0-23) */
  hours(): number;
  
  /** Get the day of the week (0=Sunday, 6=Saturday) */
  day(): number;
}

/**
 * Moment.js locale definition API
 */
export interface MomentLocale {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "it")
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: ItalianLocaleConfig): void;
}

/**
 * Initializes the Italian locale for Moment.js
 * @param moment - Moment.js instance
 */
export default function initItalianLocale(moment: MomentLocale): void;