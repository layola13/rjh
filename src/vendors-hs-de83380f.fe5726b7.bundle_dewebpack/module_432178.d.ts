/**
 * Icon component module with ref forwarding support
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility title for the icon
   */
  title?: string;
  
  /**
   * Any additional props to pass to the underlying element
   */
  [key: string]: any;
}

/**
 * Icon component type with ref forwarding
 * Accepts all standard SVG props and forwards refs to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with ref forwarding
 * 
 * @example
 *