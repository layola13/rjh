/**
 * Icon component module
 * 
 * This module exports a forwardRef-wrapped React component that renders an icon.
 * The component accepts standard props and merges them with an internal icon definition.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon wrapper component
 * Extends standard HTML div attributes
 */
export interface IconWrapperProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon size in pixels
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Icon style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Custom icon data (SVG path data)
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 * Contains SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon identifier
   */
  prefix: string;
  
  /**
   * Icon name
   */
  iconName: string;
  
  /**
   * Icon dimensions [width, height]
   */
  icon: [
    number, // width
    number, // height
    string[], // ligatures
    string, // unicode
    string | string[] // svgPathData
  ];
}

/**
 * Icon component with ref forwarding support
 * 
 * @remarks
 * This component wraps an icon definition and forwards refs to the underlying element.
 * It merges passed props with the icon configuration using Object.assign pattern.
 * 
 * @example
 *