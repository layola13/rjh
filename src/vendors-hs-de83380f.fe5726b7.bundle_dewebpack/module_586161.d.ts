/**
 * Module: module_586161
 * Original ID: 586161
 * 
 * Icon component wrapper that forwards refs to the underlying icon element.
 * This module creates a forwarded ref component using React's forwardRef API.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component.
 * Extends base HTML element attributes and supports additional icon-specific properties.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Icon name or identifier
   */
  icon?: unknown;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Additional props passed to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Ref type for the icon component
 */
export type IconComponentRef = HTMLElement | null;

/**
 * Forwarded ref icon component.
 * 
 * @example
 *