/**
 * Icon component module
 * Provides a forward-ref wrapped icon component with customizable properties
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base properties for icon components
 */
export interface IconBaseProps {
  /**
   * CSS class name for styling
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   * @default "1em"
   */
  size?: string | number;
  
  /**
   * Icon color
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * Custom title for accessibility
   */
  title?: string;
  
  /**
   * Additional SVG attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component properties
 * Extends base icon properties with icon-specific data
 */
export interface IconProps extends IconBaseProps {
  /**
   * Icon definition object containing SVG path data
   */
  icon: IconDefinition;
}

/**
 * Icon definition structure
 * Contains the SVG markup and metadata for an icon
 */
export interface IconDefinition {
  /**
   * Icon identifier/name
   */
  name: string;
  
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  children: ReactElement | ReactElement[];
  
  /**
   * Additional icon metadata
   */
  [key: string]: unknown;
}

/**
 * Forward-ref icon component type
 * A React component that forwards refs to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * @remarks
 * This component wraps an icon definition with proper ref forwarding
 * and merges provided props with the icon definition.
 * 
 * @example
 *