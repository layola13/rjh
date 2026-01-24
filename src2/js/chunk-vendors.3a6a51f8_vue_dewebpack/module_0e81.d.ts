/**
 * Moment.js Turkish (tr) locale configuration
 * Defines Turkish language localization for date/time formatting
 */

declare module 'moment' {
  /**
   * Ordinal suffix mapping for Turkish numbers
   * Maps specific numbers to their corresponding ordinal suffixes
   * @example
   * - 1, 5, 8, 70, 80 → "'inci"
   * - 2, 7, 20, 50 → "'nci"
   * - 3, 4, 100 → "'üncü"
   */
  interface TurkishOrdinalSuffixMap {
    /** Numbers ending with 1, 5, 8 and 70, 80 use 'inci suffix */
    1: "'inci";
    5: "'inci";
    8: "'inci";
    70: "'inci";
    80: "'inci";
    /** Numbers ending with 2, 7 and 20, 50 use 'nci suffix */
    2: "'nci";
    7: "'nci";
    20: "'nci";
    50: "'nci";
    /** Numbers ending with 3, 4 and 100 use 'üncü suffix */
    3: "'üncü";
    4: "'üncü";
    100: "'üncü";
    /** Number 6 uses 'ncı suffix */
    6: "'ncı";
    /** Numbers ending with 9, 10, 30 use 'uncu suffix */
    9: "'uncu";
    10: "'uncu";
    30: "'uncu";
    /** Numbers 60, 90 use 'ıncı suffix */
    60: "'ıncı";
    90: "'ıncı";
  }

  /**
   * Turkish locale configuration for Moment.js
   */
  interface TurkishLocaleSpec extends LocaleSpecification {
    /** Full month names in Turkish */
    months: string[];
    /** Abbreviated month names in Turkish (3 letters) */
    monthsShort: string[];
    /** Full weekday names in Turkish */
    weekdays: string[];
    /** Abbreviated weekday names in Turkish (3 letters) */
    weekdaysShort: string[];
    /** Minimal weekday names in Turkish (2 letters) */
    weekdaysMin: string[];
    
    /**
     * Format meridiem (AM/PM) in Turkish
     * @param hour - Hour of the day (0-23)
     * @param minute - Minute of the hour
     * @param isLowercase - Whether to return lowercase format
     * @returns Turkish meridiem string ("öö" for AM, "ös" for PM)
     */
    meridiem(hour: number, minute: number, isLowercase: boolean): string;
    
    /** Regular expression to parse Turkish meridiem strings */
    meridiemParse: RegExp;
    
    /**
     * Determine if a meridiem string represents PM
     * @param meridiemString - The meridiem string to check
     * @returns True if the string represents PM (afternoon)
     */
    isPM(meridiemString: string): boolean;
    
    /** Date/time format strings for various lengths */
    longDateFormat: LongDateFormatSpec;
    
    /** Calendar format strings for relative dates */
    calendar: CalendarSpec;
    
    /** Relative time format strings */
    relativeTime: RelativeTimeSpec;
    
    /**
     * Generate ordinal number string for Turkish
     * @param number - The number to ordinalize
     * @param token - The formatting token (e.g., "d", "D", "Do", "DD")
     * @returns The number with appropriate Turkish ordinal suffix
     */
    ordinal(number: number, token: string): string;
    
    /** Week configuration */
    week: WeekSpec;
  }

  /**
   * Long date format specification for Turkish locale
   */
  interface LongDateFormatSpec {
    /** Time format: "HH:mm" */
    LT: string;
    /** Time with seconds format: "HH:mm:ss" */
    LTS: string;
    /** Short date format: "DD.MM.YYYY" */
    L: string;
    /** Long date format: "D MMMM YYYY" */
    LL: string;
    /** Long date with time format: "D MMMM YYYY HH:mm" */
    LLL: string;
    /** Full date with time format: "dddd, D MMMM YYYY HH:mm" */
    LLLL: string;
  }

  /**
   * Calendar format specification for Turkish locale
   */
  interface CalendarSpec {
    /** Today format: "[bugün saat] LT" */
    sameDay: string;
    /** Tomorrow format: "[yarın saat] LT" */
    nextDay: string;
    /** Next week format: "[gelecek] dddd [saat] LT" */
    nextWeek: string;
    /** Yesterday format: "[dün] LT" */
    lastDay: string;
    /** Last week format: "[geçen] dddd [saat] LT" */
    lastWeek: string;
    /** Default format: "L" */
    sameElse: string;
  }

  /**
   * Relative time format specification for Turkish locale
   */
  interface RelativeTimeSpec {
    /** Future time format: "%s sonra" (in %s) */
    future: string;
    /** Past time format: "%s önce" (%s ago) */
    past: string;
    /** A few seconds: "birkaç saniye" */
    s: string;
    /** Seconds format: "%d saniye" */
    ss: string;
    /** One minute: "bir dakika" */
    m: string;
    /** Minutes format: "%d dakika" */
    mm: string;
    /** One hour: "bir saat" */
    h: string;
    /** Hours format: "%d saat" */
    hh: string;
    /** One day: "bir gün" */
    d: string;
    /** Days format: "%d gün" */
    dd: string;
    /** One week: "bir hafta" */
    w: string;
    /** Weeks format: "%d hafta" */
    ww: string;
    /** One month: "bir ay" */
    M: string;
    /** Months format: "%d ay" */
    MM: string;
    /** One year: "bir yıl" */
    y: string;
    /** Years format: "%d yıl" */
    yy: string;
  }

  /**
   * Week configuration specification
   */
  interface WeekSpec {
    /** Day of week start: 1 (Monday) */
    dow: number;
    /** Day of year for week calculation: 7 */
    doy: number;
  }
}

export {};