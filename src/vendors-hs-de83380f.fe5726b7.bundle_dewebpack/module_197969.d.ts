/**
 * Icon component module
 * Provides a forward ref wrapper around a base icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /**
   * Icon size in pixels or CSS size string
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline style object
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
 * Icon component reference type (SVG element)
 */
export type IconRef = SVGSVGElement;

/**
 * Props for the icon component with ref support
 */
export type IconProps = IconBaseProps & RefAttributes<IconRef>;

/**
 * Forward ref icon component
 * Renders an SVG icon with customizable properties
 * 
 * @example
 *