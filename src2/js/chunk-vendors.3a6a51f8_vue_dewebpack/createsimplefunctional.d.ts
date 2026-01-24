/**
 * Utility helpers module for Vue.js components
 * Provides common functions for DOM manipulation, data processing, and component utilities
 */

import Vue, { VNode, VNodeData, CreateElement, VNodeChildren } from 'vue';

/**
 * KeyCode mapping for common keyboard keys
 */
export interface KeyCodes {
  readonly enter: 13;
  readonly tab: 9;
  readonly delete: 46;
  readonly esc: 27;
  readonly space: 32;
  readonly up: 38;
  readonly down: 40;
  readonly left: 37;
  readonly right: 39;
  readonly end: 35;
  readonly home: 36;
  readonly del: 46;
  readonly backspace: 8;
  readonly insert: 45;
  readonly pageup: 33;
  readonly pagedown: 34;
}

/**
 * Directive configuration object
 */
export interface DirectiveConfig {
  value?: unknown;
  [key: string]: unknown;
}

/**
 * Custom comparator function type
 */
export type Comparator<T = unknown> = (a: T, b: T) => number;

/**
 * Custom comparators mapping
 */
export type CustomComparators = Record<string, Comparator>;

/**
 * Grouped items structure
 */
export interface GroupedItems<T = unknown> {
  name: string;
  items: T[];
}

/**
 * Slot type detection result
 */
export type SlotType = 'normal' | 'scoped' | 'v-slot' | undefined;

/**
 * Creates a simple functional Vue component
 * @param className - CSS class name to apply
 * @param tagName - HTML tag name (default: 'div')
 * @param componentName - Component name for registration
 * @returns Vue component definition
 */
export function createSimpleFunctional(
  className: string,
  tagName?: string,
  componentName?: string
): Vue.Component;

/**
 * Merges directive binding configuration with additional options
 * @param binding - Vue directive binding object
 * @param defaults - Default configuration values
 * @returns Merged configuration object
 */
export function directiveConfig(
  binding: { arg?: unknown; value?: Record<string, unknown>; modifiers?: Record<string, boolean> },
  defaults?: Record<string, unknown>
): DirectiveConfig;

/**
 * Adds an event listener that automatically removes itself after first trigger
 * @param element - Target DOM element
 * @param eventName - Event name to listen for
 * @param callback - Event handler callback
 * @param options - Event listener options (default: false)
 */
export function addOnceEventListener(
  element: EventTarget,
  eventName: string,
  callback: EventListener,
  options?: boolean | AddEventListenerOptions
): void;

/**
 * Indicates if passive event listeners are supported by the browser
 */
export const passiveSupported: boolean;

/**
 * Adds a passive event listener if supported
 * @param element - Target DOM element
 * @param eventName - Event name to listen for
 * @param callback - Event handler callback
 * @param options - Passive option flag
 */
export function addPassiveEventListener(
  element: EventTarget,
  eventName: string,
  callback: EventListener,
  options?: boolean | AddEventListenerOptions
): void;

/**
 * Gets nested value from an object using path array
 * @param obj - Source object
 * @param path - Array of property keys
 * @param fallback - Fallback value if not found
 * @returns Retrieved value or fallback
 */
export function getNestedValue<T = unknown>(
  obj: unknown,
  path: (string | number)[],
  fallback?: T
): T;

/**
 * Deep equality comparison between two values
 * @param a - First value
 * @param b - Second value
 * @returns True if deeply equal
 */
export function deepEqual(a: unknown, b: unknown): boolean;

/**
 * Gets object property value by string path (supports dot notation and brackets)
 * @param obj - Source object
 * @param path - Property path string
 * @param fallback - Fallback value if not found
 * @returns Retrieved value or fallback
 */
export function getObjectValueByPath<T = unknown>(
  obj: Record<string, unknown> | null | undefined,
  path: string | undefined,
  fallback?: T
): T;

/**
 * Gets property from item using various accessor types
 * @param item - Source item
 * @param property - Property accessor (string, array, or function)
 * @param fallback - Fallback value if not found
 * @returns Retrieved value or fallback
 */
export function getPropertyFromItem<T = unknown>(
  item: unknown,
  property: string | string[] | ((item: unknown, fallback?: T) => T) | null | undefined,
  fallback?: T
): T;

/**
 * Creates an array of numbers from 0 to length-1
 * @param length - Array length
 * @returns Array of sequential numbers
 */
export function createRange(length: number): number[];

/**
 * Gets the z-index value of an element or its ancestors
 * @param element - DOM element
 * @returns Z-index value
 */
export function getZIndex(element: Element | null | undefined): number;

/**
 * Escapes HTML special characters
 * @param str - String to escape
 * @returns Escaped string
 */
export function escapeHTML(str: string): string;

/**
 * Filters object to only include specified keys
 * @param obj - Source object
 * @param keys - Keys to include
 * @returns Filtered object
 */
export function filterObjectOnKeys<T extends Record<string, unknown>>(
  obj: T,
  keys: string[]
): Partial<T>;

/**
 * Converts a value to CSS unit string
 * @param value - Numeric or string value
 * @param unit - CSS unit (default: 'px')
 * @returns CSS unit string or undefined
 */
export function convertToUnit(
  value: string | number | null | undefined,
  unit?: string
): string | undefined;

/**
 * Converts camelCase or PascalCase string to kebab-case
 * @param str - String to convert
 * @returns Kebab-case string
 */
export function kebabCase(str: string): string;

