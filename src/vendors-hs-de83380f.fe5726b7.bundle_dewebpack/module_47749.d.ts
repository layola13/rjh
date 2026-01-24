/**
 * React icon component with forwarded ref support
 * @module IconComponent
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS unit
   */
  size?: string | number;
  
  /**
   * Icon color
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
}

/**
 * Icon component type with ref forwarding
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * Wraps an SVG icon definition with React.forwardRef for ref forwarding support
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;