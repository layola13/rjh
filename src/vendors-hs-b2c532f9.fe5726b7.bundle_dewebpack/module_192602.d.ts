/**
 * Moment.js locale configuration for Finnish (fi)
 * Defines Finnish language translations and formatting rules for moment.js
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Number words in Finnish (nominative case)
 * Used for translating numbers 0-9 into Finnish words
 */
type FinnishNumberWord = 
  | "nolla" 
  | "yksi" 
  | "kaksi" 
  | "kolme" 
  | "neljä" 
  | "viisi" 
  | "kuusi" 
  | "seitsemän" 
  | "kahdeksan" 
  | "yhdeksän";

/**
 * Number words in Finnish (genitive case)
 * Used for translating numbers 0-9 into Finnish genitive form
 */
type FinnishNumberWordGenitive = 
  | "nolla"
  | "yhden"
  | "kahden"
  | "kolmen"
  | "neljän"
  | "viiden"
  | "kuuden"
  | "seitsemän"
  | "kahdeksan"
  | "yhdeksän";

/**
 * Relative time unit keys supported by moment.js
 */
type RelativeTimeUnit = 
  | 's'   // seconds
  | 'ss'  // seconds (plural)
  | 'm'   // minute
  | 'mm'  // minutes
  | 'h'   // hour
  | 'hh'  // hours
  | 'd'   // day
  | 'dd'  // days
  | 'M'   // month
  | 'MM'  // months
  | 'y'   // year
  | 'yy'; // years

/**
 * Translates a number (0-9) to its Finnish word representation
 * @param num - Number to translate (0-9)
 * @param useGenitive - If true, returns genitive case; otherwise nominative
 * @returns Finnish word representation of the number
 */
declare function translateNumber(num: number, useGenitive: boolean): string;

/**
 * Generates relative time string in Finnish
 * @param value - Numeric value of the time unit
 * @param withoutSuffix - Not used in implementation (legacy parameter)
 * @param unit - Time unit key (s, m, h, d, M, y, etc.)
 * @param isFuture - If true, uses genitive case (future/past context)
 * @returns Localized relative time string in Finnish
 */
declare function relativeTimeFormatter(
  value: number,
  withoutSuffix: boolean,
  unit: RelativeTimeUnit,
  isFuture: boolean
): string;

/**
 * Finnish locale configuration for moment.js
 * Includes months, weekdays, date formats, and relative time translations
 */
declare const finnishLocale: LocaleSpecification;

/**
 * Registers the Finnish locale with moment.js
 * @param moment - Moment.js instance
 * @returns Configured Finnish locale object
 */
declare function defineFinnishLocale(moment: typeof import('moment')): Locale;

export default defineFinnishLocale;
export { finnishLocale, relativeTimeFormatter, translateNumber };
export type { RelativeTimeUnit, FinnishNumberWord, FinnishNumberWordGenitive };