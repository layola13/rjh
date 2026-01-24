/**
 * React icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Icon stroke width
   */
  strokeWidth?: number;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Additional props passed to the underlying SVG element
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps an SVG icon definition and provides ref forwarding
 * for direct DOM access. It merges user-provided props with the base icon
 * configuration.
 * 
 * @example
 *