/**
 * Moment.js locale configuration for Uyghur (China)
 * Locale: ug-cn
 */

import { Moment, LocaleSpecification } from 'moment';

/**
 * Meridiem period type for Uyghur locale
 */
type UyghurMeridiem = 
  | 'يېرىم كېچە'  // midnight
  | 'سەھەر'       // morning
  | 'چۈشتىن بۇرۇن' // before noon
  | 'چۈش'         // noon
  | 'چۈشتىن كېيىن' // afternoon
  | 'كەچ';        // evening

/**
 * Uyghur (China) locale configuration for moment.js
 */
declare module 'moment' {
  /**
   * Defines the Uyghur (China) locale for moment.js
   * @param localeName - The locale identifier ('ug-cn')
   * @param config - Locale configuration object
   * @returns The configured locale
   */
  export function defineLocale(localeName: 'ug-cn', config: UyghurLocaleSpecification): Locale;
}

/**
 * Locale specification for Uyghur (China)
 */
interface UyghurLocaleSpecification extends LocaleSpecification {
  /**
   * Full month names in Uyghur
   * Order: January through December
   */
  months: string[];

  /**
   * Abbreviated month names in Uyghur
   * Order: January through December
   */
  monthsShort: string[];

  /**
   * Full weekday names in Uyghur
   * Order: Sunday through Saturday
   */
  weekdays: string[];

  /**
   * Abbreviated weekday names in Uyghur
   * Order: Sunday through Saturday
   */
  weekdaysShort: string[];

  /**
   * Minimal weekday names in Uyghur
   * Order: Sunday through Saturday
   */
  weekdaysMin: string[];

  /**
   * Long date format tokens
   */
  longDateFormat: {
    /** Time format (HH:mm) */
    LT: string;
    /** Time with seconds format (HH:mm:ss) */
    LTS: string;
    /** Short date format (YYYY-MM-DD) */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date with time format */
    LLL: string;
    /** Full date with weekday and time format */
    LLLL: string;
  };

  /**
   * Regular expression to parse meridiem indicators
   */
  meridiemParse: RegExp;

  /**
   * Converts 12-hour format to 24-hour format based on meridiem
   * @param hour - Hour in 12-hour format (0-12)
   * @param meridiem - Uyghur meridiem string
   * @returns Hour in 24-hour format (0-23)
   */
  meridiemHour(hour: number, meridiem: string): number;

  /**
   * Returns the appropriate meridiem string for given time
   * @param hour - Hour (0-23)
   * @param minute - Minute (0-59)
   * @param isLowercase - Whether to return lowercase (not used in Uyghur)
   * @returns Uyghur meridiem string
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): UyghurMeridiem;

  /**
   * Calendar format strings for relative dates
   */
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

  /**
   * Relative time format strings
   */
  relativeTime: {
    /** Future time indicator ('%s later') */
    future: string;
    /** Past time indicator ('%s ago') */
    past: string;
    /** Few seconds */
    s: string;
    /** Seconds (%d seconds) */
    ss: string;
    /** One minute */
    m: string;
    /** Minutes (%d minutes) */
    mm: string;
    /** One hour */
    h: string;
    /** Hours (%d hours) */
    hh: string;
    /** One day */
    d: string;
    /** Days (%d days) */
    dd: string;
    /** One month */
    M: string;
    /** Months (%d months) */
    MM: string;
    /** One year */
    y: string;
    /** Years (%d years) */
    yy: string;
  };

  /**
   * Regular expression to parse ordinal indicators
   * Matches 1-2 digits followed by -كۈنى, -ئاي, or -ھەپتە
   */
  dayOfMonthOrdinalParse: RegExp;

  /**
   * Returns ordinal indicator for a number
   * @param num - The number to ordinalize
   * @param token - The token type ('d', 'D', 'DDD', 'w', 'W', etc.)
   * @returns The number with appropriate Uyghur ordinal suffix
   */
  ordinal(num: number, token: string): string;

  /**
   * Pre-processes input string before parsing
   * Replaces Arabic comma with standard comma
   * @param str - Input string
   * @returns Processed string
   */
  preparse(str: string): string;

  /**
   * Post-processes output string after formatting
   * Replaces standard comma with Arabic comma
   * @param str - Input string
   * @returns Processed string
   */
  postformat(str: string): string;

  /**
   * Week configuration
   */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Locale configuration object for Uyghur (China)
 */
export const ugCnLocale: UyghurLocaleSpecification;

export default ugCnLocale;