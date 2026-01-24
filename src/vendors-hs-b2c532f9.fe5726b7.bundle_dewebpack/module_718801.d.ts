/**
 * Moment.js locale configuration for Basque (Euskara)
 * 
 * This module provides Basque language locale settings for moment.js,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module moment-locale-eu
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Month names in Basque (full format)
 */
export type BasqueMonths = [
  'urtarrila',
  'otsaila',
  'martxoa',
  'apirila',
  'maiatza',
  'ekaina',
  'uztaila',
  'abuztua',
  'iraila',
  'urria',
  'azaroa',
  'abendua'
];

/**
 * Month names in Basque (abbreviated format)
 */
export type BasqueMonthsShort = [
  'urt.',
  'ots.',
  'mar.',
  'api.',
  'mai.',
  'eka.',
  'uzt.',
  'abu.',
  'ira.',
  'urr.',
  'aza.',
  'abe.'
];

/**
 * Weekday names in Basque (full format)
 */
export type BasqueWeekdays = [
  'igandea',
  'astelehena',
  'asteartea',
  'asteazkena',
  'osteguna',
  'ostirala',
  'larunbata'
];

/**
 * Weekday names in Basque (abbreviated format)
 */
export type BasqueWeekdaysShort = [
  'ig.',
  'al.',
  'ar.',
  'az.',
  'og.',
  'ol.',
  'lr.'
];

/**
 * Weekday names in Basque (minimal format)
 */
export type BasqueWeekdaysMin = [
  'ig',
  'al',
  'ar',
  'az',
  'og',
  'ol',
  'lr'
];

/**
 * Long date format tokens for Basque locale
 */
export interface BasqueLongDateFormat {
  /** Time format (24-hour) */
  LT: 'HH:mm';
  /** Time format with seconds */
  LTS: 'HH:mm:ss';
  /** Short date format */
  L: 'YYYY-MM-DD';
  /** Long date format */
  LL: 'YYYY[ko] MMMM[ren] D[a]';
  /** Long date and time format */
  LLL: 'YYYY[ko] MMMM[ren] D[a] HH:mm';
  /** Full date and time format */
  LLLL: 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm';
  /** Short date format (lowercase) */
  l: 'YYYY-M-D';
  /** Abbreviated long date format */
  ll: 'YYYY[ko] MMM D[a]';
  /** Abbreviated long date and time format */
  lll: 'YYYY[ko] MMM D[a] HH:mm';
  /** Abbreviated full date and time format */
  llll: 'ddd, YYYY[ko] MMM D[a] HH:mm';
}

/**
 * Calendar format strings for Basque locale
 */
export interface BasqueCalendarFormat {
  /** Format for today */
  sameDay: '[gaur] LT[etan]';
  /** Format for tomorrow */
  nextDay: '[bihar] LT[etan]';
  /** Format for next week */
  nextWeek: 'dddd LT[etan]';
  /** Format for yesterday */
  lastDay: '[atzo] LT[etan]';
  /** Format for last week */
  lastWeek: '[aurreko] dddd LT[etan]';
  /** Format for other dates */
  sameElse: 'L';
}

/**
 * Relative time format strings for Basque locale
 */
export interface BasqueRelativeTime {
  /** Future time prefix */
  future: '%s barru';
  /** Past time prefix */
  past: 'duela %s';
  /** Seconds (few) */
  s: 'segundo batzuk';
  /** Seconds (plural) */
  ss: '%d segundo';
  /** Minute (singular) */
  m: 'minutu bat';
  /** Minutes (plural) */
  mm: '%d minutu';
  /** Hour (singular) */
  h: 'ordu bat';
  /** Hours (plural) */
  hh: '%d ordu';
  /** Day (singular) */
  d: 'egun bat';
  /** Days (plural) */
  dd: '%d egun';
  /** Month (singular) */
  M: 'hilabete bat';
  /** Months (plural) */
  MM: '%d hilabete';
  /** Year (singular) */
  y: 'urte bat';
  /** Years (plural) */
  yy: '%d urte';
}

/**
 * Week configuration for Basque locale
 */
export interface BasqueWeekConfig {
  /** Day of week (Monday = 1) */
  dow: 1;
  /** Day of year for first week */
  doy: 7;
}

/**
 * Complete Basque locale specification for moment.js
 */
export interface BasqueLocaleSpecification extends LocaleSpecification {
  months: string[];
  monthsShort: string[];
  monthsParseExact: true;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: true;
  longDateFormat: BasqueLongDateFormat;
  calendar: BasqueCalendarFormat;
  relativeTime: BasqueRelativeTime;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
  week: BasqueWeekConfig;
}

/**
 * Defines and registers the Basque locale for moment.js
 * 
 * @param momentInstance - The moment.js instance to register the locale with
 * @returns The registered Basque locale object
 * 
 * @example
 *