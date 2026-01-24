/**
 * Type definitions for react-is v16.13.1
 * 
 * This module provides utilities to check React element types and constants
 * for various React component types.
 * 
 * @see https://reactjs.org/docs/react-api.html
 */

/**
 * Unique symbol used internally by React to identify element types
 */
declare const REACT_ELEMENT_TYPE: unique symbol;
declare const REACT_PORTAL_TYPE: unique symbol;
declare const REACT_FRAGMENT_TYPE: unique symbol;
declare const REACT_STRICT_MODE_TYPE: unique symbol;
declare const REACT_PROFILER_TYPE: unique symbol;
declare const REACT_PROVIDER_TYPE: unique symbol;
declare const REACT_CONTEXT_TYPE: unique symbol;
declare const REACT_ASYNC_MODE_TYPE: unique symbol;
declare const REACT_CONCURRENT_MODE_TYPE: unique symbol;
declare const REACT_FORWARD_REF_TYPE: unique symbol;
declare const REACT_SUSPENSE_TYPE: unique symbol;
declare const REACT_SUSPENSE_LIST_TYPE: unique symbol;
declare const REACT_MEMO_TYPE: unique symbol;
declare const REACT_LAZY_TYPE: unique symbol;
declare const REACT_BLOCK_TYPE: unique symbol;
declare const REACT_FUNDAMENTAL_TYPE: unique symbol;
declare const REACT_RESPONDER_TYPE: unique symbol;
declare const REACT_SCOPE_TYPE: unique symbol;

/**
 * Base interface for React elements with internal type markers
 */
interface ReactElementType {
  $$typeof: symbol | number;
  type?: unknown;
}

/**
 * Symbol constant for AsyncMode (deprecated in favor of ConcurrentMode)
 * @deprecated Use ConcurrentMode instead
 */
export const AsyncMode: symbol | number;

/**
 * Symbol constant for ConcurrentMode
 * Enables concurrent rendering features in React
 */
export const ConcurrentMode: symbol | number;

/**
 * Symbol constant for Context Consumer components
 * Used to consume context values in the component tree
 */
export const ContextConsumer: symbol | number;

/**
 * Symbol constant for Context Provider components
 * Used to provide context values to the component tree
 */
export const ContextProvider: symbol | number;

/**
 * Symbol constant for standard React elements
 */
export const Element: symbol | number;

/**
 * Symbol constant for ForwardRef components
 * Used to forward refs to child components
 */
export const ForwardRef: symbol | number;

/**
 * Symbol constant for Fragment components
 * Allows grouping multiple children without adding extra DOM nodes
 */
export const Fragment: symbol | number;

/**
 * Symbol constant for Lazy components
 * Enables code-splitting and lazy loading of components
 */
export const Lazy: symbol | number;

/**
 * Symbol constant for Memo components
 * Optimizes performance by memoizing component output
 */
export const Memo: symbol | number;

/**
 * Symbol constant for Portal components
 * Renders children into a different DOM subtree
 */
export const Portal: symbol | number;

/**
 * Symbol constant for Profiler components
 * Measures rendering performance of React components
 */
export const Profiler: symbol | number;

/**
 * Symbol constant for StrictMode components
 * Highlights potential problems in the application
 */
export const StrictMode: symbol | number;

/**
 * Symbol constant for Suspense components
 * Handles loading states for lazy components
 */
export const Suspense: symbol | number;

/**
 * Extracts and returns the internal React type of an element
 * 
 * @param element - The element to check
 * @returns The internal React type symbol/number, or undefined
 */
export function typeOf(element: unknown): symbol | number | undefined;

/**
 * Checks if an element is an AsyncMode component
 * 
 * @deprecated AsyncMode is deprecated, use isConcurrentMode instead
 * @param element - The element to check
 * @returns True if the element is AsyncMode or ConcurrentMode
 */
export function isAsyncMode(element: unknown): boolean;

/**
 * Checks if an element is a ConcurrentMode component
 * 
 * @param element - The element to check
 * @returns True if the element is ConcurrentMode
 */
export function isConcurrentMode(element: unknown): boolean;

/**
 * Checks if an element is a Context Consumer
 * 
 * @param element - The element to check
 * @returns True if the element is a Context Consumer
 */
export function isContextConsumer(element: unknown): boolean;

/**
 * Checks if an element is a Context Provider
 * 
 * @param element - The element to check
 * @returns True if the element is a Context Provider
 */
export function isContextProvider(element: unknown): boolean;

/**
 * Checks if a value is a valid React element
 * 
 * @param element - The value to check
 * @returns True if the value is a React element
 */
export function isElement(element: unknown): boolean;

/**
 * Checks if an element is a ForwardRef component
 * 
 * @param element - The element to check
 * @returns True if the element is a ForwardRef
 */
export function isForwardRef(element: unknown): boolean;

/**
 * Checks if an element is a Fragment
 * 
 * @param element - The element to check
 * @returns True if the element is a Fragment
 */
export function isFragment(element: unknown): boolean;

/**
 * Checks if an element is a Lazy component
 * 
 * @param element - The element to check
 * @returns True if the element is a Lazy component
 */
export function isLazy(element: unknown): boolean;

/**
 * Checks if an element is a Memo component
 * 
 * @param element - The element to check
 * @returns True if the element is a Memo component
 */
export function isMemo(element: unknown): boolean;

/**
 * Checks if an element is a Portal
 * 
 * @param element - The element to check
 * @returns True if the element is a Portal
 */
export function isPortal(element: unknown): boolean;

/**
 * Checks if an element is a Profiler component
 * 
 * @param element - The element to check
 * @returns True if the element is a Profiler
 */
export function isProfiler(element: unknown): boolean;

/**
 * Checks if an element is a StrictMode component
 * 
 * @param element - The element to check
 * @returns True if the element is StrictMode
 */
export function isStrictMode(element: unknown): boolean;

/**
 * Checks if an element is a Suspense component
 * 
 * @param element - The element to check
 * @returns True if the element is a Suspense component
 */
export function isSuspense(element: unknown): boolean;

/**
 * Validates if a value is a valid React element type
 * 
 * Valid types include:
 * - String (for DOM elements like 'div', 'span')
 * - Function (for component functions or classes)
 * - React built-in types (Fragment, StrictMode, etc.)
 * - Special component types (Lazy, Memo, Context, ForwardRef, etc.)
 * 
 * @param element - The value to validate
 * @returns True if the value can be used as a React element type
 */
export function isValidElementType(element: unknown): boolean;