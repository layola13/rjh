/**
 * React icon component wrapper
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Size of the icon (width and height)
   */
  size?: string | number;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Spin animation
   */
  spin?: boolean;
  
  /**
   * Rotation angle in degrees
   */
  rotate?: number;
}

/**
 * SVG icon definition
 */
export interface IconDefinition {
  /**
   * Icon name
   */
  name: string;
  
  /**
   * Icon theme (outlined, filled, two-tone)
   */
  theme?: 'outlined' | 'filled' | 'two-tone';
  
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  icon: React.ReactNode | ((props: IconBaseProps) => React.ReactNode);
}

/**
 * Icon component props combining base props with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forward ref icon component type
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default exported icon component
 * A forward ref component that renders an SVG icon with customizable properties
 */
declare const IconForwardRefComponent: IconComponent;

export default IconForwardRefComponent;