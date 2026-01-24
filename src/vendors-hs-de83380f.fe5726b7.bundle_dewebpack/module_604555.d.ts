/**
 * Icon component module
 * Provides a React icon component with forwardRef support
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 * Extends standard HTML element attributes and custom icon properties
 */
interface IconComponentProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  
  /** Icon color, accepts CSS color values */
  color?: string;
  
  /** Custom class name for styling */
  className?: string;
  
  /** Custom inline styles */
  style?: React.CSSProperties;
  
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /** Icon rotation angle in degrees */
  rotate?: number;
  
  /** Icon spin animation */
  spin?: boolean;
  
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon component reference type
 * Supports ref forwarding to the underlying DOM element
 */
type IconComponentRef = HTMLSpanElement | HTMLElement;

/**
 * Icon component with forwardRef support
 * 
 * @example
 *