/**
 * Checks if value is a plain object
 * @param obj - Value to check
 * @returns True if object
 */
export function isObject(obj: unknown): obj is Record<string, unknown>;

/**
 * Standard keyboard key codes
 */
export const keyCodes: KeyCodes;

/**
 * Remaps internal icon references (starting with $) to actual icon names
 * @param icons - Icons configuration object
 * @param iconName - Icon name to remap
 * @returns Resolved icon name
 */
export function remapInternalIcon(icons: Record<string, unknown>, iconName: string): string;

/**
 * Gets object keys with proper typing
 * @param obj - Source object
 * @returns Array of keys
 */
export function keys<T extends Record<string, unknown>>(obj: T): (keyof T)[];

/**
 * Converts kebab-case or snake_case string to camelCase
 * @param str - String to convert
 * @returns CamelCase string
 */
export function camelize(str: string): string;

/**
 * Returns elements in array2 that are not in array1
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Difference array
 */
export function arrayDiff<T>(array1: T[], array2: T[]): T[];

/**
 * Capitalizes first character of string
 * @param str - String to transform
 * @returns Capitalized string
 */
export function upperFirst(str: string): string;

/**
 * Groups array items by specified property
 * @param items - Items to group
 * @param groupBy - Property paths to group by
 * @param groupDesc - Not used in implementation
 * @returns Grouped items array
 */
export function groupItems<T = unknown>(
  items: T[],
  groupBy: string[],
  groupDesc?: boolean[]
): GroupedItems<T>[];

/**
 * Wraps value in array if not already an array
 * @param value - Value to wrap
 * @returns Array containing value
 */
export function wrapInArray<T>(value: T | T[] | null | undefined): T[];

/**
 * Sorts array items by specified properties
 * @param items - Items to sort
 * @param sortBy - Properties to sort by
 * @param sortDesc - Sort descending flags
 * @param locale - Locale for string comparison
 * @param customComparators - Custom comparator functions
 * @returns Sorted array
 */
export function sortItems<T>(
  items: T[],
  sortBy: string[],
  sortDesc: boolean[],
  locale: string,
  customComparators?: CustomComparators
): T[];

/**
 * Default text filter function (case-insensitive substring match)
 * @param value - Value to search in
 * @param search - Search term
 * @param item - Full item (unused)
 * @returns True if match found
 */
export function defaultFilter(value: unknown, search: string | null, item?: unknown): boolean;

/**
 * Searches items using default filter across all properties
 * @param items - Items to search
 * @param search - Search term
 * @returns Filtered items
 */
export function searchItems<T extends Record<string, unknown>>(items: T[], search: string): T[];

/**
 * Detects the type of Vue slot
 * @param vm - Vue instance
 * @param slotName - Slot name
 * @param split - Flag for v-slot detection
 * @returns Slot type
 */
export function getSlotType(vm: Vue, slotName: string, split?: boolean): SlotType;

/**
 * Creates a debounced function
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void;

/**
 * Creates a throttled function
 * @param fn - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => ReturnType<T> | undefined;

/**
 * Gets scoped slots with matching prefix
 * @param prefix - Slot name prefix
 * @param scopedSlots - Scoped slots object
 * @returns Filtered scoped slots
 */
export function getPrefixedScopedSlots(
  prefix: string,
  scopedSlots: Record<string, unknown>
): Record<string, unknown>;

/**
 * Gets slot content with optional default and props
 * @param vm - Vue instance
 * @param slotName - Slot name (default: 'default')
 * @param slotProps - Props to pass to scoped slot
 * @param fallback - Use fallback if no slot content
 * @returns VNode array or undefined
 */
export function getSlot(
  vm: Vue,
  slotName?: string,
  slotProps?: Record<string, unknown> | (() => Record<string, unknown>),
  fallback?: boolean
): VNode[] | undefined;

/**
 * Clamps a number between min and max values
 * @param value - Value to clamp
 * @param min - Minimum value (default: 0)
 * @param max - Maximum value (default: 1)
 * @returns Clamped value
 */
export function clamp(value: number, min?: number, max?: number): number;

/**
 * Pads end of string with specified character
 * @param str - String to pad
 * @param length - Target length
 * @param char - Padding character (default: '0')
 * @returns Padded string
 */
export function padEnd(str: string, length: number, char?: string): string;

/**
 * Splits string into chunks of specified size
 * @param str - String to chunk
 * @param size - Chunk size (default: 1)
 * @returns Array of string chunks
 */
export function chunk(str: string, size?: number): string[];

/**
 * Converts bytes to human-readable file size
 * @param bytes - Number of bytes
 * @param binary - Use binary units (1024) vs decimal (1000)
 * @returns Formatted file size string
 */
export function humanReadableFileSize(bytes: number, binary?: boolean): string;

/**
 * Converts all object keys from kebab-case to camelCase
 * @param obj - Object to transform
 * @returns Object with camelCase keys
 */
export function camelizeObjectKeys<T extends Record<string, unknown>>(
  obj: T | null | undefined
): Record<string, unknown>;

/**
 * Deep merges two objects
 * @param target - Target object
 * @param source - Source object
 * @returns Merged object
 */
export function mergeDeep<T extends Record<string, unknown>>(
  target?: T,
  source?: Partial<T>
): T;

/**
 * Creates an array filled with specified value
 * @param length - Array length
 * @param value - Fill value
 * @returns Filled array
 */
export function fillArray<T>(length: number, value: T): T[];