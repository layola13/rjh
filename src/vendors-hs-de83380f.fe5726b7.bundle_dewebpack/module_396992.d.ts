import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Optional className for custom styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS size value
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional custom properties
   */
  [key: string]: unknown;
}

/**
 * Forwarded ref type for SVG elements
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component type definition
 * A forward ref component that renders an SVG icon with customizable properties
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * Default export: Icon component with forwardRef support
 * 
 * @example
 *