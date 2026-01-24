/**
 * React icon component module
 * Provides a forwardRef-wrapped icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Stroke width for outlined icons
   */
  strokeWidth?: number | string;
  
  /**
   * Additional custom properties
   */
  [key: string]: unknown;
}

/**
 * Icon component type with ref support
 * A forwardRef component that renders an SVG icon
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Icon component with forwarded ref
 * Allows parent components to access the underlying SVG element
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;