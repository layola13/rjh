/**
 * Icon component module
 * Exports a forwarded ref icon component wrapping a base icon implementation
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base icon component props
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon name or identifier
   */
  icon?: unknown;
  
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
 * Forwarded ref icon component type
 * Combines icon props with ref forwarding capability for SVGSVGElement
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * Allows parent components to access the underlying SVG element via ref
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;