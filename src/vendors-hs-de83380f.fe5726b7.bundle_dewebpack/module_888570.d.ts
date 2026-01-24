/**
 * React component for rendering a specific icon with forwarded ref support.
 * Module ID: 888570
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component.
 * Extends the base icon component props.
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
   * Icon size in pixels or as string
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * Additional HTML attributes for SVG element
   */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding capability.
 * Wraps an icon definition with a base icon renderer.
 * 
 * @example
 *