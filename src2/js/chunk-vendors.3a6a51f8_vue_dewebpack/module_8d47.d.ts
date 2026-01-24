/**
 * Moment.js Greek (el) locale configuration
 * Defines Greek language settings for date/time formatting
 */

declare module 'moment' {
  /**
   * Greek locale configuration object
   */
  interface GreekLocaleConfig {
    /** Full month names in nominative case (subject form) */
    monthsNominativeEl: string[];
    
    /** Full month names in genitive case (possessive form) */
    monthsGenitiveEl: string[];
    
    /**
     * Returns appropriate month name based on context
     * @param momentInstance - The moment instance containing the date
     * @param formatString - The format string being used
     * @returns Month name (genitive if preceded by 'D', otherwise nominative) or full array if no instance provided
     */
    months(momentInstance: Moment | null, formatString: string): string | string[];
    
    /** Abbreviated month names (3-letter shortcuts) */
    monthsShort: string[];
    
    /** Full weekday names */
    weekdays: string[];
    
    /** Abbreviated weekday names (3-letter shortcuts) */
    weekdaysShort: string[];
    
    /** Minimal weekday names (2-letter shortcuts) */
    weekdaysMin: string[];
    
    /**
     * Returns AM/PM equivalent in Greek
     * @param hours - Hour of the day (0-23)
     * @param minutes - Minute of the hour
     * @param isLowercase - Whether to return lowercase version
     * @returns "πμ"/"ΠΜ" for AM (πρωί/morning), "μμ"/"ΜΜ" for PM (μεσημέρι/afternoon)
     */
    meridiem(hours: number, minutes: number, isLowercase: boolean): string;
    
    /**
     * Determines if a meridiem string represents PM
     * @param meridiemString - The meridiem string to check
     * @returns True if the string represents PM (starts with 'μ')
     */
    isPM(meridiemString: string): boolean;
    
    /** Regular expression to parse Greek meridiem indicators */
    meridiemParse: RegExp;
    
    /** Standard date/time format templates */
    longDateFormat: {
      /** Time format (h:mm AM/PM) */
      LT: string;
      /** Time with seconds format (h:mm:ss AM/PM) */
      LTS: string;
      /** Short date format (DD/MM/YYYY) */
      L: string;
      /** Long date format (D MMMM YYYY) */
      LL: string;
      /** Long date with time (D MMMM YYYY h:mm AM/PM) */
      LLL: string;
      /** Full date with day and time (dddd, D MMMM YYYY h:mm AM/PM) */
      LLLL: string;
    };
    
    /** Internal calendar format templates with time placeholders */
    calendarEl: {
      /** Format for today */
      sameDay: string;
      /** Format for tomorrow */
      nextDay: string;
      /** Format for next week */
      nextWeek: string;
      /** Format for yesterday */
      lastDay: string;
      /** 
       * Dynamic format for last week (varies by day of week)
       * Saturday uses "το προηγούμενο" (neuter), others use "την προηγούμενη" (feminine)
       */
      lastWeek(): string;
      /** Format for other dates */
      sameElse: string;
    };
    
    /**
     * Generates calendar display string with proper preposition
     * @param key - Calendar key (sameDay, nextDay, etc.)
     * @param momentInstance - The moment instance to format
     * @returns Formatted calendar string with "στη" (singular) or "στις" (plural) based on hour
     */
    calendar(key: string, momentInstance: Moment): string;
    
    /** Relative time format strings */
    relativeTime: {
      /** Future tense template */
      future: string;
      /** Past tense template */
      past: string;
      /** Seconds (few) */
      s: string;
      /** Seconds (multiple) */
      ss: string;
      /** One minute */
      m: string;
      /** Multiple minutes */
      mm: string;
      /** One hour */
      h: string;
      /** Multiple hours */
      hh: string;
      /** One day */
      d: string;
      /** Multiple days */
      dd: string;
      /** One month */
      M: string;
      /** Multiple months */
      MM: string;
      /** One year */
      y: string;
      /** Multiple years */
      yy: string;
    };
    
    /** Regex to parse ordinal day numbers (e.g., "1η", "2η") */
    dayOfMonthOrdinalParse: RegExp;
    
    /**
     * Formats day number as ordinal
     * @param dayNumber - The day number to format
     * @returns Day number with "η" suffix (Greek ordinal indicator)
     */
    ordinal: string;
    
    /** Week configuration */
    week: {
      /** Day of week (1 = Monday is first day of week) */
      dow: number;
      /** Day of year (4 = week containing Jan 4th is first week) */
      doy: number;
    };
  }

  /**
   * Checks if a value is a function
   * @param value - Value to check
   * @returns True if value is a function
   */
  function isFunction(value: unknown): value is Function;

  /**
   * Defines or updates a locale configuration
   * @param localeName - Locale identifier (e.g., "el" for Greek)
   * @param config - Locale configuration object
   */
  function defineLocale(localeName: string, config: Partial<GreekLocaleConfig>): Locale;
}