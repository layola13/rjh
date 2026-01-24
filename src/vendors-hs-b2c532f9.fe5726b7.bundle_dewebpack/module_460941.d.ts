/**
 * Moment.js Serbian Cyrillic (sr-cyrl) locale configuration
 * Provides localized date/time formatting and relative time calculations for Serbian language using Cyrillic script.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object containing grammatical rules and translations for Serbian Cyrillic locale
 */
interface SerbianCyrillicLocaleConfig {
  /**
   * Translation words for different time units with grammatical cases
   */
  words: {
    /** Seconds: [nominative singular, genitive singular, genitive plural] */
    ss: [string, string, string];
    /** Minute: [nominative, genitive] */
    m: [string, string];
    /** Minutes: [nominative singular, genitive singular, genitive plural] */
    mm: [string, string, string];
    /** Hour: [nominative, genitive] */
    h: [string, string];
    /** Hours: [nominative singular, genitive singular, genitive plural] */
    hh: [string, string, string];
    /** Day: [nominative, genitive] */
    d: [string, string];
    /** Days: [nominative singular, genitive singular, genitive plural] */
    dd: [string, string, string];
    /** Month: [nominative, genitive] */
    M: [string, string];
    /** Months: [nominative singular, genitive singular, genitive plural] */
    MM: [string, string, string];
    /** Year: [nominative, genitive] */
    y: [string, string];
    /** Years: [nominative singular, genitive singular, genitive plural] */
    yy: [string, string, string];
  };

  /**
   * Determines correct grammatical case based on number value
   * @param number - The numeric value to evaluate
   * @param choices - Array of grammatical forms [form1, form2, form3]
   * @returns The appropriate grammatical form
   */
  correctGrammaticalCase(number: number, choices: string[]): string;

  /**
   * Translates time units with proper Serbian grammar
   * @param number - The numeric value
   * @param withoutSuffix - Whether to omit suffix (e.g., "ago")
   * @param key - Time unit key (ss, m, mm, h, hh, d, dd, M, MM, y, yy)
   * @param isFuture - Whether the time is in the future
   * @returns Translated and grammatically correct string
   */
  translate(number: number, withoutSuffix: boolean, key: string, isFuture: boolean): string;
}

/**
 * Calendar format function type for determining date display format
 */
type CalendarFormatFunction = (this: Date) => string;

/**
 * Locale specification for Serbian Cyrillic
 */
declare const localeConfig: LocaleSpecification & {
  /** Month names in full form */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Use exact parsing for months */
  monthsParseExact: boolean;
  /** Weekday names in full form */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names (2 characters) */
  weekdaysMin: string[];
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format tokens */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  /** Calendar format rules for relative dates */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: CalendarFormatFunction;
    lastDay: string;
    lastWeek: CalendarFormatFunction;
    sameElse: string;
  };
  /** Relative time formatting */
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    m: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    mm: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    h: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    hh: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    d: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    dd: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    M: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    MM: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    y: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    yy: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
  };
  /** Day of month ordinal parsing pattern */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number format */
  ordinal: string;
  /** Week configuration */
  week: {
    /** Day of week (0 = Sunday, 1 = Monday) */
    dow: number;
    /** Day of year for week calculation */
    doy: number;
  };
};

/**
 * Registers and returns the Serbian Cyrillic locale for moment.js
 */
export default localeConfig;