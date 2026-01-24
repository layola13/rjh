/**
 * Moment.js Kurdish (Sorani) locale configuration
 * Defines localization settings for Kurdish language including:
 * - Number translations (Arabic-Indic to Western and vice versa)
 * - Month and weekday names
 * - Date/time formatting patterns
 * - Relative time expressions
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping from Western digits to Arabic-Indic numerals
 */
declare const WESTERN_TO_ARABIC_INDIC: Readonly<Record<string, string>>;

/**
 * Mapping from Arabic-Indic numerals to Western digits
 */
declare const ARABIC_INDIC_TO_WESTERN: Readonly<Record<string, string>>;

/**
 * Kurdish month names (Gregorian calendar)
 */
declare const KURDISH_MONTHS: readonly [
  'کانونی دووەم',
  'شوبات',
  'ئازار',
  'نیسان',
  'ئایار',
  'حوزەیران',
  'تەمموز',
  'ئاب',
  'ئەیلوول',
  'تشرینی یەكەم',
  'تشرینی دووەم',
  'كانونی یەکەم'
];

/**
 * Kurdish locale configuration specification
 */
declare const kurdishLocaleSpec: LocaleSpecification;

/**
 * Preparse function to normalize Kurdish text input
 * Converts Arabic-Indic numerals to Western digits and normalizes punctuation
 * @param text - Input text containing Arabic-Indic numerals
 * @returns Normalized text with Western numerals
 */
declare function preparseKurdish(text: string): string;

/**
 * Postformat function to convert output to Kurdish format
 * Converts Western digits to Arabic-Indic numerals and adjusts punctuation
 * @param text - Text containing Western numerals
 * @returns Formatted text with Arabic-Indic numerals
 */
declare function postformatKurdish(text: string): string;

/**
 * Determines if a time string represents PM (afternoon/evening)
 * @param timeString - Kurdish time period indicator
 * @returns True if the time is PM (ئێواره‌), false otherwise
 */
declare function isPM(timeString: string): boolean;

/**
 * Returns the appropriate meridiem indicator for a given time
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour
 * @param isLowercase - Whether to return lowercase format
 * @returns Kurdish meridiem string: "به‌یانی" (morning) or "ئێواره‌" (evening)
 */
declare function meridiem(hour: number, minute: number, isLowercase: boolean): string;

/**
 * Registers the Kurdish locale with moment.js
 * @param moment - Moment.js instance
 * @returns Configured Kurdish locale
 */
export default function defineKurdishLocale(moment: typeof import('moment')): Locale;

/**
 * Kurdish locale configuration object
 * Can be imported and used to configure moment.js for Kurdish language support
 */
export { kurdishLocaleSpec as kuLocale };