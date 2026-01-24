import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props extending standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color, can be any valid CSS color value
   */
  color?: string;
  
  /**
   * Icon data object containing path definitions and metadata
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure containing SVG path data
 */
export interface IconDefinition {
  /**
   * SVG path data string
   */
  path: string | string[];
  
  /**
   * ViewBox dimensions for the SVG
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
 * Forward ref icon component type
 * Accepts IconComponentProps and forwards ref to the underlying SVG element
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forward ref support
 * This component renders an SVG icon with customizable properties
 * 
 * @example
 *