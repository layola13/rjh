/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class names
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
   * Accessibility title for the icon
   */
  title?: string;
  
  /**
   * Custom style overrides
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component wraps an SVG icon and supports ref forwarding,
 * allowing parent components to access the underlying DOM element.
 * 
 * @example
 *