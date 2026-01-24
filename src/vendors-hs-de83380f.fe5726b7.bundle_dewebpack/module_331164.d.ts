/**
 * Module: module_331164
 * Original ID: 331164
 * 
 * React icon component wrapper that forwards refs to the underlying icon implementation.
 * This module creates a reusable icon component by wrapping a base icon with additional props.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component.
 * Extends standard SVG element properties.
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon style object
   */
  style?: React.CSSProperties;
}

/**
 * Props for the wrapped icon component.
 * Combines base icon props with the icon data definition.
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Icon definition object containing path data and metadata
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure containing SVG path data and metadata.
 */
export interface IconDefinition {
  /**
   * Icon name/identifier
   */
  name?: string;
  
  /**
   * SVG path data
   */
  path?: string | string[];
  
  /**
   * ViewBox dimensions
   */
  viewBox?: string;
  
  /**
   * Icon width
   */
  width?: number;
  
  /**
   * Icon height
   */
  height?: number;
}

/**
 * Forwarded ref type for the icon component.
 * References the underlying SVG element.
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Complete icon component type with forward ref support.
 * Accepts IconBaseProps and forwards ref to SVGSVGElement.
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component.
 * A forward-ref enabled React component that renders an SVG icon
 * with support for customization through props.
 */
declare const IconForwardRefComponent: IconComponent;

export default IconForwardRefComponent;