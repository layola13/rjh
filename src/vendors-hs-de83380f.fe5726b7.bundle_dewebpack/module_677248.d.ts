/**
 * Icon component module
 * Provides a React icon component with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base properties for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Icon style
   */
  style?: React.CSSProperties;
  
  /**
   * Additional props spread to the icon element
   */
  [key: string]: unknown;
}

/**
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Reference to the SVG element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type definition
 * A forward ref component that renders an SVG icon
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * This component wraps an icon definition with React.forwardRef
 * allowing parent components to access the underlying SVG element
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;

/**
 * Internal icon configuration object
 * Contains the icon's SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name?: string;
  
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  icon: React.ReactNode | string;
}

/**
 * Module metadata
 * @module module_677248
 * @originalId 677248
 */