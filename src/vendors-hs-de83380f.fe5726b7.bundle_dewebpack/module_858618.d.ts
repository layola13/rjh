/**
 * React component that wraps an icon with forwarded ref support.
 * This appears to be an icon component wrapper that applies props and refs to a base icon component.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component.
 * Extends standard component props without ref.
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional custom props that may be passed to the underlying icon
   */
  [key: string]: unknown;
}

/**
 * The icon element type that can receive a ref
 */
export type IconElement = SVGSVGElement;

/**
 * The complete icon component type with ref forwarding support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconElement>
>;

/**
 * Default export: A forward ref icon component that merges props with an icon definition
 * and passes them to the base icon component.
 * 
 * @example
 *