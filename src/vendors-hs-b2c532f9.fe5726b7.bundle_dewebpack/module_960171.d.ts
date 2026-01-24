/**
 * Moment.js Spanish (es) locale configuration module
 * Provides localization settings for Spanish language date/time formatting
 */

import type { Locale, LocaleSpecification, MomentInput } from 'moment';

/**
 * Month abbreviations with periods (used in certain contexts)
 */
type MonthShortWithPeriod = readonly [
  'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.',
  'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'
];

/**
 * Month abbreviations without periods (used in MMM format)
 */
type MonthShortNoPeriod = readonly [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
];

/**
 * Full month names in Spanish
 */
type MonthsFull = readonly [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

/**
 * Weekday names in Spanish
 */
type Weekdays = readonly [
  'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
];

/**
 * Configuration object for Spanish locale
 */
interface SpanishLocaleConfig extends LocaleSpecification {
  /** Full month names */
  months: MonthsFull;
  
  /** 
   * Month abbreviations (context-sensitive)
   * @param momentInstance - The moment instance for context
   * @param format - The format string being used
   * @returns Appropriate month abbreviation based on context
   */
  monthsShort: (momentInstance?: MomentInput, format?: string) => string[] | string;
  
  /** Regex for parsing month names (lenient) */
  monthsRegex: RegExp;
  
  /** Regex for parsing month abbreviations (lenient) */
  monthsShortRegex: RegExp;
  
  /** Regex for parsing full month names (strict) */
  monthsStrictRegex: RegExp;
  
  /** Regex for parsing month abbreviations (strict) */
  monthsShortStrictRegex: RegExp;
  
  /** Array of regex patterns for parsing individual months */
  monthsParse: ReadonlyArray<RegExp>;
  
  /** Array of regex patterns for parsing full month names */
  longMonthsParse: ReadonlyArray<RegExp>;
  
  /** Array of regex patterns for parsing short month names */
  shortMonthsParse: ReadonlyArray<RegExp>;
  
  /** Full weekday names */
  weekdays: Weekdays;
  
  /** Abbreviated weekday names with periods */
  weekdaysShort: readonly ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'];
  
  /** Minimal weekday abbreviations (2 letters) */
  weekdaysMin: readonly ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sá'];
  
  /** Whether to use exact matching for weekday parsing */
  weekdaysParseExact: true;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (hours:minutes) */
    LT: 'H:mm';
    /** Time format with seconds */
    LTS: 'H:mm:ss';
    /** Short date format */
    L: 'DD/MM/YYYY';
    /** Long date format */
    LL: 'D [de] MMMM [de] YYYY';
    /** Long date with time */
    LLL: 'D [de] MMMM [de] YYYY H:mm';
    /** Full date with weekday and time */
    LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm';
  };
  
  /** Calendar formatting for relative dates */
  calendar: {
    /** Format for today */
    sameDay: (this: MomentInput) => string;
    /** Format for tomorrow */
    nextDay: (this: MomentInput) => string;
    /** Format for next week */
    nextWeek: (this: MomentInput) => string;
    /** Format for yesterday */
    lastDay: (this: MomentInput) => string;
    /** Format for last week */
    lastWeek: (this: MomentInput) => string;
    /** Default format for other dates */
    sameElse: 'L';
  };
  
  /** Relative time strings */
  relativeTime: {
    future: 'en %s';
    past: 'hace %s';
    s: 'unos segundos';
    ss: '%d segundos';
    m: 'un minuto';
    mm: '%d minutos';
    h: 'una hora';
    hh: '%d horas';
    d: 'un día';
    dd: '%d días';
    w: 'una semana';
    ww: '%d semanas';
    M: 'un mes';
    MM: '%d meses';
    y: 'un año';
    yy: '%d años';
  };
  
  /** Regex for parsing ordinal day numbers */
  dayOfMonthOrdinalParse: RegExp;
  
  /** 
   * Format ordinal numbers
   * @param num - The number to format
   * @returns Formatted ordinal string
   */
  ordinal: (num: number) => string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: 1;
    /** Day of year for week 1 */
    doy: 4;
  };
  
  /** Invalid date message */
  invalidDate: 'Fecha inválida';
}

/**
 * Defines and registers the Spanish locale configuration with moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The registered Spanish locale
 */
export default function defineSpanishLocale(momentInstance: typeof import('moment')): Locale;