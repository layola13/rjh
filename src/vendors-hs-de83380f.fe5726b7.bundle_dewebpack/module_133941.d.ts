/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props spreading functionality.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base props for the icon component
 */
interface IconBaseProps extends SVGAttributes<SVGElement> {
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * Stroke width for outlined icons
   * @default 2
   */
  strokeWidth?: number;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component props with ref support
 */
export type IconProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forward ref icon component type
 * 
 * This component accepts standard SVG attributes and forwards the ref
 * to the underlying SVG element for direct DOM access.
 */
export type IconComponent = ForwardRefExoticComponent<IconProps>;

/**
 * Default exported icon component with forwarded ref
 * 
 * @example
 *