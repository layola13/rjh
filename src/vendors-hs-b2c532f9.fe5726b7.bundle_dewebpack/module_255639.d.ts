/**
 * Moment.js locale configuration for Dutch (Belgium) - nl-be
 * 
 * This module configures moment.js to support Dutch language formatting
 * for Belgian locale, including month names, weekday names, date formats,
 * and relative time expressions.
 */

import { Locale, MomentInput } from 'moment';

/**
 * Abbreviated month names with periods (used in certain contexts)
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
 * Full month names in Dutch (Belgium)
 */
const MONTHS_FULL: readonly string[] = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december'
];

/**
 * Weekday names in Dutch
 */
const WEEKDAYS: readonly string[] = [
  'zondag', 'maandag', 'dinsdag', 'woensdag',
  'donderdag', 'vrijdag', 'zaterdag'
];

/**
 * Abbreviated weekday names with periods
 */
const WEEKDAYS_SHORT: readonly string[] = [
  'zo.', 'ma.', 'di.', 'wo.', 'do.', 'vr.', 'za.'
];

/**
 * Minimum weekday abbreviations
 */
const WEEKDAYS_MIN: readonly string[] = [
  'zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'
];

/**
 * Regular expressions for parsing individual months
 */
const MONTH_PARSE_REGEXES: readonly RegExp[] = [
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
 * General regex for matching any month name (full or abbreviated)
 */
const MONTH_REGEX: RegExp = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

/**
 * Strict regex for full month names only
 */
const MONTH_STRICT_REGEX: RegExp = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i;

/**
 * Strict regex for abbreviated month names only
 */
const MONTH_SHORT_STRICT_REGEX: RegExp = /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

/**
 * Regex for parsing day of month ordinals (e.g., "1ste", "2de")
 */
const DAY_OF_MONTH_ORDINAL_REGEX: RegExp = /\d{1,2}(ste|de)/;

/** First day of week (1 = Monday) */
const FIRST_DAY_OF_WEEK = 1;

/** First day of year for week calculation */
const FIRST_DAY_OF_YEAR = 4;

/**
 * Long date format tokens and their corresponding format strings
 */
interface LongDateFormat {
  /** Time format (24-hour) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date and time format */
  LLL: string;
  /** Full date and time format with weekday */
  LLLL: string;
}

/**
 * Calendar format strings for relative dates
 */
interface CalendarSpec {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for yesterday */
  lastDay: string;
  /** Format for last week */
  lastWeek: string;
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeSpec {
  /** Future time prefix */
  future: string;
  /** Past time suffix */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural) */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (plural) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Configuration object for Dutch (Belgium) locale
 */
interface DutchBelgiumLocaleConfig {
  /** Full month names */
  months: string[];
  /** Function or array returning abbreviated month names */
  monthsShort: (m: MomentInput | undefined, format: string) => string | string[];
  /** General month matching regex */
  monthsRegex: RegExp;
  /** General short month matching regex */
  monthsShortRegex: RegExp;
  /** Strict full month matching regex */
  monthsStrictRegex: RegExp;
  /** Strict short month matching regex */
  monthsShortStrictRegex: RegExp;
  /** Array of regexes for parsing individual months */
  monthsParse: readonly RegExp[];
  /** Array of regexes for parsing long month names */
  longMonthsParse: readonly RegExp[];
  /** Array of regexes for parsing short month names */
  shortMonthsParse: readonly RegExp[];
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimum weekday abbreviations */
  weekdaysMin: string[];
  /** Whether to parse weekdays exactly */
  weekdaysParseExact: boolean;
  /** Long date format configurations */
  longDateFormat: LongDateFormat;
  /** Calendar format configurations */
  calendar: CalendarSpec;
  /** Relative time format configurations */
  relativeTime: RelativeTimeSpec;
  /** Regex for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to generate ordinal suffix for a day number */
  ordinal: (dayOfMonth: number) => string;
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** First day of year */
    doy: number;
  };
}

/**
 * Returns the appropriate month abbreviation based on context
 * 
 * @param momentInstance - The moment instance (or undefined)
 * @param format - The format string being used
 * @returns Month abbreviation string or array of all abbreviations
 */
declare function getMonthsShort(
  momentInstance: MomentInput | undefined,
  format: string
): string | string[];

/**
 * Generates the ordinal suffix for a day of the month
 * 
 * @param dayOfMonth - The day number (1-31)
 * @returns The day number with appropriate suffix ("ste" or "de")
 * 
 * @example
 * getDayOrdinal(1)  // "1ste"
 * getDayOrdinal(2)  // "2de"
 * getDayOrdinal(8)  // "8ste"
 * getDayOrdinal(21) // "21ste"
 */
declare function getDayOrdinal(dayOfMonth: number): string;

/**
 * Defines and registers the Dutch (Belgium) locale configuration with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The registered locale object
 */
declare function defineNlBeLocale(moment: typeof import('moment')): Locale;

export {
  MONTHS_SHORT_WITH_PERIODS,
  MONTHS_SHORT_WITHOUT_PERIODS,
  MONTHS_FULL,
  WEEKDAYS,
  WEEKDAYS_SHORT,
  WEEKDAYS_MIN,
  MONTH_PARSE_REGEXES,
  MONTH_REGEX,
  MONTH_STRICT_REGEX,
  MONTH_SHORT_STRICT_REGEX,
  DAY_OF_MONTH_ORDINAL_REGEX,
  FIRST_DAY_OF_WEEK,
  FIRST_DAY_OF_YEAR,
  DutchBelgiumLocaleConfig,
  LongDateFormat,
  CalendarSpec,
  RelativeTimeSpec,
  getMonthsShort,
  getDayOrdinal,
  defineNlBeLocale
};