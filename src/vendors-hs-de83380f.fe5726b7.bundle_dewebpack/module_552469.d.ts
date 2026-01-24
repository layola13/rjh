/**
 * React component module for an icon component
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG and HTML attributes
 */
export interface IconComponentProps {
  /**
   * CSS class name for styling
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Accessibility title
   */
  title?: string;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * Additional SVG attributes
   */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * Wraps an underlying icon implementation with ref forwarding
 * 
 * @example
 *