/**
 * Module: module_361152
 * Original ID: 361152
 * 
 * Icon component wrapper that forwards refs to the underlying icon implementation.
 * This module creates a React component that renders an icon with configurable props.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component.
 * Extends standard HTML element attributes while allowing custom icon properties.
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Custom className for styling the icon
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string value
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Whether the icon is decorative only
   */
  'aria-hidden'?: boolean;
}

/**
 * Icon component reference type
 */
export type IconRef = SVGSVGElement;

/**
 * Forwarded ref icon component type.
 * Combines icon props with ref forwarding capabilities.
 */
export type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<IconRef>>;

/**
 * Default exported icon component with forwarded ref support.
 * 
 * @example
 *