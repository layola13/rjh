/**
 * Module: module_715373
 * Original ID: 715373
 * 
 * Image component with fallback support for failed image loading.
 */

import { Component, ReactElement } from 'react';

/**
 * Props for the image component with fallback functionality
 */
export interface ImageWithFallbackProps {
  /** Primary image source URL */
  src: string;
  
  /** Function that returns fallback image URL when primary image fails to load */
  fallbackSrc: () => string;
  
  /** CSS class name for the image element */
  className?: string;
}

/**
 * Internal state for the image component
 */
interface ImageWithFallbackState {
  /** Current image source being displayed */
  src: string;
  
  /** Whether an error occurred loading the image */
  errored: boolean;
  
  /** Current CSS class name */
  className?: string;
}

/**
 * Image component that automatically displays a fallback image when the primary source fails to load.
 * 
 * @example
 *