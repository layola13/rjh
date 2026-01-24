/**
 * React Icon Component Module
 * 
 * A forwardRef-wrapped icon component that combines default icon data
 * with custom props and renders through a base icon component.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base properties for icon components
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS unit
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline style overrides
   */
  style?: React.CSSProperties;
  
  /**
   * Custom icon data (SVG path or configuration)
   */
  icon?: IconData;
}

/**
 * Icon data structure containing SVG path information
 * and metadata for rendering icons
 */
export interface IconData {
  /**
   * SVG path data string
   */
  path?: string | string[];
  
  /**
   * ViewBox dimensions for SVG
   * @default "0 0 24 24"
   */
  viewBox?: string;
  
  /**
   * Icon width
   */
  width?: number;
  
  /**
   * Icon height
   */
  height?: number;
  
  /**
   * Additional SVG attributes
   */
  attrs?: Record<string, unknown>;
}

/**
 * Icon Component with forwardRef support
 * 
 * This component wraps an icon with React's forwardRef to allow
 * parent components to access the underlying DOM element.
 * 
 * @example
 *