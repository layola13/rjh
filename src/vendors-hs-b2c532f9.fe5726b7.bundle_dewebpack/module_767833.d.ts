/**
 * Moment.js locale configuration for Slovak (sk)
 * 
 * This module provides Slovak language localization for moment.js,
 * including month names, weekday names, date formats, and relative time formatting.
 * 
 * @module moment-locale-sk
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Full month names in Slovak
 */
const MONTHS: readonly string[] = [
  'január',
  'február',
  'marec',
  'apríl',
  'máj',
  'jún',
  'júl',
  'august',
  'september',
  'október',
  'november',
  'december'
];

/**
 * Abbreviated month names in Slovak
 */
const MONTHS_SHORT: readonly string[] = [
  'jan',
  'feb',
  'mar',
  'apr',
  'máj',
  'jún',
  'júl',
  'aug',
  'sep',
  'okt',
  'nov',
  'dec'
];

/**
 * Full weekday names in Slovak
 */
const WEEKDAYS: readonly string[] = [
  'nedeľa',
  'pondelok',
  'utorok',
  'streda',
  'štvrtok',
  'piatok',
  'sobota'
];

/**
 * Short weekday abbreviations in Slovak
 */
const WEEKDAYS_SHORT: readonly string[] = [
  'ne',
  'po',
  'ut',
  'st',
  'št',
  'pi',
  'so'
];

/**
 * Minimum weekday abbreviations in Slovak
 */
const WEEKDAYS_MIN: readonly string[] = [
  'ne',
  'po',
  'ut',
  'st',
  'št',
  'pi',
  'so'
];

/**
 * Checks if a number requires plural form (2-4) in Slovak grammar
 * 
 * @param count - The numeric value to check
 * @returns True if the number is between 2 and 4 (inclusive), false otherwise
 */
function requiresPluralForm(count: number): boolean {
  return count > 1 && count < 5;
}

/**
 * Formats relative time strings with proper Slovak grammar
 * 
 * @param count - The numeric value for the time unit
 * @param withoutSuffix - Whether to format without suffix (e.g., "ago")
 * @param key - The time unit key (s, m, h, d, M, y, etc.)
 * @param isFuture - Whether the time is in the future
 * @returns Localized relative time string
 */
function relativeTimeFormatter(
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const value = `${count} `;

  switch (key) {
    case 's':
      return withoutSuffix || isFuture ? 'pár sekúnd' : 'pár sekundami';

    case 'ss':
      return withoutSuffix || isFuture
        ? value + (requiresPluralForm(count) ? 'sekundy' : 'sekúnd')
        : value + 'sekundami';

    case 'm':
      return withoutSuffix ? 'minúta' : isFuture ? 'minútu' : 'minútou';

    case 'mm':
      return withoutSuffix || isFuture
        ? value + (requiresPluralForm(count) ? 'minúty' : 'minút')
        : value + 'minútami';

    case 'h':
      return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou';

    case 'hh':
      return withoutSuffix || isFuture
        ? value + (requiresPluralForm(count) ? 'hodiny' : 'hodín')
        : value + 'hodinami';

    case 'd':
      return withoutSuffix || isFuture ? 'deň' : 'dňom';

    case 'dd':
      return withoutSuffix || isFuture
        ? value + (requiresPluralForm(count) ? 'dni' : 'dní')
        : value + 'dňami';

    case 'M':
      return withoutSuffix || isFuture ? 'mesiac' : 'mesiacom';

    case 'MM':
      return withoutSuffix || isFuture
        ? value + (requiresPluralForm(count) ? 'mesiace' : 'mesiacov')
        : value + 'mesiacmi';

    case 'y':
      return withoutSuffix || isFuture ? 'rok' : 'rokom';

    case 'yy':
      return withoutSuffix || isFuture
        ? value + (requiresPluralForm(count) ? 'roky' : 'rokov')
        : value + 'rokmi';

    default:
      return '';
  }
}

/**
 * Returns the appropriate calendar string for next week based on the day
 * 
 * @param this - The moment instance (context-bound)
 * @returns Formatted calendar string
 */
function nextWeekFormatter(this: { day(): number }): string {
  const dayOfWeek = this.day();

  switch (dayOfWeek) {
    case 0: // Sunday
      return '[v nedeľu o] LT';
    case 1: // Monday
    case 2: // Tuesday
      return '[v] dddd [o] LT';
    case 3: // Wednesday
      return '[v stredu o] LT';
    case 4: // Thursday
      return '[vo štvrtok o] LT';
    case 5: // Friday
      return '[v piatok o] LT';
    case 6: // Saturday
      return '[v sobotu o] LT';
    default:
      return '';
  }
}

/**
 * Returns the appropriate calendar string for last week based on the day
 * 
 * @param this - The moment instance (context-bound)
 * @returns Formatted calendar string
 */
function lastWeekFormatter(this: { day(): number }): string {
  const dayOfWeek = this.day();

  switch (dayOfWeek) {
    case 0: // Sunday
      return '[minulú nedeľu o] LT';
    case 1: // Monday
    case 2: // Tuesday
    case 4: // Thursday
    case 5: // Friday
      return '[minulý] dddd [o] LT';
    case 3: // Wednesday
      return '[minulú stredu o] LT';
    case 6: // Saturday
      return '[minulú sobotu o] LT';
    default:
      return '';
  }
}

/**
 * Slovak locale configuration object
 */
export const localeConfig: LocaleSpecification = {
  months: MONTHS as unknown as string[],
  monthsShort: MONTHS_SHORT as unknown as string[],
  weekdays: WEEKDAYS as unknown as string[],
  weekdaysShort: WEEKDAYS_SHORT as unknown as string[],
  weekdaysMin: WEEKDAYS_MIN as unknown as string[],

  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd D. MMMM YYYY H:mm'
  },

  calendar: {
    sameDay: '[dnes o] LT',
    nextDay: '[zajtra o] LT',
    nextWeek: nextWeekFormatter,
    lastDay: '[včera o] LT',
    lastWeek: lastWeekFormatter,
    sameElse: 'L'
  },

  relativeTime: {
    future: 'za %s',
    past: 'pred %s',
    s: relativeTimeFormatter,
    ss: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: relativeTimeFormatter,
    dd: relativeTimeFormatter,
    M: relativeTimeFormatter,
    MM: relativeTimeFormatter,
    y: relativeTimeFormatter,
    yy: relativeTimeFormatter
  },

  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',

  week: {
    dow: 1, // Monday is the first day of the week
    doy: 4  // The week that contains Jan 4th is the first week of the year
  }
};

/**
 * Defines and registers the Slovak locale with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The registered locale object
 */
export function defineLocale(moment: { defineLocale(name: string, config: LocaleSpecification): Locale }): Locale {
  return moment.defineLocale('sk', localeConfig);
}

export default defineLocale;