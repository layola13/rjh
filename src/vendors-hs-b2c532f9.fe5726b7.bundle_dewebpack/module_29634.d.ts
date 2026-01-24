/**
 * Moment.js German (Switzerland) locale configuration
 * Provides date/time formatting, calendar, and relative time translations for de-CH locale
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Unit key for relative time formatting
 */
type RelativeTimeUnit = 
  | 'm'   // minute
  | 'h'   // hour
  | 'd'   // day
  | 'dd'  // days
  | 'w'   // week
  | 'M'   // month
  | 'MM'  // months
  | 'y'   // year
  | 'yy'; // years

/**
 * Translation map for relative time units
 * Each unit has two forms: [nominative, dative]
 */
interface RelativeTimeTranslations {
  m: [string, string];
  h: [string, string];
  d: [string, string];
  dd: [string, string];
  w: [string, string];
  M: [string, string];
  MM: [string, string];
  y: [string, string];
  yy: [string, string];
}

/**
 * Formats relative time strings with proper German grammar
 * @param count - The numeric value for the time unit
 * @param withoutSuffix - If true, returns nominative case; otherwise dative
 * @param unit - The time unit key
 * @param isFuture - Indicates if the time is in the future (unused in implementation)
 * @returns Formatted relative time string in German
 */
declare function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  unit: RelativeTimeUnit,
  isFuture: boolean
): string;

/**
 * German (Switzerland) locale configuration object
 */
declare const deChLocale: LocaleSpecification;

/**
 * Defines and registers the German (Switzerland) locale with moment.js
 * @param momentInstance - The moment.js instance to register the locale with
 * @returns The registered locale object
 */
export declare function defineLocale(momentInstance: typeof import('moment')): Locale;

export default deChLocale;

/**
 * Locale configuration for de-CH
 */
export declare const config: {
  /** Full month names in German */
  readonly months: readonly [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  
  /** Abbreviated month names */
  readonly monthsShort: readonly [
    'Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni',
    'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'
  ];
  
  /** Use exact parsing for months */
  readonly monthsParseExact: true;
  
  /** Full weekday names */
  readonly weekdays: readonly [
    'Sonntag', 'Montag', 'Dienstag', 'Mittwoch',
    'Donnerstag', 'Freitag', 'Samstag'
  ];
  
  /** Abbreviated weekday names */
  readonly weekdaysShort: readonly ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  
  /** Minimal weekday names */
  readonly weekdaysMin: readonly ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  
  /** Use exact parsing for weekdays */
  readonly weekdaysParseExact: true;
  
  /** Long date format tokens */
  readonly longDateFormat: {
    /** Time format (24-hour) */
    readonly LT: 'HH:mm';
    /** Time with seconds format */
    readonly LTS: 'HH:mm:ss';
    /** Short date format */
    readonly L: 'DD.MM.YYYY';
    /** Long date format */
    readonly LL: 'D. MMMM YYYY';
    /** Long date with time format */
    readonly LLL: 'D. MMMM YYYY HH:mm';
    /** Full date with weekday and time */
    readonly LLLL: 'dddd, D. MMMM YYYY HH:mm';
  };
  
  /** Calendar format strings */
  readonly calendar: {
    /** Format for today */
    readonly sameDay: '[heute um] LT [Uhr]';
    /** Format for other dates */
    readonly sameElse: 'L';
    /** Format for tomorrow */
    readonly nextDay: '[morgen um] LT [Uhr]';
    /** Format for next week */
    readonly nextWeek: 'dddd [um] LT [Uhr]';
    /** Format for yesterday */
    readonly lastDay: '[gestern um] LT [Uhr]';
    /** Format for last week */
    readonly lastWeek: '[letzten] dddd [um] LT [Uhr]';
  };
  
  /** Relative time formatting */
  readonly relativeTime: {
    /** Future time prefix */
    readonly future: 'in %s';
    /** Past time prefix */
    readonly past: 'vor %s';
    /** Seconds (singular) */
    readonly s: 'ein paar Sekunden';
    /** Seconds (plural) */
    readonly ss: '%d Sekunden';
    /** Minute (uses function) */
    readonly m: typeof formatRelativeTime;
    /** Minutes (plural) */
    readonly mm: '%d Minuten';
    /** Hour (uses function) */
    readonly h: typeof formatRelativeTime;
    /** Hours (plural) */
    readonly hh: '%d Stunden';
    /** Day (uses function) */
    readonly d: typeof formatRelativeTime;
    /** Days (uses function) */
    readonly dd: typeof formatRelativeTime;
    /** Week (uses function) */
    readonly w: typeof formatRelativeTime;
    /** Weeks (plural) */
    readonly ww: '%d Wochen';
    /** Month (uses function) */
    readonly M: typeof formatRelativeTime;
    /** Months (uses function) */
    readonly MM: typeof formatRelativeTime;
    /** Year (uses function) */
    readonly y: typeof formatRelativeTime;
    /** Years (uses function) */
    readonly yy: typeof formatRelativeTime;
  };
  
  /** Regex pattern for parsing day of month with ordinal */
  readonly dayOfMonthOrdinalParse: RegExp;
  
  /** Ordinal number format */
  readonly ordinal: '%d.';
  
  /** Week configuration */
  readonly week: {
    /** Day of week (1 = Monday) */
    readonly dow: 1;
    /** Day of year for first week */
    readonly doy: 4;
  };
};