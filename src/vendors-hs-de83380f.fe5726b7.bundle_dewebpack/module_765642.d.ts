/**
 * Icon component module
 * Provides a forward ref wrapper around a base icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
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
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *