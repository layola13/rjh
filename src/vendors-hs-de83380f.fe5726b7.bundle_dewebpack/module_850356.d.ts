/**
 * React Icon Component Module
 * 
 * This module exports a React icon component that wraps a base icon component
 * with additional properties and forwarded refs support.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Properties accepted by the icon component
 * Extends all standard SVG element attributes
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color - accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Accessibility title for screen readers
   */
  title?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Base icon configuration object
 * Contains the SVG path data and metadata for rendering
 */
export interface IconDefinition {
  /**
   * SVG path string or array of path strings
   */
  path: string | string[];
  
  /**
   * ViewBox dimensions for the SVG
   * @default "0 0 24 24"
   */
  viewBox?: string;
  
  /**
   * Icon width (used for aspect ratio calculations)
   */
  width?: number;
  
  /**
   * Icon height (used for aspect ratio calculations)
   */
  height?: number;
}

/**
 * Forward ref component type combining icon props with ref support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref
 * 
 * This component renders an SVG icon with customizable properties
 * and supports React ref forwarding for direct DOM access.
 * 
 * @example
 *