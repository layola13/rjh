/**
 * React icon component with forwarded ref support
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base icon props extending standard SVG attributes
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS unit
   */
  size?: string | number;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

/**
 * Icon component props with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forwarded ref icon component
 * 
 * This component wraps an SVG icon with React.forwardRef support,
 * allowing parent components to access the underlying SVG element.
 * 
 * @example
 *