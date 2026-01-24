/**
 * Countdown component for displaying time-based countdowns
 * @module Countdown
 */

import { Component, ReactElement } from 'react';

/**
 * Format string for countdown display
 * Examples: "HH:mm:ss", "mm:ss", "ss"
 */
export type CountdownFormat = string;

/**
 * Configuration options for countdown formatting
 */
export interface CountdownFormatOptions {
  /** Format pattern for time display (e.g., "HH:mm:ss") */
  format?: CountdownFormat;
  [key: string]: unknown;
}

/**
 * Props for the Countdown component
 */
export interface CountdownProps {
  /** Target timestamp (Date object or milliseconds) for countdown */
  value: Date | number | string;
  
  /** Format pattern for displaying the countdown (default: "HH:mm:ss") */
  format?: CountdownFormat;
  
  /** Callback function triggered when countdown reaches zero */
  onFinish?: () => void;
  
  /** Custom value renderer function */
  valueRender?: (element: ReactElement) => ReactElement;
}

/**
 * State for the Countdown component
 */
export interface CountdownState {}

/**
 * Countdown component that displays a live updating countdown timer
 * 
 * Features:
 * - Automatically updates display every ~33ms (30fps)
 * - Triggers onFinish callback when countdown completes
 * - Supports custom formatting patterns
 * - Cleans up timers on unmount
 * 
 * @example
 *