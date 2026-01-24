/**
 * Icon component module with forwardRef support
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG attributes and supports ref forwarding
 */
export interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Forwarded ref icon component
 * Wraps an SVG icon with ref forwarding support for direct DOM access
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;