/**
 * Moment.js locale configuration for Turkmen (tk)
 * @module moment/locale/tk
 */

/**
 * Ordinal suffix mapping for Turkmen numbers
 * Maps specific numbers and number patterns to their corresponding ordinal suffixes
 */
interface OrdinalSuffixMap {
  /** Numbers ending in 1 use "'inji" suffix */
  1: "'inji";
  5: "'inji";
  8: "'inji";
  70: "'inji";
  80: "'inji";
  
  /** Numbers ending in 2 use "'nji" suffix */
  2: "'nji";
  7: "'nji";
  20: "'nji";
  50: "'nji";
  
  /** Numbers ending in 3 or 4 use "'ünji" suffix */
  3: "'ünji";
  4: "'ünji";
  100: "'ünji";
  
  /** Number 6 uses "'njy" suffix */
  6: "'njy";
  
  /** Numbers ending in 9, 10, 30 use "'unjy" suffix */
  9: "'unjy";
  10: "'unjy";
  30: "'unjy";
  
  /** Numbers 60, 90 use "'ynjy" suffix */
  60: "'ynjy";
  90: "'ynjy";
}

/**
 * Moment.js locale configuration object
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
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (hours:minutes) */
    LT: string;
    /** Time format with seconds */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date format with time */
    LLL: string;
    /** Full date format with weekday and time */
    LLLL: string;
  };
  
  /** Calendar format strings for relative dates */
  calendar: {
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
  };
  
  /** Relative time format strings */
  relativeTime: {
    /** Future time format */
    future: string;
    /** Past time format */
    past: string;
    /** Seconds (singular) */
    s: string;
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
  };
  
  /**
   * Function to generate ordinal numbers
   * @param num - The number to ordinalize
   * @param token - The format token (e.g., 'd', 'D', 'Do', 'DD')
   * @returns The ordinalized number string
   */
  ordinal: (num: number, token: string) => string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year that defines first week */
    doy: number;
  };
}

/**
 * Moment.js instance interface
 */
interface Moment {
  /**
   * Define or load a locale
   * @param localeKey - The locale identifier
   * @param config - The locale configuration object
   * @returns The loaded locale
   */
  defineLocale(localeKey: string, config: LocaleSpecification): unknown;
}

/**
 * Initializes the Turkmen locale configuration for moment.js
 * @param moment - The moment.js instance
 */
declare function initializeTurkmenLocale(moment: Moment): void;

export { Moment, LocaleSpecification, OrdinalSuffixMap, initializeTurkmenLocale };