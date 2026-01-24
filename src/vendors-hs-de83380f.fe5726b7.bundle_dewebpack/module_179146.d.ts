/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props merging functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component, extending standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color (fill or stroke)
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility title for screen readers
   */
  title?: string;
  
  /**
   * Any additional props to be spread onto the icon wrapper
   */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component wraps an SVG icon and forwards refs to the underlying DOM element.
 * It merges provided props with default icon configuration.
 * 
 * @example
 *