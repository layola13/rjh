/**
 * Icon component module
 * Wraps an icon component with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 * Extends standard SVG element properties
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
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
 * Icon component props
 * Combines base icon props with the actual icon data
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Icon configuration object
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /**
   * Icon name/identifier
   */
  name?: string;
  
  /**
   * SVG path data or children
   */
  path?: string | string[];
  
  /**
   * ViewBox dimensions
   */
  viewBox?: string;
}

/**
 * Forwarded ref icon component type
 * A React component that accepts IconComponentProps and forwards refs to SVGSVGElement
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Icon component with forwarded ref
 * 
 * @example
 *