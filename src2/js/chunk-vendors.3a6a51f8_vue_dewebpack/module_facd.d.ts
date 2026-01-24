/**
 * Moment.js locale configuration for Dutch (nl)
 * 
 * This module provides localization settings for the Dutch language,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module moment-locale-nl
 */

import { Moment, LocaleSpecification } from 'moment';

/**
 * Abbreviated month names with periods (used in certain date formats)
 */
const MONTHS_SHORT_WITH_PERIODS: readonly string[] = [
  'jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.',
  'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'
];

/**
 * Abbreviated month names without periods (used in MMM format)
 */
const MONTHS_SHORT_WITHOUT_PERIODS: readonly string[] = [
  'jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
  'jul', 'aug', 'sep', 'okt', 'nov', 'dec'
];

/**
 * Regular expressions for parsing month names and abbreviations
 */
const MONTH_PARSE_PATTERNS: readonly RegExp[] = [
  /^jan/i,
  /^feb/i,
  /^maart|mrt.?$/i,
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
 * General regex pattern for matching any month name or abbreviation
 */
const MONTH_REGEX: RegExp = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

/**
 * Returns the appropriate month abbreviation based on the format string
 * 
 * @param momentInstance - The moment instance containing the date
 * @param format - The format string being used
 * @returns Array of month abbreviations or a single abbreviation
 */
function getMonthsShort(momentInstance: Moment | undefined, format: string): string | string[] {
  if (!momentInstance) {
    return MONTHS_SHORT_WITH_PERIODS as unknown as string[];
  }
  
  // Use abbreviated form without periods in -MMM- format
  if (/-MMM-/.test(format)) {
    return MONTHS_SHORT_WITHOUT_PERIODS[momentInstance.month()];
  }
  
  return MONTHS_SHORT_WITH_PERIODS[momentInstance.month()];
}

/**
 * Returns the ordinal suffix for a given day of the month
 * 
 * @param dayOfMonth - The day number (1-31)
 * @returns The ordinal suffix ("ste" or "de")
 */
function getOrdinalSuffix(dayOfMonth: number): string {
  // Days 1, 8, and 20+ use "ste", others use "de"
  return dayOfMonth + (dayOfMonth === 1 || dayOfMonth === 8 || dayOfMonth >= 20 ? 'ste' : 'de');
}

/**
 * Dutch locale configuration for Moment.js
 */
export const dutchLocaleConfig: LocaleSpecification = {
  /** Full month names */
  months: [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december'
  ],

  /** Abbreviated month names (context-dependent) */
  monthsShort: getMonthsShort as unknown as string | string[],

  /** Regex for parsing month names (lenient) */
  monthsRegex: MONTH_REGEX,

  /** Regex for parsing abbreviated month names (lenient) */
  monthsShortRegex: MONTH_REGEX,

  /** Regex for parsing full month names (strict) */
  monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,

  /** Regex for parsing abbreviated month names (strict) */
  monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

  /** Month parsing patterns */
  monthsParse: MONTH_PARSE_PATTERNS as unknown as RegExp[],

  /** Long month parsing patterns */
  longMonthsParse: MONTH_PARSE_PATTERNS as unknown as RegExp[],

  /** Short month parsing patterns */
  shortMonthsParse: MONTH_PARSE_PATTERNS as unknown as RegExp[],

  /** Full weekday names */
  weekdays: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],

  /** Abbreviated weekday names */
  weekdaysShort: ['zo.', 'ma.', 'di.', 'wo.', 'do.', 'vr.', 'za.'],

  /** Minimal weekday names */
  weekdaysMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],

  /** Use exact parsing for weekdays */
  weekdaysParseExact: true,

  /** Long date format tokens */
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD-MM-YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },

  /** Calendar format strings for relative dates */
  calendar: {
    sameDay: '[vandaag om] LT',
    nextDay: '[morgen om] LT',
    nextWeek: 'dddd [om] LT',
    lastDay: '[gisteren om] LT',
    lastWeek: '[afgelopen] dddd [om] LT',
    sameElse: 'L'
  },

  /** Relative time format strings */
  relativeTime: {
    future: 'over %s',
    past: '%s geleden',
    s: 'een paar seconden',
    ss: '%d seconden',
    m: 'één minuut',
    mm: '%d minuten',
    h: 'één uur',
    hh: '%d uur',
    d: 'één dag',
    dd: '%d dagen',
    w: 'één week',
    ww: '%d weken',
    M: 'één maand',
    MM: '%d maanden',
    y: 'één jaar',
    yy: '%d jaar'
  },

  /** Regex for parsing day of month ordinals */
  dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,

  /** Function to generate ordinal day strings */
  ordinal: getOrdinalSuffix,

  /** Week configuration */
  week: {
    dow: 1, // Monday is the first day of the week
    doy: 4  // The week containing Jan 4th is the first week of the year
  }
};

/**
 * Initializes the Dutch locale in Moment.js
 * 
 * @param moment - The Moment.js instance
 */
export function initializeDutchLocale(moment: typeof Moment): void {
  moment.defineLocale('nl', dutchLocaleConfig);
}