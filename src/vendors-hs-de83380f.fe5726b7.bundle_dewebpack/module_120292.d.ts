/**
 * React Icon Component Module
 * 
 * This module exports a forward-referenced React icon component that wraps
 * a base icon component with additional props merging functionality.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base properties interface for icon components
 */
export interface IconBaseProps {
  /**
   * Additional CSS class name(s)
   */
  className?: string;

  /**
   * Inline styles
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
   * ARIA label for accessibility
   */
  'aria-label'?: string;

  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Icon SVG path data or component configuration
 * Imported from external icon definition module
 */
export interface IconDefinition {
  /**
   * SVG path data
   */
  path: string | string[];

  /**
   * ViewBox dimensions
   */
  viewBox?: string;

  /**
   * Default width
   */
  width?: number;

  /**
   * Default height
   */
  height?: number;
}

/**
 * Properties for the wrapped icon component
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Icon definition containing SVG path and metadata
   */
  icon: IconDefinition;

  /**
   * Forwarded ref to the underlying SVG element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forward-referenced icon component
 * 
 * This component renders an SVG icon with customizable properties.
 * It accepts a ref that can be used to access the underlying SVG element.
 * 
 * @example
 *