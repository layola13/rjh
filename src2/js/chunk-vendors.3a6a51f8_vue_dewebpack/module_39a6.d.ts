/**
 * Moment.js locale configuration for English (United Kingdom)
 * Provides British English date/time formatting and localization
 */

import type { Moment, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for relative dates
 */
interface CalendarSpec {
  /** Format for dates occurring today */
  sameDay: string;
  /** Format for dates occurring tomorrow */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates occurring yesterday */
  lastDay: string;
  /** Format for dates in the last week */
  lastWeek: string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration for duration formatting
 */
interface RelativeTimeSpec {
  /** Future time format template */
  future: string;
  /** Past time format template */
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
 * Long date format tokens
 */
interface LongDateFormatSpec {
  /** Time only (e.g., "14:30") */
  LT: string;
  /** Time with seconds (e.g., "14:30:45") */
  LTS: string;
  /** Short date (e.g., "25/12/2023") */
  L: string;
  /** Long date (e.g., "25 December 2023") */
  LL: string;
  /** Long date with time (e.g., "25 December 2023 14:30") */
  LLL: string;
  /** Full date with time (e.g., "Monday, 25 December 2023 14:30") */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year to determine first week */
  doy: number;
}

/**
 * Complete locale specification for en-GB
 */
interface EnGbLocaleSpec extends LocaleSpecification {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormatSpec;
  calendar: CalendarSpec;
  relativeTime: RelativeTimeSpec;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
  week: WeekSpec;
}

/**
 * Moment.js instance with locale definition capability
 */
interface MomentStatic {
  /**
   * Defines a new locale or updates an existing one
   * @param localeName - The locale identifier (e.g., "en-gb")
   * @param config - Locale configuration object
   * @returns The locale name or null if definition failed
   */
  defineLocale(localeName: string, config: LocaleSpecification): string | null;
}

/**
 * Initializes the en-GB locale configuration for Moment.js
 * @param moment - The Moment.js library instance
 */
export function initializeEnGbLocale(moment: MomentStatic): void;

/**
 * English (United Kingdom) locale configuration
 */
export const enGbLocaleConfig: EnGbLocaleSpec;

/**
 * Calculates the ordinal suffix for a given day of month
 * @param dayOfMonth - The day number (1-31)
 * @returns The day with appropriate ordinal suffix (e.g., "1st", "2nd", "3rd", "4th")
 * @example
 *