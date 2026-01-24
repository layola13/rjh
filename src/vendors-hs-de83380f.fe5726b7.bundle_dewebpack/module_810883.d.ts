/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon component
 * with additional props merging functionality.
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
   */
  size?: number | string;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Icon title for tooltips
   */
  title?: string;
}

/**
 * Icon component reference type
 * Points to the underlying SVG element
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Forwarded ref icon component type
 * Combines component props with ref attributes
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * Default export: A React icon component with forwarded ref support
 * 
 * @example
 *