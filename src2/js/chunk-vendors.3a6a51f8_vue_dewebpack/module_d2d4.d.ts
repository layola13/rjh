/**
 * Moment.js locale configuration for Brazilian Portuguese (pt-br)
 * 
 * This module defines locale-specific configurations for date/time formatting,
 * calendar expressions, and relative time calculations in Brazilian Portuguese.
 * 
 * @module moment-locale-pt-br
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration for the Brazilian Portuguese locale
 */
interface BrazilianPortugueseLocaleConfig extends LocaleSpecification {
  /** Full month names */
  months: string[];
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Full weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names */
  weekdaysMin: string[];
  
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format templates */
  longDateFormat: {
    /** Time format (e.g., "14:30") */
    LT: string;
    /** Time with seconds format (e.g., "14:30:45") */
    LTS: string;
    /** Short date format (e.g., "25/12/2023") */
    L: string;
    /** Long date format (e.g., "25 de dezembro de 2023") */
    LL: string;
    /** Long date with time (e.g., "25 de dezembro de 2023 às 14:30") */
    LLL: string;
    /** Full date with day and time (e.g., "segunda-feira, 25 de dezembro de 2023 às 14:30") */
    LLLL: string;
  };
  
  /** Calendar-relative date expressions */
  calendar: {
    /** Format for today */
    sameDay: string;
    /** Format for tomorrow */
    nextDay: string;
    /** Format for next week */
    nextWeek: string;
    /** Format for yesterday */
    lastDay: string;
    /** Function returning format for last week based on day of week */
    lastWeek: (this: { day: () => number }) => string;
    /** Default format for other dates */
    sameElse: string;
  };
  
  /** Relative time expressions */
  relativeTime: {
    /** Future time prefix (e.g., "em 5 minutos") */
    future: string;
    /** Past time prefix (e.g., "há 5 minutos") */
    past: string;
    /** Few seconds */
    s: string;
    /** Seconds (plural) */
    ss: string;
    /** One minute */
    m: string;
    /** Minutes (plural) */
    mm: string;
    /** One hour */
    h: string;
    /** Hours (plural) */
    hh: string;
    /** One day */
    d: string;
    /** Days (plural) */
    dd: string;
    /** One month */
    M: string;
    /** Months (plural) */
    MM: string;
    /** One year */
    y: string;
    /** Years (plural) */
    yy: string;
  };
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers */
  ordinal: string;
  
  /** Message for invalid dates */
  invalidDate: string;
}

/**
 * Defines the Brazilian Portuguese locale for Moment.js
 * 
 * @param momentInstance - The Moment.js instance to configure
 * @returns The configured locale
 */
declare function defineBrazilianPortugueseLocale(momentInstance: typeof import('moment')): Locale;

export { BrazilianPortugueseLocaleConfig, defineBrazilianPortugueseLocale };
export default defineBrazilianPortugueseLocale;