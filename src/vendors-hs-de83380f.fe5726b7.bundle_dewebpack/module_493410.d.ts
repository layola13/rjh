/**
 * Icon Component Module
 * 
 * A React icon component that wraps a base icon component with forwarded refs.
 * This module exports a forwardRef component that combines default props with
 * passed props and applies a specific icon configuration.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Props for the icon component
 * Extends all HTML SVG element attributes
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Optional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS dimension
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Stroke width for outlined icons
   * @default 2
   */
  strokeWidth?: number;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component wraps the base icon implementation and forwards refs
 * to allow direct access to the underlying SVG element.
 * 
 * @example
 *