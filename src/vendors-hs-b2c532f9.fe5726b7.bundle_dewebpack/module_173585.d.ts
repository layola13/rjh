/**
 * Moment.js locale configuration for Arabic (Saudi Arabia)
 * Locale code: ar-sa
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping of Western Arabic numerals (0-9) to Eastern Arabic-Indic numerals
 */
declare const WESTERN_TO_EASTERN_DIGITS: Record<string, string>;

/**
 * Mapping of Eastern Arabic-Indic numerals to Western Arabic numerals (0-9)
 */
declare const EASTERN_TO_WESTERN_DIGITS: Record<string, string>;

/**
 * Arabic (Saudi Arabia) locale specification for moment.js
 */
declare const arSaLocaleSpec: LocaleSpecification;

/**
 * Defines the Arabic (Saudi Arabia) locale for moment.js
 * 
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured locale object
 */
declare function defineArSaLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Preprocesses Arabic numerals in date strings by converting Eastern Arabic-Indic digits
 * to Western Arabic numerals and Arabic comma to Latin comma
 * 
 * @param input - The input string containing Eastern Arabic-Indic numerals
 * @returns The string with Western Arabic numerals
 */
declare function preparse(input: string): string;

/**
 * Post-processes date strings by converting Western Arabic numerals to Eastern Arabic-Indic digits
 * and Latin comma to Arabic comma
 * 
 * @param input - The input string containing Western Arabic numerals
 * @returns The string with Eastern Arabic-Indic numerals
 */
declare function postformat(input: string): string;

/**
 * Determines if a given meridiem string represents PM (afternoon/evening)
 * 
 * @param meridiemString - The meridiem string ('ص' for AM or 'م' for PM)
 * @returns True if PM, false if AM
 */
declare function isPM(meridiemString: string): boolean;

/**
 * Returns the appropriate Arabic meridiem string based on hour
 * 
 * @param hour - The hour (0-23)
 * @param minute - The minute (0-59)
 * @param isLowercase - Whether to return lowercase format
 * @returns 'ص' (AM) if hour < 12, otherwise 'م' (PM)
 */
declare function meridiem(hour: number, minute: number, isLowercase: boolean): string;

export {
  WESTERN_TO_EASTERN_DIGITS,
  EASTERN_TO_WESTERN_DIGITS,
  arSaLocaleSpec,
  defineArSaLocale,
  preparse,
  postformat,
  isPM,
  meridiem
};

export default defineArSaLocale;