import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Icon size in pixels or CSS unit
   * @default undefined
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component type with forwarded ref support
 * 
 * This component renders an SVG icon with customizable properties.
 * It supports ref forwarding to access the underlying SVG element.
 * 
 * @example
 *