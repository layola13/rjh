/**
 * Icon component module
 * Provides a forward ref wrapper around a base icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extended from the underlying icon implementation
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  
  /** Icon color, accepts any valid CSS color value */
  color?: string;
  
  /** Additional CSS class names */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Icon stroke width */
  strokeWidth?: number | string;
  
  /** Accessibility label */
  'aria-label'?: string;
  
  /** Custom icon data (SVG path or configuration) */
  icon?: IconData;
  
  [key: string]: unknown;
}

/**
 * Icon data structure
 * Represents the SVG icon configuration
 */
export interface IconData {
  /** SVG path data or icon identifier */
  path?: string | string[];
  
  /** ViewBox dimensions */
  viewBox?: string;
  
  /** Icon metadata */
  attrs?: Record<string, unknown>;
}

/**
 * Forward ref icon component type
 * A React component that accepts a ref and icon props
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * This is a forward ref component that renders an SVG icon
 * 
 * @example
 *