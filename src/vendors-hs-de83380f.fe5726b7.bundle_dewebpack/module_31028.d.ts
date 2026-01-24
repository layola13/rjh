/**
 * React icon component module
 * Exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
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
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * Wraps an SVG icon definition with additional props handling
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A forwardRef-wrapped React component that renders an SVG icon
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;