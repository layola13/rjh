/**
 * Loading Component Module
 * 
 * Provides a reusable loading spinner component for displaying loading states
 * throughout the application.
 * 
 * @module Loading
 * @originalModuleId 616706
 */

import React from 'react';

/**
 * Props for the Loading component
 */
export interface LoadingProps {
  /**
   * Controls the visibility of the loading indicator
   * @default true
   */
  show?: boolean;
}

/**
 * Loading Component
 * 
 * Displays a centered loading icon/spinner. The component can be shown or hidden
 * using the `show` prop. When hidden, applies a 'hidden' class to the container.
 * 
 * @param props - Component properties
 * @returns A React element containing a centered loading icon
 * 
 * @example
 *