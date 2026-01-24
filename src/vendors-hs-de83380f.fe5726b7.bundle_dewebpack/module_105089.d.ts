/**
 * Icon component module
 * Provides a forward-ref enabled React icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s) to apply to the icon
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
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component props
 * Combines base icon props with the icon data from the imported default icon
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Icon data/definition (imported from icon module)
   */
  icon?: unknown;
}

/**
 * Icon component type
 * A forward-ref component that renders an SVG icon with the provided props
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Forward-ref enabled icon component
 * 
 * @example
 *