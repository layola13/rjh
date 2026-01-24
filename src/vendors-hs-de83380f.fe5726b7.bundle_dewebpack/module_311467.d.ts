/**
 * React icon component wrapper module
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS units
   */
  size?: string | number;
  
  /**
   * Icon color (CSS color value)
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
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Icon title for tooltips
   */
  title?: string;
}

/**
 * Props for the specific icon component
 * Combines base icon props with standard SVG attributes
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forward ref icon component
 * Wraps an SVG icon with React forwardRef for ref forwarding capability
 * 
 * @remarks
 * This component merges user-provided props with a predefined icon definition,
 * allowing customization while maintaining consistent icon rendering.
 * 
 * @example
 *