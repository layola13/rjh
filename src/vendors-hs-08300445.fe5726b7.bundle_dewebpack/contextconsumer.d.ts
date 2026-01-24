/**
 * React type checking utilities for identifying React element types.
 * Based on react-is library.
 * 
 * @module ReactIs
 * @license MIT
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

/**
 * Symbol representing a React element
 */
export const Element: unique symbol;

/**
 * Symbol representing a React portal
 */
export const Portal: unique symbol;

/**
 * Symbol representing a React fragment
 */
export const Fragment: unique symbol;

/**
 * Symbol representing React strict mode
 */
export const StrictMode: unique symbol;

/**
 * Symbol representing a React profiler
 */
export const Profiler: unique symbol;

/**
 * Symbol representing a React context provider
 */
export const ContextProvider: unique symbol;

/**
 * Symbol representing a React context consumer
 */
export const ContextConsumer: unique symbol;

/**
 * Symbol representing a React forward ref
 */
export const ForwardRef: unique symbol;

/**
 * Symbol representing a React suspense boundary
 */
export const Suspense: unique symbol;

/**
 * Symbol representing a React suspense list
 */
export const SuspenseList: unique symbol;

/**
 * Symbol representing a React memo component
 */
export const Memo: unique symbol;

/**
 * Symbol representing a React lazy component
 */
export const Lazy: unique symbol;

/**
 * React element with $$typeof property
 */
export interface ReactElement {
  $$typeof: symbol;
  type: unknown;
  [key: string]: unknown;
}

/**
 * Valid React element type
 */
export type ReactElementType =
  | string
  | Function
  | symbol
  | { $$typeof: symbol; getModuleId?: () => string; [key: string]: unknown };

/**
 * Returns the type of a React element
 * 
 * @param element - The element to check
 * @returns The $$typeof symbol or undefined
 */
export function typeOf(element: unknown): symbol | undefined;

/**
 * Checks if value is a valid React element
 * 
 * @param element - Value to check
 * @returns True if element is a React element
 */
export function isElement(element: unknown): element is ReactElement;

/**
 * Checks if element is a React portal
 * 
 * @param element - Element to check
 * @returns True if element is a portal
 */
export function isPortal(element: unknown): boolean;

/**
 * Checks if element is a React fragment
 * 
 * @param element - Element to check
 * @returns True if element is a fragment
 */
export function isFragment(element: unknown): boolean;

/**
 * Checks if element is wrapped in StrictMode
 * 
 * @param element - Element to check
 * @returns True if element is in strict mode
 */
export function isStrictMode(element: unknown): boolean;

/**
 * Checks if element is a Profiler component
 * 
 * @param element - Element to check
 * @returns True if element is a profiler
 */
export function isProfiler(element: unknown): boolean;

/**
 * Checks if element is a context provider
 * 
 * @param element - Element to check
 * @returns True if element is a context provider
 */
export function isContextProvider(element: unknown): boolean;

/**
 * Checks if element is a context consumer
 * 
 * @param element - Element to check
 * @returns True if element is a context consumer
 */
export function isContextConsumer(element: unknown): boolean;

/**
 * Checks if element is a forward ref component
 * 
 * @param element - Element to check
 * @returns True if element is a forward ref
 */
export function isForwardRef(element: unknown): boolean;

/**
 * Checks if element is a Suspense boundary
 * 
 * @param element - Element to check
 * @returns True if element is suspense
 */
export function isSuspense(element: unknown): boolean;

/**
 * Checks if element is a SuspenseList
 * 
 * @param element - Element to check
 * @returns True if element is a suspense list
 */
export function isSuspenseList(element: unknown): boolean;

/**
 * Checks if element is a memoized component
 * 
 * @param element - Element to check
 * @returns True if element is memoized
 */
export function isMemo(element: unknown): boolean;

/**
 * Checks if element is a lazy component
 * 
 * @param element - Element to check
 * @returns True if element is lazy
 */
export function isLazy(element: unknown): boolean;

/**
 * Checks if value is a valid React element type
 * 
 * @param element - Value to check
 * @returns True if value can be rendered by React
 */
export function isValidElementType(element: unknown): element is ReactElementType;

/**
 * @deprecated This method always returns false. Async mode was removed.
 * @returns Always false
 */
export function isAsyncMode(element: unknown): false;

/**
 * @deprecated This method always returns false. Use Concurrent features instead.
 * @returns Always false
 */
export function isConcurrentMode(element: unknown): false;