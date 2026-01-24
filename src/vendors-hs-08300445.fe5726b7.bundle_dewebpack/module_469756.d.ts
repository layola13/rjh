/**
 * Progress component utilities and default configuration
 * Provides default props and transition duration management for progress bars
 */

import { useRef, useEffect, Ref } from 'react';

/**
 * Default properties for the progress component
 */
export interface DefaultProgressProps {
  /** Additional CSS class name */
  className: string;
  /** Progress percentage (0-100) */
  percent: number;
  /** CSS class prefix for BEM naming */
  prefixCls: string;
  /** Color of the progress bar stroke */
  strokeColor: string;
  /** Shape of the stroke end cap: 'round' | 'butt' | 'square' */
  strokeLinecap: 'round' | 'butt' | 'square';
  /** Width of the progress bar stroke */
  strokeWidth: number;
  /** Inline styles */
  style: Record<string, unknown>;
  /** Color of the trail (background track) */
  trailColor: string;
  /** Width of the trail */
  trailWidth: number;
}

/**
 * Default configuration values for progress components
 */
export const defaultProps: DefaultProgressProps;

/**
 * Custom hook to manage transition duration for progress animations
 * Optimizes performance by skipping transitions when updates occur rapidly (within 100ms)
 * 
 * @param elements - Array of elements to manage transition duration for
 * @returns Array of refs to be attached to DOM elements
 * 
 * @example
 *