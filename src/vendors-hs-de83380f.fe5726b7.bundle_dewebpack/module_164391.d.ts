/**
 * Module: module_164391
 * Original ID: 164391
 * 
 * Icon component wrapper that forwards refs to the underlying icon implementation.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML SVG element attributes and adds icon-specific properties.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * CSS class name for styling
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Additional props passed to the icon wrapper component
   */
  [key: string]: unknown;
}

/**
 * Icon component type definition.
 * A forward ref component that renders an SVG icon.
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component.
 * Wraps the icon implementation with ref forwarding support.
 * 
 * @example
 *