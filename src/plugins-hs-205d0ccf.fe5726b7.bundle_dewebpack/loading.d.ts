/**
 * Loading component module
 * Provides a full-screen loading spinner overlay
 * @module Loading
 */

import type { FC } from 'react';

/**
 * Configuration options for displaying the loading overlay
 */
export interface ShowLoadingOptions {
  /**
   * CSS class name for the loading container
   * @default "full-screen-loading-container"
   */
  className?: string;

  /**
   * Whether to show or hide the loading overlay
   * - true: Mount and display the loading component
   * - false: Unmount and remove the loading component
   */
  show: boolean;
}

/**
 * Display or hide a full-screen loading spinner
 * 
 * Creates a portal container in document.body if it doesn't exist,
 * then renders or unmounts the Loading component based on the show flag.
 * 
 * @param options - Configuration for the loading display
 * @example
 *