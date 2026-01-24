/**
 * React component wrapper for an icon component.
 * This module creates a forwarded ref icon component using a base icon implementation.
 */

import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component.
 * Extends all standard SVG attributes and React component props.
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  
  /**
   * Aria label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Any other props passed to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Ref type for the icon component (typically SVGSVGElement)
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component with forwarded ref support.
 * Wraps a base icon definition with additional props and ref forwarding.
 * 
 * @example
 *