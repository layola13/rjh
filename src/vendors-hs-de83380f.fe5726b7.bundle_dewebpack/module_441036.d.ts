/**
 * React icon component module
 * 
 * Exports a forwarded ref icon component that wraps a base icon
 * with additional props and configuration.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
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
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * Aria label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Additional props passed to the underlying SVG element
   */
  [key: string]: unknown;
}

/**
 * Props for the icon wrapper component including ref support
 */
export type IconWrapperProps = IconComponentProps & RefAttributes<SVGSVGElement>;

/**
 * Icon definition object containing SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  path: string | ReactElement | ReactElement[];
  
  /**
   * Additional icon metadata
   */
  [key: string]: unknown;
}

/**
 * Forwarded ref icon component
 * 
 * A React component that renders an icon with ref forwarding support.
 * Combines base icon props with a specific icon definition.
 * 
 * @example
 *