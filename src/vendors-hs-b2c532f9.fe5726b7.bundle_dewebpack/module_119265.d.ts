/**
 * Moment.js locale configuration for Goan Konkani (Devanagari script)
 * Locale: gom-deva
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Time unit options for relative time formatting
 */
interface RelativeTimeUnit {
  /** Future tense form */
  0: string;
  /** Past tense form */
  1: string;
}

/**
 * Map of relative time units with their translations
 */
interface RelativeTimeMap {
  s: RelativeTimeUnit;
  ss: RelativeTimeUnit;
  m: RelativeTimeUnit;
  mm: RelativeTimeUnit;
  h: RelativeTimeUnit;
  hh: RelativeTimeUnit;
  d: RelativeTimeUnit;
  dd: RelativeTimeUnit;
  M: RelativeTimeUnit;
  MM: RelativeTimeUnit;
  y: RelativeTimeUnit;
  yy: RelativeTimeUnit;
}

/**
 * Formats relative time strings in Konkani
 * @param value - Numeric value for the time unit
 * @param withoutSuffix - Whether to include suffix (true for future tense)
 * @param unit - Time unit key (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string
 */
declare function relativeTimeFormatter(
  value: number,
  withoutSuffix: boolean,
  unit: keyof RelativeTimeMap,
  isFuture: boolean
): string;

/**
 * Goan Konkani (Devanagari) locale configuration
 */
declare const gomDevaLocale: LocaleSpecification;

/**
 * Month configuration with standalone and format forms
 */
interface MonthsConfig {
  /** Standalone month names */
  standalone: string[];
  /** Format month names (genitive case) */
  format: string[];
  /** Regex pattern to determine format usage */
  isFormat: RegExp;
}

/**
 * Locale configuration object structure
 */
interface GomDevaLocaleSpec extends LocaleSpecification {
  months: MonthsConfig;
  monthsShort: string[];
  monthsParseExact: boolean;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: boolean;
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
    llll: string;
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
    s: typeof relativeTimeFormatter;
    ss: typeof relativeTimeFormatter;
    m: typeof relativeTimeFormatter;
    mm: typeof relativeTimeFormatter;
    h: typeof relativeTimeFormatter;
    hh: typeof relativeTimeFormatter;
    d: typeof relativeTimeFormatter;
    dd: typeof relativeTimeFormatter;
    M: typeof relativeTimeFormatter;
    MM: typeof relativeTimeFormatter;
    y: typeof relativeTimeFormatter;
    yy: typeof relativeTimeFormatter;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number, token: string) => string;
  week: {
    /** First day of week (0 = Sunday) */
    dow: number;
    /** First day of year */
    doy: number;
  };
  meridiemParse: RegExp;
  meridiemHour: (hour: number, meridiem: string) => number;
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
}

export default gomDevaLocale;
export { GomDevaLocaleSpec, relativeTimeFormatter, RelativeTimeMap };