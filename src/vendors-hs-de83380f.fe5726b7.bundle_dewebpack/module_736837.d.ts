/**
 * Module: module_736837
 * Original ID: 736837
 * 
 * Icon component wrapper that forwards refs to an internal icon implementation.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML attributes and custom icon-specific properties.
 */
export interface IconComponentProps {
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Inline styles for the icon element
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
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * Additional props passed to the underlying icon implementation
   */
  [key: string]: unknown;
}

/**
 * Ref type that can be attached to the icon component
 */
export type IconComponentRef = HTMLElement | null;

/**
 * Forward ref icon component.
 * 
 * This component wraps an icon implementation and forwards refs to allow
 * parent components to access the underlying DOM element.
 * 
 * @example
 *