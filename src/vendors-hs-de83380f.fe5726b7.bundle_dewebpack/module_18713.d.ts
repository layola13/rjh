/**
 * React icon component wrapper
 * Wraps an icon with forwardRef support for ref forwarding
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Size of the icon (width and height)
   */
  size?: string | number;
  
  /**
   * Color of the icon
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
   * Icon title for accessibility
   */
  title?: string;
}

/**
 * Icon component reference type
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component type with forwarded ref support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<IconComponentRef>
>;

/**
 * Default export: A forwarded ref icon component
 * 
 * This component wraps an SVG icon with React.forwardRef to allow
 * parent components to access the underlying SVG element via ref.
 * 
 * @example
 *