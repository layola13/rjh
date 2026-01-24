/**
 * A React component that wraps an icon with forwarded ref support.
 * This module exports a forward-ref-enabled icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML attributes and custom icon-specific properties.
 */
export interface IconComponentProps {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Optional inline styles
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
   * Additional props passed to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Icon component reference type
 */
export type IconComponentRef = HTMLElement | SVGSVGElement;

/**
 * Forward-ref-enabled icon component.
 * Renders an icon with the ability to forward refs to the underlying DOM element.
 * 
 * @example
 *