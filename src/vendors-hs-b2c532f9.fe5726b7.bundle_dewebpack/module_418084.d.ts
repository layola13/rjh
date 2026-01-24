/**
 * Moment.js locale configuration for Bosnian (bs)
 * Provides localization settings including month names, weekday names,
 * date formats, and relative time formatting rules
 */

import { Locale, MomentInput } from 'moment';

/**
 * Translates time duration values to Bosnian with proper grammatical forms
 * based on the numeric value (singular, paucal, or plural)
 * 
 * @param count - The numeric value to be translated
 * @param withoutSuffix - Whether the translation is without suffix context
 * @param key - The unit key (ss, mm, h, hh, dd, MM, yy)
 * @returns The formatted string with appropriate Bosnian grammatical form
 */
declare function translate(
  count: number,
  withoutSuffix: boolean,
  key: string
): string;

/**
 * Bosnian locale configuration object
 * Defines all localization settings for the Bosnian language
 */
interface BosnianLocaleConfig {
  /** Full month names in Bosnian */
  months: string[];
  
  /** Abbreviated month names in Bosnian */
  monthsShort: string[];
  
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Full weekday names in Bosnian */
  weekdays: string[];
  
  /** Abbreviated weekday names in Bosnian */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Bosnian */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens and their representations */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  
  /** Calendar formatting rules for relative dates */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: (this: MomentInput) => string;
    lastDay: string;
    lastWeek: (this: MomentInput) => string;
    sameElse: string;
  };
  
  /** Relative time formatting rules */
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: typeof translate;
    m: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string | undefined;
    mm: typeof translate;
    h: typeof translate;
    hh: typeof translate;
    d: string;
    dd: typeof translate;
    M: string;
    MM: typeof translate;
    y: string;
    yy: typeof translate;
  };
  
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Ordinal number formatter */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for week calculation */
    doy: number;
  };
}

/**
 * Defines and registers the Bosnian locale configuration with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The registered Bosnian locale
 */
export function defineBosnianLocale(moment: typeof import('moment')): Locale;

export default defineBosnianLocale;