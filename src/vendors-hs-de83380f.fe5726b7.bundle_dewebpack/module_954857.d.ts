/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element props
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s)
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
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon configuration object
 * Contains SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * SVG path data or icon markup
   */
  icon: string | string[];
  
  /**
   * Icon viewBox dimensions
   */
  viewBox?: string;
  
  /**
   * Icon metadata
   */
  attrs?: Record<string, unknown>;
}

/**
 * Forwarded ref icon component
 * 
 * A React component that renders an SVG icon with forwarded ref support.
 * Merges provided props with default icon configuration.
 * 
 * @example
 *