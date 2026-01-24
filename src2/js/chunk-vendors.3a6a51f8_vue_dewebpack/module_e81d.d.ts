/**
 * Moment.js Khmer (Cambodian) locale configuration
 * 
 * This module provides localization support for the Khmer language,
 * including number conversion, date/time formatting, and relative time strings.
 * 
 * @module moment/locale/km
 * @requires moment
 */

declare module 'moment' {
  /**
   * Mapping from Arabic numerals to Khmer numerals
   */
  interface ArabicToKhmerNumeralMap {
    readonly 1: '១';
    readonly 2: '២';
    readonly 3: '៣';
    readonly 4: '៤';
    readonly 5: '៥';
    readonly 6: '៦';
    readonly 7: '៧';
    readonly 8: '៨';
    readonly 9: '៩';
    readonly 0: '០';
  }

  /**
   * Mapping from Khmer numerals to Arabic numerals
   */
  interface KhmerToArabicNumeralMap {
    readonly '១': '1';
    readonly '២': '2';
    readonly '៣': '3';
    readonly '៤': '4';
    readonly '៥': '5';
    readonly '៦': '6';
    readonly '៧': '7';
    readonly '៨': '8';
    readonly '៩': '9';
    readonly '០': '0';
  }

  /**
   * Khmer locale configuration for Moment.js
   */
  interface KhmerLocaleConfiguration extends LocaleSpecification {
    /** Full month names in Khmer */
    months: string[];
    
    /** Abbreviated month names in Khmer */
    monthsShort: string[];
    
    /** Full weekday names in Khmer */
    weekdays: string[];
    
    /** Short weekday names in Khmer */
    weekdaysShort: string[];
    
    /** Minimal weekday names in Khmer */
    weekdaysMin: string[];
    
    /** Use exact parsing for weekdays */
    weekdaysParseExact: boolean;
    
    /** Long date format tokens */
    longDateFormat: LongDateFormatSpec;
    
    /** Regular expression for parsing meridiem (AM/PM) */
    meridiemParse: RegExp;
    
    /**
     * Determines if the given meridiem string represents PM
     * @param meridiemString - The meridiem string to check ("ព្រឹក" or "ល្ងាច")
     * @returns True if PM (afternoon/evening), false if AM (morning)
     */
    isPM(meridiemString: string): boolean;
    
    /**
     * Returns the appropriate meridiem string based on time
     * @param hours - Hour of the day (0-23)
     * @param minutes - Minute of the hour (0-59)
     * @param isLowercase - Whether to return lowercase (unused in Khmer)
     * @returns "ព្រឹក" (morning) or "ល្ងាច" (afternoon/evening)
     */
    meridiem(hours: number, minutes: number, isLowercase: boolean): string;
    
    /** Calendar format strings for relative dates */
    calendar: CalendarSpec;
    
    /** Relative time format strings */
    relativeTime: RelativeTimeSpec;
    
    /** Regular expression for parsing ordinal day of month */
    dayOfMonthOrdinalParse: RegExp;
    
    /**
     * Formats a number as an ordinal in Khmer
     * @param num - The number to format
     * @returns Formatted ordinal string (e.g., "ទី1")
     */
    ordinal(num: number): string;
    
    /**
     * Converts Khmer numerals to Arabic numerals during parsing
     * @param input - String containing Khmer numerals
     * @returns String with Arabic numerals
     */
    preparse(input: string): string;
    
    /**
     * Converts Arabic numerals to Khmer numerals during formatting
     * @param input - String containing Arabic numerals
     * @returns String with Khmer numerals
     */
    postformat(input: string): string;
    
    /** Week configuration */
    week: WeekSpec;
  }

  namespace locale {
    /**
     * Khmer locale ('km')
     */
    interface km extends KhmerLocaleConfiguration {}
  }
}

export {};