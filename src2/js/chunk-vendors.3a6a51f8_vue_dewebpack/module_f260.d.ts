/**
 * Moment.js locale configuration for Portuguese (pt)
 * 
 * This module configures moment.js to support Portuguese language formatting
 * for dates, times, and relative time expressions.
 * 
 * @module moment/locale/pt
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar specification for relative date formatting
 */
interface CalendarSpec {
  /** Format for dates occurring today */
  sameDay: string;
  /** Format for dates occurring tomorrow */
  nextDay: string;
  /** Format for dates occurring next week */
  nextWeek: string;
  /** Format for dates occurring yesterday */
  lastDay: string;
  /** Format function for dates occurring last week */
  lastWeek: (this: moment.Moment) => string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time format specification
 */
interface RelativeTimeSpec {
  /** Future time prefix format */
  future: string;
  /** Past time prefix format */
  past: string;
  /** Seconds (less than a minute) */
  s: string;
  /** N seconds */
  ss: string;
  /** A minute */
  m: string;
  /** N minutes */
  mm: string;
  /** An hour */
  h: string;
  /** N hours */
  hh: string;
  /** A day */
  d: string;
  /** N days */
  dd: string;
  /** A week */
  w: string;
  /** N weeks */
  ww: string;
  /** A month */
  M: string;
  /** N months */
  MM: string;
  /** A year */
  y: string;
  /** N years */
  yy: string;
}

/**
 * Week specification defining start of week
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year used to calculate week numbering */
  doy: number;
}

/**
 * Portuguese locale configuration object
 */
interface PortugueseLocaleConfig extends LocaleSpecification {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
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
  /** Calendar formatting rules */
  calendar: CalendarSpec;
  /** Relative time formatting rules */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number formatter */
  ordinal: string;
  /** Week calculation configuration */
  week: WeekSpec;
}

/**
 * Defines the Portuguese locale configuration for moment.js
 * 
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured Portuguese locale
 */
export function definePortugueseLocale(momentInstance: typeof moment): Locale;

/**
 * Portuguese locale configuration
 * Includes translations for months, weekdays, and relative time expressions
 */
export const portugueseLocaleConfig: PortugueseLocaleConfig;

/**
 * Month names in Portuguese
 */
export const MONTHS: readonly [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
];

/**
 * Abbreviated month names in Portuguese
 */
export const MONTHS_SHORT: readonly [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez'
];

/**
 * Weekday names in Portuguese
 */
export const WEEKDAYS: readonly [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
];

/**
 * Abbreviated weekday names in Portuguese
 */
export const WEEKDAYS_SHORT: readonly [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sáb'
];

/**
 * Minimal weekday names in Portuguese
 */
export const WEEKDAYS_MIN: readonly [
  'Do',
  '2ª',
  '3ª',
  '4ª',
  '5ª',
  '6ª',
  'Sá'
];

/**
 * First day of week (1 = Monday)
 */
export const WEEK_START_DAY: 1;

/**
 * Day of year for week calculation
 */
export const WEEK_DAY_OF_YEAR: 4;