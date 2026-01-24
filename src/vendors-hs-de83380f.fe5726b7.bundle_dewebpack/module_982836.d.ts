import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component properties
 * Extends standard SVG element properties
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional custom properties
   */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref
 * 
 * This is a React functional component that renders an SVG icon.
 * It uses forwardRef to allow parent components to access the underlying DOM element.
 * 
 * @example
 *