/**
 * Moment.js locale configuration for German (Austria) - de-at
 * 
 * This module provides Austrian German locale settings for moment.js,
 * including month names, weekday names, date formats, and relative time formatting.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Format options for relative time expressions
 */
interface RelativeTimeFormatOptions {
  /** The numeric value (e.g., number of days, months) */
  value: number;
  /** Whether this is for a future time (true) or past time (false) */
  withoutSuffix: boolean;
  /** The format key (e.g., 'm', 'h', 'd', 'dd', 'w', 'M', 'MM', 'y', 'yy') */
  key: string;
  /** Whether the time is in the future */
  isFuture: boolean;
}

/**
 * Relative time format strings for different time units
 * Each unit has two forms: [nominative, dative] case
 */
interface RelativeTimeFormats {
  /** Minute formats: ["eine Minute", "einer Minute"] */
  m: [string, string];
  /** Hour formats: ["eine Stunde", "einer Stunde"] */
  h: [string, string];
  /** Day formats: ["ein Tag", "einem Tag"] */
  d: [string, string];
  /** Multiple days formats with count placeholder */
  dd: [string, string];
  /** Week formats: ["eine Woche", "einer Woche"] */
  w: [string, string];
  /** Month formats: ["ein Monat", "einem Monat"] */
  M: [string, string];
  /** Multiple months formats with count placeholder */
  MM: [string, string];
  /** Year formats: ["ein Jahr", "einem Jahr"] */
  y: [string, string];
  /** Multiple years formats with count placeholder */
  yy: [string, string];
}

/**
 * Formats relative time expressions according to German grammar rules.
 * Returns nominative case when used without suffix, dative case otherwise.
 * 
 * @param count - The numeric value to format
 * @param withoutSuffix - If true, uses nominative case; if false, uses dative case
 * @param key - The time unit key (m, h, d, dd, w, M, MM, y, yy)
 * @param isFuture - Whether the time reference is in the future
 * @returns Formatted relative time string in German
 */
function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const formats: RelativeTimeFormats = {
    m: ['eine Minute', 'einer Minute'],
    h: ['eine Stunde', 'einer Stunde'],
    d: ['ein Tag', 'einem Tag'],
    dd: [`${count} Tage`, `${count} Tagen`],
    w: ['eine Woche', 'einer Woche'],
    M: ['ein Monat', 'einem Monat'],
    MM: [`${count} Monate`, `${count} Monaten`],
    y: ['ein Jahr', 'einem Jahr'],
    yy: [`${count} Jahre`, `${count} Jahren`]
  };

  const formatPair = formats[key as keyof RelativeTimeFormats];
  return withoutSuffix ? formatPair[0] : formatPair[1];
}

/**
 * Austrian German (de-at) locale configuration
 */
export const deAtLocale: LocaleSpecification = {
  /** Full month names in Austrian German (using "Jänner" instead of "Januar") */
  months: [
    'Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ],

  /** Abbreviated month names */
  monthsShort: [
    'Jän.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni',
    'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'
  ],

  /** Use exact month name matching for parsing */
  monthsParseExact: true,

  /** Full weekday names */
  weekdays: [
    'Sonntag', 'Montag', 'Dienstag', 'Mittwoch',
    'Donnerstag', 'Freitag', 'Samstag'
  ],

  /** Abbreviated weekday names */
  weekdaysShort: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],

  /** Minimal weekday names */
  weekdaysMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],

  /** Use exact weekday name matching for parsing */
  weekdaysParseExact: true,

  /** Long date format templates */
  longDateFormat: {
    /** Time format: 24-hour format with minutes */
    LT: 'HH:mm',
    /** Time format with seconds */
    LTS: 'HH:mm:ss',
    /** Short date format */
    L: 'DD.MM.YYYY',
    /** Long date format */
    LL: 'D. MMMM YYYY',
    /** Long date and time format */
    LLL: 'D. MMMM YYYY HH:mm',
    /** Full date and time format with weekday */
    LLLL: 'dddd, D. MMMM YYYY HH:mm'
  },

  /** Calendar format strings for relative dates */
  calendar: {
    /** Format for today: "heute um 14:30 Uhr" */
    sameDay: '[heute um] LT [Uhr]',
    /** Format for other dates: use short date format */
    sameElse: 'L',
    /** Format for tomorrow: "morgen um 14:30 Uhr" */
    nextDay: '[morgen um] LT [Uhr]',
    /** Format for next week: "Montag um 14:30 Uhr" */
    nextWeek: 'dddd [um] LT [Uhr]',
    /** Format for yesterday: "gestern um 14:30 Uhr" */
    lastDay: '[gestern um] LT [Uhr]',
    /** Format for last week: "letzten Montag um 14:30 Uhr" */
    lastWeek: '[letzten] dddd [um] LT [Uhr]'
  },

  /** Relative time formatting */
  relativeTime: {
    /** Future time prefix: "in 3 Tagen" */
    future: 'in %s',
    /** Past time prefix: "vor 3 Tagen" */
    past: 'vor %s',
    /** A few seconds */
    s: 'ein paar Sekunden',
    /** Seconds with count */
    ss: '%d Sekunden',
    /** One minute */
    m: formatRelativeTime,
    /** Minutes with count */
    mm: '%d Minuten',
    /** One hour */
    h: formatRelativeTime,
    /** Hours with count */
    hh: '%d Stunden',
    /** One day */
    d: formatRelativeTime,
    /** Days with count */
    dd: formatRelativeTime,
    /** One week */
    w: formatRelativeTime,
    /** Weeks with count */
    ww: '%d Wochen',
    /** One month */
    M: formatRelativeTime,
    /** Months with count */
    MM: formatRelativeTime,
    /** One year */
    y: formatRelativeTime,
    /** Years with count */
    yy: formatRelativeTime
  },

  /** Pattern for parsing day of month ordinals (e.g., "1.", "25.") */
  dayOfMonthOrdinalParse: /\d{1,2}\./,

  /**
   * Formats a day of month as an ordinal (e.g., 1 -> "1.")
   * @param num - The day of month number
   */
  ordinal: '%d.',

  /** Week configuration */
  week: {
    /** Monday is the first day of the week (ISO 8601) */
    dow: 1,
    /** The week that contains Jan 4th is the first week of the year (ISO 8601) */
    doy: 4
  }
};

export default deAtLocale;