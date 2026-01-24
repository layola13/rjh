/**
 * Module: module_253269
 * Original ID: 253269
 * 
 * A React icon component wrapper that forwards refs to the underlying icon implementation.
 */

import * as React from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML attributes and custom icon properties.
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** Custom class name for styling */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Aria label for accessibility */
  'aria-label'?: string;
  /** Custom icon data */
  icon?: unknown;
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding support.
 * 
 * @param props - Component props
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element rendering the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;