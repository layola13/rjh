/**
 * Module: module_442925
 * Original ID: 442925
 * 
 * Icon component wrapper that forwards refs to the underlying icon implementation.
 * This module creates a React component that wraps a base icon component with additional props.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentProps } from 'react';

/**
 * Props for the icon component.
 * Extends the base props from the underlying icon component.
 */
export interface IconComponentProps extends ComponentProps<any> {
  /**
   * Custom icon data or configuration passed to the base icon component
   */
  icon?: any;
  
  /**
   * Additional props that will be spread onto the component
   */
  [key: string]: any;
}

/**
 * Icon component with ref forwarding support.
 * 
 * This component merges provided props with default icon configuration
 * and forwards refs to the underlying DOM element.
 * 
 * @example
 *