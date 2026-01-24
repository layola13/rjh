/**
 * React Icon Component
 * 
 * A forwarded ref icon component that wraps a base icon with additional props.
 * This module provides a reusable icon component with TypeScript support.
 */

import React from 'react';

/**
 * Props for the icon component
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or string format
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Any other HTML/SVG attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;