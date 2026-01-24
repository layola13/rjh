/**
 * Icon component module
 * Wraps a base icon component with a specific icon definition
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG attributes and custom icon properties
 */
export interface IconProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  
  /** Icon color, accepts CSS color values */
  color?: string;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Custom style object */
  style?: React.CSSProperties;
  
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** Aria label for accessibility */
  'aria-label'?: string;
  
  /** Icon rotation in degrees */
  rotate?: number;
  
  /** Whether to spin the icon */
  spin?: boolean;
  
  [key: string]: unknown;
}

/**
 * Reference type for the icon component
 */
export type IconRef = SVGSVGElement;

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *