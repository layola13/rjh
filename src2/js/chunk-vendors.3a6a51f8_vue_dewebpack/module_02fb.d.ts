/**
 * Moment.js locale configuration for Malayalam (ml)
 * 
 * This module provides locale-specific configurations for the Malayalam language,
 * including month names, weekday names, date/time formats, and relative time expressions.
 * 
 * @module MalayalamLocale
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Meridiem (AM/PM) type in Malayalam
 */
type MalayalamMeridiem = 'രാത്രി' | 'രാവിലെ' | 'ഉച്ച കഴിഞ്ഞ്' | 'വൈകുന്നേരം';

/**
 * Calendar specification for Malayalam locale
 */
interface CalendarSpec {
  /** Format for same day */
  sameDay: string;
  /** Format for next day */
  nextDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for last day */
  lastDay: string;
  /** Format for last week */
  lastWeek: string;
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time configuration for Malayalam locale
 */
interface RelativeTimeSpec {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Seconds (few moments) */
  s: string;
  /** Seconds with count */
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
 * Long date format configuration
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
  /** Full date with weekday and time format */
  LLLL: string;
}

/**
 * Complete Malayalam locale specification
 */
interface MalayalamLocaleSpecification extends LocaleSpecification {
  /** Full month names in Malayalam */
  months: string[];
  /** Abbreviated month names in Malayalam */
  monthsShort: string[];
  /** Whether to parse month names exactly */
  monthsParseExact: boolean;
  /** Full weekday names in Malayalam */
  weekdays: string[];
  /** Abbreviated weekday names in Malayalam */
  weekdaysShort: string[];
  /** Minimal weekday names in Malayalam */
  weekdaysMin: string[];
  /** Long date format configurations */
  longDateFormat: LongDateFormat;
  /** Calendar display configurations */
  calendar: CalendarSpec;
  /** Relative time expressions */
  relativeTime: RelativeTimeSpec;
  /** Regular expression to parse meridiem */
  meridiemParse: RegExp;
  /**
   * Converts 12-hour format to 24-hour format based on meridiem
   * @param hour - Hour in 12-hour format (0-12)
   * @param meridiem - Malayalam meridiem string
   * @returns Hour in 24-hour format (0-23)
   */
  meridiemHour(hour: number, meridiem: string): number;
  /**
   * Returns the appropriate meridiem string for a given time
   * @param hour - Hour (0-23)
   * @param minute - Minute (0-59)
   * @param isLowercase - Whether to return lowercase format
   * @returns Malayalam meridiem string
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): MalayalamMeridiem;
}

/**
 * Defines and registers the Malayalam locale configuration with moment.js
 * @param moment - The moment.js instance
 * @returns The registered locale
 */
export function defineLocale(moment: typeof import('moment')): Locale;

/**
 * Malayalam locale configuration object
 */
export const malayalamLocaleConfig: MalayalamLocaleSpecification;

export default malayalamLocaleConfig;