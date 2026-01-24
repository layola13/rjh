/**
 * React Icon Component Module
 * 
 * This module exports a React component that wraps an icon with forwarded ref support.
 * The component accepts props and merges them with a default icon configuration.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard HTML element props and adds custom icon-specific properties
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Custom className for styling
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
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data or configuration
   */
  icon?: any;
  
  [key: string]: any;
}

/**
 * Icon component with ref forwarding support
 * 
 * @example
 *