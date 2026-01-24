/**
 * Moment.js locale configuration for Faroese (fo)
 * 
 * This module provides localization settings for the Faroese language,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module moment-locale-fo
 */

import { Moment } from 'moment';

/**
 * Calendar specification for relative date display
 */
interface CalendarSpec {
  /** Format for dates occurring today */
  sameDay: string;
  /** Format for dates occurring tomorrow */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates occurring yesterday */
  lastDay: string;
  /** Format for dates in the last week */
  lastWeek: string;
  /** Fallback format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration for duration formatting
 */
interface RelativeTimeSpec {
  /** Format for future dates */
  future: string;
  /** Format for past dates */
  past: string;
  /** Format for seconds */
  s: string;
  /** Format for multiple seconds */
  ss: string;
  /** Format for a minute */
  m: string;
  /** Format for multiple minutes */
  mm: string;
  /** Format for an hour */
  h: string;
  /** Format for multiple hours */
  hh: string;
  /** Format for a day */
  d: string;
  /** Format for multiple days */
  dd: string;
  /** Format for a month */
  M: string;
  /** Format for multiple months */
  MM: string;
  /** Format for a year */
  y: string;
  /** Format for multiple years */
  yy: string;
}

/**
 * Long date format tokens
 */
interface LongDateFormatSpec {
  /** Time format (hours:minutes) */
  LT: string;
  /** Time format with seconds (hours:minutes:seconds) */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date format with time */
  LLL: string;
  /** Full date format with day of week and time */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year for the first week of the year */
  doy: number;
}

/**
 * Complete locale configuration for Moment.js
 */
interface LocaleSpecification {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimally abbreviated weekday names */
  weekdaysMin: string[];
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  /** Calendar relative date formats */
  calendar: CalendarSpec;
  /** Relative time formatting */
  relativeTime: RelativeTimeSpec;
  /** Regular expression for parsing ordinal numbers */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number format */
  ordinal: string;
  /** Week numbering configuration */
  week: WeekSpec;
}

/**
 * Faroese locale configuration
 */
export const faroeseLocale: LocaleSpecification = {
  months: [
    'januar',
    'februar',
    'mars',
    'apríl',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember'
  ],
  monthsShort: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
  weekdays: [
    'sunnudagur',
    'mánadagur',
    'týsdagur',
    'mikudagur',
    'hósdagur',
    'fríggjadagur',
    'leygardagur'
  ],
  weekdaysShort: ['sun', 'mán', 'týs', 'mik', 'hós', 'frí', 'ley'],
  weekdaysMin: ['su', 'má', 'tý', 'mi', 'hó', 'fr', 'le'],
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D. MMMM, YYYY HH:mm'
  },
  calendar: {
    sameDay: '[Í dag kl.] LT',
    nextDay: '[Í morgin kl.] LT',
    nextWeek: 'dddd [kl.] LT',
    lastDay: '[Í gjár kl.] LT',
    lastWeek: '[síðstu] dddd [kl] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'um %s',
    past: '%s síðani',
    s: 'fá sekund',
    ss: '%d sekundir',
    m: 'ein minuttur',
    mm: '%d minuttir',
    h: 'ein tími',
    hh: '%d tímar',
    d: 'ein dagur',
    dd: '%d dagar',
    M: 'ein mánaður',
    MM: '%d mánaðir',
    y: 'eitt ár',
    yy: '%d ár'
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',
  week: {
    dow: 1,
    doy: 4
  }
};

/**
 * Registers the Faroese locale with Moment.js
 * 
 * @param moment - The Moment.js instance
 */
export function defineLocale(moment: typeof Moment): void {
  moment.defineLocale('fo', faroeseLocale);
}

export default faroeseLocale;