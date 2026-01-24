/**
 * Moment.js Turkish (tr) locale configuration
 * Provides localization for dates, times, and relative time formatting in Turkish
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Ordinal suffix mappings for Turkish numbers
 * Maps specific numbers to their corresponding ordinal suffixes
 * @example 1 -> "'inci", 2 -> "'nci", 3 -> "'üncü"
 */
interface OrdinalSuffixMap {
  [key: number]: string;
}

/**
 * Turkish ordinal suffixes configuration
 * Used to append correct suffixes to numbers (e.g., 1'inci, 2'nci)
 */
declare const ordinalSuffixes: OrdinalSuffixMap;

/**
 * Turkish locale configuration for moment.js
 * Defines months, weekdays, time formats, and relative time strings
 */
declare const turkishLocaleConfig: LocaleSpecification;

/**
 * Defines the Turkish locale for moment.js
 * @param moment - The moment.js instance to configure
 * @returns The configured Turkish locale
 */
export function defineTurkishLocale(moment: typeof import('moment')): Locale;

/**
 * Turkish month names (full)
 */
export type TurkishMonths = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

/**
 * Turkish month names (abbreviated)
 */
export type TurkishMonthsShort = [
  'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
  'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'
];

/**
 * Turkish weekday names (full)
 */
export type TurkishWeekdays = [
  'Pazar', 'Pazartesi', 'Salı', 'Çarşamba',
  'Perşembe', 'Cuma', 'Cumartesi'
];

/**
 * Turkish weekday names (abbreviated)
 */
export type TurkishWeekdaysShort = [
  'Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'
];

/**
 * Turkish weekday names (minimal)
 */
export type TurkishWeekdaysMin = [
  'Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'
];

/**
 * Returns the appropriate meridiem string (AM/PM) in Turkish
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour (0-59)
 * @param isLowercase - Whether to return lowercase version
 * @returns "öö" (ÖÖ) for AM, "ös" (ÖS) for PM
 */
export function meridiem(hour: number, minute: number, isLowercase: boolean): string;

/**
 * Determines if a meridiem string represents PM
 * @param meridiemString - The meridiem string to check
 * @returns True if the string represents PM (afternoon)
 */
export function isPM(meridiemString: string): boolean;

/**
 * Calculates the ordinal suffix for a given number in Turkish
 * @param number - The number to get the ordinal for
 * @param token - The formatting token (e.g., 'd', 'D', 'Do', 'DD')
 * @returns The number with appropriate Turkish ordinal suffix
 */
export function ordinal(number: number, token: string): string;

/**
 * Week configuration for Turkish locale
 */
export interface TurkishWeekConfig {
  /** Day of week (1 = Monday) */
  dow: 1;
  /** Day of year that defines week 1 */
  doy: 7;
}

export default defineTurkishLocale;