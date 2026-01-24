/**
 * React component module for an icon wrapper
 * Exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Props for the icon component with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component type definition
 * A React component that renders an SVG icon with forwarded ref support
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default exported icon component
 * Wraps an icon definition with a generic icon container component
 * Supports ref forwarding to access the underlying SVG element
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;