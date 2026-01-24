/**
 * Icon component module
 * Wraps an icon with forwardRef support
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS units
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility title
   */
  title?: string;
  
  /**
   * Icon rotation in degrees
   */
  rotate?: number;
  
  /**
   * Spin animation flag
   */
  spin?: boolean;
}

/**
 * Icon component with ref forwarding
 * Renders an SVG icon element with customizable props
 */
export interface IconComponent extends ForwardRefExoticComponent<IconBaseProps & RefAttributes<SVGSVGElement>> {}

/**
 * Default exported icon component
 * Supports React refs and standard SVG attributes
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;