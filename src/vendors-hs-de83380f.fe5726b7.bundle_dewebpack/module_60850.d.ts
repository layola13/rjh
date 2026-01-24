/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon definition object containing SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG viewBox attribute value
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  path: string | React.ReactNode;
  
  /**
   * Default width of the icon
   */
  width?: number;
  
  /**
   * Default height of the icon
   */
  height?: number;
}

/**
 * Props passed to the base icon wrapper component
 */
export interface IconWrapperProps extends IconComponentProps {
  /**
   * Icon definition containing SVG data
   */
  icon: IconDefinition;
  
  /**
   * Forwarded ref to the SVG element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forwarded ref icon component
 * Wraps an icon definition with React forwardRef support
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;