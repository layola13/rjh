/**
 * Moment.js Galician (gl) locale configuration
 * Defines date/time formatting, calendar expressions, and relative time for Galician language
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar function context type
 * Represents the moment instance context used in calendar functions
 */
interface CalendarFunctionContext {
  hours(): number;
}

/**
 * Galician locale configuration object
 */
interface GalicianLocaleConfig extends LocaleSpecification {
  /** Full month names */
  months: string[];
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Full weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (e.g., "14:30") */
    LT: string;
    /** Time with seconds format (e.g., "14:30:45") */
    LTS: string;
    /** Short date format (e.g., "25/12/2023") */
    L: string;
    /** Long date format (e.g., "25 de decembro de 2023") */
    LL: string;
    /** Long date with time (e.g., "25 de decembro de 2023 14:30") */
    LLL: string;
    /** Full date with weekday and time */
    LLLL: string;
  };
  
  /** Calendar expressions for relative dates */
  calendar: {
    /** Format for today */
    sameDay(this: CalendarFunctionContext): string;
    /** Format for tomorrow */
    nextDay(this: CalendarFunctionContext): string;
    /** Format for next week */
    nextWeek(this: CalendarFunctionContext): string;
    /** Format for yesterday */
    lastDay(this: CalendarFunctionContext): string;
    /** Format for last week */
    lastWeek(this: CalendarFunctionContext): string;
    /** Default format for other dates */
    sameElse: string;
  };
  
  /** Relative time expressions */
  relativeTime: {
    /** Format future time expressions */
    future(timeString: string): string;
    /** Format past time expressions */
    past: string;
    /** Seconds (few) */
    s: string;
    /** Seconds (many) */
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
  };
  
  /** Regex pattern for parsing day of month ordinals */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for week numbering */
    doy: number;
  };
}

/**
 * Defines and registers the Galician locale configuration for moment.js
 * @param moment - The moment.js instance
 * @returns The registered Galician locale
 */
export function defineGalicianLocale(moment: typeof import('moment')): Locale;

/**
 * Galician locale configuration for moment.js
 */
export const galicianLocale: GalicianLocaleConfig;