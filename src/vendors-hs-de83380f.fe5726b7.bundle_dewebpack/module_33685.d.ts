/**
 * Icon component module
 * 
 * This module provides a forward ref compatible icon component that wraps
 * a base icon component with additional props.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data or configuration object
   */
  icon?: unknown;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component with forward ref support
 * 
 * @example
 *