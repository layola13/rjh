/**
 * Icon component module
 * Provides a React icon component with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the Icon component
 * Extends standard SVG element properties
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   * @default "1em"
   */
  size?: string | number;
  
  /**
   * Icon color
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessible label for the icon
   */
  'aria-label'?: string;
  
  /**
   * ARIA hidden attribute
   */
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * Icon component with ref forwarding support
 * 
 * @example
 *