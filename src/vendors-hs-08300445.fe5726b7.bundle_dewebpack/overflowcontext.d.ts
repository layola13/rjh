/**
 * Context for managing overflow behavior in UI components.
 * Provides a React context to share overflow state across component tree.
 * 
 * @module OverflowContext
 */

import type { Context } from 'react';

/**
 * Overflow context value interface.
 * Defines the shape of data provided by OverflowContext.
 */
export interface OverflowContextValue {
  /** Whether overflow is currently active */
  isOverflowing?: boolean;
  /** Callback to register an overflow item */
  registerItem?: (id: string, element: HTMLElement) => void;
  /** Callback to unregister an overflow item */
  unregisterItem?: (id: string) => void;
  /** Current overflow state */
  overflowState?: 'hidden' | 'visible' | 'auto';
}

/**
 * React context for overflow management.
 * Used to coordinate overflow behavior between parent and child components.
 * 
 * @default null - No overflow context provided by default
 * @example
 *