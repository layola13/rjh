/**
 * React context for tree component state management.
 * Provides a shared context for tree-related components to access tree state and operations.
 * @module TreeContext
 */

import type { Context } from 'react';

/**
 * Tree context value type.
 * Used to share tree state and methods across the component tree.
 * 
 * @remarks
 * This context is initialized with null and should be provided with actual tree state
 * by a parent TreeProvider component.
 */
export type TreeContextValue = null | {
  /** Additional tree context properties can be defined based on implementation */
  [key: string]: unknown;
};

/**
 * React Context for tree component hierarchy.
 * 
 * @description
 * This context provides access to tree state and operations throughout the component tree.
 * Components can consume this context using useContext hook or Context.Consumer.
 * 
 * @example
 *