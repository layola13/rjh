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
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon data object containing path definitions
   */
  icon?: {
    tag: string;
    attrs: Record<string, unknown>;
    children: Array<{
      tag: string;
      attrs: Record<string, unknown>;
    }>;
  };
}

/**
 * Icon component with forwarded ref support
 * Wraps an SVG icon with configurable properties
 * 
 * @example
 *