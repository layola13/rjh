/**
 * Tibetan (བོད་ཡིག) locale configuration for moment.js
 * 
 * This module provides localization support for the Tibetan language,
 * including month names, weekday names, date/time formats, and numeral conversions.
 * 
 * @module moment/locale/bo
 */

declare module 'moment' {
  /**
   * Mapping of Arabic numerals to Tibetan numerals
   */
  interface TibetanNumeralMap {
    readonly 1: '༡';
    readonly 2: '༢';
    readonly 3: '༣';
    readonly 4: '༤';
    readonly 5: '༥';
    readonly 6: '༦';
    readonly 7: '༧';
    readonly 8: '༨';
    readonly 9: '༩';
    readonly 0: '༠';
  }

  /**
   * Mapping of Tibetan numerals to Arabic numerals
   */
  interface ArabicNumeralMap {
    readonly '༡': '1';
    readonly '༢': '2';
    readonly '༣': '3';
    readonly '༤': '4';
    readonly '༥': '5';
    readonly '༦': '6';
    readonly '༧': '7';
    readonly '༨': '8';
    readonly '༩': '9';
    readonly '༠': '0';
  }

  /**
   * Tibetan locale configuration
   */
  interface TibetanLocaleConfig {
    /**
     * Full month names in Tibetan
     * Format: "First Month", "Second Month", etc.
     */
    readonly months: readonly string[];

    /**
     * Abbreviated month names in Tibetan
     * Format: "Month 1", "Month 2", etc.
     */
    readonly monthsShort: readonly string[];

    /**
     * Regular expression for parsing short month format
     */
    readonly monthsShortRegex: RegExp;

    /**
     * Whether to use exact month parsing
     */
    readonly monthsParseExact: true;

    /**
     * Full weekday names in Tibetan
     * Order: Sunday through Saturday
     */
    readonly weekdays: readonly string[];

    /**
     * Abbreviated weekday names in Tibetan
     */
    readonly weekdaysShort: readonly string[];

    /**
     * Minimal weekday names in Tibetan
     */
    readonly weekdaysMin: readonly string[];

    /**
     * Long date format tokens
     */
    readonly longDateFormat: {
      /** Time format (e.g., "Morning 5:30") */
      readonly LT: 'A h:mm';
      /** Time format with seconds */
      readonly LTS: 'A h:mm:ss';
      /** Short date format */
      readonly L: 'DD/MM/YYYY';
      /** Long date format */
      readonly LL: 'D MMMM YYYY';
      /** Long date with time */
      readonly LLL: 'D MMMM YYYY, A h:mm';
      /** Full date with weekday and time */
      readonly LLLL: 'dddd, D MMMM YYYY, A h:mm';
    };

    /**
     * Calendar format strings for relative dates
     */
    readonly calendar: {
      /** Format for today */
      readonly sameDay: '[དི་རིང] LT';
      /** Format for tomorrow */
      readonly nextDay: '[སང་ཉིན] LT';
      /** Format for next week */
      readonly nextWeek: '[བདུན་ཕྲག་རྗེས་མ], LT';
      /** Format for yesterday */
      readonly lastDay: '[ཁ་སང] LT';
      /** Format for last week */
      readonly lastWeek: '[བདུན་ཕྲག་མཐའ་མ] dddd, LT';
      /** Format for all other dates */
      readonly sameElse: 'L';
    };

    /**
     * Relative time format strings
     */
    readonly relativeTime: {
      /** Future time prefix (e.g., "in %s") */
      readonly future: '%s ལ་';
      /** Past time prefix (e.g., "%s ago") */
      readonly past: '%s སྔན་ལ';
      /** A few seconds */
      readonly s: 'ལམ་སང';
      /** Seconds (plural) */
      readonly ss: '%d སྐར་ཆ།';
      /** A minute */
      readonly m: 'སྐར་མ་གཅིག';
      /** Minutes (plural) */
      readonly mm: '%d སྐར་མ';
      /** An hour */
      readonly h: 'ཆུ་ཚོད་གཅིག';
      /** Hours (plural) */
      readonly hh: '%d ཆུ་ཚོད';
      /** A day */
      readonly d: 'ཉིན་གཅིག';
      /** Days (plural) */
      readonly dd: '%d ཉིན་';
      /** A month */
      readonly M: 'ཟླ་བ་གཅིག';
      /** Months (plural) */
      readonly MM: '%d ཟླ་བ';
      /** A year */
      readonly y: 'ལོ་གཅིག';
      /** Years (plural) */
      readonly yy: '%d ལོ';
    };

    /**
     * Converts Tibetan numerals to Arabic numerals
     * @param input - String containing Tibetan numerals
     * @returns String with Arabic numerals
     */
    preparse(input: string): string;

    /**
     * Converts Arabic numerals to Tibetan numerals
     * @param input - String containing Arabic numerals
     * @returns String with Tibetan numerals
     */
    postformat(input: string): string;

    /**
     * Regular expression for parsing meridiem (AM/PM equivalent)
     * Matches: མཚན་མོ (midnight/late night), ཞོགས་ཀས (morning), 
     *          ཉིན་གུང (afternoon), དགོང་དག (evening)
     */
    readonly meridiemParse: RegExp;

    /**
     * Adjusts hour based on meridiem period
     * @param hour - Hour value (0-23)
     * @param meridiem - Tibetan meridiem string
     * @returns Adjusted hour in 24-hour format
     */
    meridiemHour(hour: number, meridiem: string): number;

    /**
     * Returns the appropriate meridiem string for given time
     * @param hour - Hour value (0-23)
     * @param minute - Minute value (0-59)
     * @param isLowercase - Whether to return lowercase (unused in Tibetan)
     * @returns Tibetan meridiem string
     */
    meridiem(hour: number, minute: number, isLowercase: boolean): string;

    /**
     * Week configuration
     */
    readonly week: {
      /** Day of week (0 = Sunday) */
      readonly dow: 0;
      /** Day of year that starts the first week */
      readonly doy: 6;
    };
  }

  namespace locale {
    /**
     * Tibetan locale
     */
    interface bo extends TibetanLocaleConfig {}
  }
}

export {};