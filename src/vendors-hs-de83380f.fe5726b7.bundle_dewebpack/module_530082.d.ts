/**
 * React icon component module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional properties and configurations.
 * 
 * @module IconComponent
 */

import * as React from 'react';

/**
 * Properties that can be passed to the icon component
 * Extends standard React component props
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Size of the icon (width and height)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Custom styles to apply to the icon element
   */
  style?: React.CSSProperties;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Whether the icon should be focusable
   */
  focusable?: boolean;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Additional props spread onto the component
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component wraps a base icon implementation and forwards refs to allow
 * parent components to access the underlying DOM element.
 * 
 * @example
 *