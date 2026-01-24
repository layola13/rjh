/**
 * React Icon Component Module
 * 
 * A forwarded ref icon component that wraps a base icon implementation.
 * This module exports a React component with full ref forwarding support.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base properties for the icon component
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS size string
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Custom icon data/path
   */
  icon?: unknown;
}

/**
 * Icon component with ref forwarding support
 * 
 * @example
 *