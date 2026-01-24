/**
 * ProgressBar Component
 * 
 * A React component that displays a progress bar with optional hint text and success icon.
 * Supports customizable styling and visibility control.
 */

import React from 'react';

/**
 * Props for the ProgressBar component
 */
export interface ProgressBarProps {
  /**
   * Controls the visibility of the progress bar
   * @default true
   */
  show?: boolean;

  /**
   * Progress value as a percentage string (e.g., "50%", "100%")
   * @default undefined
   */
  progress?: string;

  /**
   * Hint text displayed below the progress bar
   * @default ""
   */
  hint?: string;

  /**
   * Additional CSS class names to apply to the container
   * @default ""
   */
  className?: string;
}

/**
 * ProgressBar Component
 * 
 * Renders a progress bar with the following features:
 * - Animated progress indicator
 * - Success icon when progress reaches 100%
 * - Optional hint text
 * - Customizable visibility and styling
 * 
 * @example
 *