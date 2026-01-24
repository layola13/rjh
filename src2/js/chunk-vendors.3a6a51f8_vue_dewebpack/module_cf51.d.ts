/**
 * Moment.js locale configuration for Talossan (tzl)
 * Talossan is a constructed language created by R. Ben Madison
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration options for relative time formatting
 */
interface RelativeTimeConfig {
  /** Singular form for past tense */
  0: string;
  /** Singular form for future tense or present */
  1: string;
}

/**
 * Map of time unit keys to their Talossan translations
 */
interface RelativeTimeUnits {
  s: RelativeTimeConfig;
  ss: RelativeTimeConfig;
  m: RelativeTimeConfig;
  mm: RelativeTimeConfig;
  h: RelativeTimeConfig;
  hh: RelativeTimeConfig;
  d: RelativeTimeConfig;
  dd: RelativeTimeConfig;
  M: RelativeTimeConfig;
  MM: RelativeTimeConfig;
  y: RelativeTimeConfig;
  yy: RelativeTimeConfig;
}

/**
 * Formats relative time strings in Talossan
 * @param count - The numeric value to format
 * @param withoutSuffix - Whether to include prefix/suffix
 * @param unitKey - The time unit key (s, m, h, d, M, y, etc.)
 * @param isFuture - Whether the time reference is in the future
 * @returns Formatted relative time string
 */
declare function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  unitKey: keyof RelativeTimeUnits,
  isFuture: boolean
): string;

/**
 * Talossan locale configuration object
 */
declare const tzlLocale: LocaleSpecification;

/**
 * Month names in Talossan
 */
declare const MONTHS: readonly [
  'Januar',
  'Fevraglh',
  'Març',
  'Avrïu',
  'Mai',
  'Gün',
  'Julia',
  'Guscht',
  'Setemvar',
  'Listopäts',
  'Noemvar',
  'Zecemvar'
];

/**
 * Abbreviated month names in Talossan
 */
declare const MONTHS_SHORT: readonly [
  'Jan',
  'Fev',
  'Mar',
  'Avr',
  'Mai',
  'Gün',
  'Jul',
  'Gus',
  'Set',
  'Lis',
  'Noe',
  'Zec'
];

/**
 * Weekday names in Talossan
 */
declare const WEEKDAYS: readonly [
  'Súladi',
  'Lúneçi',
  'Maitzi',
  'Márcuri',
  'Xhúadi',
  'Viénerçi',
  'Sáturi'
];

/**
 * Abbreviated weekday names in Talossan
 */
declare const WEEKDAYS_SHORT: readonly [
  'Súl',
  'Lún',
  'Mai',
  'Már',
  'Xhú',
  'Vié',
  'Sát'
];

/**
 * Minimal weekday names in Talossan
 */
declare const WEEKDAYS_MIN: readonly [
  'Sú',
  'Lú',
  'Ma',
  'Má',
  'Xh',
  'Vi',
  'Sá'
];

/**
 * Registers the Talossan locale with moment.js
 * @param moment - The moment.js instance
 * @returns The registered locale
 */
export declare function defineTzlLocale(moment: typeof import('moment')): Locale;

export { tzlLocale, formatRelativeTime };