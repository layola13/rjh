/**
 * Utility functions for DOM event handling, touch scrolling, and transitions.
 * @module DOMUtilities
 */

/**
 * Cross-browser event listener attachment
 * @param element - The target element to attach the event listener to
 * @param eventType - The type of event to listen for (e.g., 'click', 'touchstart')
 * @param handler - The callback function to execute when the event fires
 * @param options - Optional event listener options or useCapture boolean
 */
export function addEventListener(
  element: HTMLElement | Document | Window,
  eventType: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void;

/**
 * Cross-browser event listener removal
 * @param element - The target element to remove the event listener from
 * @param eventType - The type of event to stop listening for
 * @param handler - The callback function to remove
 * @param options - Optional event listener options or useCapture boolean
 */
export function removeEventListener(
  element: HTMLElement | Document | Window,
  eventType: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void;

/**
 * Converts data to an array format. If already an array, returns as-is; otherwise wraps in array.
 * @param data - The data to convert to array format
 * @returns The data as an array
 */
export function dataToArray<T>(data: T | T[]): T[];

/**
 * Transform arguments using a function or return the value directly.
 * Ensures the result is always a tuple of exactly 2 elements.
 * @param argumentsOrFunction - Either a direct value or a function that produces a value
 * @param context - The context to pass to the function if argumentsOrFunction is a function
 * @returns A tuple of exactly 2 elements
 */
export function transformArguments<T, R>(
  argumentsOrFunction: R | R[] | ((context: T) => R | R[]),
  context: T
): [R, R];

/**
 * Checks if a value is numeric (can be parsed as a finite number)
 * @param value - The value to check
 * @returns True if the value is numeric, false otherwise
 */
export function isNumeric(value: unknown): boolean;

/**
 * The CSS transition property name supported by the current browser.
 * Will be one of: 'transition', 'WebkitTransition', 'MozTransition', or 'OTransition'
 */
export const transitionStr: string | undefined;

/**
 * The transition end event name for the current browser.
 * Will be one of: 'transitionend', 'webkitTransitionEnd', 'oTransitionEnd', or 'otransitionend'
 */
export const transitionEnd: string | undefined;

/**
 * Flag indicating whether the window object is undefined (e.g., in server-side rendering)
 */
export const windowIsUndefined: boolean;

/**
 * Recursively checks if a parent element should block touch scrolling based on scroll boundaries.
 * Traverses up the DOM tree to determine if any ancestor element will handle the scroll.
 * @param targetElement - The element where touch interaction originated
 * @param currentNode - The current node being checked in the traversal
 * @param deltaX - The horizontal scroll delta
 * @param deltaY - The vertical scroll delta
 * @returns True if a parent element will handle the scroll, false otherwise
 */
export function getTouchParentScroll(
  targetElement: HTMLElement,
  currentNode: HTMLElement | Document | null,
  deltaX: number,
  deltaY: number
): boolean;