/**
 * Icon component module
 * Exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base icon component props
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS size string
   * @default 16
   */
  size?: number | string;
  
  /**
   * Icon color, accepts CSS color values
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles to apply to the icon
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data object containing SVG paths and metadata
   */
  icon?: IconData;
}

/**
 * Icon data structure containing SVG path information
 */
export interface IconData {
  /**
   * SVG path data string
   */
  path: string | string[];
  
  /**
   * ViewBox dimensions
   * @default '0 0 24 24'
   */
  viewBox?: string;
  
  /**
   * Icon width
   */
  width?: number;
  
  /**
   * Icon height
   */
  height?: number;
  
  /**
   * Additional attributes for the SVG element
   */
  attrs?: Record<string, unknown>;
}

/**
 * Forwarded ref icon component type
 * Allows parent components to access the underlying SVG element ref
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * Wraps the base icon component with predefined icon data
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;