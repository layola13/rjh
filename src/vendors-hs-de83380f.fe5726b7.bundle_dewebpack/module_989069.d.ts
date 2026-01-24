/**
 * React icon component module
 * Wraps an icon with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
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
   * Icon title for accessibility
   */
  title?: string;
}

/**
 * Icon component with forwarded ref
 * Combines base icon props with SVG attributes and ref support
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A React component that renders an SVG icon with ref forwarding capability
 */
declare const _default: IconComponent;

export default _default;