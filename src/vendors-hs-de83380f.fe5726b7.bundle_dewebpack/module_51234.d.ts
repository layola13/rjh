/**
 * React icon component module
 * Exports a forwardRef-wrapped icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 * Extends standard SVG element properties
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS unit
   * @default "1em"
   */
  size?: string | number;
  
  /**
   * Icon color
   * @default "currentColor"
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
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Title for accessibility
   */
  title?: string;
}

/**
 * Icon component type with forwardRef support
 * Allows ref forwarding to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A forward-ref enabled React component that renders an SVG icon
 * 
 * @example
 *