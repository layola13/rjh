/**
 * Icon Component Module
 * 
 * A React forwardRef component that renders an icon by wrapping a base icon component
 * with additional props. This pattern allows parent components to access the underlying
 * DOM element through the ref prop.
 */

import React from 'react';

/**
 * Base properties that can be passed to the icon component
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height in pixels)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default "currentColor"
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
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Title element for icon description
   */
  title?: string;
}

/**
 * Icon component reference type
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Forward ref icon component that wraps an icon definition with configurable props.
 * 
 * @example
 *