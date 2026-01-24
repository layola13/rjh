/**
 * Moment.js locale configuration for Romanian (ro)
 * @module moment/locale/ro
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Pluralization units mapping for Romanian language
 */
interface PluralUnits {
  /** Seconds */
  ss: string;
  /** Minutes */
  mm: string;
  /** Hours */
  hh: string;
  /** Days */
  dd: string;
  /** Weeks */
  ww: string;
  /** Months */
  MM: string;
  /** Years */
  yy: string;
}

/**
 * Formats relative time strings with proper Romanian pluralization rules
 * @param count - The numeric value to format
 * @param withoutSuffix - Whether to include the suffix (unused in this implementation)
 * @param unit - The time unit key (ss, mm, hh, dd, ww, MM, yy)
 * @returns Formatted relative time string in Romanian
 */
declare function relativeTimeWithPlural(
  count: number,
  withoutSuffix: boolean,
  unit: keyof PluralUnits
): string;

/**
 * Romanian locale configuration object for Moment.js
 */
declare const roLocale: LocaleSpecification;

/**
 * Defines and registers the Romanian locale with Moment.js
 * @param moment - The Moment.js instance to configure
 * @returns The configured locale
 */
export default function defineRomanianLocale(moment: typeof Locale): Locale;

/**
 * Romanian locale configuration
 */
export interface RomanianLocaleConfig extends LocaleSpecification {
  /** Full month names in Romanian */
  months: string[];
  /** Abbreviated month names in Romanian */
  monthsShort: string[];
  /** Use exact month name parsing */
  monthsParseExact: boolean;
  /** Full weekday names in Romanian */
  weekdays: string[];
  /** Abbreviated weekday names in Romanian */
  weekdaysShort: string[];
  /** Minimal weekday names in Romanian */
  weekdaysMin: string[];
  /** Long date format tokens */
  longDateFormat: {
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
    /** Full date and time format */
    LLLL: string;
  };
  /** Calendar format templates */
  calendar: {
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
    /** Default format */
    sameElse: string;
  };
  /** Relative time format configuration */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time suffix */
    past: string;
    /** Few seconds */
    s: string;
    /** Seconds (plural) */
    ss: typeof relativeTimeWithPlural;
    /** One minute */
    m: string;
    /** Minutes (plural) */
    mm: typeof relativeTimeWithPlural;
    /** One hour */
    h: string;
    /** Hours (plural) */
    hh: typeof relativeTimeWithPlural;
    /** One day */
    d: string;
    /** Days (plural) */
    dd: typeof relativeTimeWithPlural;
    /** One week */
    w: string;
    /** Weeks (plural) */
    ww: typeof relativeTimeWithPlural;
    /** One month */
    M: string;
    /** Months (plural) */
    MM: typeof relativeTimeWithPlural;
    /** One year */
    y: string;
    /** Years (plural) */
    yy: typeof relativeTimeWithPlural;
  };
  /** Week configuration */
  week: {
    /** Day of week (Monday = 1) */
    dow: number;
    /** Day of year for week calculation */
    doy: number;
  };
}