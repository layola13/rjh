/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props spreading functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element props with additional customization options
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   * @default undefined (inherits from parent or defaults to icon's natural size)
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default 'currentColor' (inherits from parent text color)
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Any additional props to spread onto the icon element
   */
  [key: string]: any;
}

/**
 * Icon component type with forwarded ref support
 * 
 * This component wraps an SVG icon and forwards refs to the underlying SVG element,
 * allowing parent components to access the DOM node directly.
 * 
 * @example
 *