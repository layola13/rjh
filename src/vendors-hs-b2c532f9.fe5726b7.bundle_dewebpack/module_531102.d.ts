/**
 * Moment.js locale configuration for Kannada (kn)
 * 
 * This module provides localization support for the Kannada language,
 * including month names, weekday names, date formats, and number translations
 * between Arabic numerals and Kannada numerals.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping from Arabic numerals to Kannada numerals
 */
declare const ARABIC_TO_KANNADA_NUMERALS: {
  readonly '1': '೧';
  readonly '2': '೨';
  readonly '3': '೩';
  readonly '4': '೪';
  readonly '5': '೫';
  readonly '6': '೬';
  readonly '7': '೭';
  readonly '8': '೮';
  readonly '9': '೯';
  readonly '0': '೦';
};

/**
 * Mapping from Kannada numerals to Arabic numerals
 */
declare const KANNADA_TO_ARABIC_NUMERALS: {
  readonly '೧': '1';
  readonly '೨': '2';
  readonly '೩': '3';
  readonly '೪': '4';
  readonly '೫': '5';
  readonly '೬': '6';
  readonly '೭': '7';
  readonly '೮': '8';
  readonly '೯': '9';
  readonly '೦': '0';
};

/**
 * Kannada locale configuration object
 */
declare const kannadaLocaleConfig: LocaleSpecification;

/**
 * Converts a string containing Kannada numerals to Arabic numerals
 * 
 * @param input - String containing Kannada numerals
 * @returns String with Kannada numerals replaced by Arabic numerals
 */
declare function parseKannadaNumerals(input: string): string;

/**
 * Converts a string containing Arabic numerals to Kannada numerals
 * 
 * @param input - String containing Arabic numerals
 * @returns String with Arabic numerals replaced by Kannada numerals
 */
declare function formatToKannadaNumerals(input: string): string;

/**
 * Determines the hour in 24-hour format based on 12-hour format and meridiem
 * 
 * @param hour - Hour in 12-hour format (0-12)
 * @param meridiem - Kannada meridiem string (ರಾತ್ರಿ/ಬೆಳಿಗ್ಗೆ/ಮಧ್ಯಾಹ್ನ/ಸಂಜೆ)
 * @returns Hour in 24-hour format, or undefined if invalid
 */
declare function meridiemHour(hour: number, meridiem: string): number | undefined;

/**
 * Returns the appropriate Kannada meridiem string for a given time
 * 
 * @param hour - Hour in 24-hour format (0-23)
 * @param minute - Minute (0-59)
 * @param isLowercase - Whether to return lowercase version (unused in Kannada)
 * @returns Kannada meridiem string (ರಾತ್ರಿ/ಬೆಳಿಗ್ಗೆ/ಮಧ್ಯಾಹ್ನ/ಸಂಜೆ)
 */
declare function meridiem(hour: number, minute: number, isLowercase: boolean): string;

/**
 * Returns the ordinal form of a number in Kannada
 * 
 * @param dayOfMonth - Day of the month (1-31)
 * @returns Ordinal string with Kannada suffix (e.g., "1ನೇ")
 */
declare function ordinal(dayOfMonth: number): string;

/**
 * Initializes and registers the Kannada locale with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The registered Kannada locale
 */
declare function defineKannadaLocale(moment: typeof import('moment')): Locale;

export {
  ARABIC_TO_KANNADA_NUMERALS,
  KANNADA_TO_ARABIC_NUMERALS,
  kannadaLocaleConfig,
  parseKannadaNumerals,
  formatToKannadaNumerals,
  meridiemHour,
  meridiem,
  ordinal,
  defineKannadaLocale
};

export default defineKannadaLocale;