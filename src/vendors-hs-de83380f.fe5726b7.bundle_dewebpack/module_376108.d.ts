/**
 * React component that wraps an icon with forwarded ref support.
 * This module creates a forwardRef wrapper around a base icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component.
 * Extends all standard props that can be passed to the base component.
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Additional className for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Any other props passed to the underlying component
   */
  [key: string]: any;
}

/**
 * Ref type for the icon component
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Forward ref component that renders an icon.
 * Combines provided props with a predefined icon configuration.
 * 
 * @example
 *