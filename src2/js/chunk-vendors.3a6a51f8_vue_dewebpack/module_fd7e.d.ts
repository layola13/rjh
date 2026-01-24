/**
 * Moment.js locale configuration for pseudo-localization (x-pseudo)
 * 
 * This locale is used for testing internationalization by replacing English
 * characters with accented versions while maintaining readability.
 * 
 * @module moment-locale-x-pseudo
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Ordinal number configuration
 */
interface OrdinalConfig {
  /** Regular expression to parse ordinal numbers */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format a number with its ordinal suffix */
  ordinal: (num: number) => string;
}

/**
 * Week configuration
 */
interface WeekConfig {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year that defines the first week */
  doy: number;
}

/**
 * Long date format configuration
 */
interface LongDateFormat {
  /** Time format */
  LT: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with time format */
  LLLL: string;
}

/**
 * Calendar format configuration for relative dates
 */
interface CalendarFormat {
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
 * Relative time format configuration
 */
interface RelativeTimeFormat {
  /** Future time prefix */
  future: string;
  /** Past time suffix */
  past: string;
  /** Singular second */
  s: string;
  /** Plural seconds */
  ss: string;
  /** Singular minute */
  m: string;
  /** Plural minutes */
  mm: string;
  /** Singular hour */
  h: string;
  /** Plural hours */
  hh: string;
  /** Singular day */
  d: string;
  /** Plural days */
  dd: string;
  /** Singular month */
  M: string;
  /** Plural months */
  MM: string;
  /** Singular year */
  y: string;
  /** Plural years */
  yy: string;
}

/**
 * Complete locale specification for x-pseudo
 */
interface XPseudoLocaleSpecification extends LocaleSpecification {
  /** Array of month names */
  months: string[];
  /** Array of abbreviated month names */
  monthsShort: string[];
  /** Use exact parsing for months */
  monthsParseExact: boolean;
  /** Array of weekday names */
  weekdays: string[];
  /** Array of abbreviated weekday names */
  weekdaysShort: string[];
  /** Array of minimal weekday names */
  weekdaysMin: string[];
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format configuration */
  longDateFormat: LongDateFormat;
  /** Calendar format configuration */
  calendar: CalendarFormat;
  /** Relative time format configuration */
  relativeTime: RelativeTimeFormat;
  /** Ordinal number parsing pattern */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number formatter */
  ordinal: (num: number) => string;
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Pseudo-localization locale configuration
 * Transforms English text with accented characters for i18n testing
 */
export const xPseudoLocale: XPseudoLocaleSpecification;

/**
 * Define and register the x-pseudo locale with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The registered locale
 */
export function defineXPseudoLocale(moment: typeof import('moment')): Locale;