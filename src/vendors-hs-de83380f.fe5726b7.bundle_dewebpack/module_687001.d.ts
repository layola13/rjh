/**
 * React Icon Component Module
 * 
 * This module exports a forward-ref enabled React icon component.
 * It wraps a base icon component with additional props and ref forwarding capabilities.
 */

import * as React from 'react';

/**
 * Icon component props interface
 * Extends standard React component props with icon-specific properties
 */
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Icon size in pixels or CSS size value
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional CSS class name(s)
   */
  className?: string;
  
  /**
   * Inline style overrides
   */
  style?: React.CSSProperties;
  
  /**
   * Icon SVG data or component reference
   */
  icon?: React.ComponentType<any> | string;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Whether the icon is decorative (hidden from screen readers)
   */
  'aria-hidden'?: boolean;
}

/**
 * Forward ref type for the icon component
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<HTMLElement>
>;

/**
 * Default exported icon component with forward ref support
 * 
 * @example
 *