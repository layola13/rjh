/**
 * Moment.js locale configuration for Swahili (sw)
 * 
 * This module provides localization data for the Swahili language,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module moment-locale-sw
 */

/**
 * Locale configuration object for Swahili
 */
export interface SwahiliLocaleConfig {
  /**
   * Full month names in Swahili
   * @example ["Januari", "Februari", "Machi", ...]
   */
  months: string[];

  /**
   * Abbreviated month names in Swahili
   * @example ["Jan", "Feb", "Mac", ...]
   */
  monthsShort: string[];

  /**
   * Full weekday names in Swahili
   * @example ["Jumapili", "Jumatatu", "Jumanne", ...]
   */
  weekdays: string[];

  /**
   * Abbreviated weekday names in Swahili
   * @example ["Jpl", "Jtat", "Jnne", ...]
   */
  weekdaysShort: string[];

  /**
   * Minimal weekday names in Swahili (2-character abbreviations)
   * @example ["J2", "J3", "J4", ...]
   */
  weekdaysMin: string[];

  /**
   * Whether to parse weekday names exactly as defined
   */
  weekdaysParseExact: boolean;

  /**
   * Long date format patterns for various display formats
   */
  longDateFormat: LongDateFormat;

  /**
   * Calendar format patterns for relative dates
   */
  calendar: CalendarFormat;

  /**
   * Relative time expressions for different time units
   */
  relativeTime: RelativeTimeFormat;

  /**
   * Week configuration (first day of week and first week of year)
   */
  week: WeekConfig;
}

/**
 * Long date format patterns
 */
export interface LongDateFormat {
  /** Time format (12-hour with AM/PM): "hh:mm A" */
  LT: string;
  
  /** Time format with seconds (24-hour): "HH:mm:ss" */
  LTS: string;
  
  /** Short date format: "DD.MM.YYYY" */
  L: string;
  
  /** Long date format: "D MMMM YYYY" */
  LL: string;
  
  /** Long date with time: "D MMMM YYYY HH:mm" */
  LLL: string;
  
  /** Full date with weekday and time: "dddd, D MMMM YYYY HH:mm" */
  LLLL: string;
}

/**
 * Calendar format patterns for relative dates
 */
export interface CalendarFormat {
  /** Format for today: "[leo saa] LT" (today at [time]) */
  sameDay: string;
  
  /** Format for tomorrow: "[kesho saa] LT" (tomorrow at [time]) */
  nextDay: string;
  
  /** Format for next week: "[wiki ijayo] dddd [saat] LT" (next week [weekday] at [time]) */
  nextWeek: string;
  
  /** Format for yesterday: "[jana] LT" (yesterday [time]) */
  lastDay: string;
  
  /** Format for last week: "[wiki iliyopita] dddd [saat] LT" (last week [weekday] at [time]) */
  lastWeek: string;
  
  /** Default format for other dates: "L" */
  sameElse: string;
}

/**
 * Relative time format patterns
 */
export interface RelativeTimeFormat {
  /** Future time prefix: "%s baadaye" (in %s) */
  future: string;
  
  /** Past time prefix: "tokea %s" (%s ago) */
  past: string;
  
  /** Few seconds: "hivi punde" (just now) */
  s: string;
  
  /** Seconds: "sekunde %d" (%d seconds) */
  ss: string;
  
  /** One minute: "dakika moja" (one minute) */
  m: string;
  
  /** Minutes: "dakika %d" (%d minutes) */
  mm: string;
  
  /** One hour: "saa limoja" (one hour) */
  h: string;
  
  /** Hours: "masaa %d" (%d hours) */
  hh: string;
  
  /** One day: "siku moja" (one day) */
  d: string;
  
  /** Days: "siku %d" (%d days) */
  dd: string;
  
  /** One month: "mwezi mmoja" (one month) */
  M: string;
  
  /** Months: "miezi %d" (%d months) */
  MM: string;
  
  /** One year: "mwaka mmoja" (one year) */
  y: string;
  
  /** Years: "miaka %d" (%d years) */
  yy: string;
}

/**
 * Week configuration
 */
export interface WeekConfig {
  /**
   * Day of week (0 = Sunday, 1 = Monday, etc.)
   * In Swahili locale, week starts on Monday (1)
   */
  dow: number;
  
  /**
   * Day of year that defines the first week of the year
   */
  doy: number;
}

/**
 * Moment.js locale definition function
 * @param localeName - The locale identifier (e.g., "sw" for Swahili)
 * @param config - The locale configuration object
 */
export interface MomentLocaleDefiner {
  defineLocale(localeName: string, config: SwahiliLocaleConfig): void;
}

/**
 * Initializes and registers the Swahili locale configuration with Moment.js
 * @param moment - The Moment.js instance
 */
export function initializeSwahiliLocale(moment: MomentLocaleDefiner): void;

export default initializeSwahiliLocale;