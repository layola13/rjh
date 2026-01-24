/**
 * Icon component module
 * 
 * This module exports a React forwardRef component that wraps a base icon component
 * with additional props merging functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props interface for the icon component
 */
export interface IconComponentProps {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * Additional HTML attributes for SVG element
   */
  [key: string]: any;
}

/**
 * Icon component reference type
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component type with forwardRef support
 * 
 * This component merges provided props with a default icon configuration
 * and forwards the ref to the underlying SVG element.
 * 
 * @example
 *