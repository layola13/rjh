/**
 * Module: module_455525
 * Original ID: 455525
 * 
 * Icon component that wraps a base icon with forwarded ref support.
 * This module provides a React component that renders an icon using a shared icon base.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component.
 * Extends all standard props that can be passed to the underlying icon base component.
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Size of the icon in pixels or as a string (e.g., "24px", "1.5rem")
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * CSS class name for custom styling
   */
  className?: string;
  
  /**
   * Inline styles to apply to the icon
   */
  style?: React.CSSProperties;
  
  /**
   * Additional props passed to the underlying SVG element
   */
  [key: string]: any;
}

/**
 * Ref type that can be attached to the icon component
 */
export type IconRef = SVGSVGElement;

/**
 * Icon component with forwarded ref support.
 * 
 * @example
 *