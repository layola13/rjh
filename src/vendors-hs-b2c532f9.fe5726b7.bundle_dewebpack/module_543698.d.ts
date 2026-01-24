/**
 * Moment.js locale configuration for Belarusian (be)
 * 
 * This module provides localization support for Belarusian language in moment.js,
 * including month names, weekday names, date formats, and relative time expressions.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Pluralization forms for Belarusian time units
 */
interface PluralForms {
  /** Plural forms for seconds */
  ss: string;
  /** Plural forms for minutes */
  mm: string;
  /** Plural forms for hours */
  hh: string;
  /** Plural forms for days */
  dd: string;
  /** Plural forms for months */
  MM: string;
  /** Plural forms for years */
  yy: string;
}

/**
 * Unit keys for relative time formatting
 */
type RelativeTimeUnit = 'm' | 'h' | 'ss' | 'mm' | 'hh' | 'dd' | 'MM' | 'yy';

/**
 * Determines the correct plural form for Belarusian numerals
 * 
 * @param count - The number to pluralize
 * @param withoutSuffix - Whether to use nominative case (true) or accusative case (false)
 * @param unit - The time unit being pluralized
 * @returns The properly formatted string with correct plural form
 */
declare function relativeTimeWithPlural(
  count: number | string,
  withoutSuffix: boolean,
  unit: RelativeTimeUnit
): string;

/**
 * Belarusian locale configuration object
 */
declare const belarussianLocale: LocaleSpecification;

/**
 * Defines and registers the Belarusian locale with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The registered locale object
 */
export default function defineBelarussianLocale(moment: typeof import('moment')): Locale;

/**
 * Named export of the locale configuration
 */
export { belarussianLocale };

/**
 * Locale configuration details:
 * 
 * - Months: Full month names with format and standalone forms
 * - Weekdays: Full weekday names with format and standalone forms
 * - Date formats: Short (L), medium (LL), long (LLL), and full (LLLL)
 * - Calendar: Relative day expressions (today, tomorrow, yesterday, etc.)
 * - Relative time: Past and future time expressions with proper pluralization
 * - Meridiem: Time of day indicators (night, morning, day, evening)
 * - Ordinals: Ordinal number suffixes
 * - Week settings: Week starts on Monday (dow: 1), first week of year (doy: 7)
 */