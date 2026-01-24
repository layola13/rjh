/**
 * Module: module_676980
 * Original ID: 676980
 * 
 * Icon component module that wraps a base icon component with forwarded ref support.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component (excluding ref)
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Size of the icon
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data/definition
   */
  icon?: unknown;
}

/**
 * Icon component with ref forwarding support
 * 
 * @remarks
 * This component wraps a base icon renderer and forwards refs to the underlying SVG element.
 * It merges provided props with a default icon definition.
 * 
 * @example
 *