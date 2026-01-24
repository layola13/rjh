/**
 * React icon component module
 * Exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
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
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data (path definitions, viewBox, etc.)
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure containing SVG path data
 */
export interface IconDefinition {
  /**
   * SVG path data or element tree
   */
  icon: readonly [
    number, // width
    number, // height
    readonly string[], // ligatures
    string, // unicode
    string | string[] // svg path data
  ];
  
  /**
   * Icon name
   */
  iconName?: string;
  
  /**
   * Icon prefix (e.g., 'fas', 'far', 'fab')
   */
  prefix?: string;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *