/**
 * Icon Component Module
 * 
 * A React icon component that wraps an icon element with forwarded ref support.
 * This component accepts props and merges them with a default icon configuration.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentBaseProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Custom class name for styling
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
   * Additional SVG attributes
   */
  [key: string]: any;
}

/**
 * Props for the forwarded ref icon component
 */
export type IconComponentProps = IconComponentBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component with forwarded ref
 * 
 * This component renders an SVG icon element with support for ref forwarding.
 * It merges passed props with default icon configuration.
 * 
 * @example
 *