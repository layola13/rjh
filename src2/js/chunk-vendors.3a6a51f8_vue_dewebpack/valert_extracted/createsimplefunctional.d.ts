/**
 * Utility helper functions for Vue.js components
 * Provides functional component creation, event handling, object manipulation, and more
 */

import type { VNode, VNodeData, CreateElement, VueConstructor } from 'vue';

/**
 * Key code constants for keyboard events
 */
export const keyCodes: Readonly<{
  enter: 13;
  tab: 9;
  delete: 46;
  esc: 27;
  space: 32;
  up: 38;
  down: 40;
  left: 37;
  right: 39;
  end: 35;
  home: 36;
  del: 46;
  backspace: 8;
  insert: 45;
  pageup: 33;
  pagedown: 34;
}>;

/**
 * Creates a simple functional Vue component with a single root element
 * @param className - CSS class name to apply to the root element
 * @param tagName - HTML tag name for the root element (default: 'div')
 * @param componentName - Optional component name (defaults to className with underscores replaced by hyphens)
 * @returns Vue functional component
 */
export function createSimpleFunctional(
  className: string,
  tagName?: string,
  componentName?: string
): VueConstructor;

/**
 * Merges directive configuration with modifiers, arguments, and values
 * @param directive - Vue directive binding object
 * @param defaults - Default configuration object
 * @returns Merged configuration object
 */
export function directiveConfig<T extends Record<string, any>>(
  directive: { modifiers?: Record<string, boolean>; arg?: any; value?: T },
  defaults?: Partial<T>
): T;

/**
 * Adds an event listener that automatically removes itself after being called once
 * @param element - Target DOM element
 * @param eventName - Event name to listen for
 * @param callback - Event handler function
 * @param useCapture - Whether to use capture phase (default: false)
 */
export function addOnceEventListener(
  element: HTMLElement,
  eventName: string,
  callback: (event: Event) => void,
  useCapture?: boolean
): void;

/**
 * Indicates whether the browser supports passive event listeners
 */
export const passiveSupported: boolean;

/**
 * Adds a passive event listener if supported by the browser
 * @param element - Target DOM element
 * @param eventName - Event name to listen for
 * @param callback - Event handler function
 * @param options - Passive event listener options
 */
export function addPassiveEventListener(
  element: HTMLElement,
  eventName: string,
  callback: (event: Event) => void,
  options?: boolean | AddEventListenerOptions
): void;

/**
 * Retrieves a nested value from an object using a path array
 * @param obj - Source object
 * @param path - Array of property keys representing the path
 * @param fallback - Fallback value if path doesn't exist
 * @returns Retrieved value or fallback
 */
export function getNestedValue<T = any>(
  obj: any,
  path: Array<string | number>,
  fallback?: T
): T;

/**
 * Performs deep equality comparison between two values
 * @param a - First value
 * @param b - Second value
 * @returns True if values are deeply equal
 */
export function deepEqual(a: any, b: any): boolean;

/**
 * Retrieves a value from an object using a dot-notation or bracket-notation path string
 * @param obj - Source object
 * @param path - Property path string (e.g., 'user.name' or 'items[0].id')
 * @param fallback - Fallback value if path doesn't exist
 * @returns Retrieved value or fallback
 */
export function getObjectValueByPath<T = any>(
  obj: any,
  path: string,
  fallback?: T
): T;

/**
 * Retrieves a property value from an item using various accessor types
 * @param item - Source item
 * @param property - Property accessor (string path, array path, or function)
 * @param fallback - Fallback value
 * @returns Retrieved value or fallback
 */
export function getPropertyFromItem<T = any>(
  item: any,
  property: string | string[] | ((item: any, fallback?: T) => T),
  fallback?: T
): T;

/**
 * Creates an array of sequential numbers from 0 to length-1
 * @param length - Length of the range
 * @returns Array of numbers
 */
export function createRange(length: number): number[];

/**
 * Gets the z-index CSS property value of an element or its ancestors
 * @param element - Target DOM element
 * @returns z-index value or 0 if not found
 */
export function getZIndex(element?: HTMLElement | null): number;

/**
 * Escapes HTML special characters in a string
 * @param str - Input string
 * @returns Escaped string
 */
export function escapeHTML(str: string): string;

/**
 * Filters an object to include only specified keys
 * @param obj - Source object
 * @param keys - Array of keys to include
 * @returns Filtered object
 */
export function filterObjectOnKeys<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K>;

/**
 * Converts a numeric value to a CSS unit string
 * @param value - Numeric or string value
 * @param unit - CSS unit (default: 'px')
 * @returns CSS value string or undefined
 */
export function convertToUnit(
  value: string | number | null | undefined,
  unit?: string
): string | undefined;

/**
 * Converts a camelCase or PascalCase string to kebab-case
 * @param str - Input string
 * @returns kebab-case string
 */
export function kebabCase(str: string): string;

/**
 * Checks if a value is a plain object
 * @param obj - Value to check
 * @returns True if value is an object
 */
export function isObject(obj: any): obj is Record<string, any>;

/**
 * Remaps internal icon names (starting with '$') to their configured values
 * @param config - Vuetify configuration object
 * @param iconName - Icon name to remap
 * @returns Remapped icon name or original if not internal
 */
export function remapInternalIcon(config: any, iconName: string): string;

/**
 * Type-safe wrapper for Object.keys
 * @param obj - Source object
 * @returns Array of object keys
 */
