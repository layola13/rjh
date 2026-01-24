/**
 * Moment.js locale configuration for Dutch (Belgium) - nl-be
 * Defines localization settings including months, weekdays, date formats,
 * and relative time expressions for Belgian Dutch language support.
 */

import type { Locale, LocaleSpecification, MomentInput } from 'moment';

/**
 * Month abbreviations with periods (used in specific date formats)
 */
const MONTHS_SHORT_WITH_PERIODS: ReadonlyArray<string> = [
  'jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.',
  'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'
];

/**
 * Month abbreviations without periods (used in MMM format)
 */
const MONTHS_SHORT_WITHOUT_PERIODS: ReadonlyArray<string> = [
  'jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
  'jul', 'aug', 'sep', 'okt', 'nov', 'dec'
];

/**
 * Regular expressions for parsing month names and abbreviations
 */
const MONTH_PARSE_PATTERNS: ReadonlyArray<RegExp> = [
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
 * General regex for matching any month name or abbreviation
 */
const MONTH_REGEX: RegExp = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

/**
 * Strict regex for full month names only
 */
const MONTH_STRICT_REGEX: RegExp = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i;

/**
 * Strict regex for month abbreviations only
 */
const MONTH_SHORT_STRICT_REGEX: RegExp = /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

/**
 * Full month names in Dutch (Belgium)
 */
const MONTHS: ReadonlyArray<string> = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december'
];

/**
 * Full weekday names in Dutch (Belgium)
 */
const WEEKDAYS: ReadonlyArray<string> = [
  'zondag', 'maandag', 'dinsdag', 'woensdag',
  'donderdag', 'vrijdag', 'zaterdag'
];

/**
 * Abbreviated weekday names with periods
 */
const WEEKDAYS_SHORT: ReadonlyArray<string> = [
  'zo.', 'ma.', 'di.', 'wo.', 'do.', 'vr.', 'za.'
];

/**
 * Minimal weekday abbreviations
 */
const WEEKDAYS_MIN: ReadonlyArray<string> = [
  'zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'
];

/**
 * First day of week (Monday = 1)
 */
const FIRST_DAY_OF_WEEK = 1;

/**
 * First week of year definition (ISO week date)
 */
const FIRST_DAY_OF_YEAR = 4;

/**
 * Returns appropriate month abbreviation based on format context
 * @param momentInstance - The moment date object
 * @param format - The date format string being used
 * @returns Array of month abbreviations or specific month abbreviation
 */
function getMonthsShort(
  momentInstance: MomentInput | undefined,
  format: string
): string | ReadonlyArray<string> {
  if (!momentInstance) {
    return MONTHS_SHORT_WITH_PERIODS;
  }
  
  const isMMM = /-MMM-/.test(format);
  const monthIndex = (momentInstance as any).month();
  
  return isMMM
    ? MONTHS_SHORT_WITHOUT_PERIODS[monthIndex]
    : MONTHS_SHORT_WITH_PERIODS[monthIndex];
}

/**
 * Returns ordinal suffix for day of month
 * @param dayOfMonth - The day number (1-31)
 * @returns Day number with appropriate suffix ("ste" or "de")
 */
function getOrdinal(dayOfMonth: number): string {
  const useSteSuffix = dayOfMonth === 1 || dayOfMonth === 8 || dayOfMonth >= 20;
  return `${dayOfMonth}${useSteSuffix ? 'ste' : 'de'}`;
}

/**
 * Dutch (Belgium) locale configuration for moment.js
 */
export const nlBeLocaleConfig: LocaleSpecification = {
  months: MONTHS as any,
  monthsShort: getMonthsShort as any,
  monthsRegex: MONTH_REGEX,
  monthsShortRegex: MONTH_REGEX,
  monthsStrictRegex: MONTH_STRICT_REGEX,
  monthsShortStrictRegex: MONTH_SHORT_STRICT_REGEX,
  monthsParse: MONTH_PARSE_PATTERNS as any,
  longMonthsParse: MONTH_PARSE_PATTERNS as any,
  shortMonthsParse: MONTH_PARSE_PATTERNS as any,
  
  weekdays: WEEKDAYS as any,
  weekdaysShort: WEEKDAYS_SHORT as any,
  weekdaysMin: WEEKDAYS_MIN as any,
  weekdaysParseExact: true,
  
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  
  calendar: {
    sameDay: '[vandaag om] LT',
    nextDay: '[morgen om] LT',
    nextWeek: 'dddd [om] LT',
    lastDay: '[gisteren om] LT',
    lastWeek: '[afgelopen] dddd [om] LT',
    sameElse: 'L'
  },
  
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
    M: 'één maand',
    MM: '%d maanden',
    y: 'één jaar',
    yy: '%d jaar'
  },
  
  dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
  ordinal: getOrdinal,
  
  week: {
    dow: FIRST_DAY_OF_WEEK,
    doy: FIRST_DAY_OF_YEAR
  }
};

/**
 * Registers the nl-be locale with moment.js
 * @param moment - The moment.js instance
 */
export function defineNlBeLocale(moment: typeof import('moment')): Locale {
  return moment.defineLocale('nl-be', nlBeLocaleConfig);
}

export default defineNlBeLocale;