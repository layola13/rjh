/**
 * Moment.js locale configuration for Breton (br)
 * 
 * This module provides localization support for the Breton language,
 * including month names, weekday names, and relative time formatting.
 * 
 * @module moment/locale/br
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Month name abbreviations in Breton
 */
type MonthKey = 'mm' | 'MM' | 'dd';

/**
 * Configuration object mapping time units to their Breton names
 */
interface BretonUnitNames {
  /** Minutes in Breton */
  mm: 'munutenn';
  /** Months in Breton */
  MM: 'miz';
  /** Days in Breton */
  dd: 'devezh';
}

/**
 * Character mutation map for Breton soft mutation (lenition)
 */
interface BretonMutationMap {
  /** m → v mutation */
  m: 'v';
  /** b → v mutation */
  b: 'v';
  /** d → z mutation */
  d: 'z';
}

/**
 * Formats a relative time string with Breton grammar rules.
 * Applies soft mutation for dual forms (count === 2).
 * 
 * @param count - The numeric value
 * @param isFuture - Whether the time is in the future (unused in this implementation)
 * @param unitKey - The time unit key ('mm', 'MM', or 'dd')
 * @returns Formatted string with count and mutated unit name
 */
export function formatRelativeTime(
  count: number,
  isFuture: boolean,
  unitKey: MonthKey
): string;

/**
 * Applies Breton soft mutation (lenition) to a word.
 * Used for dual forms (count === 2) where initial consonants mutate:
 * m/b → v, d → z
 * 
 * @param word - The word to potentially mutate
 * @returns The mutated word if mutation applies, otherwise original word
 */
export function applySoftMutation(word: string): string;

/**
 * Extracts the last digit of a number for ordinal determination.
 * Recursively processes numbers greater than 9.
 * 
 * @param num - The number to process
 * @returns The last digit (0-9)
 */
export function getLastDigit(num: number): number;

/**
 * Regular expressions for parsing Breton month names.
 * Matches both full and abbreviated forms, case-insensitive.
 */
export const MONTH_PARSE_REGEX: ReadonlyArray<RegExp>;

/**
 * Combined regex for matching any Breton month name or abbreviation.
 * Supports both full names and short forms with optional apostrophe variations.
 */
export const MONTH_REGEX: RegExp;

/**
 * Regular expressions for parsing Breton weekday names (minimum forms).
 * Matches abbreviated weekday names, case-insensitive.
 */
export const WEEKDAY_MIN_PARSE_REGEX: ReadonlyArray<RegExp>;

/**
 * Moment.js locale configuration object for Breton
 */
export const bretonLocale: LocaleSpecification;

/**
 * Defines and registers the Breton locale with Moment.js
 * 
 * @param moment - The Moment.js instance
 * @returns The registered locale object
 */
export default function defineBretonLocale(moment: typeof import('moment')): Locale;