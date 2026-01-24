/**
 * Moment.js locale configuration for German (Switzerland)
 * Provides localized date/time formatting and relative time strings for de-CH locale
 * @module moment-locale-de-ch
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration options for relative time formatting
 */
interface RelativeTimeConfig {
  /** Array containing singular and plural forms: [nominative, dative] */
  m: [string, string];
  h: [string, string];
  d: [string, string];
  dd: [string, string];
  w: [string, string];
  M: [string, string];
  MM: [string, string];
  y: [string, string];
  yy: [string, string];
}

/**
 * Formats relative time strings with proper German grammar
 * @param value - The numeric value for the time unit
 * @param withoutSuffix - Whether to use nominative (true) or dative (false) case
 * @param key - The time unit key (e.g., 'm' for minute, 'h' for hour)
 * @param isFuture - Whether the time is in the future (unused in this implementation)
 * @returns Formatted relative time string
 */
declare function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: keyof RelativeTimeConfig,
  isFuture: boolean
): string;

/**
 * Swiss German (de-CH) locale configuration for moment.js
 */
declare const deChLocale: LocaleSpecification;

/**
 * Defines and registers the Swiss German locale with moment.js
 * @param moment - The moment.js instance to register the locale with
 */
export declare function defineDeChLocale(moment: typeof Locale): void;

export default deChLocale;