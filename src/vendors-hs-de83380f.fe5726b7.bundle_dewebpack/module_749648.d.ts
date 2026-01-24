/**
 * React icon component with forwarded ref support
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 */
interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
}

/**
 * Props for the wrapped icon component including icon definition
 */
interface IconComponentProps extends IconBaseProps {
  /**
   * Icon definition object containing SVG path data
   */
  icon: IconDefinition;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * SVG path data or child elements
   */
  path?: string | string[];
  
  /**
   * ViewBox dimensions
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
}

/**
 * Forwarded ref type for SVG element
 */
type IconRef = SVGSVGElement;

/**
 * Icon component with forwarded ref
 * Wraps the base icon component with a specific icon definition
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<IconRef>
>;

export default IconComponent;

/**
 * Type exports for external usage
 */
export type { IconBaseProps, IconComponentProps, IconDefinition, IconRef };