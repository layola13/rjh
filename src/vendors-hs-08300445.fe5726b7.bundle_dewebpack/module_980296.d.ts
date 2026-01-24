/**
 * React utility hooks and helper functions module
 * Provides common patterns for ref handling, state management, and event handling
 */

import { RefObject, MutableRefObject } from 'react';

/**
 * Gets a value from a nested object path
 * @param target - The target object to retrieve value from
 * @param path - The path to the desired property
 * @returns The value at the specified path
 */
export function get<T = any>(target: object, path: string | string[]): T | undefined;

/**
 * Sets a value in a nested object path
 * @param target - The target object to set value in
 * @param path - The path where the value should be set
 * @param value - The value to set
 * @returns The modified target object
 */
export function set<T extends object>(target: T, path: string | string[], value: any): T;

/**
 * Checks if a React component supports nodeRef prop
 * @param node - The React node to check
 * @returns True if the node supports nodeRef
 */
export function supportNodeRef(node: any): boolean;

/**
 * Checks if a React component supports ref forwarding
 * @param node - The React node to check
 * @returns True if the node supports ref
 */
export function supportRef(node: any): boolean;

/**
 * Composes multiple refs into a single ref callback
 * Useful for forwarding refs while keeping internal ref access
 * @param refs - Array of refs to compose
 * @returns A callback ref that updates all provided refs
 */
export function useComposeRef<T = any>(
  ...refs: Array<RefObject<T> | MutableRefObject<T> | ((instance: T | null) => void) | null | undefined>
): (instance: T | null) => void;

/**
 * Creates a stable event handler that always calls the latest version
 * Prevents unnecessary re-renders caused by inline function recreation
 * @param handler - The event handler function
 * @returns A stable reference to the handler
 */
export function useEvent<T extends (...args: any[]) => any>(handler: T): T;

/**
 * Merges controlled and uncontrolled state patterns
 * Supports both controlled (value + onChange) and uncontrolled (defaultValue) usage
 * @param defaultValue - Initial value for uncontrolled mode
 * @param options - Configuration object with value and onChange
 * @returns Tuple of [state, setState]
 */
export function useMergedState<T>(
  defaultValue: T | (() => T),
  options?: {
    value?: T;
    onChange?: (value: T, prevValue: T) => void;
    defaultValue?: T | (() => T);
  }
): [T, (value: T | ((prev: T) => T)) => void];

/**
 * Development warning utility
 * Logs warnings in development mode, no-op in production
 * @param valid - Condition to check, warning shows if false
 * @param message - Warning message to display
 */
export function warning(valid: boolean, message: string): void;

export default {
  get,
  set,
  supportNodeRef,
  supportRef,
  useComposeRef,
  useEvent,
  useMergedState,
  warning
};