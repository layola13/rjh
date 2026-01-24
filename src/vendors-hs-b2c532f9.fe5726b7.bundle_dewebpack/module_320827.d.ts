/**
 * Moment.js locale configuration for Polish (pl)
 * Provides Polish language support for date/time formatting and relative time expressions
 */

import { Locale, MomentInput } from 'moment';

/**
 * Month names in nominative case (used as standalone month names)
 */
declare const MONTHS_NOMINATIVE: readonly [
  'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
  'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
];

/**
 * Month names in genitive case (used after day numbers)
 */
declare const MONTHS_GENITIVE: readonly [
  'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
  'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
];

/**
 * Regular expressions for parsing abbreviated month names
 */
declare const MONTH_PARSE_PATTERNS: readonly RegExp[];

/**
 * Abbreviated month names
 */
declare const MONTHS_SHORT: readonly [
  'sty', 'lut', 'mar', 'kwi', 'maj', 'cze',
  'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'
];

/**
 * Weekday names in Polish
 */
declare const WEEKDAYS: readonly [
  'niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'
];

/**
 * Abbreviated weekday names
 */
declare const WEEKDAYS_SHORT: readonly ['ndz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'];

/**
 * Minimal weekday names
 */
declare const WEEKDAYS_MIN: readonly ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];

/**
 * Determines if a number should use the special Polish plural form
 * Polish has unique grammar rules: numbers ending in 2-4 (but not 12-14) use special plural forms
 * 
 * @param num - The number to check
 * @returns True if the number uses special plural form (e.g., 2-4, 22-24, but not 12-14)
 */
declare function shouldUseSpecialPluralForm(num: number): boolean;

/**
 * Formats relative time expressions with proper Polish grammar
 * 
 * @param value - The numeric value
 * @param withoutSuffix - Whether to use the form without preposition
 * @param key - The unit key (ss, m, mm, h, hh, ww, MM, yy)
 * @returns Properly declined Polish phrase
 */
declare function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'ww' | 'MM' | 'yy'
): string;

/**
 * Returns the appropriate month name based on context
 * Uses genitive case after day numbers (e.g., "5 stycznia"), nominative otherwise
 * 
 * @param momentInstance - The moment instance
 * @param format - The format string being applied
 * @returns Month name or array of month names
 */
declare function getMonthName(
  momentInstance: MomentInput | undefined,
  format: string
): string | readonly string[];

/**
 * Generates calendar format string for next week
 * Adjusts preposition based on day of week
 * 
 * @this {MomentInput}
 * @returns Formatted string with proper Polish preposition
 */
declare function getNextWeekFormat(this: MomentInput): string;

/**
 * Generates calendar format string for last week
 * Adjusts preposition and adjective declension based on day of week
 * 
 * @this {MomentInput}
 * @returns Formatted string with proper Polish preposition and declension
 */
declare function getLastWeekFormat(this: MomentInput): string;

/**
 * Polish locale configuration object for Moment.js
 */
export interface PolishLocaleConfig {
  /** Month names (context-aware: nominative or genitive) */
  months: typeof getMonthName;
  
  /** Abbreviated month names */
  monthsShort: typeof MONTHS_SHORT;
  
  /** Patterns for parsing month abbreviations */
  monthsParse: typeof MONTH_PARSE_PATTERNS;
  
  /** Patterns for parsing full month names */
  longMonthsParse: typeof MONTH_PARSE_PATTERNS;
  
  /** Patterns for parsing short month names */
  shortMonthsParse: typeof MONTH_PARSE_PATTERNS;
  
  /** Full weekday names */
  weekdays: typeof WEEKDAYS;
  
  /** Abbreviated weekday names */
  weekdaysShort: typeof WEEKDAYS_SHORT;
  
  /** Minimal weekday names */
  weekdaysMin: typeof WEEKDAYS_MIN;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (24-hour) */
    LT: 'HH:mm';
    /** Time with seconds format */
    LTS: 'HH:mm:ss';
    /** Short date format */
    L: 'DD.MM.YYYY';
    /** Long date format */
    LL: 'D MMMM YYYY';
    /** Long date with time format */
    LLL: 'D MMMM YYYY HH:mm';
    /** Full date and time format */
    LLLL: 'dddd, D MMMM YYYY HH:mm';
  };
  
  /** Calendar strings for relative dates */
  calendar: {
    /** Format for today */
    sameDay: '[Dziś o] LT';
    /** Format for tomorrow */
    nextDay: '[Jutro o] LT';
    /** Format function for next week */
    nextWeek: typeof getNextWeekFormat;
    /** Format for yesterday */
    lastDay: '[Wczoraj o] LT';
    /** Format function for last week */
    lastWeek: typeof getLastWeekFormat;
    /** Format for other dates */
    sameElse: 'L';
  };
  
  /** Relative time formatting */
  relativeTime: {
    /** Future time prefix */
    future: 'za %s';
    /** Past time suffix */
    past: '%s temu';
    /** Seconds (few) */
    s: 'kilka sekund';
    /** Seconds with number */
    ss: typeof formatRelativeTime;
    /** Minute (singular) */
    m: typeof formatRelativeTime;
    /** Minutes */
    mm: typeof formatRelativeTime;
    /** Hour (singular) */
    h: typeof formatRelativeTime;
    /** Hours */
    hh: typeof formatRelativeTime;
    /** Day (singular) */
    d: '1 dzień';
    /** Days */
    dd: '%d dni';
    /** Week (singular) */
    w: 'tydzień';
    /** Weeks */
    ww: typeof formatRelativeTime;
    /** Month (singular) */
    M: 'miesiąc';
    /** Months */
    MM: typeof formatRelativeTime;
    /** Year (singular) */
    y: 'rok';
    /** Years */
    yy: typeof formatRelativeTime;
  };
  
  /** Pattern for parsing ordinal day numbers */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Ordinal number format */
  ordinal: '%d.';
  
  /** Week configuration */
  week: {
    /** First day of week (1 = Monday) */
    dow: 1;
    /** First week of year contains January 4th */
    doy: 4;
  };
}

/**
 * Defines and registers the Polish locale with Moment.js
 * 
 * @param moment - Moment.js instance
 * @returns The registered Polish locale
 */
export default function definePolishLocale(moment: typeof import('moment')): Locale;