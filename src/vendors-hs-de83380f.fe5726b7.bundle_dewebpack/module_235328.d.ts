/**
 * Icon component module
 * Wraps an icon component with React forwardRef for proper ref handling
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon style object
   */
  style?: React.CSSProperties;
}

/**
 * Props for the wrapped icon component
 * Combines base icon props with the specific icon data
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Icon data object containing path definitions
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /**
   * Icon name
   */
  name?: string;
  
  /**
   * SVG path data
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
 * Icon component with forwardRef support
 * Allows parent components to access the underlying SVG element ref
 */
declare const IconComponent: ForwardRefExoticComponent<IconComponentProps & RefAttributes<SVGSVGElement>>;

export default IconComponent;