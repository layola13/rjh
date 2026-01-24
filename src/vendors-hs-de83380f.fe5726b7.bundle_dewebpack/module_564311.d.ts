/**
 * Icon component module
 * Wraps an SVG icon with React forwardRef support
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconProps {
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
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component reference type
 */
export type IconRef = SVGSVGElement;

/**
 * Forward ref icon component
 * Renders an SVG icon with support for ref forwarding
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconProps & RefAttributes<IconRef>
>;

export default IconComponent;