/**
 * React icon component module
 * Exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility title
   */
  title?: string;
  
  /**
   * Icon data/path configuration
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure containing SVG path data
 */
export interface IconDefinition {
  /**
   * Icon identifier
   */
  name: string;
  
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * SVG path data
   */
  path: string | string[];
  
  /**
   * Icon width
   */
  width?: number;
  
  /**
   * Icon height
   */
  height?: number;
}

/**
 * Forwarded ref icon component type
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * @example
 *