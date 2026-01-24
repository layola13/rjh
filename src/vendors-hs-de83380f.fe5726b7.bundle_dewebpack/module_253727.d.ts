/**
 * Module: module_253727
 * Original ID: 253727
 * 
 * Icon component wrapper module that creates a forwarded ref icon component.
 * This module imports an icon definition and wraps it in a reusable React component.
 */

import type * as React from 'react';

/**
 * Props for the icon component.
 * Extends standard SVG element props to support all SVG attributes.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Aria label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
}

/**
 * Icon definition structure containing SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG viewBox dimensions
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  path?: string | React.ReactNode;
  
  /**
   * Default icon width
   */
  width?: number;
  
  /**
   * Default icon height
   */
  height?: number;
}

/**
 * Forwarded ref type for the icon component
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component with forwarded ref support.
 * 
 * This component wraps an icon definition and provides a consistent API
 * for rendering SVG icons throughout the application.
 * 
 * @example
 *