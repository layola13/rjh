/**
 * Moment.js locale configuration for Burmese (Myanmar)
 * 
 * This module provides localization support for the Burmese language,
 * including month names, weekday names, date formats, and number translations
 * between Arabic numerals and Burmese numerals.
 */

import type { Moment, LocaleSpecification } from 'moment';

/**
 * Mapping from Arabic numerals to Burmese numerals
 */
type ArabicToBurmeseMap = {
  readonly [K in '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9']: string;
};

/**
 * Mapping from Burmese numerals to Arabic numerals
 */
type BurmeseToArabicMap = {
  readonly [key: string]: string;
};

/**
 * Configuration for relative time formatting
 */
interface RelativeTimeConfig {
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
 * Configuration for calendar date formatting
 */
interface CalendarConfig {
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
 * Configuration for long date formats
 */
interface LongDateFormatConfig {
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
  /** Full date and time format */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekConfig {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year for first week */
  doy: number;
}

/**
 * Complete Burmese locale specification
 */
interface BurmeseLocaleSpecification extends LocaleSpecification {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormatConfig;
  calendar: CalendarConfig;
  relativeTime: RelativeTimeConfig;
  preparse: (text: string) => string;
  postformat: (text: string) => string;
  week: WeekConfig;
}

/**
 * Arabic to Burmese numeral mapping
 */
declare const arabicToBurmeseNumerals: ArabicToBurmeseMap;

/**
 * Burmese to Arabic numeral mapping
 */
declare const burmeseToArabicNumerals: BurmeseToArabicMap;

/**
 * Converts Arabic numerals in text to Burmese numerals
 * @param text - Text containing Arabic numerals (0-9)
 * @returns Text with Arabic numerals replaced by Burmese numerals
 */
declare function postformatBurmeseNumbers(text: string): string;

/**
 * Converts Burmese numerals in text to Arabic numerals
 * @param text - Text containing Burmese numerals (၀-၉)
 * @returns Text with Burmese numerals replaced by Arabic numerals
 */
declare function preparseBurmeseNumbers(text: string): string;

/**
 * Defines and registers the Burmese locale with moment.js
 * @param moment - Moment.js instance
 * @returns The configured locale specification
 */
declare function defineBurmeseLocale(moment: Moment): BurmeseLocaleSpecification;

export {
  ArabicToBurmeseMap,
  BurmeseToArabicMap,
  RelativeTimeConfig,
  CalendarConfig,
  LongDateFormatConfig,
  WeekConfig,
  BurmeseLocaleSpecification,
  arabicToBurmeseNumerals,
  burmeseToArabicNumerals,
  postformatBurmeseNumbers,
  preparseBurmeseNumbers,
  defineBurmeseLocale,
};

export default defineBurmeseLocale;