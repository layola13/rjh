/**
 * Flattens React children recursively into a single-level array.
 * 
 * @remarks
 * This module provides a utility function to recursively flatten nested React children structures.
 * It handles arrays, React elements, and primitive values, optionally preserving empty/null values.
 * 
 * @module FlattenChildren
 */

import type { ReactNode, ReactElement } from 'react';

/**
 * Options for configuring the flatten behavior.
 */
export interface FlattenChildrenOptions {
  /**
   * Whether to keep empty (null/undefined) children in the result array.
   * @defaultValue false
   */
  keepEmpty?: boolean;
}

/**
 * Recursively flattens React children into a single-level array.
 * 
 * @param children - The React children to flatten (can be nested arrays or React elements)
 * @param options - Configuration options for the flatten operation
 * @returns A flattened array of React nodes
 * 
 * @example
 *