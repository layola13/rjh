/**
 * Azerbaijani locale configuration for moment.js
 * Provides localization for dates, times, and relative time formatting in Azerbaijani language
 */

/**
 * Mapping of numbers to their ordinal suffixes in Azerbaijani
 * Used for formatting ordinal numbers (1st, 2nd, 3rd, etc.)
 */
interface OrdinalSuffixMap {
  /** Numbers ending in 1, 5, 8 or equal to 70, 80 use "-inci" suffix */
  1: '-inci';
  5: '-inci';
  8: '-inci';
  70: '-inci';
  80: '-inci';
  /** Numbers ending in 2, 7 or equal to 20, 50 use "-nci" suffix */
  2: '-nci';
  7: '-nci';
  20: '-nci';
  50: '-nci';
  /** Numbers ending in 3, 4 or equal to 100 use "-üncü" suffix */
  3: '-üncü';
  4: '-üncü';
  100: '-üncü';
  /** Numbers ending in 6 use "-ncı" suffix */
  6: '-ncı';
  /** Numbers ending in 9 or equal to 10, 30 use "-uncu" suffix */
  9: '-uncu';
  10: '-uncu';
  30: '-uncu';
  /** Numbers equal to 60, 90 use "-ıncı" suffix */
  60: '-ıncı';
  90: '-ıncı';
}

/**
 * Locale configuration object for Azerbaijani language
 */
interface AzerbaijaniLocaleConfig {
  /** Full month names in Azerbaijani */
  months: string[];
  
  /** Abbreviated month names in Azerbaijani */
  monthsShort: string[];
  
  /** Full weekday names in Azerbaijani */
  weekdays: string[];
  
  /** Abbreviated weekday names in Azerbaijani */
  weekdaysShort: string[];
  
  /** Minimal weekday names (2-letter abbreviations) in Azerbaijani */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekday names */
  weekdaysParseExact: boolean;
  
  /** Date and time format configurations */
  longDateFormat: {
    /** Time format (HH:mm) */
    LT: string;
    /** Time format with seconds (HH:mm:ss) */
    LTS: string;
    /** Short date format (DD.MM.YYYY) */
    L: string;
    /** Long date format (D MMMM YYYY) */
    LL: string;
    /** Long date format with time (D MMMM YYYY HH:mm) */
    LLL: string;
    /** Full date format with weekday (dddd, D MMMM YYYY HH:mm) */
    LLLL: string;
  };
  
  /** Calendar-specific date formatting for relative days */
  calendar: {
    /** Format for dates occurring today */
    sameDay: string;
    /** Format for dates occurring tomorrow */
    nextDay: string;
    /** Format for dates in the next week */
    nextWeek: string;
    /** Format for dates occurring yesterday */
    lastDay: string;
    /** Format for dates in the last week */
    lastWeek: string;
    /** Format for all other dates */
    sameElse: string;
  };
  
  /** Relative time formatting configuration */
  relativeTime: {
    /** Format for future relative times */
    future: string;
    /** Format for past relative times */
    past: string;
    /** Format for a few seconds */
    s: string;
    /** Format for seconds (plural) */
    ss: string;
    /** Format for one minute */
    m: string;
    /** Format for minutes (plural) */
    mm: string;
    /** Format for one hour */
    h: string;
    /** Format for hours (plural) */
    hh: string;
    /** Format for one day */
    d: string;
    /** Format for days (plural) */
    dd: string;
    /** Format for one month */
    M: string;
    /** Format for months (plural) */
    MM: string;
    /** Format for one year */
    y: string;
    /** Format for years (plural) */
    yy: string;
  };
  
  /** Regular expression for parsing meridiem (AM/PM equivalent) */
  meridiemParse: RegExp;
  
  /**
   * Determines if a given meridiem string represents PM
   * @param meridiemString - The meridiem string to check (gecə/səhər/gündüz/axşam)
   * @returns true if the string represents afternoon or evening (PM)
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns the appropriate meridiem string for a given time
   * @param hours - Hour of the day (0-23)
   * @param minutes - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase string
   * @returns Azerbaijani meridiem string (gecə/səhər/gündüz/axşam)
   */
  meridiem(hours: number, minutes: number, isLowercase: boolean): string;
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Returns the ordinal form of a number in Azerbaijani
   * @param num - The number to convert to ordinal form
   * @returns The number with appropriate Azerbaijani ordinal suffix
   */
  ordinal(num: number): string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) - Monday is first day in Azerbaijan */
    dow: number;
    /** Day of year that starts the first week of the year */
    doy: number;
  };
}

/**
 * Moment.js module interface
 */
interface MomentModule {
  /**
   * Defines a new locale configuration for moment.js
   * @param localeKey - The locale identifier (e.g., "az" for Azerbaijani)
   * @param config - The locale configuration object
   */
  defineLocale(localeKey: string, config: AzerbaijaniLocaleConfig): void;
}

/**
 * Defines the Azerbaijani locale configuration for moment.js
 * @param moment - The moment.js instance to configure
 */
export default function defineAzerbaijaniLocale(moment: MomentModule): void;