/**
 * Moment.js locale configuration for German (Austria)
 * @module de-at-locale
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Represents the different grammatical cases for German relative time strings
 */
interface GermanRelativeTimeStrings {
  /** Nominative case (subject) */
  0: string;
  /** Dative/Accusative case (object) */
  1: string;
}

/**
 * Map of time unit keys to their German translations in different grammatical cases
 */
interface GermanRelativeTimeMap {
  m: GermanRelativeTimeStrings;
  h: GermanRelativeTimeStrings;
  d: GermanRelativeTimeStrings;
  dd: GermanRelativeTimeStrings;
  w: GermanRelativeTimeStrings;
  M: GermanRelativeTimeStrings;
  MM: GermanRelativeTimeStrings;
  y: GermanRelativeTimeStrings;
  yy: GermanRelativeTimeStrings;
}

/**
 * Generates German relative time strings with proper grammatical case
 * 
 * @param count - The numeric value for the time unit
 * @param withoutSuffix - If true, returns nominative case; otherwise dative/accusative
 * @param key - The time unit key (m, h, d, dd, w, M, MM, y, yy)
 * @param isFuture - Indicates if the time reference is in the future (unused in this implementation)
 * @returns The properly formatted German relative time string
 */
declare function getGermanRelativeTime(
  count: number,
  withoutSuffix: boolean,
  key: keyof GermanRelativeTimeMap,
  isFuture: boolean
): string;

/**
 * Austrian German (de-AT) locale configuration for moment.js
 * Includes Austrian-specific month names (e.g., "Jänner" instead of "Januar")
 */
declare const deAtLocale: LocaleSpecification;

/**
 * Registers the Austrian German locale with moment.js
 * @param moment - The moment.js instance to register the locale with
 * @returns The registered locale object
 */
export declare function defineDeAtLocale(moment: typeof import('moment')): Locale;

export { deAtLocale as default };