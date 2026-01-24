/**
 * Utility functions for handling React refs composition and compatibility
 * @module RefUtils
 */

import type { ReactElement, ReactNode, Ref, RefObject, MutableRefObject } from 'react';

/**
 * Type for a ref that can be either a callback ref or a ref object
 */
export type ComposeRefType<T = any> = Ref<T> | RefObject<T> | MutableRefObject<T> | ((instance: T | null) => void) | null | undefined;

/**
 * Fills a ref with the given value, supporting both callback refs and ref objects
 * @param ref - The ref to fill (callback function or ref object)
 * @param value - The value to assign to the ref
 */
export function fillRef<T = any>(ref: ComposeRefType<T>, value: T | null): void;

/**
 * Composes multiple refs into a single ref callback
 * Useful when you need to forward a ref to multiple destinations
 * @param refs - Variable number of refs to compose
 * @returns A single ref callback that updates all provided refs
 * @example
 * const composedRef = composeRef(ref1, ref2, ref3);
 * <div ref={composedRef} />
 */
export function composeRef<T = any>(...refs: ComposeRefType<T>[]): Ref<T>;

/**
 * React hook version of composeRef with memoization
 * Composes multiple refs and memoizes the result to avoid unnecessary re-renders
 * @param refs - Variable number of refs to compose
 * @returns A memoized composed ref callback
 * @example
 * const composedRef = useComposeRef(localRef, forwardedRef);
 * <div ref={composedRef} />
 */
export function useComposeRef<T = any>(...refs: ComposeRefType<T>[]): Ref<T>;

/**
 * Checks if a React element supports ref forwarding
 * Handles class components, function components with forwardRef, and memo components
 * @param element - The React element to check
 * @returns true if the element supports refs
 */
export function supportRef(element: ReactNode): boolean;

/**
 * Checks if a React element is a valid DOM element that supports node refs
 * Filters out text nodes and fragments
 * @param element - The React element to check
 * @returns true if the element is a valid element that supports node refs
 */
export function supportNodeRef(element: ReactNode): boolean;

/**
 * Extracts the ref from a React element's props
 * Handles both legacy ref and modern ref prop access patterns
 * @param element - The React element to extract ref from
 * @returns The ref from the element, or null if not found
 */
export function getNodeRef<T = any>(element: ReactNode): Ref<T> | null;