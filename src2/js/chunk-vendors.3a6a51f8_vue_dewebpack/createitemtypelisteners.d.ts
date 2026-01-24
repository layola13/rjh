/**
 * Utility module for VDatePicker component
 * Provides helper functions for date formatting, event handling, and date manipulation
 */

/**
 * Event listeners type for date picker items
 */
export interface ItemTypeListeners {
  [eventName: string]: (event: Event) => void;
}

/**
 * Native event listeners type for date picker items
 */
export interface ItemTypeNativeListeners {
  [eventName: string]: (event: Event) => void;
}

/**
 * Options for creating a native locale formatter
 */
export interface LocaleFormatterOptions {
  locale?: string;
  day?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  weekday?: 'long' | 'short' | 'narrow';
  timeZone?: string;
}

/**
 * Locale formatter function type
 */
export type LocaleFormatter = (date: Date) => string;

/**
 * Creates event listeners object for date picker item types
 * Handles click, focus, and other DOM events for date picker items
 * 
 * @param type - The type of date picker item (e.g., 'date', 'month', 'year')
 * @param value - The value associated with the item
 * @param handlers - Object containing event handler functions
 * @returns Object containing configured event listeners
 */
export function createItemTypeListeners(
  type: string,
  value: string | number,
  handlers: Record<string, Function>
): ItemTypeListeners;

/**
 * Creates native event listeners object for date picker item types
 * Handles native DOM events with proper event delegation
 * 
 * @param type - The type of date picker item
 * @param value - The value associated with the item
 * @param handlers - Object containing native event handler functions
 * @returns Object containing configured native event listeners
 */
export function createItemTypeNativeListeners(
  type: string,
  value: string | number,
  handlers: Record<string, Function>
): ItemTypeNativeListeners;

/**
 * Creates a locale-aware date formatter using native Intl.DateTimeFormat
 * Returns a function that formats dates according to specified locale and options
 * 
 * @param locale - BCP 47 language tag (e.g., 'en-US', 'fr-FR')
 * @param options - Formatting options for the date
 * @returns Formatter function that takes a Date and returns a formatted string
 * 
 * @example
 * const formatter = createNativeLocaleFormatter('en-US', { month: 'long', year: 'numeric' });
 * formatter(new Date(2024, 0, 1)); // "January 2024"
 */
export function createNativeLocaleFormatter(
  locale: string,
  options?: LocaleFormatterOptions
): LocaleFormatter;

/**
 * Calculates the new date after applying month change
 * Handles edge cases like month overflow and invalid dates
 * 
 * @param year - The current year
 * @param month - The current month (0-11)
 * @param direction - The direction of change (positive for forward, negative for backward)
 * @returns Object containing the new year and month
 * 
 * @example
 * monthChange(2024, 11, 1); // { year: 2025, month: 0 }
 * monthChange(2024, 0, -1); // { year: 2023, month: 11 }
 */
export function monthChange(
  year: number,
  month: number,
  direction: number
): { year: number; month: number };

/**
 * Pads a number with leading zeros to ensure minimum length
 * Commonly used for formatting date components (day, month, hour, minute)
 * 
 * @param value - The numeric value to pad
 * @param length - The desired minimum length (default: 2)
 * @returns Zero-padded string representation of the number
 * 
 * @example
 * pad(5);    // "05"
 * pad(12);   // "12"
 * pad(7, 3); // "007"
 */
export function pad(value: number | string, length?: number): string;