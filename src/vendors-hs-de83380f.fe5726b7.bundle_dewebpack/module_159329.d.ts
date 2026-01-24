/**
 * Module: module_159329
 * Original ID: 159329
 * 
 * Icon component wrapper that creates a forward-ref enabled React component
 * with a specific icon configuration.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props and allows custom icon-specific properties.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Optional style object for inline styling
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Additional custom properties
   */
  [key: string]: unknown;
}

/**
 * Icon component that wraps the base icon with forwarded ref support.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns A React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;