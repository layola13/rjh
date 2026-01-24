/**
 * React component for rendering an icon with forwarded ref support.
 * This module exports a forwardRef-wrapped icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component.
 * Extends standard HTML element props while allowing custom icon configuration.
 */
interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon data object containing path definitions and metadata
   */
  icon?: IconDefinition;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Spin animation flag
   */
  spin?: boolean;
  
  /**
   * Rotation angle
   */
  rotate?: number;
  
  [key: string]: any;
}

/**
 * Icon definition structure containing SVG path data
 */
interface IconDefinition {
  /**
   * Icon identifier
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
 * Ref type for the icon component (SVG element)
 */
type IconRef = SVGSVGElement;

/**
 * Forward-referenced icon component.
 * Merges provided props with a predefined icon definition and renders using a base icon component.
 * 
 * @example
 *