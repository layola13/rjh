/**
 * Icon component module
 * Wraps an icon component with forwarded ref support
 */

import { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
}

/**
 * Icon component with forwarded ref
 * 
 * @example
 *