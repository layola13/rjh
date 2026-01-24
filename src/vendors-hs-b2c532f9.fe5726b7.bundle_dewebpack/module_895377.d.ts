/**
 * Moment.js locale configuration for Spanish (Dominican Republic)
 * @module es-do-locale
 */

import { Moment, LocaleSpecification } from 'moment';

/**
 * Abbreviated month names with periods
 */
type MonthsShortWithPeriod = readonly [
  'ene._', 'feb._', 'mar._', 'abr._', 'may._', 'jun._',
  'jul._', 'ago._', 'sep._', 'oct._', 'nov._', 'dic._'
];

/**
 * Abbreviated month names without periods
 */
type MonthsShortNoPeriod = readonly [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
];

/**
 * Full month names in Spanish
 */
type MonthsFull = readonly [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

/**
 * Weekday names in Spanish
 */
type Weekdays = readonly [
  'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
];

/**
 * Moment.js calendar format function type
 */
type CalendarFormatFunction = (this: Moment) => string;

/**
 * Calendar specification with time-based formatting
 */
interface CalendarSpec {
  /** Format for same day */
  sameDay: CalendarFormatFunction;
  /** Format for next day */
  nextDay: CalendarFormatFunction;
  /** Format for next week */
  nextWeek: CalendarFormatFunction;
  /** Format for last day */
  lastDay: CalendarFormatFunction;
  /** Format for last week */
  lastWeek: CalendarFormatFunction;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Long date format tokens
 */
interface LongDateFormat {
  /** Time format */
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
 * Relative time configuration
 */
interface RelativeTime {
  /** Future time prefix */
  future: string;
  /** Past time prefix */
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
  /** Week (singular) */
  w: string;
  /** Weeks (plural) */
  ww: string;
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
 * Week configuration
 */
interface WeekSpec {
  /** First day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** First week of year calculation */
  doy: number;
}

/**
 * Spanish (Dominican Republic) locale configuration for Moment.js
 */
interface EsDOLocaleSpecification extends LocaleSpecification {
  months: MonthsFull;
  monthsShort: (momentInstance: Moment | undefined, format: string) => MonthsShortWithPeriod | MonthsShortNoPeriod | string;
  monthsRegex: RegExp;
  monthsShortRegex: RegExp;
  monthsStrictRegex: RegExp;
  monthsShortStrictRegex: RegExp;
  monthsParse: readonly RegExp[];
  longMonthsParse: readonly RegExp[];
  shortMonthsParse: readonly RegExp[];
  weekdays: Weekdays;
  weekdaysShort: readonly string[];
  weekdaysMin: readonly string[];
  weekdaysParseExact: boolean;
  longDateFormat: LongDateFormat;
  calendar: CalendarSpec;
  relativeTime: RelativeTime;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: WeekSpec;
}

/**
 * Defines the Spanish (Dominican Republic) locale for Moment.js
 * @param momentInstance - The Moment.js instance
 * @returns The configured locale
 */
export declare function defineEsDOLocale(momentInstance: typeof Moment): Moment.Locale;

/**
 * Constants for the es-do locale
 */
export declare const MONTHS_SHORT_WITH_PERIOD: MonthsShortWithPeriod;
export declare const MONTHS_SHORT_NO_PERIOD: MonthsShortNoPeriod;
export declare const MONTH_PARSE_REGEXES: readonly RegExp[];
export declare const MONTH_REGEX: RegExp;