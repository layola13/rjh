/**
 * React icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Optional className for styling
   */
  className?: string;
  
  /**
   * Optional style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Additional props passed to the underlying SVG element
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *