/**
 * Moment.js locale configuration for Filipino (fil)
 * Defines date/time formatting, calendar, and relative time rules for the Filipino language
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for different time contexts
 */
interface CalendarSpec {
  /** Format for times today */
  sameDay: string;
  /** Format for times tomorrow */
  nextDay: string;
  /** Format for times next week */
  nextWeek: string;
  /** Format for times yesterday */
  lastDay: string;
  /** Format for times last week */
  lastWeek: string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time formatting configuration
 */
interface RelativeTimeSpec {
  /** Future time format template */
  future: string;
  /** Past time format template */
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
 * Long date format tokens
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  /** Time with seconds format */
  LTS: string;
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
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year that defines first week */
  doy: number;
}

/**
 * Complete Filipino locale specification for Moment.js
 */
interface FilipinoLocaleSpec extends LocaleSpecification {
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
  /** Long date format configuration */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time formatting */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal day numbers */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: (dayOfMonth: number) => number;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Defines and registers the Filipino locale configuration with Moment.js
 * @param momentInstance - The Moment.js instance to configure
 * @returns The configured locale object
 */
export function defineFilipino(momentInstance: typeof import('moment')): Locale;

/**
 * Filipino locale configuration object
 */
export const filipinoLocale: FilipinoLocaleSpec;

/**
 * Default export: Filipino locale for Moment.js
 */
declare const _default: Locale;
export default _default;