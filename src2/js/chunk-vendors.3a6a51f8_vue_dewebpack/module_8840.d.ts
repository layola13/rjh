/**
 * Moment.js Galician (gl) locale configuration
 * Provides localization for dates, times, and relative time formatting in Galician language
 */

/**
 * Locale configuration object for Galician (gl)
 */
export interface GalicianLocaleConfig {
  /**
   * Full month names in Galician
   */
  months: string[];

  /**
   * Abbreviated month names in Galician
   */
  monthsShort: string[];

  /**
   * Whether to use exact parsing for month names
   */
  monthsParseExact: boolean;

  /**
   * Full weekday names in Galician
   */
  weekdays: string[];

  /**
   * Abbreviated weekday names in Galician
   */
  weekdaysShort: string[];

  /**
   * Minimal weekday names in Galician
   */
  weekdaysMin: string[];

  /**
   * Whether to use exact parsing for weekday names
   */
  weekdaysParseExact: boolean;

  /**
   * Long date format tokens and their corresponding formats
   */
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

  /**
   * Calendar formatting functions for different relative time periods
   */
  calendar: {
    /**
     * Format for today's date
     * @returns Formatted string with correct preposition based on hour
     */
    sameDay: (this: MomentContext) => string;

    /**
     * Format for tomorrow's date
     * @returns Formatted string with correct preposition based on hour
     */
    nextDay: (this: MomentContext) => string;

    /**
     * Format for next week's date
     * @returns Formatted string with correct preposition based on hour
     */
    nextWeek: (this: MomentContext) => string;

    /**
     * Format for yesterday's date
     * @returns Formatted string with correct preposition based on hour
     */
    lastDay: (this: MomentContext) => string;

    /**
     * Format for last week's date
     * @returns Formatted string with correct preposition based on hour
     */
    lastWeek: (this: MomentContext) => string;

    /**
     * Default format for other dates
     */
    sameElse: string;
  };

  /**
   * Relative time formatting configuration
   */
  relativeTime: {
    /**
     * Format future relative time
     * @param timeString - The relative time string
     * @returns Formatted future time string
     */
    future: (timeString: string) => string;

    /** Past time prefix */
    past: string;

    /** Seconds (few) */
    s: string;

    /** Seconds (many) */
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
   * Regular expression for parsing ordinal day of month (1º, 2º, etc.)
   */
  dayOfMonthOrdinalParse: RegExp;

  /**
   * Format for ordinal numbers
   */
  ordinal: string;

  /**
   * Week configuration
   */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year that defines first week */
    doy: number;
  };
}

/**
 * Context object available in calendar formatting functions
 */
interface MomentContext {
  /**
   * Get the hour of the current moment
   * @returns Hour value (0-23)
   */
  hours(): number;
}

/**
 * Moment.js locale definition interface
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: GalicianLocaleConfig): void;
}

/**
 * Initialize and register the Galician locale with moment.js
 * @param moment - The moment.js instance
 */
export default function defineGalicianLocale(moment: MomentStatic): void;