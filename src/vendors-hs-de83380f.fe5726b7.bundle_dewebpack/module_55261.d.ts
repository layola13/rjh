/**
 * Icon component module
 * Wraps a base icon component with a specific icon configuration
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends common icon properties like size, color, className, etc.
 */
export interface IconComponentProps {
  /**
   * CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * Additional HTML attributes for the SVG element
   */
  [key: string]: any;
}

/**
 * Icon component reference type
 * Represents the underlying SVG element
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Forward ref icon component type
 * A React component that accepts props and forwards ref to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  PropsWithoutRef<IconComponentProps> & RefAttributes<IconComponentRef>
>;

/**
 * Default exported icon component
 * Created with React.forwardRef to support ref forwarding
 * Automatically injects a specific icon configuration
 */
declare const IconComponentModule: IconComponent;

export default IconComponentModule;