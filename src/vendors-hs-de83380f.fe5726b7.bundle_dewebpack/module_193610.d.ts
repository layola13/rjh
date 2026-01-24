/**
 * Icon component module
 * Provides a forward-ref wrapped icon component
 */

import { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base properties for the icon component
 */
export interface IconBaseProps {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Custom SVG attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component props extending base icon properties
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forward-ref icon component
 * 
 * @remarks
 * This component wraps an icon definition with React.forwardRef to allow
 * ref forwarding to the underlying SVG element.
 * 
 * @example
 *