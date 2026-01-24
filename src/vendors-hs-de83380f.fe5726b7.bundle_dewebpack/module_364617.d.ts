/**
 * Module: module_364617
 * Original ID: 364617
 * 
 * Icon component wrapper that forwards refs to the underlying icon element.
 * This module creates a forward-ref enabled React component that wraps a default icon.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component.
 * Extends standard SVG element attributes.
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;
  
  /**
   * Size of the icon (width and height)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Icon style variant
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
}

/**
 * Props type with ref support for the forwarded icon component
 */
export type IconComponentWithRef = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A forward-ref enabled icon component.
 * 
 * @example
 *