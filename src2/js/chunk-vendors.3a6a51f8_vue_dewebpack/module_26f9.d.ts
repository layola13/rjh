/**
 * Moment.js locale configuration for Lithuanian (lt)
 * @module moment/locale/lt
 */

import { Locale } from 'moment';

/**
 * Lithuanian time unit translations with three forms:
 * - Nominative (subject form)
 * - Genitive (possessive form)
 * - Accusative (object form)
 */
interface TimeUnitTranslations {
  /** Seconds: "sekundė_sekundžių_sekundes" */
  ss: string;
  /** Minute: "minutė_minutės_minutę" */
  m: string;
  /** Minutes: "minutės_minučių_minutes" */
  mm: string;
  /** Hour: "valanda_valandos_valandą" */
  h: string;
  /** Hours: "valandos_valandų_valandas" */
  hh: string;
  /** Day: "diena_dienos_dieną" */
  d: string;
  /** Days: "dienos_dienų_dienas" */
  dd: string;
  /** Month: "mėnuo_mėnesio_mėnesį" */
  M: string;
  /** Months: "mėnesiai_mėnesių_mėnesius" */
  MM: string;
  /** Year: "metai_metų_metus" */
  y: string;
  /** Years: "metai_metų_metus" */
  yy: string;
}

/**
 * Format for "few seconds" phrase
 * @param value - The numeric value
 * @param isFuture - Whether it's future tense
 * @param key - The time unit key
 * @param withoutSuffix - Whether to format without suffix
 * @returns Formatted string for "few seconds"
 */
export declare function formatFewSeconds(
  value: number,
  isFuture: boolean,
  key: string,
  withoutSuffix: boolean
): string;

/**
 * Get the appropriate declension form for a time unit
 * @param value - The numeric value
 * @param isFuture - Whether it's future tense
 * @param key - The time unit key
 * @param withoutSuffix - Whether to format without suffix
 * @returns The correct declension form
 */
export declare function getDeclension(
  value: number,
  isFuture: boolean,
  key: string,
  withoutSuffix: boolean
): string;

/**
 * Check if a number requires the genitive plural form
 * (ends in 0 or is between 11-19)
 * @param value - The number to check
 * @returns True if genitive plural form should be used
 */
export declare function requiresGenitivePlural(value: number): boolean;

/**
 * Split time unit translations into their three forms
 * @param key - The time unit key from TimeUnitTranslations
 * @returns Array of [nominative, genitive, accusative] forms
 */
export declare function splitTranslation(key: string): [string, string, string];

/**
 * Format relative time with proper Lithuanian grammar
 * @param value - The numeric value
 * @param isFuture - Whether it's future tense
 * @param key - Array of translation keys
 * @param withoutSuffix - Whether to format without suffix
 * @returns Formatted relative time string
 */
export declare function formatRelativeTime(
  value: number,
  isFuture: boolean,
  key: [string, string, string],
  withoutSuffix: boolean
): string;

/**
 * Lithuanian locale configuration object
 */
export declare const lithuanianLocale: Locale;

/**
 * Month names in format form (genitive case)
 */
export declare const monthsFormat: string[];

/**
 * Month names in standalone form (nominative case)
 */
export declare const monthsStandalone: string[];

/**
 * Abbreviated month names
 */
export declare const monthsShort: string[];

/**
 * Weekday names in format form (accusative case with preposition)
 */
export declare const weekdaysFormat: string[];

/**
 * Weekday names in standalone form (nominative case)
 */
export declare const weekdaysStandalone: string[];

/**
 * Abbreviated weekday names
 */
export declare const weekdaysShort: string[];

/**
 * Minimal weekday abbreviations
 */
export declare const weekdaysMin: string[];

/**
 * Long date format tokens
 */
export interface LongDateFormat {
  /** Time: "HH:mm" */
  LT: string;
  /** Time with seconds: "HH:mm:ss" */
  LTS: string;
  /** Date: "YYYY-MM-DD" */
  L: string;
  /** Date with month name: "YYYY [m.] MMMM D [d.]" */
  LL: string;
  /** Date with month name and time: "YYYY [m.] MMMM D [d.], HH:mm [val.]" */
  LLL: string;
  /** Full date with weekday: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]" */
  LLLL: string;
  /** Short date: "YYYY-MM-DD" */
  l: string;
  /** Short date with month: "YYYY [m.] MMMM D [d.]" */
  ll: string;
  /** Short date with time: "YYYY [m.] MMMM D [d.], HH:mm [val.]" */
  lll: string;
  /** Short date with weekday: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]" */
  llll: string;
}

/**
 * Calendar format strings
 */
export interface CalendarFormat {
  /** Today: "[Šiandien] LT" */
  sameDay: string;
  /** Tomorrow: "[Rytoj] LT" */
  nextDay: string;
  /** Next week: "dddd LT" */
  nextWeek: string;
  /** Yesterday: "[Vakar] LT" */
  lastDay: string;
  /** Last week: "[Praėjusį] dddd LT" */
  lastWeek: string;
  /** Otherwise: "L" */
  sameElse: string;
}

/**
 * Week configuration
 */
export interface WeekConfig {
  /** First day of week (1 = Monday) */
  dow: 1;
  /** First day of year for week calculation */
  doy: 4;
}