/**
 * React Type Checking Module
 * Type definitions for react-is v17.0.2
 * 
 * This module provides utilities for identifying React element types at runtime.
 * Based on the MIT-licensed react-is library by Facebook, Inc. and its affiliates.
 */

/**
 * Symbol values representing different React element types.
 * These are internal identifiers used by React's reconciliation algorithm.
 */
declare const REACT_ELEMENT_TYPE: unique symbol;
declare const REACT_PORTAL_TYPE: unique symbol;
declare const REACT_FRAGMENT_TYPE: unique symbol;
declare const REACT_STRICT_MODE_TYPE: unique symbol;
declare const REACT_PROFILER_TYPE: unique symbol;
declare const REACT_PROVIDER_TYPE: unique symbol;
declare const REACT_CONTEXT_TYPE: unique symbol;
declare const REACT_FORWARD_REF_TYPE: unique symbol;
declare const REACT_SUSPENSE_TYPE: unique symbol;
declare const REACT_SUSPENSE_LIST_TYPE: unique symbol;
declare const REACT_MEMO_TYPE: unique symbol;
declare const REACT_LAZY_TYPE: unique symbol;
declare const REACT_BLOCK_TYPE: unique symbol;
declare const REACT_SERVER_BLOCK_TYPE: unique symbol;
declare const REACT_FUNDAMENTAL_TYPE: unique symbol;
declare const REACT_DEBUG_TRACE_MODE_TYPE: unique symbol;
declare const REACT_LEGACY_HIDDEN_TYPE: unique symbol;

/**
 * Base interface for React elements with a type marker.
 */
interface ReactElement {
  $$typeof: symbol;
  type?: unknown;
}

/**
 * React Context Consumer component type.
 * Used to consume values from a React Context.
 */
export const ContextConsumer: symbol;

/**
 * React Context Provider component type.
 * Used to provide values to a React Context.
 */
export const ContextProvider: symbol;

/**
 * Standard React Element type identifier.
 */
export const Element: symbol;

/**
 * React ForwardRef component type.
 * Used for components that need to forward refs to child components.
 */
export const ForwardRef: symbol;

/**
 * React Fragment type.
 * Allows grouping of children without adding extra nodes to the DOM.
 */
export const Fragment: symbol;

/**
 * React Lazy component type.
 * Used for code-splitting with dynamic imports.
 */
export const Lazy: symbol;

/**
 * React Memo component type.
 * Used for memoizing functional components to prevent unnecessary re-renders.
 */
export const Memo: symbol;

/**
 * React Portal type.
 * Allows rendering children into a DOM node outside the parent component's hierarchy.
 */
export const Portal: symbol;

/**
 * React Profiler component type.
 * Used for measuring rendering performance of React components.
 */
export const Profiler: symbol;

/**
 * React StrictMode component type.
 * Enables additional checks and warnings for development mode.
 */
export const StrictMode: symbol;

/**
 * React Suspense component type.
 * Used for handling asynchronous operations and code-splitting boundaries.
 */
export const Suspense: symbol;

/**
 * @deprecated Async mode is no longer supported in React.
 * @returns Always returns false
 */
export function isAsyncMode(): false;

/**
 * @deprecated Concurrent mode detection is not supported.
 * @returns Always returns false
 */
export function isConcurrentMode(): false;

/**
 * Checks if the given value is a React Context Consumer component.
 * @param value - The value to check
 * @returns True if the value is a Context Consumer
 */
export function isContextConsumer(value: unknown): boolean;

/**
 * Checks if the given value is a React Context Provider component.
 * @param value - The value to check
 * @returns True if the value is a Context Provider
 */
export function isContextProvider(value: unknown): boolean;

/**
 * Checks if the given value is a valid React element.
 * @param value - The value to check
 * @returns True if the value is a React element
 */
export function isElement(value: unknown): value is ReactElement;

/**
 * Checks if the given value is a React ForwardRef component.
 * @param value - The value to check
 * @returns True if the value is a ForwardRef component
 */
export function isForwardRef(value: unknown): boolean;

/**
 * Checks if the given value is a React Fragment.
 * @param value - The value to check
 * @returns True if the value is a Fragment
 */
export function isFragment(value: unknown): boolean;

/**
 * Checks if the given value is a React Lazy component.
 * @param value - The value to check
 * @returns True if the value is a Lazy component
 */
export function isLazy(value: unknown): boolean;

/**
 * Checks if the given value is a React Memo component.
 * @param value - The value to check
 * @returns True if the value is a Memo component
 */
export function isMemo(value: unknown): boolean;

/**
 * Checks if the given value is a React Portal.
 * @param value - The value to check
 * @returns True if the value is a Portal
 */
export function isPortal(value: unknown): boolean;

/**
 * Checks if the given value is a React Profiler component.
 * @param value - The value to check
 * @returns True if the value is a Profiler component
 */
export function isProfiler(value: unknown): boolean;

/**
 * Checks if the given value is a React StrictMode component.
 * @param value - The value to check
 * @returns True if the value is a StrictMode component
 */
export function isStrictMode(value: unknown): boolean;

/**
 * Checks if the given value is a React Suspense component.
 * @param value - The value to check
 * @returns True if the value is a Suspense component
 */
export function isSuspense(value: unknown): boolean;

/**
 * Checks if the given value is a valid React element type.
 * Valid types include strings (HTML tags), functions (components), and special React types.
 * @param value - The value to check
 * @returns True if the value can be used as a React element type
 */
export function isValidElementType(value: unknown): boolean;

/**
 * Returns the internal type identifier of a React element.
 * Used for runtime type checking and identification of React components.
 * @param value - The value to inspect
 * @returns The $$typeof symbol of the element, or undefined if not a React element
 */
export function typeOf(value: unknown): symbol | undefined;