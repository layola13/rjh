/**
 * Module: module_540238
 * Original ID: 540238
 * 
 * Icon component wrapper that forwards refs and applies default icon.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component.
 * Extends all standard component props while allowing additional custom properties.
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<any> {
  /**
   * The icon to display (provided by default from module 345971)
   */
  icon?: unknown;
  
  /**
   * Additional props spread onto the underlying component
   */
  [key: string]: unknown;
}

/**
 * Ref type for the forwarded component
 */
export type IconComponentRef = unknown;

/**
 * Forward ref icon component that merges props with a default icon.
 * 
 * @param props - Component props
 * @param ref - Forwarded ref
 * @returns React element with merged props and default icon
 * 
 * @example
 *