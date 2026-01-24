/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props and functionality.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or as a string
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component renders an SVG icon with customizable properties.
 * It forwards refs to the underlying SVG element for direct DOM access.
 * 
 * @example
 *