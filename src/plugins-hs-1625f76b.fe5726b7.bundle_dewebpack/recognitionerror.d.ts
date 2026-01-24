/**
 * ReCognition Error Component
 * Displays an error state with retry functionality for image recognition failures
 */

import React from 'react';
import { Icons, Button } from './ui-components';

/**
 * Props for the ReCognitionError component
 */
export interface ReCognitionErrorProps {
  /**
   * Callback function triggered when the user clicks the retry button
   */
  onRetry: () => void;
}

/**
 * Error component displayed when image recognition fails
 * Shows an error icon, message, and retry button
 * 
 * @param props - Component properties
 * @returns React element displaying the error state
 */
export declare function ReCognitionError(props: ReCognitionErrorProps): React.ReactElement;

/**
 * ResourceManager interface for internationalization
 */
declare global {
  const ResourceManager: {
    /**
     * Retrieves localized string by key
     * @param key - The resource string key
     * @returns Localized string value
     */
    getString(key: 'inspiration_image_search_recognize_failed' | 'inspiration_image_search_retry'): string;
  };
}