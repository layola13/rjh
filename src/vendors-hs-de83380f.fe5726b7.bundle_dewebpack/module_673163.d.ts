/**
 * Module: module_673163
 * Original ID: 673163
 * 
 * React Icon Component Wrapper
 * This module exports a forwarded ref icon component that wraps a base icon with custom props.
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends standard React component props and adds icon-specific configurations
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Icon style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data/path configuration
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 * Contains the SVG path data and metadata for rendering icons
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name?: string;
  
  /**
   * SVG path data or element
   */
  path?: string | React.ReactNode;
  
  /**
   * ViewBox dimensions
   */
  viewBox?: string;
  
  /**
   * Additional attributes
   */
  attrs?: Record<string, unknown>;
}

/**
 * Forwarded ref icon component
 * 
 * A React component that renders an icon with forwarded ref support.
 * Merges provided props with default icon configuration.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded React ref
 * @returns Rendered icon component
 * 
 * @example
 *