/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props spreading functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s) to apply to the icon
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
   * Icon stroke color
   */
  stroke?: string;
  
  /**
   * Custom styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Additional custom props
   */
  [key: string]: unknown;
}

/**
 * Icon component type with forwarded ref support
 * 
 * This is a React component that:
 * - Accepts SVG props and custom icon props
 * - Forwards refs to the underlying SVG element
 * - Wraps a base icon component with prop spreading
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * Usage:
 *