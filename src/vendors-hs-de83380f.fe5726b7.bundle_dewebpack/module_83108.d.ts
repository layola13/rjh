/**
 * React Icon Component Module
 * 
 * This module exports a React icon component that wraps a base icon component
 * with forwarded refs support.
 * 
 * @module IconComponent
 */

import * as React from 'react';

/**
 * Props that can be passed to the icon component.
 * Extends any additional properties from the base element.
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
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
  
  /**
   * The SVG icon data object containing path definitions and metadata
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure containing SVG metadata and path data
 */
export interface IconDefinition {
  /**
   * Icon name/identifier
   */
  name?: string;
  
  /**
   * SVG viewBox attribute value
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  path?: string | React.ReactNode;
  
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
 * Forward ref type for the icon component
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support.
 * 
 * This component renders an SVG icon by wrapping a base icon component
 * and forwarding the ref to the underlying SVG element.
 * 
 * @example
 *