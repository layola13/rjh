/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s)
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string value
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
}

/**
 * SVG icon data structure
 * Contains path data and viewBox configuration
 */
export interface IconDefinition {
  /**
   * SVG path data or child elements
   */
  icon: React.ReactNode | string;
  
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * Default width
   */
  width?: number;
  
  /**
   * Default height
   */
  height?: number;
}

/**
 * Forwarded ref icon component
 * Wraps icon definition with ref forwarding support
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref
 * Combines icon definition with base component wrapper
 */
declare const ForwardedIconComponent: IconComponent;

export default ForwardedIconComponent;