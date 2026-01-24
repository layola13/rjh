/**
 * React component for displaying a progress bar with upload status.
 * Supports customizable styling, progress percentage, and hint messages.
 */

import React from 'react';

/**
 * Props for the ProgressBar component
 */
export interface ProgressBarProps {
  /**
   * Additional CSS class name(s) to apply to the container
   */
  className?: string;

  /**
   * Whether to show or hide the progress bar
   */
  show?: boolean;

  /**
   * Current progress value (e.g., "50%", "100%")
   */
  progress: string;

  /**
   * Optional hint text to display below the progress bar
   */
  hint?: string;
}

/**
 * ProgressBar component that displays upload/download progress with visual feedback.
 * Shows a success icon when progress reaches 100%.
 * 
 * @example
 *