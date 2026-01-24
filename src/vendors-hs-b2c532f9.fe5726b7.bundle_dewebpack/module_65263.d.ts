/**
 * Moment.js locale configuration for Kyrgyz (ky)
 * Provides localization support including month names, weekdays, date formats,
 * and relative time expressions in the Kyrgyz language.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Ordinal suffix mapping for Kyrgyz numbers
 * Maps specific numbers to their corresponding ordinal suffixes
 */
interface OrdinalSuffixMap {
  readonly 0: '-чү';
  readonly 1: '-чи';
  readonly 2: '-чи';
  readonly 3: '-чү';
  readonly 4: '-чү';
  readonly 5: '-чи';
  readonly 6: '-чы';
  readonly 7: '-чи';
  readonly 8: '-чи';
  readonly 9: '-чу';
  readonly 10: '-чу';
  readonly 20: '-чы';
  readonly 30: '-чу';
  readonly 40: '-чы';
  readonly 50: '-чү';
  readonly 60: '-чы';
  readonly 70: '-чи';
  readonly 80: '-чи';
  readonly 90: '-чу';
  readonly 100: '-чү';
}

/**
 * Ordinal suffix lookup table for Kyrgyz numerals
 */
declare const ordinalSuffixes: OrdinalSuffixMap;

/**
 * Kyrgyz locale configuration object
 * Defines all localization settings for the Kyrgyz language
 */
declare const kyrgyzLocale: LocaleSpecification;

/**
 * Gets the appropriate ordinal suffix for a given number in Kyrgyz
 * 
 * @param num - The number to get the ordinal suffix for
 * @returns The number with its appropriate Kyrgyz ordinal suffix
 * 
 * @example
 * getOrdinal(1) // "1-чи"
 * getOrdinal(10) // "10-чу"
 * getOrdinal(100) // "100-чү"
 */
declare function getOrdinal(num: number): string;

/**
 * Defines and registers the Kyrgyz locale with moment.js
 * 
 * @param moment - The moment.js instance to register the locale with
 * @returns The registered Kyrgyz locale object
 */
declare function defineKyrgyzLocale(moment: typeof import('moment')): Locale;

export { 
  kyrgyzLocale, 
  ordinalSuffixes, 
  getOrdinal, 
  defineKyrgyzLocale,
  OrdinalSuffixMap 
};

export default defineKyrgyzLocale;