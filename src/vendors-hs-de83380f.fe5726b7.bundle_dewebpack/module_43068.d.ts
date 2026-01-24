/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element props and supports custom icon configuration
 */
export interface IconComponentProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'ref'> {
  /**
   * Optional class name for styling
   */
  className?: string;
  
  /**
   * Optional style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional props passed to the underlying icon component
   */
  [key: string]: any;
}

/**
 * Icon component with ref forwarding support
 * 
 * @example
 *