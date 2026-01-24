/**
 * Icon Component Module
 * 
 * A React icon component that wraps a base icon with forwarded ref support.
 * This module exports a forwardRef-wrapped component for use in React applications.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base properties that can be passed to the icon component
 * Extends standard SVG element attributes
 */
export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /**
   * Icon size (width and height in pixels or CSS unit)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * Custom CSS class name
   */
  className?: string;
  
  /**
   * Inline CSS styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
}

/**
 * Icon component with ref forwarding support
 * 
 * This component renders an SVG icon with customizable properties.
 * It forwards refs to the underlying SVG element for direct DOM access.
 * 
 * @example
 *