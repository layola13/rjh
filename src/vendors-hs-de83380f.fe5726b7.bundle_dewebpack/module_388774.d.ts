/**
 * Icon component module
 * Wraps a base icon component with a specific icon configuration
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon data/configuration object
   */
  icon?: IconDefinition;
  
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
   * Additional props passed to the underlying SVG element
   */
  [key: string]: unknown;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /**
   * Icon prefix (e.g., 'fas', 'far')
   */
  prefix?: string;
  
  /**
   * Icon name
   */
  iconName?: string;
  
  /**
   * SVG path data or icon configuration
   */
  icon?: unknown[];
  
  /**
   * Additional icon metadata
   */
  [key: string]: unknown;
}

/**
 * Icon component with forward ref support
 * 
 * @remarks
 * This component wraps a base icon component and injects a specific icon definition.
 * Supports ref forwarding to access the underlying SVG element.
 * 
 * @example
 *