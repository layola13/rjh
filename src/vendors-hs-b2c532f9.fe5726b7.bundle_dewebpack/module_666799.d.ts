/**
 * Moment.js locale configuration for Arabic (Algeria) - ar-dz
 * Provides localized date/time formatting, relative time, and calendar strings
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Determines the plural form index for Arabic numbers
 * Arabic has 6 plural forms based on the number value
 * @param count - The number to determine plural form for
 * @returns Index (0-5) representing the appropriate plural form
 */
declare function getPluralFormIndex(count: number): 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Plural form templates for time units in Arabic
 * Each unit has 6 forms to match Arabic plural rules:
 * 0: less than one, 1: exactly one, 2: exactly two, 3: 3-10, 4: 11-99, 5: 100+
 */
interface PluralForms {
  /** Second plural forms */
  s: [string, string, [string, string], string, string, string];
  /** Minute plural forms */
  m: [string, string, [string, string], string, string, string];
  /** Hour plural forms */
  h: [string, string, [string, string], string, string, string];
  /** Day plural forms */
  d: [string, string, [string, string], string, string, string];
  /** Month plural forms */
  M: [string, string, [string, string], string, string, string];
  /** Year plural forms */
  y: [string, string, [string, string], string, string, string];
}

/**
 * Creates a relative time formatter function for a specific time unit
 * @param unit - The time unit key (s, m, h, d, M, y)
 * @returns A function that formats relative time strings with proper plural forms
 */
declare function createRelativeTimeFormatter(
  unit: keyof PluralForms
): (
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

/**
 * Arabic month names (Algerian variant)
 */
declare const ARABIC_MONTHS: [
  string, // جانفي (January)
  string, // فيفري (February)
  string, // مارس (March)
  string, // أفريل (April)
  string, // ماي (May)
  string, // جوان (June)
  string, // جويلية (July)
  string, // أوت (August)
  string, // سبتمبر (September)
  string, // أكتوبر (October)
  string, // نوفمبر (November)
  string  // ديسمبر (December)
];

/**
 * Locale configuration object for ar-dz (Arabic - Algeria)
 */
declare const arDzLocaleConfig: LocaleSpecification;

/**
 * Defines and registers the ar-dz locale with moment.js
 * @param moment - The moment.js instance
 * @returns The registered locale object
 */
declare function defineArDzLocale(moment: typeof import('moment')): Locale;

export { 
  defineArDzLocale,
  arDzLocaleConfig,
  getPluralFormIndex,
  createRelativeTimeFormatter,
  PluralForms,
  ARABIC_MONTHS
};

export default defineArDzLocale;