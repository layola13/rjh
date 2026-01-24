/**
 * Moment.js locale configuration for Persian/Farsi (fa)
 * @module moment-locale-fa
 */

/**
 * Mapping from Western Arabic numerals to Eastern Arabic-Indic numerals (Persian)
 */
type WesternToEasternNumeralMap = {
  readonly [K in '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9']: string;
};

/**
 * Mapping from Eastern Arabic-Indic numerals (Persian) to Western Arabic numerals
 */
type EasternToWesternNumeralMap = {
  readonly [key: string]: string;
};

/**
 * Moment.js locale definition interface
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
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format */
    LT: string;
    /** Time with seconds format */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date and time format */
    LLL: string;
    /** Full date and time format */
    LLLL: string;
  };
  
  /** Regular expression for parsing meridiem (AM/PM) */
  meridiemParse: RegExp;
  
  /**
   * Determine if the given meridiem string represents PM
   * @param meridiemString - The meridiem string to check
   * @returns True if PM, false if AM
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Get the meridiem string for a given time
   * @param hours - Hour of the day (0-23)
   * @param minutes - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase string
   * @returns Meridiem string in Persian
   */
  meridiem(hours: number, minutes: number, isLowercase: boolean): string;
  
  /** Calendar date format strings */
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
    /** Future time prefix */
    future: string;
    /** Past time suffix */
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
  };
  
  /**
   * Pre-parse a date string by converting Persian numerals to Western numerals
   * @param dateString - Input date string with Persian numerals
   * @returns Date string with Western numerals
   */
  preparse(dateString: string): string;
  
  /**
   * Post-format a date string by converting Western numerals to Persian numerals
   * @param dateString - Input date string with Western numerals
   * @returns Date string with Persian numerals
   */
  postformat(dateString: string): string;
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Format ordinal number
   * @param num - The number to format
   * @returns Formatted ordinal string
   */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** First day of week (0=Sunday, 6=Saturday) */
    dow: number;
    /** First week of year calculation */
    doy: number;
  };
}

/**
 * Moment.js instance with locale definition capabilities
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., 'fa')
   * @param config - The locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeName: string, config: LocaleSpecification): unknown;
}

/**
 * Persian (Farsi) locale configuration for moment.js
 */
declare module 'moment/locale/fa' {
  const locale: void;
  export = locale;
}