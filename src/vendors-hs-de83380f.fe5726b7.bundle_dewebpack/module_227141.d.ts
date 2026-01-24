/**
 * React Icon Component Module
 * 
 * This module exports a forward ref icon component that wraps a base icon
 * with additional props spreading functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
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
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Any additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * This is a wrapped icon component that accepts all standard SVG props
 * and forwards refs to the underlying SVG element.
 * 
 * @example
 *