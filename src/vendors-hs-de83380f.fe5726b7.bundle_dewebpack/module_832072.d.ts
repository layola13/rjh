/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends all standard SVG element properties
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Optional className for styling
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
   * Additional style properties
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *