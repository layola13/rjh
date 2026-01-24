/**
 * React icon component wrapper
 * Wraps an icon definition with React.forwardRef for ref forwarding support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS size value
   */
  size?: string | number;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
}

/**
 * Icon component type with forwarded ref support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A forwardRef-wrapped React component that renders an SVG icon
 * with support for customizable props and ref forwarding
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;