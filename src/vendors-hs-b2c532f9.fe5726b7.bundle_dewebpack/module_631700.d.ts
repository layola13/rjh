/**
 * Moment.js Hungarian (hu) locale configuration
 * Provides localized date/time formatting, relative time, and calendar strings for Hungarian language
 */

declare module 'moment/locale/hu' {
  import { Locale, LocaleSpecification } from 'moment';

  /**
   * Configuration options for Hungarian locale
   */
  interface HungarianLocaleConfig extends LocaleSpecification {
    /** Full month names in Hungarian */
    months: string[];
    
    /** Abbreviated month names in Hungarian */
    monthsShort: string[];
    
    /** Whether to use exact parsing for month names */
    monthsParseExact: boolean;
    
    /** Full weekday names in Hungarian */
    weekdays: string[];
    
    /** Abbreviated weekday names in Hungarian */
    weekdaysShort: string[];
    
    /** Minimal weekday names in Hungarian */
    weekdaysMin: string[];
    
    /** Long date format patterns */
    longDateFormat: {
      LT: string;
      LTS: string;
      L: string;
      LL: string;
      LLL: string;
      LLLL: string;
    };
    
    /** Regular expression to parse AM/PM markers (de/du in Hungarian) */
    meridiemParse: RegExp;
    
    /** Function to determine if time is PM */
    isPM: (meridiemString: string) => boolean;
    
    /** Function to get meridiem string */
    meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
    
    /** Calendar strings for relative dates */
    calendar: {
      sameDay: string;
      nextDay: string;
      nextWeek: () => string;
      lastDay: string;
      lastWeek: () => string;
      sameElse: string;
    };
    
    /** Relative time configuration */
    relativeTime: {
      future: string;
      past: string;
      s: RelativeTimeFormatter;
      ss: RelativeTimeFormatter;
      m: RelativeTimeFormatter;
      mm: RelativeTimeFormatter;
      h: RelativeTimeFormatter;
      hh: RelativeTimeFormatter;
      d: RelativeTimeFormatter;
      dd: RelativeTimeFormatter;
      M: RelativeTimeFormatter;
      MM: RelativeTimeFormatter;
      y: RelativeTimeFormatter;
      yy: RelativeTimeFormatter;
    };
    
    /** Pattern to parse ordinal day of month */
    dayOfMonthOrdinalParse: RegExp;
    
    /** Function to format ordinal numbers */
    ordinal: string;
    
    /** Week configuration */
    week: {
      /** Day of week (0=Sunday, 1=Monday) */
      dow: number;
      /** Day of year that determines first week */
      doy: number;
    };
  }

  /**
   * Type for relative time formatting functions
   * @param value - The numeric value (e.g., number of seconds, minutes)
   * @param withoutSuffix - Whether to omit the suffix
   * @param key - The unit key (e.g., 's', 'mm', 'h')
   * @param isFuture - Whether the time is in the future
   * @returns Formatted relative time string in Hungarian
   */
  type RelativeTimeFormatter = (
    value: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ) => string;

  /**
   * Formats relative time in Hungarian with proper grammar
   * Handles singular/plural forms and past/present tense
   * 
   * @param value - Numeric value to format
   * @param withoutSuffix - If true, returns present tense; if false, returns past tense
   * @param unit - Time unit key ('s', 'ss', 'm', 'mm', 'h', 'hh', 'd', 'dd', 'M', 'MM', 'y', 'yy')
   * @param isFuture - Whether the time reference is in the future
   * @returns Localized relative time string
   * 
   * @example
   * formatRelativeTime(5, true, 'mm', true) // "5 perc"
   * formatRelativeTime(5, false, 'mm', false) // "5 perce"
   */
  function formatRelativeTime(
    value: number,
    withoutSuffix: boolean,
    unit: string,
    isFuture: boolean
  ): string;

  /**
   * Formats calendar strings with proper weekday name and past/present tense
   * 
   * @param isNext - If true, formats for future (next week); if false, formats for past (last week)
   * @returns Calendar format string with appropriate weekday and time
   * 
   * @example
   * formatCalendar.call(momentInstance, true) // "[hétfőn] LT[-kor]"
   * formatCalendar.call(momentInstance, false) // "[múlt] [hétfőn] LT[-kor]"
   */
  function formatCalendar(this: { day(): number }, isNext: boolean): string;

  /**
   * Hungarian locale instance
   */
  const locale: Locale;

  export = locale;
}