/**
 * Module: module_102823
 * Original ID: 102823
 * 
 * React icon component wrapper that forwards refs to the underlying icon element.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component, excluding ref
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a CSS value
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
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Additional props passed to the underlying SVG element
   */
  [key: string]: any;
}

/**
 * Icon component with ref forwarding support
 * 
 * @example
 *