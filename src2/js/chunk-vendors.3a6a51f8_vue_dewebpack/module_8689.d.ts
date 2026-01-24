/**
 * Moment.js locale configuration for Burmese (Myanmar)
 * 
 * This module provides localization support for the Burmese language,
 * including month names, weekday names, date formats, and number conversions
 * between Arabic and Burmese numerals.
 * 
 * @module moment/locale/my
 */

import { Locale } from 'moment';

/**
 * Mapping from Arabic numerals to Burmese numerals
 */
type ArabicToBurmeseMap = {
  readonly '1': '၁';
  readonly '2': '၂';
  readonly '3': '၃';
  readonly '4': '၄';
  readonly '5': '၅';
  readonly '6': '၆';
  readonly '7': '၇';
  readonly '8': '၈';
  readonly '9': '၉';
  readonly '0': '၀';
};

/**
 * Mapping from Burmese numerals to Arabic numerals
 */
type BurmeseToArabicMap = {
  readonly '၁': '1';
  readonly '၂': '2';
  readonly '၃': '3';
  readonly '၄': '4';
  readonly '၅': '5';
  readonly '၆': '6';
  readonly '၇': '7';
  readonly '၈': '8';
  readonly '၉': '9';
  readonly '၀': '0';
};

/**
 * Long date format tokens for Burmese locale
 */
interface BurmeseLongDateFormat {
  /** Time format (24-hour) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date format with time */
  LLL: string;
  /** Full date format with weekday and time */
  LLLL: string;
}

/**
 * Calendar format strings for relative dates
 */
interface BurmeseCalendarFormat {
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
 * Relative time format strings
 */
interface BurmeseRelativeTimeFormat {
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
interface WeekConfig {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year that defines the first week */
  doy: number;
}

/**
 * Complete locale configuration for Burmese
 */
interface BurmeseLocaleConfig {
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
  /** Long date format tokens */
  longDateFormat: BurmeseLongDateFormat;
  /** Calendar format strings */
  calendar: BurmeseCalendarFormat;
  /** Relative time format strings */
  relativeTime: BurmeseRelativeTimeFormat;
  /** Parse function to convert Burmese numerals to Arabic */
  preparse: (text: string) => string;
  /** Format function to convert Arabic numerals to Burmese */
  postformat: (text: string) => string;
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Moment.js instance with locale definition capability
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., 'my' for Burmese)
   * @param config - The locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeName: string, config: BurmeseLocaleConfig): Locale;
}

declare const burmeseLocale: BurmeseLocaleConfig;

export { 
  ArabicToBurmeseMap, 
  BurmeseToArabicMap, 
  BurmeseLongDateFormat,
  BurmeseCalendarFormat,
  BurmeseRelativeTimeFormat,
  WeekConfig,
  BurmeseLocaleConfig,
  MomentStatic,
  burmeseLocale 
};