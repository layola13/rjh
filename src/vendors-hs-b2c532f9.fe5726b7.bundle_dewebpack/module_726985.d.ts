/**
 * Moment.js locale configuration for Montenegrin (me)
 * @module MomentLocaleMe
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Grammatical case words for relative time formatting
 */
interface LocaleWords {
  /** Seconds: [singular nominative, singular genitive, plural genitive] */
  ss: [string, string, string];
  /** Minute: [nominative, genitive] */
  m: [string, string];
  /** Minutes: [singular nominative, singular genitive, plural genitive] */
  mm: [string, string, string];
  /** Hour: [nominative, genitive] */
  h: [string, string];
  /** Hours: [singular nominative, singular genitive, plural genitive] */
  hh: [string, string, string];
  /** Days: [singular nominative, singular genitive, plural genitive] */
  dd: [string, string, string];
  /** Months: [singular nominative, singular genitive, plural genitive] */
  MM: [string, string, string];
  /** Years: [singular nominative, singular genitive, plural genitive] */
  yy: [string, string, string];
}

/**
 * Translation helper for Montenegrin locale
 */
interface TranslationHelper {
  /** Grammatical case word mappings */
  words: LocaleWords;
  
  /**
   * Selects correct grammatical case based on number
   * @param count - The numeric value
   * @param choices - Array of grammatical forms [nominative, genitive singular, genitive plural]
   * @returns The correct grammatical form
   */
  correctGrammaticalCase(count: number, choices: [string, string, string]): string;
  
  /**
   * Translates relative time expressions
   * @param count - The numeric value
   * @param withoutSuffix - Whether to include prefix/suffix
   * @param key - The time unit key (ss, m, mm, h, hh, dd, MM, yy)
   * @returns Formatted relative time string
   */
  translate(count: number, withoutSuffix: boolean, key: string): string;
}

/**
 * Function signature for nextWeek/lastWeek calendar functions
 */
type CalendarFunction = (this: { day(): number }) => string;

/**
 * Montenegrin locale configuration for moment.js
 */
export declare const montenegrinLocale: LocaleSpecification;

/**
 * Defines the Montenegrin locale in moment.js
 * @param moment - The moment.js instance
 * @returns The configured locale
 */
export declare function defineMonenegrinLocale(moment: typeof import('moment')): Locale;