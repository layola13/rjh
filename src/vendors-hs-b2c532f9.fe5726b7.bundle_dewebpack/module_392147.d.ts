/**
 * Moment.js locale configuration for Occitan (oc-lnc)
 * Provides localization for dates, times, and relative time formatting in the Occitan language
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Month format configuration
 * Contains standalone and contextual month names with format detection
 */
interface MonthsConfiguration {
  /** Standalone month names used in isolation */
  standalone: string[];
  /** Contextual month names used with prepositions (e.g., "de genièr") */
  format: string[];
  /** Regular expression to detect date format requiring contextual month names */
  isFormat: RegExp;
}

/**
 * Long date format tokens configuration
 * Defines various date and time format patterns
 */
interface LongDateFormatConfiguration {
  /** Time format (e.g., "14:30") */
  LT: string;
  /** Time format with seconds (e.g., "14:30:45") */
  LTS: string;
  /** Short date format (e.g., "25/12/2023") */
  L: string;
  /** Long date format (e.g., "25 decembre de 2023") */
  LL: string;
  /** Short long date format (e.g., "25 dec 2023") */
  ll: string;
  /** Long date and time format */
  LLL: string;
  /** Short long date and time format */
  lll: string;
  /** Full date and time with weekday */
  LLLL: string;
  /** Short full date and time with weekday abbreviation */
  llll: string;
}

/**
 * Calendar configuration for relative date references
 * Defines formats for dates relative to today
 */
interface CalendarConfiguration {
  /** Format for today (e.g., "uèi a 14:30") */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for yesterday */
  lastDay: string;
  /** Format for last week */
  lastWeek: string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 * Defines formats for time duration expressions
 */
interface RelativeTimeConfiguration {
  /** Future time prefix template */
  future: string;
  /** Past time prefix template */
  past: string;
  /** Few seconds */
  s: string;
  /** Multiple seconds template */
  ss: string;
  /** One minute */
  m: string;
  /** Multiple minutes template */
  mm: string;
  /** One hour */
  h: string;
  /** Multiple hours template */
  hh: string;
  /** One day */
  d: string;
  /** Multiple days template */
  dd: string;
  /** One month */
  M: string;
  /** Multiple months template */
  MM: string;
  /** One year */
  y: string;
  /** Multiple years template */
  yy: string;
}

/**
 * Week configuration
 * Defines first day of week and first week of year
 */
interface WeekConfiguration {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** First week of year calculation (day of year) */
  doy: number;
}

/**
 * Complete Occitan locale specification
 */
interface OccitanLocaleSpecification extends LocaleSpecification {
  months: MonthsConfiguration;
  monthsShort: string[];
  monthsParseExact: boolean;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: boolean;
  longDateFormat: LongDateFormatConfiguration;
  calendar: CalendarConfiguration;
  relativeTime: RelativeTimeConfiguration;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (dayOfMonth: number, token: string) => string;
  week: WeekConfiguration;
}

/**
 * Defines the Occitan (oc-lnc) locale configuration for moment.js
 * @param moment - The moment.js instance
 * @returns The registered Occitan locale
 */
declare function defineOccitanLocale(moment: typeof import('moment')): Locale;

/**
 * Ordinal suffix type for Occitan numbers
 * - 'r' for 1st, 3rd
 * - 'n' for 2nd
 * - 't' for 4th
 * - 'è' for other numbers
 * - 'a' for week contexts
 */
type OrdinalSuffix = 'r' | 'n' | 't' | 'è' | 'a';

/**
 * Determines the appropriate ordinal suffix for a given number in Occitan
 * @param dayOfMonth - The day of month (1-31)
 * @param token - The format token (e.g., 'D', 'w', 'W')
 * @returns The number with its ordinal suffix
 */
declare function getOrdinal(dayOfMonth: number, token: string): string;

export { 
  OccitanLocaleSpecification, 
  MonthsConfiguration,
  LongDateFormatConfiguration,
  CalendarConfiguration,
  RelativeTimeConfiguration,
  WeekConfiguration,
  OrdinalSuffix,
  defineOccitanLocale,
  getOrdinal
};