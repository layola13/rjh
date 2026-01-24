/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon (width and height)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Accessibility title
   */
  title?: string;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Props specific to this icon component, extending base icon props
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Reference to the underlying DOM element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component with forwarded ref support
 * Wraps an SVG icon with configurable properties and ref forwarding
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;