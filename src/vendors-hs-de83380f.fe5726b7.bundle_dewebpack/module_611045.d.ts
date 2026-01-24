/**
 * React component wrapper for an icon component.
 * This module exports a forwarded ref icon component with default props.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props and includes icon-specific properties.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * CSS class name for the icon
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
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for the icon
   */
  'aria-label'?: string;
  
  /**
   * Icon data/configuration object
   */
  icon?: IconData;
}

/**
 * Icon data structure containing SVG paths and metadata
 */
export interface IconData {
  /**
   * SVG path data or element
   */
  path?: string | React.ReactNode;
  
  /**
   * ViewBox dimensions for the SVG
   */
  viewBox?: string;
  
  /**
   * Width of the icon
   */
  width?: number;
  
  /**
   * Height of the icon
   */
  height?: number;
}

/**
 * Forwarded ref type for the icon component
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component with forwarded ref support.
 * Renders an SVG icon with customizable properties.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<IconComponentRef>
>;

export default IconComponent;