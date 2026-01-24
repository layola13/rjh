/**
 * Moment.js Hebrew (he) locale configuration
 * Provides localization for dates, times, and relative time formatting in Hebrew
 */

/**
 * Locale configuration interface for Moment.js
 */
interface MomentLocaleConfiguration {
  /** Full month names in Hebrew */
  months: string[];
  
  /** Abbreviated month names in Hebrew */
  monthsShort: string[];
  
  /** Full weekday names in Hebrew */
  weekdays: string[];
  
  /** Short weekday names in Hebrew */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Hebrew */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  
  /** Calendar display configuration */
  calendar: CalendarConfiguration;
  
  /** Relative time formatting rules */
  relativeTime: RelativeTimeConfiguration;
  
  /** Regular expression to parse meridiem (AM/PM) in Hebrew */
  meridiemParse: RegExp;
  
  /**
   * Determines if the given string represents PM (afternoon/evening)
   * @param meridiemString - The meridiem string to test
   * @returns True if the string represents PM time
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns the appropriate meridiem string based on hour, minute, and format
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase/abbreviated format
   * @returns Hebrew meridiem string
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
}

/**
 * Long date format configuration
 */
interface LongDateFormat {
  /** Time format: "HH:mm" */
  LT: string;
  
  /** Time with seconds format: "HH:mm:ss" */
  LTS: string;
  
  /** Short date format: "DD/MM/YYYY" */
  L: string;
  
  /** Long date format: "D [ב]MMMM YYYY" */
  LL: string;
  
  /** Long date with time format: "D [ב]MMMM YYYY HH:mm" */
  LLL: string;
  
  /** Full date with time format: "dddd, D [ב]MMMM YYYY HH:mm" */
  LLLL: string;
  
  /** Short lowercase date format: "D/M/YYYY" */
  l: string;
  
  /** Medium lowercase date format: "D MMM YYYY" */
  ll: string;
  
  /** Medium lowercase date with time format: "D MMM YYYY HH:mm" */
  lll: string;
  
  /** Full lowercase date with time format: "ddd, D MMM YYYY HH:mm" */
  llll: string;
}

/**
 * Calendar display configuration for different time periods
 */
interface CalendarConfiguration {
  /** Format for today: "[היום ב־]LT" (Today at) */
  sameDay: string;
  
  /** Format for tomorrow: "[מחר ב־]LT" (Tomorrow at) */
  nextDay: string;
  
  /** Format for next week: "dddd [בשעה] LT" (Weekday at) */
  nextWeek: string;
  
  /** Format for yesterday: "[אתמול ב־]LT" (Yesterday at) */
  lastDay: string;
  
  /** Format for last week: "[ביום] dddd [האחרון בשעה] LT" (On last weekday at) */
  lastWeek: string;
  
  /** Default format for other dates: "L" */
  sameElse: string;
}

/**
 * Relative time formatting configuration
 */
interface RelativeTimeConfiguration {
  /** Future time prefix: "בעוד %s" (In) */
  future: string;
  
  /** Past time prefix: "לפני %s" (Ago) */
  past: string;
  
  /** Few seconds: "מספר שניות" (A few seconds) */
  s: string;
  
  /** Seconds: "%d שניות" */
  ss: string;
  
  /** One minute: "דקה" (Minute) */
  m: string;
  
  /** Minutes: "%d דקות" */
  mm: string;
  
  /** One hour: "שעה" (Hour) */
  h: string;
  
  /**
   * Hours formatting function
   * @param hours - Number of hours
   * @returns Formatted string: "שעתיים" for 2, or "%d שעות" for others
   */
  hh(hours: number): string;
  
  /** One day: "יום" (Day) */
  d: string;
  
  /**
   * Days formatting function
   * @param days - Number of days
   * @returns Formatted string: "יומיים" for 2, or "%d ימים" for others
   */
  dd(days: number): string;
  
  /** One month: "חודש" (Month) */
  M: string;
  
  /**
   * Months formatting function
   * @param months - Number of months
   * @returns Formatted string: "חודשיים" for 2, or "%d חודשים" for others
   */
  MM(months: number): string;
  
  /** One year: "שנה" (Year) */
  y: string;
  
  /**
   * Years formatting function with special plural rules
   * @param years - Number of years
   * @returns Formatted string: "שנתיים" for 2, "%d שנה" for multiples of 10 (except 10), or "%d שנים" for others
   */
  yy(years: number): string;
}

/**
 * Moment.js instance with locale definition capability
 */
interface MomentStatic {
  /**
   * Defines a locale configuration for Moment.js
   * @param localeKey - The locale identifier (e.g., "he" for Hebrew)
   * @param config - The locale configuration object
   */
  defineLocale(localeKey: string, config: MomentLocaleConfiguration): void;
}

/**
 * Hebrew locale configuration for Moment.js
 * Exports the locale definition to be registered with Moment.js
 */
export function defineHebrewLocale(moment: MomentStatic): void;