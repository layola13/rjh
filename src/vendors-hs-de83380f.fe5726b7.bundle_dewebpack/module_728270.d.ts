/**
 * React component module for an icon component
 * Exports a forwarded ref component that wraps a default icon implementation
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG attributes to support all native SVG element properties
 */
export interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Icon data/definition (SVG path or configuration)
   */
  icon?: unknown;
}

/**
 * Icon component with forwarded ref support
 * Wraps the base icon implementation and forwards ref to the underlying SVG element
 * 
 * @example
 *