export function keys<T extends Record<string, any>>(obj: T): Array<keyof T>;

/**
 * Converts a kebab-case or snake_case string to camelCase
 * @param str - Input string
 * @returns camelCase string
 */
export function camelize(str: string): string;

/**
 * Returns elements in array2 that are not in array1
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Array of differences
 */
export function arrayDiff<T>(array1: T[], array2: T[]): T[];

/**
 * Capitalizes the first character of a string
 * @param str - Input string
 * @returns String with first character uppercased
 */
export function upperFirst(str: string): string;

/**
 * Groups array items by a specified property
 * @param items - Array of items to group
 * @param groupBy - Array containing the property name to group by
 * @param removeGroupByFromItems - Whether to remove the grouping property from items
 * @returns Array of groups with name and items
 */
export function groupItems<T extends Record<string, any>>(
  items: T[],
  groupBy: string[],
  removeGroupByFromItems?: boolean
): Array<{ name: string; items: T[] }>;

/**
 * Wraps a value in an array if it's not already an array
 * @param value - Value to wrap
 * @returns Array containing the value
 */
export function wrapInArray<T>(value: T | T[] | null | undefined): T[];

/**
 * Sorts an array of items by specified properties with optional custom comparators
 * @param items - Array of items to sort
 * @param sortBy - Array of property names to sort by
 * @param sortDesc - Array of boolean flags for descending sort
 * @param locale - Locale string for collation
 * @param customSorters - Custom sorting functions for specific properties
 * @returns Sorted array
 */
export function sortItems<T extends Record<string, any>>(
  items: T[],
  sortBy: string[],
  sortDesc: boolean[],
  locale: string,
  customSorters?: Record<string, (a: any, b: any) => number>
): T[];

/**
 * Default filter function for searching text values
 * @param value - Value to search in
 * @param search - Search query
 * @param item - Original item (unused in default implementation)
 * @returns True if value contains search query
 */
export function defaultFilter(value: any, search: string | null, item?: any): boolean;

/**
 * Filters array items by searching across all their properties
 * @param items - Array of items to search
 * @param search - Search query
 * @returns Filtered array
 */
export function searchItems<T extends Record<string, any>>(items: T[], search: string): T[];

/**
 * Determines the type of slot (normal, scoped, or v-slot)
 * @param vm - Vue component instance
 * @param slotName - Name of the slot
 * @param split - Whether to differentiate v-slot from scoped slots
 * @returns Slot type: 'normal', 'scoped', 'v-slot', or undefined
 */
export function getSlotType(
  vm: any,
  slotName: string,
  split?: boolean
): 'normal' | 'scoped' | 'v-slot' | undefined;

/**
 * Creates a debounced function that delays execution until after a wait period
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void;

/**
 * Creates a throttled function that executes at most once per time period
 * @param fn - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => ReturnType<T> | undefined;

/**
 * Filters scoped slots by a name prefix and removes the prefix from keys
 * @param prefix - Prefix to filter by
 * @param scopedSlots - Object of scoped slots
 * @returns Filtered scoped slots object
 */
export function getPrefixedScopedSlots(
  prefix: string,
  scopedSlots: Record<string, any>
): Record<string, any>;

/**
 * Retrieves slot content from a Vue component instance
 * @param vm - Vue component instance
 * @param slotName - Name of the slot (default: 'default')
 * @param fallback - Fallback content or function
 * @param provided - Whether to force using provided fallback
 * @returns Slot VNodes or undefined
 */
export function getSlot(
  vm: any,
  slotName?: string,
  fallback?: any | (() => any),
  provided?: boolean
): VNode[] | undefined;

/**
 * Clamps a numeric value between minimum and maximum bounds
 * @param value - Value to clamp
 * @param min - Minimum value (default: 0)
 * @param max - Maximum value (default: 1)
 * @returns Clamped value
 */
export function clamp(value: number, min?: number, max?: number): number;

/**
 * Pads a string to a specified length by appending characters
 * @param str - Input string
 * @param length - Target length
 * @param padChar - Character to pad with (default: '0')
 * @returns Padded string
 */
export function padEnd(str: string, length: number, padChar?: string): string;

/**
 * Splits a string into chunks of specified size
 * @param str - Input string
 * @param size - Chunk size (default: 1)
 * @returns Array of string chunks
 */
export function chunk(str: string, size?: number): string[];

/**
 * Converts a byte size to a human-readable string
 * @param bytes - Number of bytes
 * @param binary - Whether to use binary (1024) or decimal (1000) units
 * @returns Formatted size string
 */
export function humanReadableFileSize(bytes: number, binary?: boolean): string;

/**
 * Converts all keys in an object from kebab-case to camelCase
 * @param obj - Source object
 * @returns Object with camelized keys
 */
export function camelizeObjectKeys<T extends Record<string, any>>(
  obj: T | null | undefined
): Record<string, any>;

/**
 * Deeply merges two objects, combining nested properties
 * @param target - Target object to merge into
 * @param source - Source object to merge from
 * @returns Merged object
 */
export function mergeDeep<T extends Record<string, any>>(
  target?: T,
  source?: Partial<T>
): T;

/**
 * Creates an array of specified length filled with a value
 * @param length - Array length
 * @param value - Value to fill with
 * @returns Filled array
 */
export function fillArray<T>(length: number, value: T): T[];