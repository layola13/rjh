/**
 * Moment.js locale configuration for Kannada (kn)
 * 
 * This module provides localization support for the Kannada language,
 * including month names, weekday names, date formats, and number translations
 * between Western digits and Kannada numerals.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping from Western digits (0-9) to Kannada numerals
 */
type WesternToKannadaDigitMap = {
  readonly '1': '೧';
  readonly '2': '೨';
  readonly '3': '೩';
  readonly '4': '೪';
  readonly '5': '೫';
  readonly '6': '೬';
  readonly '7': '೭';
  readonly '8': '೮';
  readonly '9': '೯';
  readonly '0': '೦';
};

/**
 * Mapping from Kannada numerals to Western digits (0-9)
 */
type KannadaToWesternDigitMap = {
  readonly '೧': '1';
  readonly '೨': '2';
  readonly '೩': '3';
  readonly '೪': '4';
  readonly '೫': '5';
  readonly '೬': '6';
  readonly '೭': '7';
  readonly '೮': '8';
  readonly '೯': '9';
  readonly '೦': '0';
};

/**
 * Kannada meridiem periods
 */
type KannadaMeridiem = 'ರಾತ್ರಿ' | 'ಬೆಳಿಗ್ಗೆ' | 'ಮಧ್ಯಾಹ್ನ' | 'ಸಂಜೆ';

/**
 * Locale configuration interface for Kannada
 */
interface KannadaLocaleConfig extends LocaleSpecification {
  /** Full month names in Kannada */
  months: string[];
  
  /** Abbreviated month names in Kannada */
  monthsShort: string[];
  
  /** Enable strict month name parsing */
  monthsParseExact: boolean;
  
  /** Full weekday names in Kannada */
  weekdays: string[];
  
  /** Abbreviated weekday names in Kannada */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Kannada */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  
  /** Calendar display formats for relative dates */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  
  /** Relative time format strings */
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: string;
    m: string;
    mm: string;
    h: string;
    hh: string;
    d: string;
    dd: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
  
  /**
   * Convert Kannada numerals to Western digits during parsing
   * @param input - String containing Kannada numerals
   * @returns String with Western digits
   */
  preparse(input: string): string;
  
  /**
   * Convert Western digits to Kannada numerals for display
   * @param input - String containing Western digits
   * @returns String with Kannada numerals
   */
  postformat(input: string): string;
  
  /** Regex pattern to match Kannada meridiem indicators */
  meridiemParse: RegExp;
  
  /**
   * Convert 12-hour format with meridiem to 24-hour format
   * @param hour - Hour in 12-hour format (1-12)
   * @param meridiem - Kannada meridiem indicator
   * @returns Hour in 24-hour format (0-23)
   */
  meridiemHour(hour: number, meridiem: KannadaMeridiem): number | undefined;
  
  /**
   * Determine the appropriate Kannada meridiem indicator for a given time
   * @param hour - Hour in 24-hour format (0-23)
   * @param minute - Minute (0-59)
   * @param isLowercase - Whether to return lowercase (unused in Kannada)
   * @returns Kannada meridiem indicator
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): KannadaMeridiem;
  
  /** Regex pattern to match ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Format day of month with ordinal suffix
   * @param dayOfMonth - Day of the month (1-31)
   * @returns Day with Kannada ordinal suffix
   */
  ordinal(dayOfMonth: number): string;
  
  /** Week configuration */
  week: {
    /** Day of week that starts the week (0 = Sunday) */
    dow: number;
    /** Day of year that starts the first week */
    doy: number;
  };
}

/**
 * Defines the Kannada locale configuration for moment.js
 * @param moment - Moment.js instance
 * @returns The defined locale
 */
export function defineKannadaLocale(moment: typeof import('moment')): Locale;

/**
 * Kannada locale identifier
 */
export const LOCALE_CODE: 'kn';

export default KannadaLocaleConfig;