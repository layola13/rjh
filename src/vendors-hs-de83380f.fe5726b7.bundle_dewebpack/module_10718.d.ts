/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props support.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Icon component props interface
 * Extends any additional props passed to the component
 */
export interface IconProps extends Record<string, unknown> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Optional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component reference type
 * Typically refers to an SVG or HTMLElement
 */
export type IconRef = SVGSVGElement | HTMLElement;

/**
 * Forward ref icon component
 * 
 * A React component that renders an icon with forwarded ref support.
 * Merges provided props with default icon configuration.
 * 
 * @example
 *