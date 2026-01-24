/**
 * Icon component module
 * 
 * This module exports a React icon component that wraps an icon definition
 * with additional props and ref forwarding capabilities.
 * 
 * @module IconComponent
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 * Extends standard SVG element properties
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom CSS class name for the icon
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
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Additional custom properties
   */
  [key: string]: unknown;
}

/**
 * Icon definition object structure
 * Contains the raw SVG path data and metadata
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
   * SVG path data or children elements
   */
  content: string | React.ReactNode;
  
  /**
   * Default icon dimensions
   */
  width?: number;
  height?: number;
}

/**
 * Props for the icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /**
   * Icon definition object containing SVG data
   */
  icon: IconDefinition;
  
  /**
   * Ref to be forwarded to the underlying SVG element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forward ref icon component type
 * Combines icon base props with ref forwarding
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A React forward ref component that renders an SVG icon with configurable props
 * 
 * @example
 *