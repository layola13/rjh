/**
 * React Icon Component Module
 * 
 * This module exports a React component that wraps an icon with forwarded ref support.
 * The component accepts standard icon props and merges them with an internal icon definition.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  /**
   * Icon size in pixels or CSS unit
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
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
}

/**
 * Props specific to this icon component
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Icon definition object (internally provided)
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /**
   * Icon name/identifier
   */
  name: string;
  
  /**
   * SVG path data
   */
  path: string | string[];
  
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
 * Icon component with forwarded ref support
 * 
 * @example
 *