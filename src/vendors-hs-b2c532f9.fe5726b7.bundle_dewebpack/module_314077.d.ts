/**
 * Moment.js locale configuration for Dutch (nl)
 * Defines date/time formatting, month/weekday names, and relative time expressions for Dutch language
 */

import { Locale, LocaleSpecification, Moment } from 'moment';

/**
 * Abbreviated month names with periods (used in specific contexts)
 */
const MONTHS_SHORT_WITH_DOTS: readonly string[] = [
  'jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.',
  'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'
];

/**
 * Abbreviated month names without periods (used in MMM format)
 */
const MONTHS_SHORT_WITHOUT_DOTS: readonly string[] = [
  'jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
  'jul', 'aug', 'sep', 'okt', 'nov', 'dec'
];

/**
 * Regular expressions for parsing individual months (case-insensitive)
 */
const MONTH_PARSE_PATTERNS: readonly RegExp[] = [
  /^jan/i,
  /^feb/i,
  /^(maart|mrt\.?)$/i,
  /^apr/i,
  /^mei$/i,
  /^jun[i.]?$/i,
  /^jul[i.]?$/i,
  /^aug/i,
  /^sep/i,
  /^okt/i,
  /^nov/i,
  /^dec/i
];

/**
 * General regex for matching any month name or abbreviation
 */
const MONTHS_REGEX: RegExp = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

/**
 * Strict regex for full month names only
 */
const MONTHS_STRICT_REGEX: RegExp = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i;

/**
 * Strict regex for abbreviated month names only
 */
const MONTHS_SHORT_STRICT_REGEX: RegExp = /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

/**
 * Dutch locale configuration for Moment.js
 */
export interface DutchLocaleConfig extends LocaleSpecification {
  months: string;
  monthsShort: (momentInstance: Moment | null, format: string) => string[] | string;
  monthsRegex: RegExp;
  monthsShortRegex: RegExp;
  monthsStrictRegex: RegExp;
  monthsShortStrictRegex: RegExp;
  monthsParse: readonly RegExp[];
  longMonthsParse: readonly RegExp[];
  shortMonthsParse: readonly RegExp[];
  weekdays: string;
  weekdaysShort: string;
  weekdaysMin: string;
  weekdaysParseExact: boolean;
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
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
    w: string;
    ww: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

/**
 * Returns the appropriate month abbreviation based on format context
 * @param momentInstance - The moment instance (null if called without context)
 * @param format - The format string being used
 * @returns Array of month abbreviations or single abbreviation
 */
declare function getMonthsShort(
  momentInstance: Moment | null,
  format: string
): string[] | string;

/**
 * Returns the ordinal suffix for a given day of the month
 * @param dayOfMonth - The day number (1-31)
 * @returns The day with appropriate Dutch ordinal suffix ("ste" or "de")
 */
declare function getOrdinal(dayOfMonth: number): string;

/**
 * Defines and registers the Dutch locale configuration with Moment.js
 * @param moment - The Moment.js instance
 * @returns The registered Dutch locale
 */
declare function defineNlLocale(moment: typeof import('moment')): Locale;

export default defineNlLocale;