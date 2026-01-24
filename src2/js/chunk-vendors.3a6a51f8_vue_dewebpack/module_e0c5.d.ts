/**
 * Gujarati locale configuration for Moment.js
 * Language: Gujarati (gu)
 * Region: India
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping of Western Arabic numerals to Gujarati numerals
 */
interface NumeralMap {
  readonly [key: string]: string;
}

/**
 * Western to Gujarati numeral mapping
 */
declare const westernToGujarati: NumeralMap;

/**
 * Gujarati to Western numeral mapping
 */
declare const gujaratiToWestern: NumeralMap;

/**
 * Gujarati locale specification for Moment.js
 */
declare const gujaratiLocale: LocaleSpecification;

/**
 * Converts Gujarati numerals in a string to Western Arabic numerals
 * @param text - String containing Gujarati numerals
 * @returns String with Western Arabic numerals
 */
declare function preparse(text: string): string;

/**
 * Converts Western Arabic numerals in a string to Gujarati numerals
 * @param text - String containing Western Arabic numerals
 * @returns String with Gujarati numerals
 */
declare function postformat(text: string): string;

/**
 * Determines the hour in 24-hour format based on meridiem indicator
 * @param hour - Hour in 12-hour format
 * @param meridiem - Gujarati meridiem string (રાત/સવાર/બપોર/સાંજ)
 * @returns Hour in 24-hour format, or undefined if invalid
 */
declare function meridiemHour(hour: number, meridiem: string): number | undefined;

/**
 * Returns the appropriate Gujarati meridiem indicator for a given time
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour
 * @param isLowercase - Whether to return lowercase version
 * @returns Gujarati meridiem string (રાત/સવાર/બપોર/સાંજ)
 */
declare function meridiem(hour: number, minute: number, isLowercase: boolean): string;

/**
 * Initializes and registers the Gujarati locale with Moment.js
 * @param moment - Moment.js instance
 */
export default function initGujaratiLocale(moment: Locale): void;

/**
 * Month names in Gujarati (full form)
 */
export declare const months: readonly [
  'જાન્યુઆરી',
  'ફેબ્રુઆરી',
  'માર્ચ',
  'એપ્રિલ',
  'મે',
  'જૂન',
  'જુલાઈ',
  'ઑગસ્ટ',
  'સપ્ટેમ્બર',
  'ઑક્ટ્બર',
  'નવેમ્બર',
  'ડિસેમ્બર'
];

/**
 * Month names in Gujarati (abbreviated form)
 */
export declare const monthsShort: readonly [
  'જાન્યુ.',
  'ફેબ્રુ.',
  'માર્ચ',
  'એપ્રિ.',
  'મે',
  'જૂન',
  'જુલા.',
  'ઑગ.',
  'સપ્ટે.',
  'ઑક્ટ્.',
  'નવે.',
  'ડિસે.'
];

/**
 * Weekday names in Gujarati (full form)
 */
export declare const weekdays: readonly [
  'રવિવાર',
  'સોમવાર',
  'મંગળવાર',
  'બુધ્વાર',
  'ગુરુવાર',
  'શુક્રવાર',
  'શનિવાર'
];

/**
 * Weekday names in Gujarati (short form)
 */
export declare const weekdaysShort: readonly [
  'રવિ',
  'સોમ',
  'મંગળ',
  'બુધ્',
  'ગુરુ',
  'શુક્ર',
  'શનિ'
];

/**
 * Weekday names in Gujarati (minimal form)
 */
export declare const weekdaysMin: readonly [
  'ર',
  'સો',
  'મં',
  'બુ',
  'ગુ',
  'શુ',
  'શ'
];