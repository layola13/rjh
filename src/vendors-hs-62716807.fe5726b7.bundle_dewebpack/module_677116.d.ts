/**
 * Custom React hook for managing form item references.
 * This hook creates a stable reference function that composes multiple refs
 * and caches them based on the field name path.
 * 
 * @module useItemRef
 */

import type { RefObject } from 'react';
import type { FormInstance } from './FormContext';

/**
 * Field name path type - represents the hierarchical path to a form field
 * @example ['user', 'address', 'street']
 */
export type NamePath = (string | number)[];

/**
 * Reference type that can be a ref object or callback ref
 */
export type RefType<T = any> = RefObject<T> | ((instance: T | null) => void) | null;

/**
 * Options object that may contain a ref property
 */
interface RefOptions {
  ref?: RefType;
  [key: string]: any;
}

/**
 * Cached reference data structure
 */
interface CachedRef {
  /** Stringified name path used as cache key */
  name: string;
  /** Original ref from options */
  originRef: RefType;
  /** Composed ref combining form item ref and origin ref */
  ref: RefType;
}

/**
 * Return type of the hook - a function that resolves and composes refs
 */
export type UseItemRefReturn = (namePath: NamePath, options?: RefOptions) => RefType;

/**
 * Custom hook that provides a stable reference function for form items.
 * 
 * The hook:
 * - Retrieves the form's itemRef function from FormContext
 * - Caches composed refs to avoid unnecessary re-compositions
 * - Composes the form's item ref with any user-provided ref
 * - Updates cache only when name path or origin ref changes
 * 
 * @returns A function that takes a name path and options, returning a composed ref
 * 
 * @example
 *