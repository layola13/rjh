/**
 * React component module for an icon wrapper
 * Provides a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component
 * Extends standard HTML element props and allows custom icon configuration
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Custom icon data or configuration
   */
  icon?: unknown;
  
  /**
   * Additional className for styling
   */
  className?: string;
  
  /**
   * Size of the icon
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Any additional props to pass through
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * Wraps an icon element with ref forwarding capabilities
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A React component that renders an icon with ref forwarding
 * 
 * @example
 *