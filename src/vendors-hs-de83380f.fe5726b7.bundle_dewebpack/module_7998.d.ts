/**
 * React component wrapper for an icon.
 * This module creates a forwarded ref icon component using a base icon implementation.
 * 
 * @module IconComponent
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard SVG element attributes and custom icon properties.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS size value
   */
  size?: number | string;
  
  /**
   * Icon color, defaults to currentColor
   */
  color?: string;
  
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Icon style object
   */
  style?: React.CSSProperties;
  
  /**
   * Additional icon-specific props
   */
  [key: string]: unknown;
}

/**
 * Forwarded ref type for the icon component
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component with forwarded ref support.
 * Renders an SVG icon element with customizable props.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<IconComponentRef>
>;

export default IconComponent;