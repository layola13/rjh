import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props extending standard SVG properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
   */
  size?: number | string;
  
  /**
   * Icon color, defaults to currentColor
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Forwarded ref type for the icon component
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component with forward ref support
 * 
 * This component wraps an SVG icon definition and provides
 * standard React ref forwarding capabilities for direct DOM access.
 * 
 * @example
 *