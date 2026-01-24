/**
 * Custom React hook for managing error state visibility and updates
 * @module useErrorVisibility
 */

import { useRef, useEffect } from 'react';
import { useForceUpdate } from './useForceUpdate';

/**
 * Error item type - can be string, Error object, or custom error structure
 */
type ErrorItem = string | Error | unknown;

/**
 * Internal state structure for tracking errors and visibility
 */
interface ErrorState {
  /** Current list of errors */
  errors: ErrorItem[];
  /** Whether errors should be visible */
  visible: boolean;
}

/**
 * Hook for managing error visibility with automatic update detection
 * 
 * @param errors - Array of current errors to display
 * @param onVisibilityChange - Callback invoked when visibility state changes
 * @param immediate - If true, updates are applied immediately; otherwise debounced by 10ms
 * @returns Tuple of [isVisible, currentErrors]
 * 
 * @example
 *