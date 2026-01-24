/**
 * Moment.js locale configuration for Estonian (et)
 * 
 * This module provides Estonian language localization for moment.js,
 * including month names, weekday names, date formats, and relative time formatting.
 * 
 * @module moment-locale-et
 */

import { Moment, LocaleSpecification } from 'moment';

/**
 * Time unit type for relative time formatting
 */
type TimeUnit = 's' | 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'y' | 'yy';

/**
 * Relative time configuration structure
 */
interface RelativeTimeConfig {
  /** Seconds (few seconds) */
  s: [string, string, string];
  /** Multiple seconds */
  ss: [string, string];
  /** Minute */
  m: [string, string];
  /** Multiple minutes */
  mm: [string, string];
  /** Hour */
  h: [string, string, string];
  /** Multiple hours */
  hh: [string, string];
  /** Day */
  d: [string, string];
  /** Month */
  M: [string, string, string];
  /** Multiple months */
  MM: [string, string];
  /** Year */
  y: [string, string, string];
  /** Multiple years */
  yy: [string, string];
}

/**
 * Formats relative time expressions in Estonian
 * 
 * @param count - The numeric value for the time unit
 * @param withoutSuffix - Whether to format without suffix (e.g., "ago" or "in")
 * @param unit - The time unit being formatted
 * @param isFuture - Whether the time is in the future
 * @returns The formatted relative time string in Estonian
 */
declare function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  unit: TimeUnit,
  isFuture: boolean
): string;

/**
 * Estonian locale configuration for moment.js
 */
declare const estonianLocale: LocaleSpecification;

/**
 * Defines the Estonian locale in the moment.js global instance
 * 
 * @param momentInstance - The moment.js instance to configure
 */
declare function defineEstonianLocale(momentInstance: typeof Moment): void;

export { formatRelativeTime, estonianLocale, defineEstonianLocale };
export default defineEstonianLocale;