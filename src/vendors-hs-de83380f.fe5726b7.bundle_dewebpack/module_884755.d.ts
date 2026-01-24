/**
 * Icon Component Module
 * 
 * A React icon component that wraps a base icon component with forwarded ref support.
 * This module provides a reusable icon component that can be used throughout the application.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element props and supports ref forwarding
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Optional CSS class name for styling
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
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon Component Type
 * A forward ref component that renders an SVG icon
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with ref forwarding support
 * 
 * @example
 *